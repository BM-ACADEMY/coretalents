import React, { useState, useEffect } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/Components/ui/table";
import { Card, CardContent } from "@/Components/ui/card";
import {
  Trash2, Eye, Plus, Loader2, Pencil, X, Search, Upload, CheckCircle, AlertTriangle
} from "lucide-react";
import { showToast } from "../../../utils/customToast";
import { motion, AnimatePresence } from "framer-motion";

const Certificate = () => {
  // --- STATE ---
  const [activeTab, setActiveTab] = useState("certificates");
  const [loading, setLoading] = useState(false);

  // Certificate Data
  const [certificates, setCertificates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Template Data
  const [templates, setTemplates] = useState([]);
   
  // Cert Modal State
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [editingCertId, setEditingCertId] = useState(null);
  const [isSubmittingCert, setIsSubmittingCert] = useState(false); // <--- NEW LOADING STATE
  const [certFormData, setCertFormData] = useState({
    studentName: "",
    courseName: "",
    issueDate: "",
    certificateNumber: "",
    templateId: "", 
  });

  // Template Modal State
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [editingTemplateId, setEditingTemplateId] = useState(null);
  const [templateFormData, setTemplateFormData] = useState({
    name: "",
    file: null,
    preview: ""
  });
  const [submittingTemplate, setSubmittingTemplate] = useState(false);

  // --- DELETE MODAL STATE ---
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConfig, setDeleteConfig] = useState({ id: null, type: null, name: "" }); // type: 'cert' | 'template'
  const [isDeleting, setIsDeleting] = useState(false);

  // --- FETCH DATA ---
  const fetchCertificates = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/certificates");
      if (res.data.success) setCertificates(res.data.data);
    } catch (error) {
      showToast("error", "Failed to fetch certificates");
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

  // --- TEMPLATE HANDLERS ---
  const openCreateTemplateModal = () => {
    setEditingTemplateId(null);
    setTemplateFormData({ name: "", file: null, preview: "" });
    setIsTemplateModalOpen(true);
  };

  const openEditTemplateModal = (template) => {
    setEditingTemplateId(template._id);
    setTemplateFormData({ 
      name: template.name, 
      file: null, 
      preview: template.imageUrl 
    });
    setIsTemplateModalOpen(true);
  };

  const handleTemplateFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTemplateFormData({
        ...templateFormData,
        file: file,
        preview: URL.createObjectURL(file)
      });
    }
  };

  const removeSelectedImage = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (editingTemplateId) {
       const original = templates.find(t => t._id === editingTemplateId);
       setTemplateFormData({
          ...templateFormData,
          file: null,
          preview: original ? original.imageUrl : ""
       });
    } else {
       setTemplateFormData({
          ...templateFormData,
          file: null,
          preview: ""
       });
    }
  };

  const handleTemplateSubmit = async (e) => {
    e.preventDefault();
    if (!templateFormData.name) {
      return showToast("warn", "Template name is required");
    }
    if (!editingTemplateId && !templateFormData.file) {
      return showToast("warn", "Please select an image");
    }

    const form = new FormData();
    form.append("name", templateFormData.name);
    if (templateFormData.file) {
      form.append("image", templateFormData.file);
    }

    try {
      setSubmittingTemplate(true);
      if (editingTemplateId) {
        await axiosInstance.put(`/certificates/templates/${editingTemplateId}`, form, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        showToast("success", "Template updated successfully");
      } else {
        await axiosInstance.post("/certificates/templates", form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        showToast("success", "Template created successfully");
      }
      setIsTemplateModalOpen(false);
      fetchTemplates();
    } catch (error) {
      showToast("error", error.response?.data?.message || "Operation failed");
    } finally {
      setSubmittingTemplate(false);
    }
  };

  // Trigger Delete Modal for Template
  const handleDeleteTemplateClick = (temp) => {
    setDeleteConfig({ 
      id: temp._id, 
      type: 'template', 
      name: temp.name 
    });
    setIsDeleteModalOpen(true);
  };

  // --- CERTIFICATE HANDLERS ---
   
  // 1. Fetch Next ID Logic
  const fetchNextCertId = async () => {
    try {
      const res = await axiosInstance.get("/certificates/next-id");
      if (res.data.success) {
        return res.data.nextId;
      }
    } catch (error) {
      console.error("Failed to fetch next ID", error);
    }
    return "CT"; // Fallback
  };

  const openCreateCertModal = async () => {
    setEditingCertId(null);
    const nextId = await fetchNextCertId();
     
    setCertFormData({
      studentName: "",
      courseName: "",
      issueDate: new Date().toISOString().split('T')[0],
      certificateNumber: nextId,
      templateId: templates.length > 0 ? templates[0]._id : "" 
    });
    setIsCertModalOpen(true);
  };

  const openEditCertModal = (cert) => {
    setEditingCertId(cert._id);
    setCertFormData({
      studentName: cert.studentName,
      courseName: cert.courseName,
      issueDate: new Date(cert.issueDate).toISOString().split('T')[0],
      certificateNumber: cert.certificateNumber || "",
      templateId: cert.templateId ? cert.templateId._id : "" 
    });
    setIsCertModalOpen(true);
  };

  const handleCertNumberChange = (e) => {
    const numericPart = e.target.value.replace(/[^0-9]/g, "");
    setCertFormData({
      ...certFormData, 
      certificateNumber: "CT" + numericPart
    });
  };

  const handleCertSubmit = async (e) => {
    e.preventDefault();
    if (!certFormData.studentName || !certFormData.courseName || !certFormData.issueDate || !certFormData.templateId) {
      showToast("warn", "Please fill in all fields and select a template.");
      return;
    }

    const payload = { ...certFormData };
    if (!payload.certificateNumber || payload.certificateNumber.trim() === "CT") {
      delete payload.certificateNumber;
    }

    try {
      setIsSubmittingCert(true); // Start Loading
      if (editingCertId) {
        await axiosInstance.put(`/certificates/${editingCertId}`, payload);
        showToast("success", "Certificate Updated!");
      } else {
        await axiosInstance.post("/certificates", payload);
        showToast("success", "Certificate Created!");
      }
      setIsCertModalOpen(false);
      fetchCertificates();
    } catch (error) {
      const msg = error.response?.data?.message || "Error saving certificate";
      showToast("error", msg);
    } finally {
      setIsSubmittingCert(false); // Stop Loading
    }
  };

  // Trigger Delete Modal for Certificate
  const handleDeleteCertClick = (cert) => {
    setDeleteConfig({ 
      id: cert._id, 
      type: 'cert', 
      name: `${cert.studentName} (${cert.certificateNumber})` 
    });
    setIsDeleteModalOpen(true);
  };

  // --- FINAL DELETE EXECUTION ---
  const handleConfirmDelete = async () => {
    if (!deleteConfig.id) return;
    
    setIsDeleting(true);
    try {
      if (deleteConfig.type === 'cert') {
        await axiosInstance.delete(`/certificates/${deleteConfig.id}`);
        showToast("success", "Certificate deleted successfully");
        fetchCertificates();
      } else if (deleteConfig.type === 'template') {
        await axiosInstance.delete(`/certificates/templates/${deleteConfig.id}`);
        showToast("success", "Template deleted successfully");
        fetchTemplates();
      }
      setIsDeleteModalOpen(false);
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to delete item";
      showToast("error", msg);
    } finally {
      setIsDeleting(false);
    }
  };

  // --- FILTER & PAGINATION ---
  const filteredCertificates = certificates.filter(cert =>
    cert.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.certificateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.courseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCertificates = filteredCertificates.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCertificates.length / itemsPerPage);

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
          <button onClick={() => setActiveTab("certificates")} className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === "certificates" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"}`}>Issued Certificates</button>
          <button onClick={() => setActiveTab("templates")} className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === "templates" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"}`}>Manage Templates</button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* === TAB 1: CERTIFICATES LIST === */}
        {activeTab === "certificates" && (
          <motion.div key="cert-tab" variants={tabVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
            <div className="flex justify-between">
               <div className="relative w-full max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                  <Input placeholder="Search by Name, ID or Course..." className="pl-9 bg-white" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
               </div>
               <Button onClick={openCreateCertModal} className="bg-slate-900 hover:bg-slate-800">
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
                                <Button variant="ghost" size="icon" onClick={() => window.open(`/verify-certificate/${cert._id}`, "_blank")}><Eye className="w-4 h-4 text-blue-600" /></Button>
                                <Button variant="ghost" size="icon" onClick={() => openEditCertModal(cert)}><Pencil className="w-4 h-4 text-amber-600" /></Button>
                                <Button variant="ghost" size="icon" onClick={() => handleDeleteCertClick(cert)}><Trash2 className="w-4 h-4 text-red-600" /></Button>
                              </div>
                           </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                 </Table>
              </CardContent>
            </Card>

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
          <motion.div key="temp-tab" variants={tabVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
             <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-slate-100">
                <div><h3 className="text-lg font-semibold text-slate-800">Template Gallery</h3><p className="text-sm text-slate-500">Upload and manage certificate backgrounds</p></div>
                <Button onClick={openCreateTemplateModal} className="bg-slate-900 hover:bg-slate-800"><Plus className="w-4 h-4 mr-2" /> Add Template</Button>
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {templates.map((temp) => (
                  <div key={temp._id} className="group relative bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-all flex flex-col">
                     <div className="aspect-[1.414/1] bg-slate-100 relative group overflow-hidden">
                        <img src={`${temp.imageUrl}?t=${new Date(temp.updatedAt).getTime()}`} alt="Template" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-black/50 md:opacity-0 opacity-100 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                           <Button variant="secondary" size="sm" onClick={() => openEditTemplateModal(temp)} className="bg-white/90 hover:bg-white text-slate-900"><Pencil className="w-4 h-4" /></Button>
                           <Button variant="destructive" size="sm" onClick={() => handleDeleteTemplateClick(temp)}><Trash2 className="w-4 h-4" /></Button>
                        </div>
                     </div>
                     <div className="p-3 border-t bg-white flex justify-between items-center">
                        <div className="truncate pr-2"><p className="text-sm font-medium text-slate-800 truncate" title={temp.name}>{temp.name}</p><p className="text-xs text-slate-400">{new Date(temp.createdAt).toLocaleDateString()}</p></div>
                     </div>
                  </div>
                ))}
             </div>
             {templates.length === 0 && <div className="text-center py-20 text-slate-400 bg-slate-100 rounded-xl border-dashed border-2">No templates found. Add one to get started.</div>}
          </motion.div>
        )}
      </AnimatePresence>

      {/* === MODAL 1: ISSUE/EDIT CERTIFICATE === */}
      <AnimatePresence>
        {isCertModalOpen && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]" initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}>
              <div className="flex justify-between items-center p-6 border-b"><h2 className="text-xl font-bold">{editingCertId ? "Edit Certificate" : "Issue New Certificate"}</h2><Button variant="ghost" size="icon" onClick={() => setIsCertModalOpen(false)}><X className="w-5 h-5"/></Button></div>

              <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
                 <div className="space-y-4">
                    <div className="space-y-2"><Label>Student Name</Label><Input name="studentName" placeholder="Enter student name" value={certFormData.studentName} onChange={(e) => setCertFormData({...certFormData, studentName: e.target.value})} /></div>
                    <div className="space-y-2"><Label>Course Name</Label><Input name="courseName" placeholder="Enter course name" value={certFormData.courseName} onChange={(e) => setCertFormData({...certFormData, courseName: e.target.value})} /></div>
                    <div className="space-y-2"><Label>Issue Date</Label><Input type="date" name="issueDate" value={certFormData.issueDate} onChange={(e) => setCertFormData({...certFormData, issueDate: e.target.value})} /></div>
                    <div className="space-y-2">
                        <Label>Certificate ID</Label>
                        <Input 
                          name="certificateNumber" 
                          value={certFormData.certificateNumber} 
                          onChange={handleCertNumberChange} 
                          placeholder="CT2026..." 
                        />
                    </div>
                 </div>

                 <div className="space-y-3">
                    <Label>Select Background Template</Label>
                    <div className="grid grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-2">
                        {templates.map(temp => (
                          <div key={temp._id} onClick={() => setCertFormData({...certFormData, templateId: temp._id})} className={`relative cursor-pointer rounded-lg border-2 overflow-hidden transition-all aspect-[1.4/1] ${certFormData.templateId === temp._id ? "border-green-500 ring-2 ring-green-500/20" : "border-slate-200 hover:border-slate-400"}`}>
                             <img src={`${temp.imageUrl}?t=${new Date(temp.updatedAt).getTime()}`} alt="Select" className="w-full h-full object-cover" />
                             {certFormData.templateId === temp._id && (<div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1 shadow-md"><CheckCircle className="w-4 h-4" /></div>)}
                             <div className="absolute bottom-0 inset-x-0 bg-black/50 text-white text-[10px] p-1 truncate text-center">{temp.name}</div>
                          </div>
                        ))}
                    </div>
                 </div>
              </div>

              <div className="p-6 border-t bg-slate-50 flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsCertModalOpen(false)}>Cancel</Button>
                <Button onClick={handleCertSubmit} disabled={isSubmittingCert} className="bg-slate-900 text-white hover:bg-slate-800">
                  {isSubmittingCert && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {editingCertId ? "Update" : "Generate"}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* === MODAL 2: ADD/EDIT TEMPLATE === */}
      <AnimatePresence>
        {isTemplateModalOpen && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col" initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}>
              <div className="flex justify-between items-center p-5 border-b"><h2 className="text-lg font-bold">{editingTemplateId ? "Edit Template" : "Add New Template"}</h2><Button variant="ghost" size="icon" onClick={() => setIsTemplateModalOpen(false)}><X className="w-5 h-5"/></Button></div>

              <div className="p-6 space-y-4">
                 <div className="space-y-2"><Label>Template Name</Label><Input placeholder="e.g. Modern Blue Design" value={templateFormData.name} onChange={(e) => setTemplateFormData({...templateFormData, name: e.target.value})} /></div>
                 <div className="space-y-2"><Label>Upload Image (JPG/PNG)</Label>
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 transition-colors relative">
                       <input type="file" accept="image/*" onChange={handleTemplateFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-0" />
                       {templateFormData.preview ? (
                         <div className="relative w-full aspect-video rounded-md overflow-hidden bg-slate-100 group z-10">
                           <img src={templateFormData.preview} alt="Preview" className="w-full h-full object-contain" />
                           {templateFormData.file && (<button onClick={removeSelectedImage} className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-all z-50" title="Remove selected image" type="button"><X className="w-4 h-4" /></button>)}
                         </div>
                       ) : (<div className="py-4"><Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" /><span className="text-sm text-slate-500">Click to upload image</span></div>)}
                    </div>
                    {editingTemplateId && <p className="text-xs text-slate-400">Leave image empty to keep current background.</p>}
                 </div>
              </div>

              <div className="p-5 border-t bg-slate-50 flex justify-end gap-3"><Button variant="outline" onClick={() => setIsTemplateModalOpen(false)}>Cancel</Button><Button onClick={handleTemplateSubmit} disabled={submittingTemplate} className="bg-slate-900 text-white hover:bg-slate-800">{submittingTemplate && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}{editingTemplateId ? "Save Changes" : "Upload Template"}</Button></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* === MODAL 3: DELETE CONFIRMATION === */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <motion.div 
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
              initial={{ scale: 0.95, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.95, opacity: 0 }}
            >
              {/* Content Section */}
              <div className="p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Delete {deleteConfig.type === 'cert' ? 'Certificate' : 'Template'}?</h3>
                <p className="text-slate-500 mt-2 text-sm leading-relaxed">
                  Are you sure you want to delete <span className="font-semibold text-slate-700">"{deleteConfig.name}"</span>? 
                  <br/>This action is permanent and cannot be undone.
                </p>
              </div>

              {/* Action Buttons Section */}
              <div className="flex gap-3 p-4 border-t bg-slate-50">
                <Button 
                  variant="outline" 
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="flex-1 py-6 border-slate-200 text-slate-600 hover:bg-white"
                >
                  Cancel
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={handleConfirmDelete} 
                  disabled={isDeleting}
                  className="flex-1 py-6 bg-red-600 hover:bg-red-700 shadow-sm"
                >
                  {isDeleting ? <Loader2 className="w-4 h-4 animate-spin mr-2"/> : "Delete"}
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