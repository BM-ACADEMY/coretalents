import React, { useEffect, useState } from "react";
import axiosInstance from "@/api/axiosInstance.jsx";
import { Loader, Eye, Trash2, Edit } from "lucide-react";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const res = await axiosInstance.get("/blogs");
      setBlogs(res.data);
    } catch (error) {
      console.error("Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (loading) return <div className="p-10 flex justify-center"><Loader className="animate-spin"/></div>;

  return (
    <div className="bg-white rounded-lg shadow border overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-semibold">
          <tr>
            <th className="p-4">Cover</th>
            <th className="p-4">Title</th>
            <th className="p-4">Category</th>
            <th className="p-4">Status</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {blogs.length === 0 ? (
            <tr><td colSpan="5" className="p-8 text-center text-gray-500">No blogs found.</td></tr>
          ) : (
            blogs.map((blog) => (
              <tr key={blog._id} className="hover:bg-gray-50 transition">
                <td className="p-4">
  <img 
    // Check if the URL is already absolute (starts with http)
    src={blog.coverImage.url.startsWith('http') 
      ? blog.coverImage.url 
      : `${import.meta.env.VITE_SERVER_URL}${blog.coverImage.url}`
    } 
    alt={blog.title}
    className="h-12 w-16 object-cover rounded border"
    // Error fallback if image fails to load
    
  />
</td>
                <td className="p-4 font-medium text-gray-800">{blog.title}</td>
                <td className="p-4"><span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">{blog.category}</span></td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs ${blog.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-200'}`}>
                    {blog.status}
                  </span>
                </td>
                <td className="p-4 text-right flex justify-end gap-2">
                  <button className="p-2 text-gray-500 hover:text-blue-600"><Edit size={16}/></button>
                  <button className="p-2 text-gray-500 hover:text-red-600"><Trash2 size={16}/></button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BlogList;