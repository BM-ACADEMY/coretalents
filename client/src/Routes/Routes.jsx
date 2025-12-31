import { Routes, Route, Navigate } from "react-router-dom";
import Homeroutes from "./Homeroutes";
import Adminroutes from "./Adminroutes";
import PrivateRoute from "@/Context/PrivateRoute";
import PublicRoute from "@/Context/PublicRoute";
import Login from "@/auth/Login";
import UserDashboard from "@/userdashbaord/UserDashboard"; // Import the new dashboard
import Aboutroutes from "./Aboutroutes";
import Servicesroute from "./Servicesroute";
import Contactroutes from "./Contactroutes";
import ThankYou from "@/Components/Contact/ThankYou";
import Blogroute from "./blogroute";
import BlogList from "@/Components/Blog/BlogLis";
import Navbar from "@/Components/layout/Navbar";
import Footer from "@/Components/layout/Footer";
import Userroutes from "./Userroutes";

const Mainroutes = () => {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<Homeroutes />} />
      <Route path="/about" element={<Aboutroutes />} />
      <Route path="/services" element={<Servicesroute />} />
      <Route path="/contact" element={<Contactroutes />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/blog/*" element={<Blogroute />} />
      <Route path="/blog" element={<BlogList />} />

      {/* Auth Route (Login/Register) */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Navbar/>
            <Login />
            <Footer/>
          </PublicRoute>
        }
      />

      {/* USER Protected Routes */}
     <Route
        path="/user/*"
        element={
          <PrivateRoute allowedRoles={["user", "admin"]}>
             <Userroutes />
          </PrivateRoute>
        }
      />

      {/* ADMIN Protected Routes */}
      {/* Note: In your Adminroutes, ensure you don't repeat the /admin prefix if it's already here, 
          or adjust accordingly. Assuming Adminroutes handles subpaths. */}
      <Route
        path="/admin/*"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <Adminroutes />
          </PrivateRoute>
        }
      />
      
      {/* Catch all for Admin Routes if they are defined as /* in original code */}
      {/* If your Adminroutes file expects to be at root level but protected: */}
       <Route
        path="/*"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <Adminroutes />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default Mainroutes;