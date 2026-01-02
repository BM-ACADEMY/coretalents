import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { PDFDownloadLink } from '@react-pdf/renderer'; 
import {
  ChevronLeft, ChevronRight, Download, Save, Loader2,
  LayoutTemplate, Palette, Mail, Phone, MapPin,
  Linkedin, Globe, Plus, Trash2, X, Check
} from 'lucide-react';

import axiosInstance from '@/api/axiosInstance';
import { showToast } from '@/utils/customToast';

import ResumeDocument from './ResumeDocument'; 

// --- CONSTANTS ---
const THEME_COLORS = [
  { name: 'Blue', hex: '#3b82f6' },
  { name: 'Indigo', hex: '#6366f1' },
  { name: 'Purple', hex: '#8b5cf6' },
  { name: 'Green', hex: '#10b981' },
  { name: 'Red', hex: '#ef4444' },
  { name: 'Orange', hex: '#f97316' },
  { name: 'Teal', hex: '#14b8a6' },
  { name: 'Pink', hex: '#ec4899' },
  { name: 'Gray', hex: '#64748b' },
  { name: 'Black', hex: '#0f172a' },
];

const INITIAL_STATE = {
  // Removed 'image' from personalInfo
  personalInfo: {
    fullName: '', email: '', phone: '', location: '', profession: '', linkedin: '', website: ''
  },
  summary: '',
  experience: [],
  education: [],
  projects: [],
  skills: []
};

const STEPS = [
  { id: 'personal', title: 'Personal Information' },
  { id: 'summary', title: 'Professional Summary' },
  { id: 'experience', title: 'Professional Experience' },
  { id: 'education', title: 'Education' },
  { id: 'projects', title: 'Projects' },
  { id: 'skills', title: 'Skills' }
];

function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

