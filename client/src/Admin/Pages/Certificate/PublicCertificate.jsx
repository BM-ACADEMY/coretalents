import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "@/api/axiosInstance";
import { Button } from "@/Components/ui/button";
import { Loader2, Download } from "lucide-react";
import jsPDF from "jspdf";
import { toPng } from "html-to-image";
import { showToast } from "@/utils/customToast";

const PublicCertificate = () => {
  const { id } = useParams();
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const printRef = useRef();

  useEffect(() => {
    // Load Fonts
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    const fetchCertificate = async () => {
      try {
        const res = await axiosInstance.get(`/certificates/${id}`);
        if (res.data.success) {
          setCertificate(res.data.data);
        }
      } catch (error) {
        showToast("error", "Certificate not found.");
      } finally {
        setLoading(false);
      }
    };
    fetchCertificate();
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleDownloadPDF = async () => {
    const element = printRef.current;
    if (!element) return;
    try {
      setDownloading(true);
      if (document.fonts && document.fonts.ready) await document.fonts.ready;
      await new Promise((resolve) => setTimeout(resolve, 500));
      const dataUrl = await toPng(element, { cacheBust: true, pixelRatio: 2, backgroundColor: "#ffffff" });
      const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
      pdf.addImage(dataUrl, "PNG", 0, 0, 297, 210);
      pdf.save(`${certificate.studentName}_Certificate.pdf`);
      showToast("success", "Downloaded Successfully!");
    } catch (error) {
      console.error("PDF Error:", error);
      showToast("error", "Download failed");
    } finally {
      setDownloading(false);
    }
  };

  // --- DYNAMIC CONTENT RENDERER ---
  const renderDynamicContent = () => {
    if (!certificate || !certificate.contentId) return null;

    const text = certificate.contentId.bodyText || "";

    // Split by placeholders
    const parts = text.split(/({studentName}|{courseName}|{date}|{certNumber})/g);

    return parts.map((part, index) => {
      // Styles
      const commonStyle = { fontWeight: "bold", margin: "0 0.5rem", color: "#000000" };
      const serifStyle = { ...commonStyle, fontFamily: "'Playfair Display', serif" };

      if (part === "{studentName}") {
        return <span key={index} style={{ ...serifStyle, fontSize: "28px", display: "inline-block" }}>{certificate.studentName}</span>;
      }
      if (part === "{courseName}") {
        return <span key={index} style={serifStyle}>“{certificate.courseName}”</span>;
      }
      if (part === "{date}") {
        return <span key={index} style={commonStyle}>{formatDate(certificate.issueDate)}</span>;
      }
      if (part === "{certNumber}") {
        return <span key={index} style={commonStyle}>{certificate.certificateNumber}</span>;
      }
      return <span key={index}>{part}</span>;
    });
  };

  if (loading) return <div className="h-screen flex items-center justify-center bg-slate-900"><Loader2 className="w-10 h-10 text-white animate-spin" /></div>;
  if (!certificate) return <div className="h-screen flex items-center justify-center text-white bg-slate-900">Certificate not found.</div>;

  // Check type (regular or special)
  const contentType = certificate.contentId?.type || 'regular';

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 overflow-auto">
      <div className="relative shadow-2xl origin-center transition-transform duration-300 ease-in-out scale-[0.5] md:scale-[0.8] xl:scale-100">
        <div ref={printRef} style={{ width: "1123px", height: "794px", minWidth: "1123px", minHeight: "794px", fontFamily: "'Lato', sans-serif", backgroundColor: "#ffffff", position: "relative", overflow: "hidden" }}>

          {/* Background Image */}
          {certificate.templateId ? (
            <img src={certificate.templateId.imageUrl} alt="Background" crossOrigin="anonymous" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }} />
          ) : (
            <div style={{ position: "absolute", inset: 0, backgroundColor: "#e5e7eb", display: "flex", alignItems: "center", justifyContent: "center", color: "#6b7280", zIndex: 0 }}>Template Not Found</div>
          )}

          {/* ================================================================================== */}
          {/* UNIFIED LAYOUT (Regular & Special share the same structure)                       */}
          {/* ================================================================================== */}

          {/* 1. Top Right Section: Certificate Number (& Date if Special) */}
          <div style={{ position: "absolute", top: "29%", right: "440px", textAlign: "right", zIndex: 10 }}>
            {/* Certificate Number (Always Visible) */}
            <p style={{ fontSize: "16px", fontWeight: "bold", color: "#374151", margin: 0 }}>
              Certificate No: {certificate.certificateNumber}
            </p>

            {/* Issue Date (Only for Special Type) */}
            {contentType === 'special' && (
              <p style={{ fontSize: "16px", fontWeight: "bold", color: "#374151", margin: "5px 10px 0 0" }}>
                Issue Date: {formatDate(certificate.issueDate)}
              </p>
            )}
          </div>

          {/* 2. Main Content Section (Same Alignment for Both) */}
          <div style={{ position: "relative", zIndex: 10, width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "6rem 8rem 0", textAlign: "center" }}>
             <p style={{ fontSize: "25px", lineHeight: "3.1rem", fontWeight: "500", color: "#374151", margin: 0, width: "100%" }}>
               {renderDynamicContent()}
             </p>

             {/* Sub Text (Optional Footer Message) */}
             {certificate.contentId?.subText && (
               <p style={{ fontSize: "22px", marginTop: "2rem", fontWeight: "500", color: "#374151" }}>
                 {certificate.contentId.subText}
               </p>
             )}
          </div>

        </div>
      </div>

      <div className="fixed bottom-8 z-50">
        <Button onClick={handleDownloadPDF} disabled={downloading} className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg shadow-2xl rounded-full">
          {downloading ? <Loader2 className="animate-spin mr-2" /> : <Download className="mr-2 h-5 w-5" />} Download PDF
        </Button>
      </div>
    </div>
  );
};

export default PublicCertificate;
