import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "@/api/axiosInstance";
import { Button } from "@/Components/ui/button";
import { Loader2, Download } from "lucide-react";
import jsPDF from "jspdf";
import { toPng } from "html-to-image"; // ✅ Switched to html-to-image

// ✅ IMPORT CUSTOM TOAST
import { showToast } from "@/utils/customToast";

const PublicCertificate = () => {
  const { id } = useParams();
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const printRef = useRef();

  // Load Fonts
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
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

      // Wait for fonts to be ready
      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      }
      
      // Small delay to ensure images/fonts render fully
      await new Promise((resolve) => setTimeout(resolve, 500));

      // ✅ FIXED: Using toPng avoids the 'lab' color parsing error
      const dataUrl = await toPng(element, {
        cacheBust: true,
        pixelRatio: 2, // High resolution (equivalent to scale: 2)
        backgroundColor: "#ffffff",
      });

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      // A4 Dimensions: 297mm x 210mm
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

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center bg-slate-900">
        <Loader2 className="w-10 h-10 text-white animate-spin" />
      </div>
    );
  
  if (!certificate)
    return (
      <div className="h-screen flex items-center justify-center text-white bg-slate-900">
        Certificate not found.
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 overflow-auto">
      {/* SCALING CONTAINER */}
      <div className="relative shadow-2xl origin-center transition-transform duration-300 ease-in-out scale-[0.35] sm:scale-[0.5] md:scale-[0.7] lg:scale-[0.85] xl:scale-100">
        {/* CERTIFICATE CONTAINER */}
        <div
          ref={printRef}
          style={{
            width: "1123px",
            height: "794px",
            minWidth: "1123px",
            minHeight: "794px",
            fontFamily: "'Lato', sans-serif",
            backgroundColor: "#ffffff",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* ✅ CHECK IF TEMPLATE EXISTS */}
          {certificate.templateId ? (
            <img
              src={certificate.templateId.imageUrl}
              alt="Certificate Background"
              crossOrigin="anonymous"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                zIndex: 0,
              }}
            />
          ) : (
            // ✅ Manual style overrides to prevent Tailwind lab() color errors inside the print ref
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: "#e5e7eb", // Hex for gray-200
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#6b7280", // Hex for gray-500
                zIndex: 0,
              }}
            >
              Background Template Not Found
            </div>
          )}

          {/* Certificate Number */}
          <div
            style={{
              position: "absolute",
              top: "29%",
              right: "440px",
              textAlign: "right",
              zIndex: 10,
            }}
          >
            <p
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                color: "#374151",
                margin: 0,
              }}
            >
              Certificate No: {certificate.certificateNumber}
            </p>
          </div>

          {/* Content Layout */}
          <div
            style={{
              position: "relative",
              zIndex: 10,
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "6rem 8rem 0",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontSize: "25px",
                lineHeight: "3.1rem",
                fontWeight: "500",
                color: "#374151",
                margin: 0,
                width: "100%",
              }}
            >
              This is to certify that
              <span
                style={{
                  fontWeight: "bold",
                  fontSize: "28px",
                  marginLeft: "0.75rem",
                  marginRight: "0.75rem",
                  fontFamily: "'Playfair Display', serif",
                  color: "#000000",
                  display: "inline-block",
                }}
              >
                {certificate.studentName}
              </span>
              has actively participated in the
              <span
                style={{
                  fontWeight: "bold",
                  marginLeft: "0.5rem",
                  marginRight: "0.5rem",
                  fontFamily: "'Playfair Display', serif",
                  color: "#000000",
                }}
              >
                “{certificate.courseName}”
              </span>
              Workshop Conducted on
              <span
                style={{
                  fontWeight: "bold",
                  marginLeft: "0.5rem",
                  marginRight: "0.5rem",
                  color: "#000000",
                }}
              >
                {formatDate(certificate.issueDate)}
              </span>
              Organised by
              <span
                style={{
                  fontWeight: "bold",
                  marginLeft: "0.5rem",
                  color: "#000000",
                }}
              >
                Core Talents.
              </span>
            </p>
            <p
              style={{
                fontSize: "22px",
                marginTop: "2rem",
                fontWeight: "500",
                color: "#374151",
              }}
            >
              Your enthusiasm, dedication and involvement throughout the session are sincerely appreciated.
            </p>
          </div>
        </div>
      </div>

      {/* Floating Download Button */}
      <div className="fixed bottom-8 z-50">
        <Button
          onClick={handleDownloadPDF}
          disabled={downloading}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg shadow-2xl rounded-full border-2 border-green-400/20"
        >
          {downloading ? (
            <Loader2 className="animate-spin mr-2" />
          ) : (
            <Download className="mr-2 h-5 w-5" />
          )}
          Download PDF
        </Button>
      </div>
    </div>
  );
};

export default PublicCertificate;