// --- MAIN COMPONENT ---
export default function ResumeBuilder() {
  const { id } = useParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [resumeData, setResumeData] = useState(INITIAL_STATE);
  const [activeColor, setActiveColor] = useState('#3b82f6');
  const [showColorPicker, setShowColorPicker] = useState(false);

  // Removed imageFile and setImageFile
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const pickerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setShowColorPicker(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch Resume
  useEffect(() => {
    const fetchResume = async () => {
      setIsLoading(true);
      try {
        const endpoint = id ? `/resume/${id}` : '/resume/me';
        const res = await axiosInstance.get(endpoint);
        const fetchedData = res.data.data || res.data;

        if (fetchedData) {
          setResumeData(prev => ({
            ...prev,
            ...fetchedData,
            personalInfo: { ...prev.personalInfo, ...(fetchedData.personalInfo || {}) }
          }));
          if (fetchedData.themeColor) setActiveColor(fetchedData.themeColor);
        }
      } catch (error) {
        if (id && error.response?.status === 404) showToast("error", "Resume not found");
      } finally {
        setIsLoading(false);
      }
    };
    fetchResume();
  }, [id]);

  // Save Resume - Removed Image Logic
  const handleSaveToBackend = async () => {
    setIsSaving(true);
    try {
      const formData = new FormData();
      if (id) formData.append("resumeId", id);
      // Removed formData.append("resumeImage", ...)

      formData.append("personalInfo", JSON.stringify(resumeData.personalInfo));
      formData.append("experience", JSON.stringify(resumeData.experience));
      formData.append("education", JSON.stringify(resumeData.education));
      formData.append("projects", JSON.stringify(resumeData.projects));
      formData.append("skills", JSON.stringify(resumeData.skills));
      formData.append("summary", resumeData.summary || "");
      formData.append("themeColor", activeColor);

      const res = await axiosInstance.post('/resume/save', formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      const savedData = res.data.data || res.data;
      setResumeData(prev => ({ ...prev, ...savedData }));
      setLastSaved(new Date());
      showToast("success", "Resume saved successfully!");
    } catch (error) {
      showToast("error", error.response?.data?.message || "Failed to save resume.");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePersonalInfoChange = (e) => setResumeData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, [e.target.name]: e.target.value } }));
  
  // Removed handleImageUpload function

  const handleSummaryChange = (e) => setResumeData(prev => ({ ...prev, summary: e.target.value }));
  const addItem = (section, initialItem) => setResumeData(prev => ({ ...prev, [section]: [...prev[section], { id: Date.now(), ...initialItem }] }));
  const updateItem = (section, id, field, value) => setResumeData(prev => ({ ...prev, [section]: prev[section].map(item => item.id === id ? { ...item, [field]: value } : item) }));
  const deleteItem = (section, id) => setResumeData(prev => ({ ...prev, [section]: prev[section].filter(item => item.id !== id) }));

  const [skillInput, setSkillInput] = useState('');
  const addSkill = () => { if (skillInput.trim()) { setResumeData(prev => ({ ...prev, skills: [...prev.skills, { id: Date.now(), name: skillInput.trim() }] })); setSkillInput(''); } };
  const deleteSkill = (id) => setResumeData(prev => ({ ...prev, skills: prev.skills.filter(s => s.id !== id) }));

  const nextStep = () => { if (currentStep < STEPS.length - 1) setCurrentStep(prev => prev + 1); };
  const prevStep = () => { if (currentStep > 0) setCurrentStep(prev => prev - 1); };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-xl font-bold text-slate-800">Personal Information</h2>
            {/* REMOVED IMAGE UPLOAD UI HERE */}
            <div className="grid grid-cols-1 gap-4">
              <InputGroup label="Full Name" name="fullName" value={resumeData.personalInfo.fullName} onChange={handlePersonalInfoChange} />
              <InputGroup label="Email Address" name="email" value={resumeData.personalInfo.email} onChange={handlePersonalInfoChange} />
              <InputGroup label="Phone Number" name="phone" value={resumeData.personalInfo.phone} onChange={handlePersonalInfoChange} />
              <InputGroup label="Location" name="location" value={resumeData.personalInfo.location} onChange={handlePersonalInfoChange} />
              <InputGroup label="Profession" name="profession" value={resumeData.personalInfo.profession} onChange={handlePersonalInfoChange} />
              <InputGroup label="LinkedIn URL" name="linkedin" value={resumeData.personalInfo.linkedin} onChange={handlePersonalInfoChange} />
              <InputGroup label="Website URL" name="website" value={resumeData.personalInfo.website} onChange={handlePersonalInfoChange} />
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-6 animate-fadeIn">
             <h2 className="text-xl font-bold text-slate-800">Professional Summary</h2>
             <textarea value={resumeData.summary} onChange={handleSummaryChange} className="w-full h-48 p-4 border border-slate-200 rounded-lg outline-none resize-none" placeholder="Write a summary..." />
          </div>
        );
      case 2:
         return (
             <div className="space-y-6 animate-fadeIn">
                 <div className="flex justify-between items-center"><h2 className="text-xl font-bold text-slate-800">Experience</h2><button onClick={() => addItem('experience', { company: '', title: '', startDate: '', endDate: '', current: false, description: '' })} className="flex items-center gap-2 text-green-600 border border-green-200 bg-green-50 px-3 py-1.5 rounded-lg text-sm"><Plus className="w-4 h-4" /> Add</button></div>
                 {resumeData.experience.map(exp => (
                   <div key={exp.id} className="p-4 border border-slate-200 rounded-xl relative">
                     <button onClick={() => deleteItem('experience', exp.id)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                     <div className="grid grid-cols-2 gap-4 mb-4"><InputGroup label="Company" value={exp.company} onChange={e => updateItem('experience', exp.id, 'company', e.target.value)} /><InputGroup label="Title" value={exp.title} onChange={e => updateItem('experience', exp.id, 'title', e.target.value)} /></div>
                     <div className="grid grid-cols-2 gap-4 mb-4"><InputGroup type="month" label="Start" value={exp.startDate} onChange={e => updateItem('experience', exp.id, 'startDate', e.target.value)} /><div className="flex flex-col"><InputGroup type="month" label="End" value={exp.endDate} disabled={exp.current} onChange={e => updateItem('experience', exp.id, 'endDate', e.target.value)} /><label className="flex items-center gap-2 mt-1 text-xs"><input type="checkbox" checked={exp.current} onChange={e => updateItem('experience', exp.id, 'current', e.target.checked)} /> Currently working</label></div></div>
                     <textarea value={exp.description} onChange={e => updateItem('experience', exp.id, 'description', e.target.value)} className="w-full p-3 border border-slate-200 rounded-lg text-sm resize-none h-24" placeholder="Description..." />
                   </div>
                 ))}
             </div>
         );
       case 3:
           return (
               <div className="space-y-6 animate-fadeIn">
                   <div className="flex justify-between items-center"><h2 className="text-xl font-bold text-slate-800">Education</h2><button onClick={() => addItem('education', { school: '', degree: '', field: '', date: '', gpa: '' })} className="flex items-center gap-2 text-green-600 border border-green-200 bg-green-50 px-3 py-1.5 rounded-lg text-sm"><Plus className="w-4 h-4" /> Add</button></div>
                   {resumeData.education.map(edu => (
                       <div key={edu.id} className="p-4 border border-slate-200 rounded-xl relative">
                           <button onClick={() => deleteItem('education', edu.id)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                           <div className="grid grid-cols-2 gap-4 mb-4"><InputGroup label="School" value={edu.school} onChange={e => updateItem('education', edu.id, 'school', e.target.value)} /><InputGroup label="Degree" value={edu.degree} onChange={e => updateItem('education', edu.id, 'degree', e.target.value)} /></div>
                           <div className="grid grid-cols-2 gap-4"><InputGroup label="Field" value={edu.field} onChange={e => updateItem('education', edu.id, 'field', e.target.value)} /><InputGroup type="month" label="Date" value={edu.date} onChange={e => updateItem('education', edu.id, 'date', e.target.value)} /></div>
                           <InputGroup label="GPA" value={edu.gpa} onChange={e => updateItem('education', edu.id, 'gpa', e.target.value)} />
                       </div>
                   ))}
               </div>
           );
       case 4:
           return (
               <div className="space-y-6 animate-fadeIn">
                   <div className="flex justify-between items-center"><h2 className="text-xl font-bold text-slate-800">Projects</h2><button onClick={() => addItem('projects', { name: '', type: '', description: '' })} className="flex items-center gap-2 text-green-600 border border-green-200 bg-green-50 px-3 py-1.5 rounded-lg text-sm"><Plus className="w-4 h-4" /> Add</button></div>
                   {resumeData.projects.map(proj => (
                       <div key={proj.id} className="p-4 border border-slate-200 rounded-xl relative">
                           <button onClick={() => deleteItem('projects', proj.id)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                           <div className="grid grid-cols-2 gap-4 mb-4"><InputGroup label="Name" value={proj.name} onChange={e => updateItem('projects', proj.id, 'name', e.target.value)} /><InputGroup label="Type" value={proj.type} onChange={e => updateItem('projects', proj.id, 'type', e.target.value)} /></div>
                           <textarea value={proj.description} onChange={e => updateItem('projects', proj.id, 'description', e.target.value)} className="w-full p-3 border border-slate-200 rounded-lg text-sm resize-none h-20" placeholder="Description..." />
                       </div>
                   ))}
               </div>
           );
       case 5:
           return (
               <div className="space-y-6 animate-fadeIn">
                   <h2 className="text-xl font-bold text-slate-800">Skills</h2>
                   <div className="flex gap-2"><InputGroup label="" value={skillInput} onChange={e => setSkillInput(e.target.value)} placeholder="Add skill" onKeyDown={e => e.key === 'Enter' && addSkill()} /><button onClick={addSkill} className="mt-2 h-[42px] px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Add</button></div>
                   <div className="flex flex-wrap gap-2">{resumeData.skills.map(skill => (<div key={skill.id} className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border shadow-sm text-sm"><span>{skill.name}</span><button onClick={() => deleteSkill(skill.id)}><X className="w-3 h-3 text-slate-400 hover:text-red-500" /></button></div>))}</div>
               </div>
           );
      default: return null;
    }
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-10 h-10 text-blue-600 animate-spin" /></div>;

  return (
    <div className="min-h-screen pt-32 bg-slate-100 font-sans text-slate-900">
      <main className="max-w-[1600px] mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-65px)]">

        {/* Left: Form */}
        <div className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-white z-20">
               <div className="flex gap-2 relative" ref={pickerRef}>
                 <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium border border-blue-100">
                    <LayoutTemplate className="w-4 h-4" /> Template
                 </button>
                 <button onClick={() => setShowColorPicker(!showColorPicker)} className="flex items-center gap-2 px-4 py-2 hover:bg-slate-50 text-slate-600 rounded-lg text-sm font-medium transition-colors border border-transparent hover:border-slate-200">
                    <Palette className="w-4 h-4" style={{ color: activeColor }} /> Accent
                 </button>
                 {showColorPicker && (
                   <div className="absolute top-12 left-24 bg-white border border-slate-200 shadow-xl rounded-xl p-4 w-72 z-50 animate-fadeIn">
                     <h3 className="text-sm font-semibold text-slate-700 mb-3">Choose Accent Color</h3>
                     <div className="grid grid-cols-4 gap-3">
                       {THEME_COLORS.map((color) => (
                         <button key={color.name} onClick={() => { setActiveColor(color.hex); setShowColorPicker(false); }} className="flex flex-col items-center gap-1 group">
                           <div className="w-10 h-10 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm" style={{ backgroundColor: color.hex }}>
                             {activeColor === color.hex && <Check className="w-5 h-5 text-white" />}
                           </div>
                           <span className="text-xs text-slate-500">{color.name}</span>
                         </button>
                       ))}
                     </div>
                   </div>
                 )}
               </div>

               <div className="flex items-center gap-4">
                   {lastSaved && <span className="text-xs text-slate-400">Saved: {lastSaved.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>}
                   <button onClick={handleSaveToBackend} disabled={isSaving} className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 hover:bg-green-100 rounded-lg text-sm font-medium border border-green-200 transition-colors disabled:opacity-50">
                       {isSaving ? <Loader2 className="w-4 h-4 animate-spin"/> : <Save className="w-4 h-4" />} {isSaving ? "Saving..." : "Save"}
                   </button>
               </div>
            </div>

            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">{renderStepContent()}</div>

            <div className="px-8 py-5 border-t border-slate-100 flex justify-between bg-white">
                {currentStep > 0 ? (
                  <button onClick={prevStep} className="flex items-center gap-2 px-5 py-2.5 border border-slate-300 rounded-lg text-slate-600 font-medium hover:bg-slate-50 transition-colors"><ChevronLeft className="w-4 h-4" /> Previous</button>
                ) : <div />}

                <div className="flex gap-3">
                   <PDFDownloadLink
                       key={JSON.stringify(resumeData) + activeColor}
                       document={<ResumeDocument data={resumeData} themeColor={activeColor} />}
                       fileName={`${resumeData.personalInfo.fullName || 'Resume'}.pdf`}
                       className="flex items-center gap-2 px-4 py-2.5 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors disabled:opacity-70"
                   >
                     {({ loading }) => <>{loading ? <Loader2 className="w-4 h-4 animate-spin"/> : <Download className="w-4 h-4" />} {loading ? "Generating..." : "PDF"}</>}
                   </PDFDownloadLink>

                   {currentStep < STEPS.length - 1 && (
                     <button onClick={nextStep} className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200">Next <ChevronRight className="w-4 h-4" /></button>
                   )}
                </div>
            </div>
        </div>

        {/* Right: Preview (HTML) - Updated for Centered Alignment & No Image */}
        <div className="bg-slate-100 rounded-xl flex items-start justify-center overflow-y-auto p-4 lg:p-8 custom-scrollbar">
           <div style={{ backgroundColor: '#ffffff', color: '#1e293b', borderTop: `6px solid ${activeColor}`, minHeight: '297mm' }} className="w-full max-w-[210mm] shadow-xl p-[15mm] flex flex-col gap-6">
              
              {/* HEADER SECTION: Centered, No Flex Row, No Image */}
              <div className="flex flex-col items-center border-b border-slate-100 pb-6">
                  <h1 className="text-4xl font-bold mb-2 uppercase text-center tracking-tight" style={{ color: activeColor }}>{resumeData.personalInfo.fullName || 'Your Name'}</h1>
                  <p className="text-lg font-medium text-center text-slate-600 mb-4">{resumeData.personalInfo.profession || 'Professional Title'}</p>
                  
                  <div className="flex flex-wrap justify-center gap-y-2 gap-x-4 text-xs text-slate-500 text-center">
                    {resumeData.personalInfo.email && (
                        <div className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5" />
                        {resumeData.personalInfo.email}
                        </div>
                    )}
                    {resumeData.personalInfo.phone && (
                        <div className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5" />
                        {resumeData.personalInfo.phone}
                        </div>
                    )}
                    {resumeData.personalInfo.location && (
                        <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        {resumeData.personalInfo.location}
                        </div>
                    )}
                    {resumeData.personalInfo.linkedin && (
                        <div className="flex items-center gap-1.5">
                        <Linkedin className="w-3.5 h-3.5" />
                        {resumeData.personalInfo.linkedin}
                        </div>
                    )}
                    {resumeData.personalInfo.website && (
                        <div className="flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5" />
                        {resumeData.personalInfo.website}
                        </div>
                    )}
                  </div>
              </div>

              {resumeData.summary && <section><h2 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: activeColor }}>Professional Summary</h2><p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{resumeData.summary}</p></section>}

              {resumeData.experience.length > 0 && <section><h2 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: activeColor }}>Experience</h2><div className="flex flex-col gap-5">{resumeData.experience.map(exp => (<div key={exp.id}><div className="flex justify-between items-baseline mb-1"><h3 className="font-bold text-slate-800">{exp.title}</h3><span className="text-xs font-medium text-slate-500">{formatDate(exp.startDate)} - {exp.current?'Present':formatDate(exp.endDate)}</span></div><div className="text-sm font-medium text-slate-700 mb-2">{exp.company}</div><p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{exp.description}</p></div>))}</div></section>}

              {resumeData.projects.length > 0 && <section><h2 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: activeColor }}>Projects</h2><div className="flex flex-col gap-4">{resumeData.projects.map(proj => (<div key={proj.id}><div className="flex justify-between items-baseline mb-1"><h3 className="font-bold text-slate-800">{proj.name}</h3></div>{proj.type && <div className="text-xs font-medium text-slate-500 mb-1">{proj.type}</div>}<p className="text-sm text-slate-600 leading-relaxed">{proj.description}</p></div>))}</div></section>}

              {resumeData.education.length > 0 && <section><h2 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: activeColor }}>Education</h2><div className="flex flex-col gap-4">{resumeData.education.map(edu => (<div key={edu.id}><div className="flex justify-between items-baseline mb-1"><h3 className="font-bold text-slate-800">{edu.school}</h3><span className="text-xs font-medium text-slate-500">{formatDate(edu.date)}</span></div><div className="text-sm text-slate-700">{edu.degree} {edu.field && `in ${edu.field}`}</div>{edu.gpa && <div className="text-xs text-slate-500 mt-1">GPA: {edu.gpa}</div>}</div>))}</div></section>}

              {resumeData.skills.length > 0 && <section><h2 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: activeColor }}>Skills</h2><div className="flex flex-wrap gap-x-1 text-sm text-slate-700">{resumeData.skills.map((skill, i) => (<span key={skill.id}>• {skill.name} {i !== resumeData.skills.length - 1 && <span className="mr-1"></span>}</span>))}</div></section>}
           </div>
        </div>
      </main>
      <style jsx global>{` .custom-scrollbar::-webkit-scrollbar { width: 6px; } .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 20px; } .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; } @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } } `}</style>
    </div>
  );
}

function InputGroup({ label, name, value, onChange, placeholder, type = "text", required = false, disabled = false, onKeyDown }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-slate-700 flex">{label} {required && <span className="text-red-500 ml-0.5">*</span>}</label>
      <input type={type} name={name} value={value || ''} onChange={onChange} placeholder={placeholder} disabled={disabled} onKeyDown={onKeyDown} className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white disabled:bg-slate-50" />
    </div>
  );
}