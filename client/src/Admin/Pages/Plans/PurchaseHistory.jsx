import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, Search, User, Calendar, Clock,
  AlertCircle, Eye, X, CheckCircle, FileText, CreditCard
} from "lucide-react";
import axiosInstance from "@/api/axiosInstance";

const PurchaseHistory = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Modal State
  const [selectedTxn, setSelectedTxn] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await axiosInstance.get("/payment/history/all");
      if (res.data.success) {
        setHistory(res.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch history");
    } finally {
      setLoading(false);
    }
  };

  const filteredHistory = history.filter(item =>
    item.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.plan?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  // Open Modal Handler
  const handleViewDetails = (item) => {
    setSelectedTxn(item);
    setIsModalOpen(true);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition"
        >
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Subscription History</h1>
          <p className="text-gray-500">Monitor active and expired user memberships</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex items-center gap-3 max-w-md">
        <Search className="text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search by User or Plan name..."
          className="w-full outline-none text-gray-700"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">User</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Plan Name</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Expiry Date</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-center">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan="6" className="p-8 text-center animate-pulse">Loading data...</td></tr>
              ) : filteredHistory.length === 0 ? (
                <tr><td colSpan="6" className="p-8 text-center text-gray-500">No active or expired subscriptions found.</td></tr>
              ) : (
                filteredHistory.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50 transition">

                    {/* User */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                          <User size={16} />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 text-sm">{item.user?.name || "Unknown"}</p>
                          <p className="text-xs text-gray-500">{item.user?.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Plan */}
                    <td className="px-6 py-4 font-medium text-gray-700">
                      {item.plan?.name || "Deleted Plan"}
                    </td>

                    {/* Amount */}
                    <td className="px-6 py-4 font-bold text-gray-800">
                      ₹{item.amount}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      {item.status === "active" ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse"></span>
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 border border-red-200">
                          <AlertCircle size={10} />
                          Expired
                        </span>
                      )}
                    </td>


                    {/* Expiry */}
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {formatDate(item.endDate).split(',')[0]} {/* Just showing date part */}
                    </td>

                    {/* Actions - More Details Button */}
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleViewDetails(item)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition"
                        title="View Details"
                      >
                        <Eye size={20} />
                      </button>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- TRANSACTION DETAILS MODAL --- */}
      {isModalOpen && selectedTxn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">

            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <FileText size={18} className="text-blue-600" />
                Transaction Details
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={22} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">

              {/* Status Banner */}
              <div className={`flex items-center justify-between p-4 rounded-xl ${selectedTxn.status === 'active' ? 'bg-green-50 border border-green-100' : 'bg-gray-50 border border-gray-200'}`}>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider opacity-70">Current Status</p>
                  <p className={`text-lg font-bold ${selectedTxn.status === 'active' ? 'text-green-700' : 'text-gray-700'}`}>
                    {selectedTxn.status.toUpperCase()}
                  </p>
                </div>
                {selectedTxn.status === 'active' ? <CheckCircle className="text-green-500" size={32} /> : <AlertCircle className="text-gray-400" size={32} />}
              </div>

              {/* Grid Details */}
              <div className="grid grid-cols-2 gap-y-6 gap-x-4">

                <DetailItem label="Plan Name" value={selectedTxn.plan?.name} />
                <DetailItem label="Resume Limit" value={`${selectedTxn.plan?.resumeLimit || '2'} Resumes`} highlight />

                <DetailItem label="Purchased Date" value={formatDate(selectedTxn.startDate || selectedTxn.createdAt)} />
                <DetailItem label="Expiry Date" value={formatDate(selectedTxn.endDate)} />

                <DetailItem label="Duration" value={`${selectedTxn.plan?.durationInDays || 30} Days`} />
                <DetailItem label="Amount Paid" value={`₹${selectedTxn.amount}`} />
              </div>

              {/* Order ID Section */}
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                <p className="text-xs text-blue-600 font-bold uppercase mb-1 flex items-center gap-1">
                  <CreditCard size={12} /> Order ID
                </p>
                <p className="text-sm font-mono text-blue-800 break-all">
                  {selectedTxn.orderId}
                </p>
              </div>

            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 text-right">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

// Helper Component for Grid Items
const DetailItem = ({ label, value, highlight = false }) => (
  <div className="flex flex-col">
    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{label}</span>
    <span className={`text-sm font-medium ${highlight ? 'text-blue-600 font-bold' : 'text-gray-800'}`}>
      {value || "N/A"}
    </span>
  </div>
);

export default PurchaseHistory;
