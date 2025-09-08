import React, { useState, useContext, useEffect } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { ProductContext } from "../../Context/ProductContext/ProductContext";

const FeaturedProducts = () => {
  const { productDetails } = useContext(ProductContext);
  const { category } = useParams();
  const location = useLocation();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [brandFilter, setBrandFilter] = useState(null);
  const [subcategoryFilter, setSubcategoryFilter] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const brand = queryParams.get('brand');
    const subcategory = queryParams.get('subcategory');
    
    let filtered = [...productDetails];
  
    // Filter by category
    if (category) {
      filtered = filtered.filter(
        product => product.category?.toLowerCase() === category.toLowerCase()
      );
    }
  
    // Modified subcategory filter - also checks product name
    if (subcategory) {
      filtered = filtered.filter(product => {
        // Check both subcategory field and product name
        const subcatMatch = product.subcategory?.toLowerCase() === subcategory.toLowerCase();
        const nameMatch = product.productName?.toLowerCase().includes(subcategory.toLowerCase());
        return subcatMatch || nameMatch;
      });
    }
  
    // Filter by brand
    if (brand) {
      filtered = filtered.filter(
        product => product.brandName?.toLowerCase() === brand.toLowerCase()
      );
    }
  
    setFilteredProducts(filtered);
  }, [category, productDetails, location.search]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    window.scrollTo(0, 0);
  };

  const navigateToProduct = (id) => {
    navigate(`/product/${id}`);
  };

  const formatName = (name) => {
    if (!name) return '';
    return name.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div className="container mx-auto px-4 py-8">
    {/* Header Section */}
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
      <h1 className="text-3xl font-bold text-gray-800">
        {category ? formatName(category) : 'Featured Products'}
        {subcategoryFilter && <span className="text-gray-600"> › {formatName(subcategoryFilter)}</span>}
        {brandFilter && <span className="text-gray-600"> ({formatName(brandFilter)})</span>}
      </h1>
      <div className="mt-4 md:mt-0">
        <Link 
          to="/products" 
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          View All Products →
        </Link>
      </div>
    </div>
  
    {/* Products Grid */}
    {filteredProducts.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            onClick={() => handleProductClick(product)}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
          >
            <div className="h-48 bg-gray-100 flex items-center justify-center p-4">
              <img
                src={product.image}
                alt={product.productName}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg text-gray-800 mb-1">
                    {formatName(product.productName)}
                  </h3>
                  {product.brandName && (
                    <p className="text-gray-500 text-sm mb-2">
                      {formatName(product.brandName)}
                    </p>
                  )}
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {formatName(product.subcategory || product.category)}
                </span>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xl font-bold text-gray-900">
                  Rs. {product.price.toLocaleString()}
                </span>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateToProduct(product._id);
                  }}
                  className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center"
                >
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center py-16">
        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
        <p className="text-gray-500 mb-6">We couldn't find any products matching your criteria.</p>
        <Link
          to="/products"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Browse All Products
        </Link>
      </div>
    )}
  
    {/* Product Preview Modal */}
    {selectedProduct && (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl max-w-4xl w-full overflow-hidden shadow-2xl">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 bg-gray-100 p-8 flex items-center justify-center">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.productName}
                className="max-h-96 object-contain"
              />
            </div>
            <div className="md:w-1/2 p-8">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {formatName(selectedProduct.productName)}
                  </h2>
                  <div className="flex items-center space-x-4 mb-4">
                    {selectedProduct.brandName && (
                      <span className="text-gray-600">
                        Brand: <span className="font-medium">{formatName(selectedProduct.brandName)}</span>
                      </span>
                    )}
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {formatName(selectedProduct.subcategory || selectedProduct.category)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
  
              <div className="prose prose-sm text-gray-600 my-6">
                {selectedProduct.description || 'Premium quality product with excellent performance and durability.'}
              </div>
  
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-gray-900">
                    Rs. {selectedProduct.price.toLocaleString()}
                  </span>
                  <button
                    onClick={() => navigateToProduct(selectedProduct._id)}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                  >
                    View Full Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
  );
};

export default FeaturedProducts;