import React, { useState, useEffect } from "react";
import axiosInstance from "@/api/axiosInstance.jsx";
import { showToast } from "@/utils/customToast.jsx";
import { useAuth } from "@/Context/Authcontext";
import {
  Type,
  List as ListIcon,
  Trash2,
  Plus,
  X,
  Image as ImageIcon,
  CheckCircle,
  Edit2,
  ChevronDown,
  ChevronUp,
  Save,
  Loader,
  Layers,
  Quote,
  Link,
  Circle,
  Upload,
  Layout,
  Star,
  ChevronRight,
  Square,
  Minus,
} from "lucide-react";
import BlogPreview from "./BlogPreview";

const BlogCreate = ({ switchToView, editingBlog }) => {
  const { user, loading: authLoading } = useAuth();

  // 1. ADD 'date' to State
  const [meta, setMeta] = useState({
    title: "",
    mainHeading: "",
    slug: "",
    description: "",
    tags: "",
    category: "",

    date: "", // New Date Field
    seo: {
      canonicalUrl: "",
      metaTitle: "",
      metaDescription: "",
      keywords: "",
      schema: { articleType: "Article", faq: [] },
      ga4MeasurementId: "",
      customScripts: "",
    },
    cta: {
      heading: "",
      description: "",
      buttonText: "",
      buttonUrl: "",
      enabled: true,
    },
    sidebar: {
      aboutTitle: "About Core Talents",
      aboutDescription: "",
      tags: "",
      consultationTitle: "Need a Consultation?",
      consultationText: "",
      consultationUrl: "",
      enabled: true,
    },
  });

  const [coverImage, setCoverImage] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);

  const [sections, setSections] = useState([
    { id: Date.now(), isCompleted: false, items: [] },
  ]);

  const [submitting, setSubmitting] = useState(false);
  const activeSectionIndex = sections.findIndex((s) => !s.isCompleted);
  const [activeSeoTab, setActiveSeoTab] = useState("general");

  useEffect(() => {
    if (!authLoading && !user)
      showToast("AuthenticationError: Login required", "error");
  }, [user, authLoading]);

  // --- POPULATE DATA FOR EDITING ---
  useEffect(() => {
    if (editingBlog) {
      setMeta({
        title: editingBlog.title || "",
        mainHeading: editingBlog.mainHeading || "",
        slug: editingBlog.slug || "",
        description: editingBlog.description || "",
        tags: Array.isArray(editingBlog.tags)
          ? editingBlog.tags.join(",")
          : editingBlog.tags || "",
        category: editingBlog.category || "",
        // Format Date for Input (YYYY-MM-DD)
        date: editingBlog.date
          ? new Date(editingBlog.date).toISOString().split("T")[0]
          : "",
        seo: editingBlog.seo
          ? {
            ...editingBlog.seo,
            keywords: Array.isArray(editingBlog.seo.keywords)
              ? editingBlog.seo.keywords.join(",")
              : editingBlog.seo.keywords || "",
          }
          : {
            canonicalUrl: "",
            metaTitle: "",
            metaDescription: "",
            keywords: "",
            schema: { articleType: "Article", faq: [] },
            ga4MeasurementId: "",
            customScripts: "",
          },
        cta: editingBlog.cta || {
          heading: "",
          description: "",
          buttonText: "",
          buttonUrl: "",
          enabled: true,
        },
        sidebar: editingBlog.sidebar
          ? {
            ...editingBlog.sidebar,
            tags: Array.isArray(editingBlog.sidebar.tags)
              ? editingBlog.sidebar.tags.join(",")
              : editingBlog.sidebar.tags || "",
          }
          : {
            aboutTitle: "About Core Talents",
            aboutDescription: "",
            tags: "",
            consultationTitle: "Need a Consultation?",
            consultationText: "",
            consultationUrl: "",
            enabled: true,
          },
      });

      if (editingBlog.coverImage && editingBlog.coverImage.url) {
        setCoverPreview(editingBlog.coverImage.url);
      }

      if (editingBlog.contentBlocks && editingBlog.contentBlocks.length > 0) {
        setSections([
          {
            id: Date.now(),
            isCompleted: false,
            items: editingBlog.contentBlocks,
          },
        ]);
      }
    }
  }, [editingBlog]);

  const handleMetaChange = (e) => {
    const { name, value } = e.target;
    setMeta((prev) => ({ ...prev, [name]: value }));
    if (name === "title" && !meta.slug && !editingBlog) {
      setMeta((prev) => ({
        ...prev,
        slug: value
          .toLowerCase()
          .replace(/ /g, "-")
          .replace(/[^\w-]+/g, ""),
      }));
    }
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  // ... (Standard Helpers: addItem, updateItem, etc. - No changes needed here) ...
  const addItemToSection = (type) => {
    const activeIdx = sections.findIndex((s) => !s.isCompleted);
    if (activeIdx === -1) return;
    let baseData = {};
    if (type === "list" || type === "checklist")
      baseData = { heading: "", items: [""], listType: type };
    else if (type === "quote") baseData = { text: "", author: "" };
    else if (type === "button")
      baseData = { text: "Click Me", url: "", style: "primary" };
    else if (type === "accordion")
      baseData = { title: "Accordion Title", content: "" };
    else if (type === "image") baseData = { text: "", url: "", alt: "" };
    else baseData = { text: "", url: "" };
    const newItem = {
      type: type === "checklist" ? "list" : type,
      data: baseData,
    };
    const newSections = [...sections];
    newSections[activeIdx].items.push(newItem);
    setSections(newSections);
  };

  const updateItemData = (sectionIdx, itemIdx, field, value) => {
    const newSections = [...sections];
    newSections[sectionIdx].items[itemIdx].data[field] = value;
    setSections(newSections);
  };

  const removeItem = (sectionIdx, itemIdx) => {
    const newSections = [...sections];
    newSections[sectionIdx].items = newSections[sectionIdx].items.filter(
      (_, i) => i !== itemIdx,
    );
    setSections(newSections);
  };

  const handleImageSelect = (sIdx, iIdx, file) => {
    if (!file) return;
    const preview = URL.createObjectURL(file);
    updateItemData(sIdx, iIdx, "file", file);
    updateItemData(sIdx, iIdx, "preview", preview);
    updateItemData(sIdx, iIdx, "url", preview);
  };

  const markSectionCompleted = async (sectionIdx) => {
    const newSections = [...sections];
    newSections[sectionIdx].isCompleted = true;
    setSections(newSections);
  };

  const addNewSection = () => {
    if (activeSectionIndex !== -1)
      return showToast(
        "ValidationError: Please complete the current section first",
        "error",
      );
    setSections([
      ...sections,
      { id: Date.now(), isCompleted: false, items: [] },
    ]);
  };
  const editSection = (sectionIdx) => {
    const newSections = sections.map((s, i) => ({
      ...s,
      isCompleted: i !== sectionIdx,
    }));
    setSections(newSections);
  };
  const removeSection = (sectionIdx) => {
    const newSections = sections.filter((_, i) => i !== sectionIdx);
    if (newSections.length === 0)
      newSections.push({ id: Date.now(), isCompleted: false, items: [] });
    setSections(newSections);
  };

  const moveSection = (sectionIdx, direction) => {
    const newSections = [...sections];
    const targetIdx = direction === "up" ? sectionIdx - 1 : sectionIdx + 1;

    if (targetIdx < 0 || targetIdx >= newSections.length) return;

    [newSections[sectionIdx], newSections[targetIdx]] = [
      newSections[targetIdx],
      newSections[sectionIdx],
    ];
    setSections(newSections);
  };

  const updateListItem = (sIdx, iIdx, listIdx, value) => {
    const newSections = [...sections];
    newSections[sIdx].items[iIdx].data.items[listIdx] = value;
    setSections(newSections);
  };
  const addListItem = (sIdx, iIdx) => {
    const newSections = [...sections];
    newSections[sIdx].items[iIdx].data.items.push("");
    setSections(newSections);
  };
  const removeListItem = (sIdx, iIdx, listIdx) => {
    const newSections = [...sections];
    newSections[sIdx].items[iIdx].data.items = newSections[sIdx].items[
      iIdx
    ].data.items.filter((_, i) => i !== listIdx);
    setSections(newSections);
  };

  const handleSeoChange = (e) => {
    const { name, value } = e.target;
    setMeta((prev) => ({
      ...prev,
      seo: { ...prev.seo, [name]: value },
    }));
  };

  const handleFaqChange = (index, field, value) => {
    const newFaqs = [...meta.seo.schema.faq];
    newFaqs[index][field] = value;
    setMeta((prev) => ({
      ...prev,
      seo: {
        ...prev.seo,
        schema: { ...prev.seo.schema, faq: newFaqs },
      },
    }));
  };

  const addFaq = () => {
    setMeta((prev) => ({
      ...prev,
      seo: {
        ...prev.seo,
        schema: {
          ...prev.seo.schema,
          faq: [...prev.seo.schema.faq, { question: "", answer: "" }],
        },
      },
    }));
  };

  const removeFaq = (index) => {
    const newFaqs = meta.seo.schema.faq.filter((_, i) => i !== index);
    setMeta((prev) => ({
      ...prev,
      seo: {
        ...prev.seo,
        schema: { ...prev.seo.schema, faq: newFaqs },
      },
    }));
  };

  const handleCtaChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMeta((prev) => ({
      ...prev,
      cta: {
        ...prev.cta,
        [name]: type === "checkbox" ? checked : value,
      },
    }));
  };

  const handleSidebarChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMeta((prev) => ({
      ...prev,
      sidebar: {
        ...prev.sidebar,
        [name]: type === "checkbox" ? checked : value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!meta.title || !meta.slug)
      return showToast("ValidationError: Missing Title or Slug", "error");
    if (!editingBlog && !coverImage)
      return showToast("ValidationError: Cover Image is required", "error");

    setSubmitting(true);

    try {
      const processedBlocks = [];
      for (const section of sections) {
        for (const item of section.items) {
          let itemData = { ...item.data };
          if (item.type === "image" && itemData.file) {
            const imageFormData = new FormData();
            imageFormData.append("slug", meta.slug || "temp-uploads");
            imageFormData.append("image", itemData.file);
            try {
              const uploadRes = await axiosInstance.post(
                "/blogs/upload-image",
                imageFormData,
                {
                  headers: { "Content-Type": "multipart/form-data" },
                  withCredentials: true,
                },
              );
              if (uploadRes.data.success) {
                itemData.url = uploadRes.data.url;
                delete itemData.file;
                delete itemData.preview;
              }
            } catch (err) {
              setSubmitting(false);
              const errorName =
                err.response?.data?.error || err.name || "UploadError";
              const errorMessage =
                err.response?.data?.message ||
                err.message ||
                "Image upload failed";
              return showToast(`${errorName}: ${errorMessage}`, "error");
            }
          } else if (item.type === "image" && !itemData.file) {
            delete itemData.file;
            delete itemData.preview;
          }
          processedBlocks.push({ type: item.type, data: itemData });
        }
      }

      if (processedBlocks.length === 0) {
        setSubmitting(false);
        return showToast("ValidationError: Blog has no content!", "error");
      }

      const formData = new FormData();
      formData.append("title", meta.title);
      formData.append("mainHeading", meta.mainHeading);
      formData.append("slug", meta.slug);
      formData.append("description", meta.description);
      formData.append("tags", meta.tags);
      // 2. Append Date to Form Data
      formData.append("date", meta.date);
      formData.append("contentBlocks", JSON.stringify(processedBlocks));

      formData.append("category", meta.category);
      formData.append("seo", JSON.stringify(meta.seo));
      formData.append("cta", JSON.stringify(meta.cta));
      formData.append(
        "sidebar",
        JSON.stringify({
          ...meta.sidebar,
          tags: meta.sidebar.tags.split(",").map((t) => t.trim()),
        }),
      );

      if (coverImage) {
        formData.append("coverImage", coverImage);
      }

      if (editingBlog) {
        await axiosInstance.put(`/blogs/${editingBlog._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });
        showToast("Blog Updated!", "success");
      } else {
        await axiosInstance.post("/blogs", formData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });
        showToast("Blog Published!", "success");
      }
      switchToView();
    } catch (error) {
      const errorName = error.response?.data?.error || error.name || "Error";
      const errorMessage =
        error.response?.data?.message || error.message || "Error saving blog";
      showToast(`${errorName}: ${errorMessage}`, "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-150px)]">
      <div className="flex flex-col h-full overflow-y-auto pr-2 custom-scrollbar">
        {/* Meta Header Section */}
        <div className="glass-card p-6 rounded-xl shadow-lg border-2 border-white/50 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl gradient-blue flex items-center justify-center shadow-lg">
              <Edit2 className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {editingBlog ? "Edit Blog Post" : "Create New Blog"}
              </h2>
              <p className="text-sm text-gray-500">
                Fill in the details below to publish your content
              </p>
            </div>
          </div>

          {/* Enhanced Cover Image Upload */}
          <div className="mb-6">
            <label className="block w-full h-48 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-blue-500 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 relative group overflow-hidden pulse-border smooth-transition">
              <input
                type="file"
                onChange={handleCoverImageChange}
                className="hidden"
                accept="image/*"
              />
              {coverPreview ? (
                <>
                  <img
                    src={coverPreview}
                    className="w-full h-full object-cover rounded-2xl"
                    alt="Cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ImageIcon className="text-white mb-2" size={40} />
                    <span className="text-white font-bold text-lg flex items-center gap-2">
                      <Edit2 size={18} /> Change Cover Image
                    </span>
                    <span className="text-white/80 text-xs mt-1">
                      Click to upload a new image
                    </span>
                  </div>
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <ImageIcon size={40} className="text-blue-500" />
                  </div>
                  <span className="text-base font-bold text-gray-700">
                    Upload Cover Image
                  </span>
                  <span className="text-xs text-gray-500 mt-1">
                    PNG, JPG up to 10MB
                  </span>
                </div>
              )}
            </label>
          </div>

          {/* Modern Form Fields */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Internal Title with Floating Label */}
              <div className="relative">
                <input
                  name="title"
                  value={meta.title}
                  onChange={handleMetaChange}
                  placeholder="Breadcrumb "
                  className="floating-input peer"
                  maxLength={100}
                />
                <span
                  className={`char-counter ${meta.title.length > 80 ? "warning" : ""} ${meta.title.length > 95 ? "danger" : ""}`}
                >
                  {meta.title.length}/100
                </span>
              </div>

              {/* Publish Date with Icon */}
              <div className="relative">
                <input
                  type="date"
                  name="date"
                  value={meta.date}
                  onChange={handleMetaChange}
                  className="floating-input peer text-gray-700"
                  placeholder="Publish Date"
                />
              </div>
            </div>

            {/* Main Heading (H1) */}
            <div className="relative">
              <input
                name="mainHeading"
                value={meta.mainHeading}
                onChange={handleMetaChange}
                placeholder="Main Heading (H1) *"
                className="floating-input text-xl font-bold peer"
                maxLength={120}
              />
              <span
                className={`char-counter ${meta.mainHeading.length > 100 ? "warning" : ""} ${meta.mainHeading.length > 115 ? "danger" : ""}`}
              >
                {meta.mainHeading.length}/120
              </span>
            </div>

            <div className="relative">
              <input
                name="slug"
                value={meta.slug}
                onChange={handleMetaChange}
                placeholder="URL Slug *"
                className="floating-input font-mono text-sm peer"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Link size={16} />
              </div>
            </div>

            <div className="relative">
              <textarea
                name="description"
                value={meta.description}
                onChange={handleMetaChange}
                placeholder="Short Description"
                className="floating-textarea peer"
                maxLength={250}
              />
              <span
                className={`char-counter ${meta.description.length > 200 ? "warning" : ""} ${meta.description.length > 240 ? "danger" : ""}`}
              >
                {meta.description.length}/250
              </span>
            </div>

            {/* Category */}
            <div className="relative">
              <input
                type="text"
                name="category"
                value={meta.category}
                onChange={handleMetaChange}
                placeholder="Category"
                className="floating-input peer"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Layers size={16} />
              </div>
            </div>

            {/* SEO Section with Modern Tabs */}
            <div className="border-t-2 border-gray-100 pt-6 mt-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-md">
                  <Layers size={18} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">
                    SEO & Metadata
                  </h3>
                  <p className="text-xs text-gray-500">
                    Optimize for search engines
                  </p>
                </div>
              </div>

              {/* Pill-Style Tabs Navigation */}
              <div className="flex gap-2 mb-6 p-1 bg-gray-100 rounded-xl">
                {["general", "social", "schema", "analytics"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveSeoTab(tab)}
                    className={`flex-1 text-xs font-bold px-4 py-2.5 rounded-lg capitalize transition-all duration-300 ${activeSeoTab === tab
                      ? "bg-white text-blue-600 shadow-md scale-105"
                      : "text-gray-600 hover:text-gray-900"
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* General SEO Tab */}
              {activeSeoTab === "general" && (
                <div className="space-y-3 animate-in fade-in slide-in-from-left-2 duration-300">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 block mb-1">
                      Meta Title (Browser Tab)
                    </label>
                    <input
                      name="metaTitle"
                      value={meta.seo.metaTitle}
                      onChange={handleSeoChange}
                      placeholder="e.g. Best AI Video Tools 2026 | BM Academy"
                      className="w-full text-sm border p-2 rounded focus:ring-1 ring-blue-200 outline-none"
                    />
                    <p className="text-[10px] text-gray-400 mt-0.5">
                      Ideally 50-60 characters. Used in Google Search results.
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 block mb-1">
                      Meta Description
                    </label>
                    <textarea
                      name="metaDescription"
                      value={meta.seo.metaDescription}
                      onChange={handleSeoChange}
                      placeholder="e.g. Learn how to edit videos with AI..."
                      className="w-full text-sm border p-2 rounded h-20 resize-none focus:ring-1 ring-blue-200 outline-none"
                    />
                    <p className="text-[10px] text-gray-400 mt-0.5">
                      Ideally 150-160 characters. Appears below the title in
                      search.
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 block mb-1">
                      Canonical URL
                    </label>
                    <input
                      name="canonicalUrl"
                      value={meta.seo.canonicalUrl}
                      onChange={handleSeoChange}
                      placeholder="https://blog.thebmacademy.com/..."
                      className="w-full text-sm border p-2 rounded focus:ring-1 ring-blue-200 outline-none"
                    />
                    <p className="text-[10px] text-gray-400 mt-0.5">
                      The &quot;master&quot; version of this page. Leave empty
                      to use automated slug.
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 block mb-1">
                      Keywords
                    </label>
                    <input
                      name="keywords"
                      value={meta.seo.keywords}
                      onChange={handleSeoChange}
                      placeholder="AI, Video Editing, 2026"
                      className="w-full text-sm border p-2 rounded focus:ring-1 ring-blue-200 outline-none"
                    />
                    <p className="text-[10px] text-gray-400 mt-0.5">
                      Comma separated. Helpful for some search engines.
                    </p>
                  </div>
                </div>
              )}

              {/* Social / Open Graph Tab */}
              {activeSeoTab === "social" && (
                <div className="space-y-3 animate-in fade-in slide-in-from-left-2 duration-300">
                  <div className="bg-blue-50 p-3 rounded text-xs text-blue-800 mb-2">
                    These settings control how your link looks when shared on
                    Facebook, LinkedIn, or WhatsApp.
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 block mb-1">
                      OG Title
                    </label>
                    <input
                      value={meta.seo.openGraph?.title || ""}
                      onChange={(e) =>
                        setMeta((prev) => ({
                          ...prev,
                          seo: {
                            ...prev.seo,
                            openGraph: {
                              ...prev.seo.openGraph,
                              title: e.target.value,
                            },
                          },
                        }))
                      }
                      placeholder="Social Title (Defaults to Meta Title)"
                      className="w-full text-sm border p-2 rounded focus:ring-1 ring-blue-200 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 block mb-1">
                      OG Description
                    </label>
                    <textarea
                      value={meta.seo.openGraph?.description || ""}
                      onChange={(e) =>
                        setMeta((prev) => ({
                          ...prev,
                          seo: {
                            ...prev.seo,
                            openGraph: {
                              ...prev.seo.openGraph,
                              description: e.target.value,
                            },
                          },
                        }))
                      }
                      placeholder="Social Description (Defaults to Meta Desc)"
                      className="w-full text-sm border p-2 rounded h-16 resize-none focus:ring-1 ring-blue-200 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 block mb-1">
                      OG Image URL
                    </label>
                    <input
                      value={meta.seo.openGraph?.image || ""}
                      onChange={(e) =>
                        setMeta((prev) => ({
                          ...prev,
                          seo: {
                            ...prev.seo,
                            openGraph: {
                              ...prev.seo.openGraph,
                              image: e.target.value,
                            },
                          },
                        }))
                      }
                      placeholder="https://..."
                      className="w-full text-sm border p-2 rounded focus:ring-1 ring-blue-200 outline-none"
                    />
                    <p className="text-[10px] text-gray-400 mt-0.5">
                      Defaults to the main cover image if left empty.
                    </p>
                  </div>
                </div>
              )}

              {/* Schema Tab */}
              {activeSeoTab === "schema" && (
                <div className="space-y-3 animate-in fade-in slide-in-from-left-2 duration-300">
                  <div className="bg-yellow-50 p-3 rounded text-xs text-yellow-800 mb-2">
                    <strong>Article Schema</strong> is automatically generated.
                    Use this section for FAQ.
                  </div>

                  {/* FAQ Builder */}
                  <div className="bg-gray-50 p-3 rounded border">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-bold text-gray-500">
                        FAQ Questions
                      </label>
                      <button
                        type="button"
                        onClick={addFaq}
                        className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded hover:bg-blue-200"
                      >
                        + Add Question
                      </button>
                    </div>
                    {meta.seo.schema.faq.length === 0 && (
                      <p className="text-xs text-gray-400 text-center py-4">
                        No FAQs added yet.
                      </p>
                    )}
                    {meta.seo.schema.faq.map((faq, i) => (
                      <div
                        key={i}
                        className="mb-3 border-b pb-3 last:border-0 relative bg-white p-2 rounded shadow-sm"
                      >
                        <button
                          type="button"
                          onClick={() => removeFaq(i)}
                          className="absolute top-2 right-2 text-gray-300 hover:text-red-500"
                        >
                          <X size={14} />
                        </button>
                        <div className="pr-6">
                          <input
                            value={faq.question}
                            onChange={(e) =>
                              handleFaqChange(i, "question", e.target.value)
                            }
                            placeholder="Question (e.g. What is AI?)"
                            className="w-full text-xs font-semibold border-b border-gray-200 p-1 mb-2 outline-none focus:border-blue-400"
                          />
                          <textarea
                            value={faq.answer}
                            onChange={(e) =>
                              handleFaqChange(i, "answer", e.target.value)
                            }
                            placeholder="Answer..."
                            className="w-full text-xs text-gray-600 p-1 h-16 resize-none outline-none bg-transparent"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Analytics Tab */}
              {activeSeoTab === "analytics" && (
                <div className="space-y-3 animate-in fade-in slide-in-from-left-2 duration-300">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 block mb-1">
                      GA4 Measurement ID
                    </label>
                    <input
                      name="ga4MeasurementId"
                      value={meta.seo.ga4MeasurementId}
                      onChange={handleSeoChange}
                      placeholder="G-XXXXXXXXXX"
                      className="w-full text-sm border p-2 rounded focus:ring-1 ring-blue-200 outline-none"
                    />
                    <p className="text-[10px] text-gray-400 mt-0.5">
                      This specific ID will be used for this blog post.
                    </p>
                  </div>
                  {/* <div>
                    <label className="text-xs font-semibold text-gray-500 block mb-1">
                      Custom Scripts (Advanced)
                    </label>
                    <textarea
                      name="customScripts"
                      value={meta.seo.customScripts || ""}
                      onChange={handleSeoChange}
                      placeholder="<script>...</script>"
                      className="w-full text-xs font-mono border p-2 rounded h-32 resize-none focus:ring-1 ring-blue-200 outline-none bg-gray-50"
                    />
                    <p className="text-[10px] text-red-400 mt-0.5">
                      Warning: Injecting custom scripts can break the page. Use
                      with caution.
                    </p>
                  </div> */}
                </div>
              )}
            </div>

            {/* CTA & Sidebar Configuration */}
            <div className="border-t-2 border-gray-100 pt-6 mt-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-md">
                  <Layout size={18} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">
                    CTA & Sidebar
                  </h3>
                  <p className="text-xs text-gray-500">
                    Configure call-to-action and widgets
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                {/* CTA CONFIG */}
                <div className="glass-card p-5 rounded-xl border-l-4 border-blue-500">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <label className="text-sm font-bold text-blue-900 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                        Bottom Call-To-Action
                      </label>
                      <p className="text-xs text-gray-500 mt-1">
                        Encourage user engagement at the end of the blog
                      </p>
                    </div>
                    <label className="modern-toggle">
                      <input
                        type="checkbox"
                        name="enabled"
                        checked={meta.cta.enabled}
                        onChange={handleCtaChange}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  {meta.cta.enabled && (
                    <div className="space-y-2 animate-in fade-in slide-in-from-top-1">
                      <input
                        name="heading"
                        value={meta.cta.heading}
                        onChange={handleCtaChange}
                        placeholder="CTA Heading (e.g. Ready to unlock growth?)"
                        className="w-full text-xs border p-2 rounded"
                      />
                      <textarea
                        name="description"
                        value={meta.cta.description}
                        onChange={handleCtaChange}
                        placeholder="CTA Description..."
                        className="w-full text-xs border p-2 rounded h-16 resize-none"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          name="buttonText"
                          value={meta.cta.buttonText}
                          onChange={handleCtaChange}
                          placeholder="Button Text"
                          className="w-full text-xs border p-2 rounded"
                        />
                        <input
                          name="buttonUrl"
                          value={meta.cta.buttonUrl}
                          onChange={handleCtaChange}
                          placeholder="Button URL"
                          className="w-full text-xs border p-2 rounded"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <hr className="border-gray-200" />

                {/* SIDEBAR CONFIG */}
                <div className="glass-card p-5 rounded-xl border-l-4 border-green-500">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <label className="text-sm font-bold text-green-900 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        Sidebar Widgets
                      </label>
                      <p className="text-xs text-gray-500 mt-1">
                        Display helpful information in the sidebar
                      </p>
                    </div>
                    <label className="modern-toggle">
                      <input
                        type="checkbox"
                        name="enabled"
                        checked={meta.sidebar.enabled}
                        onChange={handleSidebarChange}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  {meta.sidebar.enabled && (
                    <div className="space-y-3 animate-in fade-in slide-in-from-top-1">
                      {/* About Widget */}
                      <div className="bg-white p-2 rounded border border-gray-100">
                        <label className="text-[10px] font-bold text-gray-400 mb-1 block">
                          ABOUT WIDGET
                        </label>
                        <input
                          name="aboutTitle"
                          value={meta.sidebar.aboutTitle}
                          onChange={handleSidebarChange}
                          placeholder="Title (About Core Talents)"
                          className="w-full text-xs border-b p-1 mb-1 outline-none"
                        />
                        <textarea
                          name="aboutDescription"
                          value={meta.sidebar.aboutDescription}
                          onChange={handleSidebarChange}
                          placeholder="Description..."
                          className="w-full text-xs text-gray-600 p-1 h-12 resize-none outline-none"
                        />
                        <input
                          name="tags"
                          value={meta.sidebar.tags}
                          onChange={handleSidebarChange}
                          placeholder="Tags: #Hiring, #AI (comma separated)"
                          className="w-full text-xs bg-gray-50 p-1 rounded mt-1"
                        />
                      </div>

                      {/* Consultation Widget */}
                      <div className="bg-green-50 p-2 rounded border border-green-100">
                        <label className="text-[10px] font-bold text-green-700 mb-1 block">
                          CONSULTATION WIDGET
                        </label>
                        <input
                          name="consultationTitle"
                          value={meta.sidebar.consultationTitle}
                          onChange={handleSidebarChange}
                          placeholder="Title (Need a Consultation?)"
                          className="w-full text-xs border-b border-green-200 bg-transparent p-1 mb-1 outline-none"
                        />
                        <textarea
                          name="consultationText"
                          value={meta.sidebar.consultationText}
                          onChange={handleSidebarChange}
                          placeholder="Helper text..."
                          className="w-full text-xs text-green-800 bg-transparent p-1 h-12 resize-none outline-none"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="flex-grow space-y-6 pb-20">
          {sections.map((section, sIdx) => (
            <div
              key={section.id}
              className={`transition-all duration-300 rounded-lg overflow-hidden ${section.isCompleted ? "bg-white border border-gray-200 shadow-sm opacity-80 hover:opacity-100" : "bg-white border-2 border-blue-500 shadow-xl ring-4 ring-blue-50"}`}
            >
              <div
                className={`flex justify-between items-center p-4 ${section.isCompleted ? "bg-gradient-to-r from-gray-50 to-gray-100" : "bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white shadow-xl"}`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${section.isCompleted ? "bg-white shadow-sm" : "bg-white/20 backdrop-blur"}`}
                  >
                    <Layers
                      size={18}
                      className={
                        section.isCompleted ? "text-blue-600" : "text-white"
                      }
                    />
                  </div>
                  <div>
                    <span className="font-bold text-sm uppercase flex items-center gap-2">
                      Section {sIdx + 1}
                    </span>
                    {section.isCompleted && (
                      <span className="text-xs text-gray-500 font-normal">
                        {section.items.length}{" "}
                        {section.items.length === 1 ? "Item" : "Items"}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 items-center">
                  {section.isCompleted ? (
                    <>
                      <button
                        onClick={() => moveSection(sIdx, "up")}
                        disabled={sIdx === 0}
                        className="p-1 hover:bg-white hover:text-blue-600 rounded text-gray-500 disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed"
                        title="Move up"
                      >
                        <ChevronUp size={16} />
                      </button>
                      <button
                        onClick={() => moveSection(sIdx, "down")}
                        disabled={sIdx === sections.length - 1}
                        className="p-1 hover:bg-white hover:text-blue-600 rounded text-gray-500 disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed"
                        title="Move down"
                      >
                        <ChevronDown size={16} />
                      </button>
                      <div className="w-px h-4 bg-gray-300"></div>
                      <button
                        onClick={() => editSection(sIdx)}
                        className="p-1 hover:bg-white hover:text-blue-600 rounded text-gray-500"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => removeSection(sIdx)}
                        className="p-1 hover:bg-white hover:text-red-600 rounded text-gray-500"
                      >
                        <Trash2 size={16} />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => removeSection(sIdx)}
                      className="text-white hover:text-red-200"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>
              </div>

              {!section.isCompleted && (
                <div className="p-4 bg-gray-50">
                  <div className="space-y-4 mb-6">
                    {section.items.map((item, iIdx) => (
                      <div
                        key={iIdx}
                        className="bg-white p-3 rounded shadow-sm border relative group animate-in slide-in-from-bottom-2 fade-in"
                      >
                        <button
                          onClick={() => removeItem(sIdx, iIdx)}
                          className="absolute top-2 right-2 text-gray-300 hover:text-red-500 z-10"
                        >
                          <X size={14} />
                        </button>

                        {item.type === "heading" && (
                          <input
                            placeholder="Heading Text"
                            value={item.data.text}
                            onChange={(e) =>
                              updateItemData(sIdx, iIdx, "text", e.target.value)
                            }
                            className="w-full font-bold text-lg outline-none border-b border-transparent focus:border-blue-300 placeholder:text-gray-300"
                          />
                        )}
                        {item.type === "paragraph" && (
                          <RichTextEditor
                            initialValue={item.data.text || ""}
                            onChange={(val) =>
                              updateItemData(sIdx, iIdx, "text", val)
                            }
                          />
                        )}

                        {item.type === "image" && (
                          <div className="space-y-2">
                            {item.data.url ? (
                              <div className="relative group/img">
                                <img
                                  src={item.data.url}
                                  className="h-40 w-full object-contain bg-gray-100 rounded border"
                                  alt={item.data.alt || "preview"}
                                />
                                <button
                                  onClick={() =>
                                    updateItemData(sIdx, iIdx, "url", "")
                                  }
                                  className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/img:opacity-100 transition-opacity shadow"
                                >
                                  Change Image
                                </button>
                              </div>
                            ) : (
                              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-blue-50 hover:border-blue-400 transition-all">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                  <p className="text-xs text-gray-500 font-semibold">
                                    Click to upload image
                                  </p>
                                </div>
                                <input
                                  type="file"
                                  className="hidden"
                                  onChange={(e) =>
                                    handleImageSelect(
                                      sIdx,
                                      iIdx,
                                      e.target.files[0],
                                    )
                                  }
                                  accept="image/*"
                                />
                              </label>
                            )}
                            <input
                              type="text"
                              placeholder="Image Alt Text (SEO)"
                              value={item.data.alt || ""}
                              onChange={(e) =>
                                updateItemData(
                                  sIdx,
                                  iIdx,
                                  "alt",
                                  e.target.value,
                                )
                              }
                              className="w-full text-xs p-2 border rounded bg-white focus:ring-1 ring-blue-200 outline-none"
                            />
                          </div>
                        )}

                        {item.type === "list" && (
                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <input
                                placeholder="Optional heading"
                                value={item.data.heading || ""}
                                onChange={(e) =>
                                  updateItemData(
                                    sIdx,
                                    iIdx,
                                    "heading",
                                    e.target.value,
                                  )
                                }
                                className="w-full font-bold text-lg outline-none border-b border-transparent focus:border-blue-300 placeholder:text-gray-300"
                              />
                              <select
                                value={item.data.listType || "list"}
                                onChange={(e) =>
                                  updateItemData(
                                    sIdx,
                                    iIdx,
                                    "listType",
                                    e.target.value,
                                  )
                                }
                                className="ml-4 text-xs p-2 border rounded outline-none"
                              >
                                <option value="list">Bullet</option>
                                <option value="checklist">Checklist</option>
                                <option value="arrow">Arrow</option>
                                <option value="star">Star</option>
                                <option value="square">Square</option>
                                <option value="dash">Dash</option>
                              </select>
                            </div>
                            <div className="space-y-2 pl-4">
                              {item.data.items.map((listItem, listIdx) => (
                                <div
                                  key={listIdx}
                                  className="flex gap-3 items-center"
                                >
                                  {item.data.listType === "checklist" && (
                                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                  )}
                                  {item.data.listType === "arrow" && (
                                    <ChevronRight className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                  )}
                                  {item.data.listType === "star" && (
                                    <div className="w-4 h-4 text-yellow-500 flex-shrink-0">
                                      ★
                                    </div>
                                  )}
                                  {item.data.listType === "square" && (
                                    <Square className="w-3 h-3 text-blue-500 flex-shrink-0 mt-0.5 fill-current" />
                                  )}
                                  {item.data.listType === "dash" && (
                                    <Minus className="w-4 h-4 text-gray-500 flex-shrink-0" />
                                  )}
                                  {(item.data.listType === "list" ||
                                    !item.data.listType) && (
                                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full flex-shrink-0" />
                                    )}
                                  <input
                                    value={listItem}
                                    onChange={(e) =>
                                      updateListItem(
                                        sIdx,
                                        iIdx,
                                        listIdx,
                                        e.target.value,
                                      )
                                    }
                                    className="flex-1 text-sm border-b border-gray-100 focus:border-blue-300 outline-none"
                                    placeholder="List item"
                                  />
                                  <button
                                    onClick={() =>
                                      removeListItem(sIdx, iIdx, listIdx)
                                    }
                                    className="text-gray-300 hover:text-red-500"
                                  >
                                    <X size={12} />
                                  </button>
                                </div>
                              ))}
                              <button
                                onClick={() => addListItem(sIdx, iIdx)}
                                className="text-xs text-blue-600 font-bold flex items-center gap-1 mt-2"
                              >
                                <Plus size={10} /> Add Item
                              </button>
                            </div>
                          </div>
                        )}

                        {item.type === "quote" && (
                          <div className="space-y-3">
                            <textarea
                              placeholder="Quote text..."
                              value={item.data.text}
                              onChange={(e) =>
                                updateItemData(
                                  sIdx,
                                  iIdx,
                                  "text",
                                  e.target.value,
                                )
                              }
                              className="w-full italic text-lg outline-none border-b border-gray-200 focus:border-blue-300"
                            />
                            <input
                              placeholder="Author (optional)"
                              value={item.data.author}
                              onChange={(e) =>
                                updateItemData(
                                  sIdx,
                                  iIdx,
                                  "author",
                                  e.target.value,
                                )
                              }
                              className="w-full text-sm text-gray-500 italic outline-none"
                            />
                          </div>
                        )}

                        {item.type === "button" && (
                          <div className="space-y-3">
                            <input
                              placeholder="Button Text"
                              value={item.data.text}
                              onChange={(e) =>
                                updateItemData(
                                  sIdx,
                                  iIdx,
                                  "text",
                                  e.target.value,
                                )
                              }
                              className="w-full font-medium outline-none border-b"
                            />
                            <div className="flex gap-2">
                              <select
                                value={item.data.actionType || "link"}
                                onChange={(e) =>
                                  updateItemData(
                                    sIdx,
                                    iIdx,
                                    "actionType",
                                    e.target.value,
                                  )
                                }
                                className="text-xs p-2 border rounded w-1/3"
                              >
                                <option value="link">URL Link</option>
                                <option value="whatsapp">WhatsApp</option>
                              </select>
                              <select
                                value={item.data.style}
                                onChange={(e) =>
                                  updateItemData(
                                    sIdx,
                                    iIdx,
                                    "style",
                                    e.target.value,
                                  )
                                }
                                className="text-xs p-2 border rounded w-2/3"
                              >
                                <option value="primary">Primary (Blue)</option>
                                <option value="outline">Outline</option>
                                <option value="black">Black</option>
                              </select>
                            </div>

                            {item.data.actionType === "whatsapp" ? (
                              <div className="space-y-2 animate-in fade-in">
                                <input
                                  placeholder="WhatsApp Number (e.g. 919944...)"
                                  value={item.data.phone || ""}
                                  onChange={(e) =>
                                    updateItemData(
                                      sIdx,
                                      iIdx,
                                      "phone",
                                      e.target.value,
                                    )
                                  }
                                  className="w-full text-sm outline-none border-b p-1"
                                />
                                <textarea
                                  placeholder="Predefined Message..."
                                  value={item.data.message || ""}
                                  onChange={(e) =>
                                    updateItemData(
                                      sIdx,
                                      iIdx,
                                      "message",
                                      e.target.value,
                                    )
                                  }
                                  className="w-full text-sm outline-none border p-2 rounded h-16 resize-none"
                                />
                              </div>
                            ) : (
                              <input
                                placeholder="Destination URL (https://...)"
                                value={item.data.url}
                                onChange={(e) =>
                                  updateItemData(
                                    sIdx,
                                    iIdx,
                                    "url",
                                    e.target.value,
                                  )
                                }
                                className="w-full text-sm text-blue-600 outline-none border-b p-1"
                              />
                            )}
                          </div>
                        )}

                        {item.type === "accordion" && (
                          <div className="space-y-3">
                            <input
                              placeholder="Accordion Title"
                              value={item.data.title}
                              onChange={(e) =>
                                updateItemData(
                                  sIdx,
                                  iIdx,
                                  "title",
                                  e.target.value,
                                )
                              }
                              className="w-full font-bold outline-none border-b"
                            />
                            <textarea
                              placeholder="Accordion content..."
                              value={item.data.content}
                              onChange={(e) =>
                                updateItemData(
                                  sIdx,
                                  iIdx,
                                  "content",
                                  e.target.value,
                                )
                              }
                              className="w-full min-h-[100px] text-sm outline-none resize-y border rounded p-2 bg-gray-50"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="border-t-2 border-gray-200 pt-5 mt-6">
                    <p className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wide">
                      Add Content Block
                    </p>
                    <div className="flex items-center justify-between flex-wrap gap-3">
                      <div className="flex gap-2 flex-wrap">
                        <SmallToolBtn
                          icon={<Type size={14} />}
                          label="Heading"
                          onClick={() => addItemToSection("heading")}
                        />
                        <SmallToolBtn
                          icon={<Type size={12} />}
                          label="Para"
                          onClick={() => addItemToSection("paragraph")}
                        />
                        <SmallToolBtn
                          icon={<ImageIcon size={14} />}
                          label="Img"
                          onClick={() => addItemToSection("image")}
                        />
                        <SmallToolBtn
                          icon={<Circle size={14} />}
                          label="List"
                          onClick={() => addItemToSection("list")}
                        />
                        <SmallToolBtn
                          icon={<CheckCircle size={14} />}
                          label="Check"
                          onClick={() => addItemToSection("checklist")}
                        />
                        <SmallToolBtn
                          icon={<Quote size={14} />}
                          label="Quote"
                          onClick={() => addItemToSection("quote")}
                        />
                        <SmallToolBtn
                          icon={<Link size={14} />}
                          label="Btn"
                          onClick={() => addItemToSection("button")}
                        />
                        <SmallToolBtn
                          icon={<ChevronDown size={14} />}
                          label="Accrd"
                          onClick={() => addItemToSection("accordion")}
                        />
                      </div>
                      <button
                        onClick={() => markSectionCompleted(sIdx)}
                        className="gradient-blue text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:shadow-xl transition-all duration-300 hover:scale-105"
                      >
                        <CheckCircle size={16} /> Complete Section
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          {activeSectionIndex === -1 && (
            <div
              onClick={addNewSection}
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:border-blue-400 hover:text-blue-500 transition hover:bg-blue-50"
            >
              <Plus size={32} className="mb-2" />
              <span className="font-bold">Add New Section</span>
            </div>
          )}
        </div>

        {activeSectionIndex === -1 && (
          <div className="sticky bottom-4 glass-card backdrop-blur-xl p-5 border-2 border-white/50 shadow-2xl rounded-2xl">
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] flex justify-center items-center gap-3 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              {submitting ? (
                <>
                  <Loader className="animate-spin" size={20} />
                  <span>Publishing...</span>
                </>
              ) : (
                <>
                  <Save size={20} />
                  <span>
                    {editingBlog ? "Update Blog Post" : "Publish Blog Post"}
                  </span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
      <div className="hidden lg:block h-full bg-gray-100 rounded-xl overflow-hidden shadow-inner border relative">
        <div className="h-full overflow-y-auto p-8 custom-scrollbar">
          <BlogPreview
            meta={meta}
            coverPreview={coverPreview}
            sections={sections}
          />
        </div>
      </div>
    </div>
  );
};

const RichTextEditor = ({ initialValue, onChange }) => {
  const contentEditableRef = React.useRef(null);
  const [isBold, setIsBold] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const savedRange = React.useRef(null);
  const isInternalUpdate = React.useRef(false);

  useEffect(() => {
    if (contentEditableRef.current) {
      // Only update from props if the content is different significantly and we didn't just type it
      // Standard comparison to avoid cursor jumps
      if (
        !isInternalUpdate.current &&
        contentEditableRef.current.innerHTML !== initialValue
      ) {
        // Check if focused - if focused, be very careful/skip to avoid jumping unless completely desynced
        if (document.activeElement !== contentEditableRef.current) {
          contentEditableRef.current.innerHTML = initialValue || "";
        }
      }
      isInternalUpdate.current = false;
    }
  }, [initialValue]);

  const checkActiveStates = () => {
    setIsBold(document.queryCommandState("bold"));
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      let parent = selection.getRangeAt(0).commonAncestorContainer;
      if (parent.nodeType === 3) parent = parent.parentNode;
      setIsLink(!!parent.closest("a"));
    } else {
      setIsLink(false);
    }
  };

  const handleInput = (e) => {
    isInternalUpdate.current = true;
    onChange(e.currentTarget.innerHTML);
    checkActiveStates();
  };

  const toggleBold = (e) => {
    e.preventDefault(); // Prevent losing focus
    document.execCommand("bold");
    checkActiveStates();
    if (contentEditableRef.current) {
      isInternalUpdate.current = true;
      onChange(contentEditableRef.current.innerHTML);
    }
  };

  const openLinkModal = (e) => {
    e.preventDefault();
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      savedRange.current = selection.getRangeAt(0);
      setShowLinkModal(true);
      let parent = selection.getRangeAt(0).commonAncestorContainer;
      if (parent.nodeType === 3) parent = parent.parentNode;
      const existingLink = parent.closest("a");
      setLinkUrl(existingLink ? existingLink.href : "");
    }
  };

  const applyLink = () => {
    setShowLinkModal(false);
    if (savedRange.current) {
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(savedRange.current);

      if (linkUrl) {
        document.execCommand("createLink", false, linkUrl);
        // Force target blank
        const anchor = selection.focusNode?.parentElement?.closest("a") || selection.anchorNode?.parentElement?.closest("a");
        if (anchor) {
          anchor.target = "_blank";
          anchor.className = "text-blue-600 hover:underline font-medium";
        }
      } else {
        document.execCommand("unlink");
      }

      checkActiveStates();
      if (contentEditableRef.current) {
        isInternalUpdate.current = true;
        onChange(contentEditableRef.current.innerHTML);
      }
    }
  };

  return (
    <div className="space-y-2 relative">
      <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg border">
        <button
          type="button"
          onMouseDown={toggleBold}
          className={`flex items-center gap-1 px-3 py-1.5 border rounded text-sm font-bold transition-colors ${isBold
            ? "bg-blue-600 text-white border-blue-600 shadow-sm"
            : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          title="Make text bold"
        >
          <Type size={14} className={isBold ? "text-white" : "text-gray-700"} />
          <span className={isBold ? "text-white" : ""}>B</span>
        </button>

        <button
          type="button"
          onMouseDown={openLinkModal}
          className={`flex items-center gap-1 px-3 py-1.5 border rounded text-sm transition-colors ${isLink
            ? "bg-blue-600 text-white border-blue-600 shadow-sm"
            : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          title="Insert Link"
        >
          <Link size={14} className={isLink ? "text-white" : "text-gray-700"} />
          <span>Link</span>
        </button>
      </div>

      <div
        ref={contentEditableRef}
        className="w-full min-h-[120px] text-sm outline-none resize-y p-3 border-2 border-gray-200 rounded-lg focus:border-blue-400 bg-white"
        style={{ overflowY: "auto" }}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onBlur={handleInput}
        onKeyUp={checkActiveStates}
        onMouseUp={checkActiveStates}
        placeholder="Write your paragraph here..."
      />
      {/* Initialize content once */}
      <div style={{ display: "none" }} dangerouslySetInnerHTML={{ __html: initialValue }}></div>

      {showLinkModal && (
        <div className="absolute top-12 left-0 z-50 bg-white shadow-2xl border-2 border-blue-100 rounded-xl p-4 w-80 animate-in fade-in zoom-in-95">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold uppercase text-gray-500">Insert Link</span>
            <button onClick={() => setShowLinkModal(false)} className="text-gray-400 hover:text-red-500">
              <X size={14} />
            </button>
          </div>
          <input
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="https://example.com"
            className="w-full text-sm border p-2 rounded-lg mb-4 focus:ring-2 ring-blue-500 outline-none bg-gray-50 focus:bg-white transition-all"
            autoFocus
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setShowLinkModal(false)}
              className="px-4 py-2 text-xs font-bold text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={applyLink}
              className="px-4 py-2 text-xs font-bold bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-lg transition-all"
            >
              Apply Link
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const SmallToolBtn = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-1.5 px-4 py-2 bg-white border-2 border-gray-200 rounded-lg text-xs font-bold text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-600 hover:border-blue-300 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105"
  >
    {icon} {label}
  </button>
);

export default BlogCreate;
