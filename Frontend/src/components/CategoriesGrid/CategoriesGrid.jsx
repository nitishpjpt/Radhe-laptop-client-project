import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdLaptopMac,
  MdOutlineSettings,
  MdWork,
  MdSportsEsports,
  MdPlayCircle,
} from "react-icons/md";
import { FaLaptop } from "react-icons/fa";
import { ProductContext } from "../../Context/ProductContext/ProductContext"; // Adjust path if needed
import { toast } from "react-hot-toast";

const categories = [
  { icon: <MdLaptopMac size={90} />, label: "16.5” Laptops" },
  { icon: <FaLaptop size={90} />, label: "13.5” Laptops" },
  { icon: <MdOutlineSettings size={90} />, label: "Workstations" },
  { icon: <MdWork size={90} />, label: "Business UltraBook" },
  { icon: <MdSportsEsports size={90} />, label: "Gaming Laptops" },
  { icon: <MdPlayCircle size={90} />, label: "Video Editing" },
];

// Mapping labels to subcategories
const labelToSubcategoryMap = {
  "16.5” Laptops": "16.5",
  "13.5” Laptops": "13.5",
  "Workstations": "workstation",
  "Business UltraBook": "ultrabook",
  "Gaming Laptops": "gaming",
  "Video Editing": "video editing",
};

export default function CategoryGrid() {
  const navigate = useNavigate();
  const { productDetails } = useContext(ProductContext);

  const handleCardClick = (label) => {
    const subcategory = labelToSubcategoryMap[label];

    if (!subcategory) {
      toast.error("This category is not available yet.");
      return;
    }

    const matchedProduct = productDetails.find(
      (product) =>
        product.category?.toLowerCase() === "laptops" &&
        product.subcategory?.toLowerCase() === subcategory
    );

    if (matchedProduct) {
      navigate(`/product/${matchedProduct._id}`);
    } else {
      toast.error(`No ${subcategory} products found.`);
    }
  };

  return (
    <div className="min-h-[400px] flex items-center justify-center px-6">
      <div className="flex flex-wrap justify-center gap-6">
        {categories.map((item, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(item.label)}
            className="w-40 h-40 bg-white border-1 rounded-3xl flex flex-col items-center justify-center gap-3 hover:shadow-md transition cursor-pointer"
          >
            <div className="text-black">{item.icon}</div>
            <div className="text-center text-sm font-medium text-black">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
