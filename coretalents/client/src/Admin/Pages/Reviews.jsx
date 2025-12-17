import React, { useState, useEffect } from 'react';
import axiosInstance from '@/api/axiosInstance';
import { showToast } from '@/utils/customToast';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({ name: '', work: '', content: '' });
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ name: '', work: '', content: '' });
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch all reviews
  const fetchReviews = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/review');
      setReviews(response.data.data || []);
      showToast('success', 'Reviews fetched successfully');
    } catch (err) {
      showToast('error', 'Failed to fetch reviews');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle edit input changes
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  // Create new review
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.post('/review', formData);
      setReviews(prev => [response.data.data, ...prev]);
      setFormData({ name: '', work: '', content: '' });
      showToast('success', 'Review created successfully');
    } catch (err) {
      showToast('error', 'Failed to create review');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Edit review
  const handleEdit = (review) => {
    setEditingId(review._id);
    setEditData({ name: review.name, work: review.work || '', content: review.content });
    setCurrentPage(1); // Reset to first page on edit
  };

  // Update review
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.put(`/review/${editingId}`, editData);
      setReviews(prev => prev.map(r => r._id === editingId ? response.data.data : r));
      setEditingId(null);
      setEditData({ name: '', work: '', content: '' });
      showToast('success', 'Review updated successfully');
    } catch (err) {
      showToast('error', 'Failed to update review');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Delete review
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axiosInstance.delete(`/review/${id}`);
      setReviews(prev => prev.filter(r => r._id !== id));
      showToast('success', 'Review deleted successfully');
    } catch (err) {
      showToast('error', 'Failed to delete review');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditData({ name: '', work: '', content: '' });
  };

  // Pagination handlers
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handlePrev = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const handleNext = () => {
    const totalPages = Math.ceil(reviews.length / itemsPerPage);
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentReviews = reviews.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(reviews.length / itemsPerPage);

  if (loading && reviews.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-lg text-gray-600">Loading reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Customer Reviews</h1>

        {/* Add/Edit Form */}
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl mb-12 border border-white/20">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            {editingId ? 'Edit Review' : 'Add New Review'}
          </h2>
          <form onSubmit={editingId ? handleUpdate : handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={editingId ? editData.name : formData.name}
                onChange={editingId ? handleEditInputChange : handleInputChange}
                required
                placeholder="Enter your name"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="work" className="block text-sm font-semibold text-gray-700 mb-2">Work/Section</label>
              <input
                type="text"
                id="work"
                name="work"
                value={editingId ? editData.work : formData.work}
                onChange={editingId ? handleEditInputChange : handleInputChange}
                placeholder="Enter your work or section (optional)"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="content" className="block text-sm font-semibold text-gray-700 mb-2">Review Content</label>
              <textarea
                id="content"
                name="content"
                value={editingId ? editData.content : formData.content}
                onChange={editingId ? handleEditInputChange : handleInputChange}
                required
                placeholder="Share your thoughts..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm h-32 resize-none"
                disabled={loading}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button 
                type="submit" 
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {loading ? 'Processing...' : (editingId ? 'Update Review' : 'Add Review')}
              </button>
              {editingId && (
                <button 
                  type="button" 
                  className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2" 
                  onClick={handleCancelEdit}
                  disabled={loading}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {currentReviews.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500 italic">No reviews yet. Be the first to add one!</p>
            </div>
          ) : (
            currentReviews.map((review) => (
              <div key={review._id} className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex-1">
                    <div className="text-2xl font-bold text-gray-800 mb-1">{review.name}</div>
                    {review.work && <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full inline-block">{review.work}</div>}
                  </div>
                  <div className="flex space-x-3 ml-4">
                    <button 
                      className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                      onClick={() => handleEdit(review)}
                      disabled={loading}
                    >
                      Edit
                    </button>
                    <button 
                      className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500" 
                      onClick={() => handleDelete(review._id)}
                      disabled={loading}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="text-gray-700 text-lg leading-relaxed mb-6">{review.content}</div>
                <div className="text-sm text-gray-500 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Posted on {new Date(review.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-12">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-semibold rounded-xl transition-all duration-200 shadow-md disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => paginate(page)}
                className={`px-4 py-2 font-semibold rounded-xl transition-all duration-200 shadow-md ${
                  currentPage === page
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-semibold rounded-xl transition-all duration-200 shadow-md disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;