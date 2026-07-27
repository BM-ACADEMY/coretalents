import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Loader2 } from "lucide-react";
import Homeroutes from "./Homeroutes";
import Adminroutes from "./Adminroutes";
import PrivateRoute from "@/Context/PrivateRoute";
import PublicRoute from "@/Context/PublicRoute";
import Login from "@/auth/Login";
import UserDashboard from "@/userdashbaord/UserDashboard";
import Aboutroutes from "./Aboutroutes";
import Servicesroute from "./Servicesroute";
import Contactroutes from "./Contactroutes";
import ThankYou from "@/Components/Contact/ThankYou";
import Blogroute from "./blogroute";
import Navbar from "@/Components/layout/Navbar";
import Footer from "@/Components/layout/Footer";
import Userroutes from "./Userroutes";
import PublicCertificate from "@/Admin/Pages/Certificate/PublicCertificate";
import CertificateSearch from "@/Components/CertificateSearch/CertificateSearch";
const LandingPage = lazy(
  () => import("@/Landing/Chennaibankingjobs/Chennaibankingjobs"),
);
const ApplicationSuccess = lazy(
  () => import("@/Landing/Chennaibankingjobs/ApplicationSuccess"),
);

// Fallback Loader Component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-white">
    <Loader2 className="w-10 h-10 text-violet-600 animate-spin" />
  </div>
);

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

      {/* ✅ NEW: Public Certificate Route
        - This is outside any Layout, so NO Navbar/Footer will show.
        - accessible to anyone (no login required).
      */}
      <Route path="/verify-certificate/:id" element={<PublicCertificate />} />
      <Route path="/verification" element={<CertificateSearch />} />
      <Route
        path="/chennai-banking-jobs"
        element={
          <Suspense fallback={<PageLoader />}>
            <LandingPage />
          </Suspense>
        }
      />
      <Route
        path="/application-success"
        element={
          <Suspense fallback={<PageLoader />}>
            <ApplicationSuccess />
          </Suspense>
        }
      />

      {/* Auth Route (Login/Register) */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Navbar />
            <Login />
            <Footer />
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
      <Route
        path="/admin/*"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <Adminroutes />
          </PrivateRoute>
        }
      />

      {/* Catch all (Optional: Be careful with this overriding specific routes) */}
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
