import { BrowserRouter as Router, useLocation } from "react-router-dom";
import Navbar from "./Components/layout/Navbar";
import Mainroutes from "./Routes/Routes";
import { Toaster } from "react-hot-toast";
import Footer from "./Components/layout/Footer";
import { AuthProvider } from "./Context/Authcontext";
import Whatsappfloating from "./Components/WhatsAppWidget";
import { Scrolltotop } from "./scrolltop/Scrolltotop";

import { initGA, trackPage } from "./analytics";

function AppContent() {
  const location = useLocation();

  const hideFullLayout =
    location.pathname.startsWith("/admin") ||
    location.pathname === "/login" ||
    location.pathname.startsWith("/verify-certificate");

  // Show WhatsApp button on all pages except admin and login
  const showWhatsApp =
    !location.pathname.startsWith("/admin") &&
    !location.pathname.startsWith("/login");

  // const isLandingPage = location.pathname.startsWith("/chennai-banking-jobs");

  return (
    <>
      {!hideFullLayout && <Navbar />}
      <Mainroutes />
      {!hideFullLayout && <Footer />}
      {showWhatsApp && <Whatsappfloating />}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "#4ade80",
              secondary: "#fff",
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />
    </>
    // <>
    //   {!hideFullLayout && !isLandingPage && <Navbar />}
    //   <Mainroutes />
    //   {!hideFullLayout && <Footer />}
    //   <ToastContainer />
    // </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Scrolltotop />
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
