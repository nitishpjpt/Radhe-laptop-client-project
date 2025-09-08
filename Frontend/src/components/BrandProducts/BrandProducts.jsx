import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ProductContext } from "../../Context/ProductContext/ProductContext";

const BrandProducts = () => {
  const { brandName } = useParams(); // Get the brand from URL
  const { productDetails } = useContext(ProductContext);
  const navigate = useNavigate();

  // Convert brandName to Title Case
  const formattedBrandName = brandName.replace(/\b\w/g, (char) =>
    char.toUpperCase()
  );

  // Filter laptops based on brand
  const brandLaptops = productDetails.filter(
    (product) => product.brandName.toLowerCase() === brandName.toLowerCase()
  );

  const accessoriesProducts = brandLaptops.filter(
    (product) => product.category.toLowerCase() === "laptops"
  );
  console.log("Accessories Products:", accessoriesProducts);

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
        <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
          {formattedBrandName}
        </span>{" "}
        Laptops
      </h1>
      {accessoriesProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {accessoriesProducts.map((laptop) => {
            // Format Product Name
            const formattedProductName = laptop.productName
              .replace(/\b\w/g, (char) => char.toUpperCase());

            return (
              <div
                key={laptop._id}
                className="bg-white rounded-lg shadow-lg p-5 transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer"
                onClick={() => handleProductClick(laptop._id)}
              >
                <img
                  src={laptop.image}
                  alt={laptop.productName}
                  className="w-full h-52 object-contain rounded-md"
                />
                <h2 className="text-lg font-semibold text-blue-600 mt-4">
                  {formattedProductName}
                </h2>
                <p className="text-gray-700 text-lg mt-2 font-medium">
                  Rs. {laptop.price}
                </p>
                <button
                  className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  View Details
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg mt-10">
          No laptops available for this brand.
        </p>
      )}
    </div>
  );
};

export default BrandProducts;
