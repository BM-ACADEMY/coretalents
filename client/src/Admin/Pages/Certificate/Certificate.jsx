import React, { useState, useEffect } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/Components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import {
  Trash2, Eye, Plus, Loader2, Pencil, X, Search, FileBadge,
  ChevronLeft, ChevronRight, Sparkles, Upload, Image as ImageIcon, CheckCircle
} from "lucide-react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const Certificate = () => {
  // --- STATE ---
  const [activeTab, setActiveTab] = useState("certificates"); // 'certificates' or 'templates'
  const [loading, setLoading] = useState(false);

  // Certificate Data
  const [certificates, setCertificates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Template Data
  const [templates, setTemplates] = useState([]);
  const [uploadingTemplate, setUploadingTemplate] = useState(false);

  // Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    studentName: "",
    courseName: "",
    issueDate: "",
    certificateNumber: "",
    templateUrl: "", // Stores selected template URL
  });

  // --- FETCH DATA ---
  const fetchCertificates = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/certificates");
      if (res.data.success) setCertificates(res.data.data);
    } catch (error) {
      toast.error("Failed to fetch certificates");
    } finally {
      setLoading(false);
    }
  };

  const fetchTemplates = async () => {
    try {
      const res = await axiosInstance.get("/certificates/templates");
      if (res.data.success) setTemplates(res.data.data);
    } catch (error) {
      console.error("Failed to fetch templates");
    }
  };

  useEffect(() => {
    fetchCertificates();
    fetchTemplates();
  }, []);

  // --- TEMPLATE MANAGEMENT ---
  const handleTemplateUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const form = new FormData();
    form.append("image", file);
    form.append("name", file.name.split('.')[0]); // Default name

    try {
      setUploadingTemplate(true);
      const res = await axiosInstance.post("/certificates/templates", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data.success) {
        toast.success("Template Uploaded!");
        fetchTemplates();
      }
    } catch (error) {
      toast.error("Upload failed");
    } finally {
      setUploadingTemplate(false);
    }
  };

  const handleDeleteTemplate = async (id) => {
    if (!window.confirm("Delete this template?")) return;
    try {
      await axiosInstance.delete(`/certificates/templates/${id}`);
      toast.success("Template deleted");
      fetchTemplates();
    } catch (error) {
      toast.error("Failed to delete template");
    }
  };

  // --- CERTIFICATE ACTIONS ---
  const openCreateModal = () => {
    setEditingId(null);
    setFormData({
      studentName: "",
      courseName: "",
      issueDate: "",
      certificateNumber: "",
      templateUrl: templates.length > 0 ? templates[0].imageUrl : "" // Default to first
    });
    setIsModalOpen(true);
  };

  const handleEdit = (cert) => {
    setEditingId(cert._id);
    setFormData({
      studentName: cert.studentName,
      courseName: cert.courseName,
      issueDate: new Date(cert.issueDate).toISOString().split('T')[0],
      certificateNumber: cert.certificateNumber || "",
      templateUrl: cert.templateUrl || ""
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.studentName || !formData.courseName || !formData.issueDate || !formData.templateUrl) {
      toast.error("Please fill in all fields and select a template.");
      return;
    }

    const payload = { ...formData };
    if (!payload.certificateNumber || payload.certificateNumber.trim() === "") {
      delete payload.certificateNumber;
    }

    try {
      let res;
      if (editingId) {
        res = await axiosInstance.put(`/certificates/${editingId}`, payload);
        if (res.data.success) toast.success("Certificate Updated!");
      } else {
        res = await axiosInstance.post("/certificates", payload);
        if (res.data.success) toast.success("Certificate Created!");
      }
      setIsModalOpen(false);
      fetchCertificates();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error saving certificate");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this certificate?")) return;
    try {
      await axiosInstance.delete(`/certificates/${id}`);
      toast.success("Deleted successfully");
      fetchCertificates();
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  // --- RENDER HELPERS ---
  const filteredCertificates = certificates.filter(cert =>
    cert.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.certificateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.courseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCertificates = filteredCertificates.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCertificates.length / itemsPerPage);

  // Framer Variants
  const tabVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10 }
  };

  return (
    <div className="p-6 md:p-10 space-y-8 bg-slate-50 min-h-screen font-sans">

      {/* Header & Tabs */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Certificates</h1>
          <p className="text-slate-500 mt-1">Manage templates and issue certificates.</p>
        </div>

        <div className="flex p-1 bg-slate-200 rounded-lg">
          <button
            onClick={() => setActiveTab("certificates")}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
              activeTab === "certificates" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Issued Certificates
          </button>
          <button
            onClick={() => setActiveTab("templates")}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
              activeTab === "templates" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Manage Templates
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">

        {/* === TAB 1: CERTIFICATES LIST === */}
        {activeTab === "certificates" && (
          <motion.div key="cert-tab" variants={tabVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
            <div className="flex justify-between">
               <div className="relative w-full max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                  <Input
                    placeholder="Search by Name, ID or Course..."
                    className="pl-9 bg-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
               </div>
               <Button onClick={openCreateModal} className="bg-slate-900 hover:bg-slate-800">
                  <Plus className="w-4 h-4 mr-2" /> Issue New
               </Button>
            </div>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-0">
                 <Table>
                    <TableHeader className="bg-slate-100">
                      <TableRow>
                        <TableHead>Certificate ID</TableHead>
                        <TableHead>Student</TableHead>
                        <TableHead>Course</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentCertificates.map((cert) => (
                        <TableRow key={cert._id} className="hover:bg-slate-50">
                           <TableCell className="font-mono text-xs">{cert.certificateNumber}</TableCell>
                           <TableCell className="font-medium">{cert.studentName}</TableCell>
                           <TableCell>{cert.courseName}</TableCell>
                           <TableCell>{new Date(cert.issueDate).toLocaleDateString('en-GB')}</TableCell>
                           <TableCell className="text-right">
                              <div className="flex justify-end gap-1">
                                <Button variant="ghost" size="icon" onClick={() => window.open(`/verify-certificate/${cert._id}`, "_blank")}>
                                  <Eye className="w-4 h-4 text-blue-600" />
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => handleEdit(cert)}>
                                  <Pencil className="w-4 h-4 text-amber-600" />
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => handleDelete(cert._id)}>
                                  <Trash2 className="w-4 h-4 text-red-600" />
                                </Button>
                              </div>
                           </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                 </Table>
              </CardContent>
            </Card>

            {/* Pagination Controls */}
             <div className="flex items-center justify-between pt-2">
                <div className="text-sm text-slate-500">Page {currentPage} of {totalPages}</div>
                <div className="space-x-2">
                  <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1}>Prev</Button>
                  <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === totalPages}>Next</Button>
                </div>
             </div>
          </motion.div>
        )}

        {/* === TAB 2: TEMPLATES GALLERY === */}
        {activeTab === "templates" && (
          <motion.div key="temp-tab" variants={tabVariants} initial="hidden" animate="visible" exit="exit">
             <Card className="border-dashed border-2 border-slate-300 bg-slate-50/50 mb-8">
                <CardContent className="flex flex-col items-center justify-center py-10 space-y-4">
                   <div className="bg-white p-4 rounded-full shadow-sm">
                      <ImageIcon className="w-8 h-8 text-slate-400" />
                   </div>
                   <div className="text-center">
                      <h3 className="text-lg font-medium text-slate-900">Upload New Template</h3>
                      <p className="text-sm text-slate-500">Upload blank certificate background (PNG/JPG)</p>
                   </div>
                   <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleTemplateUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        disabled={uploadingTemplate}
                      />
                      <Button disabled={uploadingTemplate}>
                        {uploadingTemplate ? <Loader2 className="animate-spin mr-2"/> : <Upload className="mr-2 w-4 h-4"/>}
                        Select Image
                      </Button>
                   </div>
                </CardContent>
             </Card>

             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {templates.map((temp) => (
                  <div key={temp._id} className="group relative bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-all">
                     <div className="aspect-[1.414/1] bg-slate-100 relative">
                        <img src={temp.imageUrl} alt="Template" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                           <Button variant="destructive" size="sm" onClick={() => handleDeleteTemplate(temp._id)}>
                              <Trash2 className="w-4 h-4 mr-2" /> Delete
                           </Button>
                        </div>
                     </div>
                     <div className="p-3 border-t">
                        <p className="text-sm font-medium truncate text-slate-700">{temp.name}</p>
                        <p className="text-xs text-slate-400">{new Date(temp.createdAt).toLocaleDateString()}</p>
                     </div>
                  </div>
                ))}
             </div>
             {templates.length === 0 && <p className="text-center text-slate-500 py-10">No templates found.</p>}
          </motion.div>
        )}

      </AnimatePresence>

      {/* === MODAL: ISSUE CERTIFICATE === */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
              initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
            >
              <div className="flex justify-between items-center p-6 border-b">
                 <h2 className="text-xl font-bold">{editingId ? "Edit Certificate" : "Issue New Certificate"}</h2>
                 <Button variant="ghost" size="icon" onClick={() => setIsModalOpen(false)}><X className="w-5 h-5"/></Button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
                 {/* Left: Form */}
                 <div className="space-y-4">
                    <div className="space-y-2">
                       <Label>Student Name</Label>
                       <Input name="studentName" value={formData.studentName} onChange={(e) => setFormData({...formData, studentName: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                       <Label>Course Name</Label>
                       <Input name="courseName" value={formData.courseName} onChange={(e) => setFormData({...formData, courseName: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                       <Label>Issue Date</Label>
                       <Input type="date" name="issueDate" value={formData.issueDate} onChange={(e) => setFormData({...formData, issueDate: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                       <Label>Certificate ID (Optional)</Label>
                       <Input name="certificateNumber" value={formData.certificateNumber} onChange={(e) => setFormData({...formData, certificateNumber: e.target.value})} placeholder="Auto-generated if empty" />
                    </div>
                 </div>

                 {/* Right: Template Selector */}
                 <div className="space-y-3">
                    <Label>Select Background Template</Label>
                    <div className="grid grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-2">
                       {templates.map(temp => (
                          <div
                            key={temp._id}
                            onClick={() => setFormData({...formData, templateUrl: temp.imageUrl})}
                            className={`relative cursor-pointer rounded-lg border-2 overflow-hidden transition-all aspect-[1.4/1] ${
                              formData.templateUrl === temp.imageUrl ? "border-green-500 ring-2 ring-green-500/20" : "border-slate-200 hover:border-slate-400"
                            }`}
                          >
                             <img src={temp.imageUrl} alt="Select" className="w-full h-full object-cover" />
                             {formData.templateUrl === temp.imageUrl && (
                                <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1 shadow-md">
                                   <CheckCircle className="w-4 h-4" />
                                </div>
                             )}
                          </div>
                       ))}
                    </div>
                    {templates.length === 0 && <p className="text-sm text-red-500">Please upload templates in the 'Manage Templates' tab first.</p>}
                 </div>
              </div>

              <div className="p-6 border-t bg-slate-50 flex justify-end gap-3">
                 <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                 <Button onClick={handleSubmit} className="bg-slate-900 text-white hover:bg-slate-800">
                    {editingId ? "Update" : "Generate"}
                 </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Certificate;
