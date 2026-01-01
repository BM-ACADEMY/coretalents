const Razorpay = require("../Config/razorpay");
const crypto = require("crypto");
const Plan = require("../model/PlanModel");
const Subscription = require("../model/SubscriptionModel");

// 1. Initialize Payment (Create Order)
exports.createOrder = async (req, res) => {
  try {
    const { planId } = req.body;
    const plan = await Plan.findById(planId);

    if (!plan) return res.status(404).json({ message: "Plan not found" });

    const options = {
      amount: plan.price * 100, // Amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await Razorpay.orders.create(options);

    // Create a temporary subscription record
    await Subscription.create({
      user: req.user.id,
      plan: plan._id,
      orderId: order.id,
      amount: plan.price,
      status: 'created'
    });

    res.json({
      success: true,
      order,
      plan
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 2. Verify Payment (Called after user pays on Frontend)
exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    console.log("--- Payment Verification Started ---");
    console.log("Received from Frontend:", req.body);

    // 1. Validate inputs
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
       return res.status(400).json({ success: false, message: "Missing payment details" });
    }

    // 2. Generate Signature
    // WARNING: Ensure process.env.RAZORPAY_KEY_SECRET is loaded correctly
    const secret = process.env.RAZORPAY_KEY_SECRET;
    if(!secret) {
        console.error("ERROR: RAZORPAY_KEY_SECRET is missing in .env");
        return res.status(500).json({ success: false, message: "Server Config Error" });
    }

    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generated_signature = hmac.digest("hex");

    console.log("Generated Signature:", generated_signature);
    console.log("Expected Signature: ", razorpay_signature);

    // 3. Compare Signatures
    if (generated_signature === razorpay_signature) {
      console.log("✅ Signature Matched!");

      // 4. Update Database
      const subscription = await Subscription.findOne({ orderId: razorpay_order_id });

      if(!subscription) {
          console.error("❌ Subscription record not found for Order ID:", razorpay_order_id);
          return res.status(404).json({message: "Subscription record not found"});
      }

      const plan = await Plan.findById(subscription.plan);

      // Calculate dates
      const startDate = new Date();
      const endDate = new Date();
      endDate.setDate(startDate.getDate() + plan.durationInDays);

      subscription.paymentId = razorpay_payment_id;
      subscription.status = 'active';
      subscription.startDate = startDate;
      subscription.endDate = endDate;

      await subscription.save();
      console.log("✅ Database Updated. Membership Active.");

      res.json({ success: true, message: "Payment verified, Membership Active" });
    } else {
      console.error("❌ Signature Mismatch!");
      res.status(400).json({ success: false, message: "Invalid Signature" });
    }
  } catch (error) {
    console.error("SERVER ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.getAllPaymentHistory = async (req, res) => {
  try {
    let subscriptions = await Subscription.find({
      status: { $in: ['active', 'expired'] }
    })
    .populate('user', 'name email')
    // 👇 FIX HERE: Add resumeLimit and durationInDays
    .populate('plan', 'name resumeLimit durationInDays')
    .sort({ createdAt: -1 });

    const now = new Date();
    const updatedSubscriptions = [];

    for (let sub of subscriptions) {
      if (sub.status === 'active' && sub.endDate && new Date(sub.endDate) < now) {
        sub.status = 'expired';
        await sub.save();
      }
      updatedSubscriptions.push(sub);
    }

    res.status(200).json({ success: true, data: updatedSubscriptions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
