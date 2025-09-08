import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FiEdit, FiTrash2, FiPlus, FiX, FiStar } from "react-icons/fi";

const TestimonialsManagement = () => {
  const [form, setForm] = useState({
    name: "",
    company: "",
    text: "",
    stars: 5,
  });
  const [imageFile, setImageFile] = useState(null);
  const [testimonials, setTestimonials] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTestimonials = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/testimonials`
      );
      setTestimonials(res.data);
      toast.success("Testimonials loaded successfully");
    } catch (err) {
      toast.error("Failed to load testimonials");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const toastId = toast.loading(
      editingId ? "Updating testimonial..." : "Adding testimonial..."
    );

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("company", form.company);
    formData.append("text", form.text);
    formData.append("stars", form.stars);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      if (editingId) {
        await axios.put(
          `${
            import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
          }/testimonials/${editingId}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        toast.success("Testimonial updated successfully", { id: toastId });
      } else {
        await axios.post(
          `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/testimonials`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        toast.success("Testimonial added successfully", { id: toastId });
      }
      resetForm();
      fetchTestimonials();
      setIsModalOpen(false);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Error processing testimonial",
        { id: toastId }
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (testimonial) => {
    setForm({
      name: testimonial.name,
      company: testimonial.company,
      text: testimonial.text,
      stars: testimonial.stars,
    });
    setEditingId(testimonial._id);
    setIsModalOpen(true);
    toast("Editing testimonial", { icon: "✏️" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      setIsLoading(true);
      const toastId = toast.loading("Deleting testimonial...");
      try {
        await axios.delete(
          `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/testimonials/${id}`
        );
        toast.success("Testimonial deleted successfully", { id: toastId });
        fetchTestimonials();
      } catch (err) {
        toast.error("Failed to delete testimonial", { id: toastId });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const resetForm = () => {
    setForm({ name: "", company: "", text: "", stars: 5 });
    setImageFile(null);
    setEditingId(null);
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
    toast.success("Image selected");
  };

  const renderStars = (count) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <FiStar
          key={i}
          className={`${
            i < count ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
          }`}
        />
      ));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Testimonials Management
          </h1>
          <button
            onClick={() => {
              resetForm();
              setIsModalOpen(true);
              toast("Adding new testimonial", { icon: "➕" });
            }}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <FiPlus /> Add Testimonial
          </button>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              <div className="flex justify-between items-center border-b p-4">
                <h2 className="text-xl font-semibold">
                  {editingId ? "Edit Testimonial" : "Add New Testimonial"}
                </h2>
                <button
                  onClick={() => {
                    resetForm();
                    setIsModalOpen(false);
                    toast("Cancelled testimonial edit", { icon: "❌" });
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX size={24} />
                </button>
              </div>
              <form
                onSubmit={handleSubmit}
                className="p-4 space-y-4"
                encType="multipart/form-data"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Acme Inc."
                    className="w-full border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full border border-gray-300 p-2 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    required={!editingId}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Testimonial
                  </label>
                  <textarea
                    name="text"
                    value={form.text}
                    onChange={handleChange}
                    placeholder="This product changed my life..."
                    rows={4}
                    className="w-full border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rating
                  </label>
                  <select
                    name="stars"
                    value={form.stars}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "star" : "stars"}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      resetForm();
                      setIsModalOpen(false);
                      toast("Cancelled testimonial edit", { icon: "❌" });
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isLoading ? (
                      "Processing..."
                    ) : editingId ? (
                      <>
                        <FiEdit /> Update
                      </>
                    ) : (
                      <>
                        <FiPlus /> Add Testimonial
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Testimonials Table */}
        {isLoading && !isModalOpen ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {testimonials.map((testimonial) => (
                  <tr key={testimonial._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {testimonial.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {testimonial.company}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex">
                        {renderStars(testimonial.stars)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEdit(testimonial)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        <FiEdit className="inline" />
                      </button>
                      <button
                        onClick={() => handleDelete(testimonial._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FiTrash2 className="inline" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestimonialsManagement;
