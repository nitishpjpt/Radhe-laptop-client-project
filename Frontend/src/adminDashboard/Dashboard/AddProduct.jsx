import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FiEdit, FiTrash2, FiEye, FiPlus } from "react-icons/fi";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    productName: "",
    shortDescription: [""],
    longDescription: "",
    price: "",
    category: "",
    subcategory: "",
    brandName: "",
    image: null,
    _id: null,
  });
  const [isViewMode, setIsViewMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  const subcategories = {
    accessories: [
      "motherboard",
      "keyboard",
      "mouse",
      "ram",
      "processor",
      "panel",
      "cooling fan",
      "graphic card",
    ],
    laptops: [
      "gaming",
      "ultrabook",
      // "business",
      "16.5 Laptops",
      "13.5 Laptops",
      "workstations",
      "editing",
    ],
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/product/all`
      );
      setProducts(response.data.products);
    } catch (error) {
      toast.error("Failed to fetch products");
    }
  };

  const handleShortDescriptionChange = (index, value) => {
    const newShortDescriptions = [...currentProduct.shortDescription];
    newShortDescriptions[index] = value;
    setCurrentProduct({
      ...currentProduct,
      shortDescription: newShortDescriptions,
    });
  };

  const addShortDescriptionField = () => {
    setCurrentProduct({
      ...currentProduct,
      shortDescription: [...currentProduct.shortDescription, ""],
    });
  };

  const removeShortDescriptionField = (index) => {
    if (currentProduct.shortDescription.length > 1) {
      const newShortDescriptions = [...currentProduct.shortDescription];
      newShortDescriptions.splice(index, 1);
      setCurrentProduct({
        ...currentProduct,
        shortDescription: newShortDescriptions,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "category") {
      setCurrentProduct({ ...currentProduct, [name]: value, subcategory: "" });
    } else {
      setCurrentProduct({ ...currentProduct, [name]: value });
    }
  };

  const handleImageChange = (e) => {
    setCurrentProduct({ ...currentProduct, image: e.target.files[0] });
  };

  const resetForm = () => {
    setCurrentProduct({
      productName: "",
      shortDescription: [""],
      longDescription: "",
      price: "",
      category: "",
      subcategory: "",
      brandName: "",
      image: null,
      _id: null,
    });
    document.getElementById("imageInput")?.value &&
      (document.getElementById("imageInput").value = "");
    setIsViewMode(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productName", currentProduct.productName);

    // Append each short description point
    currentProduct.shortDescription.forEach((point) => {
      formData.append("shortDescription", point);
    });

    formData.append("longDescription", currentProduct.longDescription);
    formData.append("price", currentProduct.price);
    formData.append("category", currentProduct.category);
    formData.append("subcategory", currentProduct.subcategory);
    formData.append("brandName", currentProduct.brandName);

    if (currentProduct.image) {
      formData.append("image", currentProduct.image);
    }

    try {
      if (currentProduct._id) {
        await axios.put(
          `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/product/${
            currentProduct._id
          }`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        toast.success("Product updated successfully!");
      } else {
        await axios.post(
          `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/product/add`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        toast.success("Product added successfully!");
      }

      fetchProducts();
      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed");
    }
  };

  const handleEdit = (product) => {
    setCurrentProduct({
      ...product,
      shortDescription: product.shortDescription || [""],
      image: null,
    });
    setIsModalOpen(true);
    setIsViewMode(false);
  };

  const handleView = (product) => {
    setCurrentProduct({
      ...product,
      shortDescription: product.shortDescription || [""],
    });
    setIsModalOpen(true);
    setIsViewMode(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/product/${id}`
        );
        toast.success("Product deleted successfully");
        fetchProducts();
      } catch (error) {
        toast.error("Failed to delete product");
      }
    }
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(products.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Product Management</h1>
        <button
          onClick={openAddModal}
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <FiPlus className="mr-2" />
          Add Product
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Brand
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentProducts.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="px-10 py-8 whitespace-nowrap">
                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.productName}
                      className="h-10 w-10 rounded-full object-contain"
                    />
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.brandName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.productName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.category}
                  {product.subcategory && ` / ${product.subcategory}`}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  Rs.{product.price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleView(product)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                    title="View"
                  >
                    <FiEye />
                  </button>
                  <button
                    onClick={() => handleEdit(product)}
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                    title="Edit"
                  >
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="text-red-600 hover:text-red-900"
                    title="Delete"
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        {products.length > productsPerPage && (
          <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Previous
              </button>
              <button
                onClick={() =>
                  paginate(
                    currentPage < totalPages ? currentPage + 1 : totalPages
                  )
                }
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing{" "}
                  <span className="font-medium">{indexOfFirstProduct + 1}</span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {Math.min(indexOfLastProduct, products.length)}
                  </span>{" "}
                  of <span className="font-medium">{products.length}</span>{" "}
                  results
                </p>
              </div>
              <div>
                <nav
                  className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                  aria-label="Pagination"
                >
                  <button
                    onClick={() =>
                      paginate(currentPage > 1 ? currentPage - 1 : 1)
                    }
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Previous</span>
                    &larr;
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (number) => (
                      <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          currentPage === number
                            ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                            : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                        }`}
                      >
                        {number}
                      </button>
                    )
                  )}
                  <button
                    onClick={() =>
                      paginate(
                        currentPage < totalPages ? currentPage + 1 : totalPages
                      )
                    }
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Next</span>
                    &rarr;
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b px-6 py-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                {isViewMode
                  ? "Product Details"
                  : currentProduct._id
                  ? "Edit Product"
                  : "Add New Product"}
              </h2>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  resetForm();
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Brand Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Brand Name
                </label>
                <input
                  type="text"
                  name="brandName"
                  value={currentProduct.brandName}
                  onChange={handleChange}
                  placeholder="Enter brand name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  required
                  disabled={isViewMode}
                />
              </div>

              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  name="productName"
                  value={currentProduct.productName}
                  onChange={handleChange}
                  placeholder="Enter product name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  required
                  disabled={isViewMode}
                />
              </div>

              {/* Short Descriptions (Bullet Points) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Key Features (One per line)
                </label>
                {currentProduct.shortDescription.map((point, index) => (
                  <div key={index} className="flex mb-2">
                    <input
                      type="text"
                      value={point}
                      onChange={(e) =>
                        handleShortDescriptionChange(index, e.target.value)
                      }
                      placeholder="Enter feature"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      required={index === 0}
                      disabled={isViewMode}
                    />
                    {!isViewMode && (
                      <div className="flex ml-2">
                        {currentProduct.shortDescription.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeShortDescriptionField(index)}
                            className="ml-2 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                          >
                            -
                          </button>
                        )}
                        {index ===
                          currentProduct.shortDescription.length - 1 && (
                          <button
                            type="button"
                            onClick={addShortDescriptionField}
                            className="ml-2 px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
                          >
                            +
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Long Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Detailed Description
                </label>
                <textarea
                  name="longDescription"
                  value={currentProduct.longDescription}
                  onChange={handleChange}
                  placeholder="Enter detailed product description"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  rows="4"
                  disabled={isViewMode}
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2">$</span>
                  <input
                    type="number"
                    name="price"
                    value={currentProduct.price}
                    onChange={handleChange}
                    placeholder="Enter price"
                    className="w-full pl-8 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    required
                    disabled={isViewMode}
                  />
                </div>
              </div>

              {/* Main Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={currentProduct.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  required
                  disabled={isViewMode}
                >
                  <option value="">Select Category</option>
                  <option value="accessories">Accessories</option>
                  <option value="laptops">Laptops</option>
                </select>
              </div>

              {/* Subcategory (conditionally shown) */}
              {currentProduct.category && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subcategory
                  </label>
                  <select
                    name="subcategory"
                    value={currentProduct.subcategory}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    disabled={isViewMode}
                  >
                    <option value="">Select Subcategory (Optional)</option>
                    {subcategories[currentProduct.category]?.map((subcat) => (
                      <option key={subcat} value={subcat}>
                        {subcat.charAt(0).toUpperCase() + subcat.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Image
                </label>
                {currentProduct.image && (
                  <div className="mb-3">
                    <img
                      src={
                        typeof currentProduct.image === "string"
                          ? currentProduct.image
                          : URL.createObjectURL(currentProduct.image)
                      }
                      alt="Current product"
                      className="h-20 w-20 object-cover rounded-lg"
                    />
                  </div>
                )}
                {!isViewMode && (
                  <input
                    id="imageInput"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    required={!currentProduct._id}
                  />
                )}
              </div>

              {!isViewMode && (
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      resetForm();
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  >
                    {currentProduct._id ? "Update" : "Add"} Product
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
