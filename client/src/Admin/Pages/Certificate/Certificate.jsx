import React, { useState, useEffect } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { Card, CardContent } from "@/Components/ui/card";
import { Trash2, Eye, Plus, Loader2, Pencil, X, Search, CheckCircle, AlertTriangle } from "lucide-react";
import { showToast } from "../../../utils/customToast";
import { motion, AnimatePresence } from "framer-motion";

const Certificate = () => {
  const [activeTab, setActiveTab] = useState("certificates");
  const [loading, setLoading] = useState(false);

  const [certificates, setCertificates] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [contents, setContents] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Certificate Modal
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [editingCertId, setEditingCertId] = useState(null);
  const [isSubmittingCert, setIsSubmittingCert] = useState(false);
  const [certFormData, setCertFormData] = useState({
    studentName: "",
    courseName: "",
    issueDate: "",
    certificateNumber: "",
    templateId: "",
    contentId: ""
  });

  // Template Modal
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [editingTemplateId, setEditingTemplateId] = useState(null);
  const [templateFormData, setTemplateFormData] = useState({
    name: "",
    file: null,
    preview: ""
  });
  const [submittingTemplate, setSubmittingTemplate] = useState(false);

  // Content Modal
  const [isContentModalOpen, setIsContentModalOpen] = useState(false);
  const [editingContentId, setEditingContentId] = useState(null);
  const [contentFormData, setContentFormData] = useState({
    name: "",
    type: "regular",
    bodyText: "This is to certify that {studentName} has actively participated in the {courseName} Workshop Conducted on {date} Organised by Core Talents.",
    subText: "Your enthusiasm, dedication and involvement throughout the session are sincerely appreciated."
  });
  const [submittingContent, setSubmittingContent] = useState(false);

  // Delete Modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConfig, setDeleteConfig] = useState({ id: null, type: null, name: "" });
  const [isDeleting, setIsDeleting] = useState(false);

  // FETCH ALL DATA
  const fetchData = async () => {
    setLoading(true);
    try {
      const [certRes, tempRes, contRes] = await Promise.all([
        axiosInstance.get("/certificates"),
        axiosInstance.get("/certificates/templates"),
        axiosInstance.get("/certificate-content")
      ]);
      setCertificates(certRes.data.success ? certRes.data.data : []);
      setTemplates(tempRes.data.success ? tempRes.data.data : []);
      setContents(contRes.data.success ? contRes.data.data : []);
    } catch (error) {
      showToast("error", "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ── TEMPLATE HANDLERS ────────────────────────────────────────────────
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
      preview: template.imageUrl || ""
    });
    setIsTemplateModalOpen(true);
  };

  const handleTemplateFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setTemplateFormData({
        ...templateFormData,
        file,
        preview: URL.createObjectURL(file)
      });
    }
  };

  const handleTemplateSubmit = async (e) => {
    e.preventDefault();
    if (!templateFormData.name) return showToast("warn", "Template name is required");

    if (!editingTemplateId && !templateFormData.file) {
      return showToast("warn", "Please select an image for new template");
    }

    const formData = new FormData();
    formData.append("name", templateFormData.name);
    if (templateFormData.file) {
      formData.append("image", templateFormData.file);
    }

    setSubmittingTemplate(true);
    try {
      if (editingTemplateId) {
        await axiosInstance.put(`/certificates/templates/${editingTemplateId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        showToast("success", "Template updated");
      } else {
        await axiosInstance.post("/certificates/templates", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        showToast("success", "Template created");
      }

      setIsTemplateModalOpen(false);
      const res = await axiosInstance.get("/certificates/templates");
      setTemplates(res.data.data || []);
    } catch (err) {
      showToast("error", err.response?.data?.message || "Operation failed");
    } finally {
      setSubmittingTemplate(false);
    }
  };

  // ── TEMPLATE DELETE PROTECTION ───────────────────────────────────────
  const getTemplateUsageCount = (templateId) => {
    return certificates.filter(c => c.templateId?._id === templateId).length;
  };

  // ── CONTENT HANDLERS ─────────────────────────────────────────────────
  const openCreateContentModal = () => {
    setEditingContentId(null);
    setContentFormData({
      name: "",
      type: "regular",
      bodyText: "This is to certify that {studentName} has actively participated in the “{courseName}” Workshop Conducted on {date} Organised by Core Talents.",
      subText: "Your enthusiasm, dedication and involvement throughout the session are sincerely appreciated."
    });
    setIsContentModalOpen(true);
  };

  const openEditContentModal = (content) => {
    setEditingContentId(content._id);
    setContentFormData({
      name: content.name,
      type: content.type,
      bodyText: content.bodyText,
      subText: content.subText || ""
    });
    setIsContentModalOpen(true);
  };

  const handleContentSubmit = async () => {
    if (!contentFormData.name.trim() || !contentFormData.bodyText.trim()) {
      return showToast("warn", "Name and Body Text are required");
    }

    setSubmittingContent(true);
    try {
      if (editingContentId) {
        await axiosInstance.put(`/certificate-content/${editingContentId}`, contentFormData);
        showToast("success", "Content updated");
      } else {
        await axiosInstance.post("/certificate-content", contentFormData);
        showToast("success", "Content created");
      }
      setIsContentModalOpen(false);
      const res = await axiosInstance.get("/certificate-content");
      setContents(res.data.data || []);
    } catch (err) {
      showToast("error", err.response?.data?.message || "Failed");
    } finally {
      setSubmittingContent(false);
    }
  };

  // ── CERTIFICATE HANDLERS ─────────────────────────────────────────────
  const openCreateCertModal = async () => {
    let nextId = "CT-0001";
    try {
      const res = await axiosInstance.get("/certificates/next-id");
      if (res.data.success) nextId = res.data.nextId;
    } catch {}

    setEditingCertId(null);
    setCertFormData({
      studentName: "",
      courseName: "",
      issueDate: new Date().toISOString().split("T")[0],
      certificateNumber: nextId,
      templateId: templates[0]?._id || "",
      contentId: contents[0]?._id || ""
    });
    setIsCertModalOpen(true);
  };

  const handleCertSubmit = async () => {
    if (!certFormData.templateId || !certFormData.contentId) {
      return showToast("warn", "Please select both template and content");
    }

    setIsSubmittingCert(true);
    try {
      if (editingCertId) {
        await axiosInstance.put(`/certificates/${editingCertId}`, certFormData);
      } else {
        await axiosInstance.post("/certificates", certFormData);
      }
      showToast("success", "Certificate saved");
      setIsCertModalOpen(false);
      const res = await axiosInstance.get("/certificates");
      setCertificates(res.data.data || []);
    } catch (err) {
      showToast("error", err.response?.data?.message || "Failed");
    } finally {
      setIsSubmittingCert(false);
    }
  };

  // ── DELETE HANDLER ───────────────────────────────────────────────────
  const handleConfirmDelete = async () => {
    if (!deleteConfig.id) return;

    if (deleteConfig.type === "template") {
      const usage = getTemplateUsageCount(deleteConfig.id);
      if (usage > 0) {
        showToast(
          "error",
          `Cannot delete — this template is used in ${usage} certificate${usage > 1 ? "s" : ""}.`
        );
        setIsDeleteModalOpen(false);
        return;
      }
    }

    setIsDeleting(true);
    try {
      let url = "";
      if (deleteConfig.type === "cert") url = `/certificates/${deleteConfig.id}`;
      if (deleteConfig.type === "template") url = `/certificates/templates/${deleteConfig.id}`;
      if (deleteConfig.type === "content") url = `/certificate-content/${deleteConfig.id}`;

      await axiosInstance.delete(url);
      showToast("success", "Deleted successfully");
      fetchData();
    } catch (err) {
      showToast("error", "Delete failed");
    } finally {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
    }
  };

  // ── FILTER & PAGINATION ──────────────────────────────────────────────
  const filteredCertificates = certificates.filter(
    (c) =>
      c.studentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.certificateNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentCertificates = filteredCertificates.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6 md:p-10 space-y-8 bg-slate-50 min-h-screen">
      {/* HEADER + TABS */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Certificates</h1>
          <p className="text-slate-500 mt-1">Manage templates, content layouts & issued certificates</p>
        </div>
        <div className="flex bg-slate-200 rounded-lg p-1">
          {["certificates", "templates", "content"].map((tab) => (

            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 text-sm font-medium rounded transition-all ${
                activeTab === tab
                  ? "bg-white shadow-sm text-slate-900"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {tab === "certificates" ? "Issued" : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* CERTIFICATES TAB */}
        {activeTab === "certificates" && (
          <motion.div
            key="certs"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="space-y-6"
          >
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="relative max-w-sm w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search student or certificate ID..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
              <Button onClick={openCreateCertModal} className="bg-slate-900 hover:bg-slate-800">
                <Plus className="w-4 h-4 mr-2" /> Issue Certificate
              </Button>
            </div>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-slate-100">
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Student</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentCertificates.map((cert) => (
                      <TableRow key={cert._id}>
                        <TableCell className="font-mono text-xs">{cert.certificateNumber}</TableCell>
                        <TableCell className="font-medium">{cert.studentName}</TableCell>
                        <TableCell>{cert.courseName}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                              cert.contentId?.type === "special"
                                ? "bg-purple-100 text-purple-700"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {cert.contentId?.type || "—"}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => window.open(`/verify-certificate/${cert._id}`, "_blank")}
                            >
                              <Eye className="h-4 w-4 text-blue-600" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setEditingCertId(cert._id);
                                setCertFormData({
                                  ...cert,
                                  issueDate: new Date(cert.issueDate).toISOString().split("T")[0],
                                  templateId: cert.templateId?._id || "",
                                  contentId: cert.contentId?._id || ""
                                });
                                setIsCertModalOpen(true);
                              }}
                            >
                              <Pencil className="h-4 w-4 text-amber-600" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setDeleteConfig({
                                  id: cert._id,
                                  type: "cert",
                                  name: cert.studentName
                                });
                                setIsDeleteModalOpen(true);
                              }}
                            >
                              <Trash2 className="h-4 w-4 text-red-600" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {currentCertificates.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-slate-500">
                          No certificates found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* TEMPLATES TAB */}
        {activeTab === "templates" && (
          <motion.div
            key="templates"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center bg-white p-5 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold">Certificate Backgrounds</h3>
              <Button onClick={openCreateTemplateModal}>
                <Plus className="w-4 h-4 mr-2" /> Add Template
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {templates.map((temp) => (
                <div
                  key={temp._id}
                  className="group bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative aspect-[1.414/1]">
                    <img
                      src={temp.imageUrl}
                      alt={temp.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => openEditTemplateModal(temp)}
                      >
                        <Pencil className="w-4 h-4 mr-1" /> Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => {
                          setDeleteConfig({
                            id: temp._id,
                            type: "template",
                            name: temp.name
                          });
                          setIsDeleteModalOpen(true);
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-4 text-center font-medium">{temp.name}</div>
                </div>
              ))}

              {templates.length === 0 && (
                <div className="col-span-full text-center py-12 text-slate-500">
                  No templates yet. Add your first background.
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* CONTENT TAB */}
        {activeTab === "content" && (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center bg-white p-5 rounded-xl shadow-sm">
              <div>
                <h3 className="text-xl font-semibold">Text Layouts</h3>
                <p className="text-sm text-slate-500 mt-1">
                  Define certificate message structures
                </p>
              </div>
              <Button onClick={openCreateContentModal}>
                <Plus className="w-4 h-4 mr-2" /> New Layout
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contents.map((content) => (
                <Card key={content._id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h4 className="font-bold text-lg">{content.name}</h4>
                        <span
                          className={`inline-block mt-2 px-3 py-1 text-xs rounded-full ${
                            content.type === "special"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {content.type}
                        </span>
                      </div>
                      <div className="flex gap-1 shrink-0">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditContentModal(content)}
                        >
                          <Pencil className="h-4 w-4 text-amber-600" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setDeleteConfig({
                              id: content._id,
                              type: "content",
                              name: content.name
                            });
                            setIsDeleteModalOpen(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-lg text-sm text-slate-700 italic border">
                      {content.bodyText}
                    </div>
                    {content.subText && (
                      <p className="text-sm text-slate-500 pt-2 border-t">
                        {content.subText}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}

              {contents.length === 0 && (
                <div className="col-span-full text-center py-12 text-slate-500">
                  No content layouts yet. Create your first one.
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── TEMPLATE MODAL ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isTemplateModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 space-y-6"
              initial={{ scale: 0.94, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 20 }}
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">
                  {editingTemplateId ? "Edit Template" : "New Template"}
                </h2>
                <Button variant="ghost" size="icon" onClick={() => setIsTemplateModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="space-y-5">
                <div>
                  <Label>Name *</Label>
                  <Input
                    value={templateFormData.name}
                    onChange={(e) =>
                      setTemplateFormData({ ...templateFormData, name: e.target.value })
                    }
                    placeholder="e.g. Modern Blue Certificate"
                  />
                </div>

                <div>
                  <Label>Background Image</Label>

                  {(templateFormData.preview || templateFormData.file) && (
                    <div className="mt-3 border rounded-xl overflow-hidden shadow-sm">
                      <img
                        src={
                          templateFormData.file
                            ? URL.createObjectURL(templateFormData.file)
                            : templateFormData.preview
                        }
                        alt="Preview"
                        className="w-full h-auto aspect-[1.414/1] object-cover"
                      />
                    </div>
                  )}

                  <div className="mt-4">
                    <Input
                      type="file"
                      accept="image/png,image/jpeg"
                      onChange={handleTemplateFileChange}
                    />
                    <p className="text-xs text-slate-500 mt-2">
                      {editingTemplateId
                        ? "Leave blank to keep current background"
                        : "Recommended: 2480×3508 px (A4 @ 300dpi)"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setIsTemplateModalOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleTemplateSubmit}
                  disabled={submittingTemplate || !templateFormData.name.trim()}
                >
                  {submittingTemplate && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {editingTemplateId ? "Update Template" : "Create Template"}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── CERTIFICATE ISSUE / EDIT MODAL ─────────────────────────────────── */}
      <AnimatePresence>
        {isCertModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
              initial={{ scale: 0.94 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.94 }}
            >
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-2xl font-bold">
                  {editingCertId ? "Edit Certificate" : "Issue New Certificate"}
                </h2>
                <Button variant="ghost" size="icon" onClick={() => setIsCertModalOpen(false)}>
                  <X className="h-6 w-6" />
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Details */}
                <div className="space-y-5">
                  <div>
                    <Label>Student Name *</Label>
                    <Input
                      value={certFormData.studentName}
                      onChange={(e) =>
                        setCertFormData({ ...certFormData, studentName: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label>Course / Program Name *</Label>
                    <Input
                      value={certFormData.courseName}
                      onChange={(e) =>
                        setCertFormData({ ...certFormData, courseName: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label>Issue Date *</Label>
                    <Input
                      type="date"
                      value={certFormData.issueDate}
                      onChange={(e) =>
                        setCertFormData({ ...certFormData, issueDate: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label>Certificate Number</Label>
                    <Input
                      value={certFormData.certificateNumber}
                      onChange={(e) =>
                        setCertFormData({ ...certFormData, certificateNumber: e.target.value })
                      }
                    />
                  </div>
                </div>

                {/* Right Column - Template & Content */}
                <div className="space-y-6">
                  <div>
                    <Label className="mb-2 block">Text Layout</Label>
                    <Select
                      value={certFormData.contentId}
                      onValueChange={(val) =>
                        setCertFormData({ ...certFormData, contentId: val })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select message layout" />
                      </SelectTrigger>
                      <SelectContent>
                        {contents.map((c) => (
                          <SelectItem key={c._id} value={c._id}>
                            {c.name} ({c.type})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="mb-2 block">Background Template</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-80 overflow-y-auto pr-2">
                      {templates.map((temp) => (
                        <div
                          key={temp._id}
                          onClick={() =>
                            setCertFormData({ ...certFormData, templateId: temp._id })
                          }
                          className={`relative rounded-xl overflow-hidden border-2 cursor-pointer transition-all hover:scale-105 ${
                            certFormData.templateId === temp._id
                              ? "border-green-500 shadow-lg"
                              : "border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <img
                            src={temp.imageUrl}
                            alt={temp.name}
                            className="w-full aspect-[1.414/1] object-cover"
                          />
                          {certFormData.templateId === temp._id && (
                            <div className="absolute top-2 right-2 bg-green-600 text-white rounded-full p-1">
                              <CheckCircle className="h-5 w-5" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t bg-slate-50 flex justify-end gap-4">
                <Button variant="outline" onClick={() => setIsCertModalOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleCertSubmit}
                  disabled={isSubmittingCert}
                  className="bg-slate-900 hover:bg-slate-800"
                >
                  {isSubmittingCert && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Certificate
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── CONTENT MODAL ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isContentModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6 space-y-6"
              initial={{ scale: 0.94 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.94 }}
            >
              <h2 className="text-2xl font-bold">
                {editingContentId ? "Edit Text Layout" : "Create Text Layout"}
              </h2>

              <div className="space-y-5">
                <div>
                  <Label>Name *</Label>
                  <Input
                    value={contentFormData.name}
                    onChange={(e) =>
                      setContentFormData({ ...contentFormData, name: e.target.value })
                    }
                    placeholder="e.g. Standard Participation, Excellence Award"
                  />
                </div>

                <div>
                  <Label>Layout Type</Label>
                  <Select
                    value={contentFormData.type}
                    onValueChange={(val) =>
                      setContentFormData({ ...contentFormData, type: val })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="regular">Regular (date in body)</SelectItem>
                      <SelectItem value="special">Special (date prominent)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Main Body Text *</Label>
                  <p className="text-xs text-slate-500 mb-1.5">
                    Placeholders: <strong>{"{studentName}"}</strong>, <strong>{" {courseName} "}</strong>,{" "}
                    <strong>{"{date}"}</strong>, <strong>{"{certNumber}"}</strong>
                  </p>
                  <Textarea
                    value={contentFormData.bodyText}
                    onChange={(e) =>
                      setContentFormData({ ...contentFormData, bodyText: e.target.value })
                    }
                    className="min-h-[120px]"
                  />
                </div>

                <div>
                  <Label>Sub Text / Footer (optional)</Label>
                  <Textarea
                    value={contentFormData.subText}
                    onChange={(e) =>
                      setContentFormData({ ...contentFormData, subText: e.target.value })
                    }
                    placeholder="e.g. We wish you continued success..."
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setIsContentModalOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleContentSubmit}
                  disabled={submittingContent}
                >
                  {submittingContent && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Layout
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── DELETE CONFIRMATION ────────────────────────────────────────────── */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 text-center"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <AlertTriangle className="h-14 w-14 text-red-600 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-3">
                Delete {deleteConfig.type === "cert" ? "Certificate" : deleteConfig.type}?
              </h3>
              <p className="text-slate-600 mb-8">
                Are you sure you want to delete <strong>{deleteConfig.name}</strong>?
                {deleteConfig.type === "template" &&
                  " This action cannot be undone and may affect existing certificates."}
              </p>
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setIsDeleteModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  className="flex-1"
                  onClick={handleConfirmDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    "Yes, Delete"
                  )}
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
