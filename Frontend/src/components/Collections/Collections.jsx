import React from "react";
import { useNavigate } from "react-router-dom";

const collections = [
  {
    title: "ACCESSORIES",
    img: "https://theme905-computer-shop.myshopify.com/cdn/shop/collections/img_19_370x370_crop_top.progressive.png.jpg?v=1644320791",
  },
  {
    title: "BESTSELLER'S",
    img: "https://theme905-computer-shop.myshopify.com/cdn/shop/collections/img_06_370x370_crop_top.progressive.png.jpg?v=1657617345",
  },
  {
    title: "CAMERAS & PHOTOGRAPHY",
    img: "https://theme905-computer-shop.myshopify.com/cdn/shop/collections/img_17_370x370_crop_top.progressive.png.jpg?v=1644320781",
  },
  {
    title: "COMING SOON",
    img: "https://theme905-computer-shop.myshopify.com/cdn/shop/collections/belkin_boost_up_wireless_charging_dock_for_iphone_apple_watch_5_370x370_crop_top.progressive.jpg?v=1651585676",
  },
  {
    title: "COMPUTING",
    img: "https://theme905-computer-shop.myshopify.com/cdn/shop/collections/img_20_370x370_crop_top.progressive.png.jpg?v=1644320802",
  },
  {
    title: "LAPTOPS & COMPUTERS",
    img: "https://theme905-computer-shop.myshopify.com/cdn/shop/collections/img_15_370x370_crop_top.progressive.png.jpg?v=1644320837",
  },
];

const Collections = () => {

    const navigate = useNavigate();

    const collection = () => {
    navigate(`/products`);
    }

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h2 className="text-center text-3xl font-semibold mb-8">All Catalog</h2>
      <div onClick={() => collection()} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((item, index) => (
          <div
            key={index}
            className="relative  group overflow-hidden rounded-xl"
          >
            <div>
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-64 brightness-50 sm:h-72 lg:h-80 object-cover -backdrop-contrast-60 transition-transform duration-300 group-hover:scale-110 group-hover:opacity-70"
              />
            </div>
            <div className="absolute inset-0  flex items-center justify-center">
              <h3 className="text-white text-3xl font-extrabold text-center">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collections;
