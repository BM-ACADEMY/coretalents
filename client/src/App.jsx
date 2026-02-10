import { BrowserRouter as Router, useLocation } from "react-router-dom";
import Navbar from "./Components/layout/Navbar";
import Mainroutes from "./Routes/Routes";
import { ToastContainer } from "react-toastify";
import Footer from "./Components/layout/Footer";
import { AuthProvider } from "./Context/Authcontext";
import { Scrolltotop } from "./scrolltop/Scrolltotop";

function AppContent() {
  const location = useLocation();

  const hideFullLayout =
    location.pathname.startsWith("/admin") ||
    location.pathname === "/login" ||
    location.pathname.startsWith("/verify-certificate");

  // const isLandingPage = location.pathname.startsWith("/chennai-banking-jobs");

  
  return (
    <>
      {!hideFullLayout &&  <Navbar />}
      <Mainroutes />
      {!hideFullLayout && <Footer />}
      <ToastContainer />
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
        <Scrolltotop/>
        <AppContent />
        {/* <Whatsappfloating/> */}
      </Router>
    </AuthProvider>
  );
}

export default App;