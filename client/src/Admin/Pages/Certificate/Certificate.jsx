import React, { useState, useEffect } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Trash2, Eye, Plus, Loader2, Pencil, X } from "lucide-react"; // Added Pencil, X
import toast from "react-hot-toast";

const Certificate = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(false);

  // Track which ID we are editing (null means creating new)
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    studentName: "",
    courseName: "",
    issueDate: "",
    certificateNumber: "",
  });

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/certificates");
      if (res.data.success) setCertificates(res.data.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch certificates");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Populate form with existing data
  const handleEdit = (cert) => {
    setEditingId(cert._id);
    setFormData({
      studentName: cert.studentName,
      courseName: cert.courseName,
      // Format date to YYYY-MM-DD for input field
      issueDate: new Date(cert.issueDate).toISOString().split('T')[0],
      certificateNumber: cert.certificateNumber // Optional: usually auto-generated/readonly
    });
    // Scroll to top to see the form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ studentName: "", courseName: "", issueDate: "", certificateNumber: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.studentName || !formData.courseName || !formData.issueDate) {
      toast.error("Please fill in all required fields");
      return;
    }
    try {
      let res;
      if (editingId) {
        // UPDATE Existing
        res = await axiosInstance.put(`/certificates/${editingId}`, formData);
        if (res.data.success) {
          toast.success("Certificate Updated Successfully!");
        }
      } else {
        // CREATE New
        res = await axiosInstance.post("/certificates", formData);
        if (res.data.success) {
          toast.success("Certificate Created!");
        }
      }

      // Reset form and refresh list
      handleCancelEdit();
      fetchCertificates();

    } catch (error) {
      toast.error(error.response?.data?.message || "Error saving certificate");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this certificate?")) return;
    try {
      await axiosInstance.delete(`/certificates/${id}`);
      toast.success("Deleted successfully");
      // If we deleted the item being edited, reset the form
      if (editingId === id) handleCancelEdit();
      fetchCertificates();
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  const handlePreview = (id) => {
    const url = `/verify-certificate/${id}`;
    window.open(url, "_blank");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-800">Certificate Management</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Section */}
        <Card className="lg:col-span-1 h-fit shadow-md border-t-4 border-t-slate-900">
          <CardHeader>
            <CardTitle>{editingId ? "Edit Certificate" : "Issue New Certificate"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <Label>Student Name</Label>
                <Input name="studentName" value={formData.studentName} onChange={handleChange} placeholder="e.g. Rahini .E" required />
              </div>
              <div className="space-y-1">
                <Label>Workshop / Course Name</Label>
                <Input name="courseName" value={formData.courseName} onChange={handleChange} placeholder="e.g. Job Interview Psychology" required />
              </div>
              <div className="space-y-1">
                <Label>Issue Date</Label>
                <Input type="date" name="issueDate" value={formData.issueDate} onChange={handleChange} required />
              </div>

              <div className="flex gap-2 pt-2">
                <Button type="submit" className="flex-1 bg-slate-900 hover:bg-slate-800">
                  {editingId ? <Pencil className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                  {editingId ? "Update Certificate" : "Generate Certificate"}
                </Button>

                {editingId && (
                  <Button type="button" variant="outline" onClick={handleCancelEdit} title="Cancel Edit">
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        {/* List Section */}
        <Card className="lg:col-span-2 shadow-md">
          <CardHeader><CardTitle>Issued Certificates</CardTitle></CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center p-8"><Loader2 className="animate-spin text-slate-500" /></div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Certificate ID</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {certificates.map((cert) => (
                    <TableRow key={cert._id} className={editingId === cert._id ? "bg-slate-100" : ""}>
                      <TableCell className="font-mono text-xs text-slate-500">{cert.certificateNumber}</TableCell>
                      <TableCell className="font-medium">{cert.studentName}</TableCell>
                      <TableCell>{cert.courseName}</TableCell>
                      <TableCell>{formatDate(cert.issueDate)}</TableCell>
                      <TableCell className="flex justify-end gap-2">
                        {/* Edit Button */}
                        <Button variant="outline" size="icon" onClick={() => handleEdit(cert)}>
                          <Pencil className="w-4 h-4 text-blue-600" />
                        </Button>
                        {/* Preview Button */}
                        <Button variant="outline" size="icon" onClick={() => handlePreview(cert._id)}>
                          <Eye className="w-4 h-4 text-slate-600" />
                        </Button>
                        {/* Delete Button */}
                        <Button variant="outline" size="icon" onClick={() => handleDelete(cert._id)}>
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Certificate;
