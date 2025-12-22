import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ChevronRight, CheckCircle, MessageCircle, Calendar, User,
  Share2, Clock, Briefcase, MessageSquareText, Monitor,
  Users, Award, Facebook, Instagram, Linkedin, X, LinkIcon, Loader
} from "lucide-react";
import { Helmet } from "react-helmet";

// Asset Imports (Matches your template paths)
import axiosInstance from "@/api/axiosInstance.jsx";
import Logo from "@/assets/logo/logo.png";
import bmlogo from "@/assets/logo/logo.png";
// import "../../Blog/Pages/css/Style.css";

const BlogDetails = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // --- STATE FOR MODAL AND FORM (From your template) ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "", phone: "", course: "General Inquiry", location: "Pondicherry",
  });

  const whatsappUrl = "https://wa.me/919944940051?text=Hi%20BM%20Academy...";

  // Fetch Blog Data
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axiosInstance.get(`/blogs/${slug}`);
        setBlog(res.data);
      } catch (error) {
        console.error("Blog not found");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  // --- HANDLERS (From your template) ---
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const message = `*New Counseling Request*\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Interested Course:* ${formData.course}\n*Location:* ${formData.location}\nHi BM Academy, I read your blog: ${blog.title}.`;
    window.open(`https://wa.me/919944940051?text=${encodeURIComponent(message)}`, "_blank");
    setIsModalOpen(false);
  };

  if (loading) return <div className="flex justify-center items-center h-screen"><Loader className="animate-spin text-blue-600" size={48} /></div>;
  if (!blog) return <div className="text-center p-20 text-xl font-bold">Blog post not found.</div>;

  return (
   <div className="min-h-screen bg-gray-50 font-sans text-gray-800 relative pt-[80px] md:pt-[100px]">
      <Helmet>
        <title>{blog.metaTitle || blog.title} | BM Academy</title>
        <meta name="description" content={blog.metaDescription || blog.description} />
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* --- MAIN CONTENT (LEFT) --- */}
        <main className="lg:col-span-8">
          {/* Breadcrumb */}
          <nav className="flex mb-6 text-sm text-gray-500">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li><Link to="/blog" className="inline-flex items-center hover:text-blue-600"><MessageSquareText className="w-4 h-4 mr-2" />Blog</Link></li>
              <li aria-current="page">
                <div className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                  <span className="ml-1 md:ml-2 text-gray-700 font-medium truncate max-w-[200px]">{blog.title}</span>
                </div>
              </li>
            </ol>
          </nav>

          {/* Header */}
          <div className="mb-8">
            <div className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-semibold uppercase mb-4">
              {blog.category || "Education"}
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-6">{blog.title}</h1>
            <div className="flex items-center gap-4 text-gray-500 text-sm border-b pb-6">
              <div className="flex items-center"><User className="w-4 h-4 mr-2" /><span>{blog.author?.name || "Admin"}</span></div>
              <div className="flex items-center"><Calendar className="w-4 h-4 mr-2" /><span>{new Date(blog.createdAt).toLocaleDateString()}</span></div>
            </div>
          </div>

          {/* Featured Image */}
          {/* Featured Image - Updated Logic */}
<div className="mb-8 rounded-xl overflow-hidden shadow-lg h-64 md:h-96">
  <img 
    src={blog.coverImage.url.startsWith('http') 
      ? blog.coverImage.url 
      : `${import.meta.env.VITE_SERVER_URL}${blog.coverImage.url}`
    } 
    alt={blog.title} 
    className="w-full h-full object-cover" 
  />
</div>

          {/* DYNAMIC BLOCKS RENDERER */}
          <article className="prose prose-lg max-w-none text-gray-700 space-y-12">
            {blog.contentBlocks.map((block, index) => (
              <div key={index}>
                {block.type === 'heading' && <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{block.data.text}</h2>}
                
                {block.type === 'paragraph' && <p className="leading-relaxed mb-4">{block.data.text}</p>}
                
                {block.type === 'image' && block.data.url && (
                  <img src={block.data.url} alt="Content" className="rounded-xl shadow-md my-6 w-full object-cover max-h-96" />
                )}
                
                {block.type === 'list' && (
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4 bg-gray-50 p-6 rounded-lg list-none">
                    {block.data.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                        <span className="font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {block.type === 'quote' && (
                  <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg italic my-8">
                    <p className="text-xl text-gray-800">"{block.data.text}"</p>
                    {block.data.author && <p className="text-right font-bold text-blue-700 mt-2">— {block.data.author}</p>}
                  </div>
                )}

                {block.type === 'button' && (
                   <div className="text-center my-8">
                    <a href={block.data.url} target="_blank" rel="noreferrer" className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-full font-bold text-lg hover:shadow-xl transition transform hover:-translate-y-1">
                      <LinkIcon className="w-5 h-5 mr-2" /> {block.data.text}
                    </a>
                   </div>
                )}
              </div>
            ))}
          </article>

          {/* CTA Section (Footer of Article) */}
          <div className="mt-12 p-8 bg-gradient-to-r from-blue-700 to-indigo-800 rounded-2xl text-white text-center shadow-xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Start Your Career Journey Today</h2>
            <p className="mb-8 text-blue-100 max-w-lg mx-auto leading-relaxed">Join BM Academy and master the skills required for the 2025 industry landscape.</p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <button onClick={toggleModal} className="bg-transparent border-2 border-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-blue-700 transition">Book Free Counseling</button>
              <a href={whatsappUrl} className="bg-green-500 px-8 py-3 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-green-600 transition shadow-lg">
                <MessageCircle className="w-6 h-6" /> Chat on WhatsApp
              </a>
            </div>
          </div>
        </main>

        {/* --- SIDEBAR (RIGHT) --- */}
        <aside className="lg:col-span-4 space-y-8 mt-8 lg:mt-0 lg:sticky lg:top-20 h-fit">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4 uppercase text-xs tracking-wider">About BM Academy</h3>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border">
                <img src={bmlogo} alt="logo" className="w-full h-full object-cover" />
              </div>
              <p className="font-bold text-gray-900">BM Academy</p>
            </div>
            <p className="text-sm text-gray-600 mt-4 leading-relaxed">BM Academy offers hands-on training in Digital Marketing, Web Development, and AI tools, designed for today's industry.</p>
          </div>

          <div className="bg-green-50 p-6 rounded-xl border border-green-100">
            <h3 className="font-bold text-green-800 mb-2">Have Questions?</h3>
            <p className="text-sm text-green-700 mb-4">Talk to our counselor today for a custom career roadmap.</p>
            <a href={whatsappUrl} className="text-sm font-semibold text-green-700 underline">Connect instantly &rarr;</a>
          </div>
        </aside>
      </div>

      {/* --- MODAL (From your template) --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden animate-fade-in-up">
            <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-6 text-white">
              <div className="flex justify-between">
                <h3 className="text-xl font-bold">Free Counseling</h3>
                <button onClick={toggleModal}><X className="w-6 h-6" /></button>
              </div>
            </div>
            <div className="p-6">
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <input type="text" name="name" required placeholder="Your Name" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 ring-blue-500" />
                <input type="tel" name="phone" required placeholder="Phone (10 digits)" maxLength="10" value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 ring-blue-500" />
                <input type="text" name="course" placeholder="Interested Course" value={formData.course} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 ring-blue-500" />
                <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg shadow-lg flex items-center justify-center gap-2">
                  <MessageCircle className="w-5 h-5" /> Connect on WhatsApp
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetails;