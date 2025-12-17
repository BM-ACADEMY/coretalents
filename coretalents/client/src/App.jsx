import { BrowserRouter as Router, useLocation } from "react-router-dom";
import Navbar from "./Components/layout/Navbar";
import Mainroutes from "./Routes/Routes";
import { ToastContainer } from "react-toastify";
import Footer from "./Components/layout/Footer";
import { AuthProvider } from "./Context/Authcontext";
import { Scrolltotop } from "./scrolltop/Scrolltotop";


function AppContent() {
  const location = useLocation();

  // Hide Navbar/Footer on admin routes, login, and 404
  const hideLayout =
    location.pathname.startsWith("/admin") ||
    location.pathname === "/login"

  return (
    <>
      {!hideLayout && <Navbar />}
      <Mainroutes />
      {!hideLayout && <Footer />}
      <ToastContainer />
    </>
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
