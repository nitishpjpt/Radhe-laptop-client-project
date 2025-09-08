import React from "react";
import { FaReact, FaNodeJs, FaVuejs, FaAngular, FaJs } from "react-icons/fa";
import { SiTailwindcss, SiNextdotjs, SiMongodb, SiRedux } from "react-icons/si";
import { SiAsus } from "react-icons/si";
import { SiLenovo } from "react-icons/si";
import { MdOutlineLaptopMac } from "react-icons/md";
import { SiDell } from "react-icons/si";
import { SiHp } from "react-icons/si";
import { SiAcer } from "react-icons/si";
import { SiToshiba } from "react-icons/si";

const brands = [
  { icon: <SiAsus  size={56} />,  },
  { icon: <SiLenovo size={56} />,  },
  { icon: <MdOutlineLaptopMac size={52} />, name: "MacBook" },
  { icon: <SiDell size={52} />, },
  { icon: <SiHp size={52} />,  },
  { icon: <SiAcer size={56} />,  },
  { icon: <SiToshiba size={56} />,  },
];

const BrandsSection = () => {
  return (
   <div className="mx-4 md:mx-10 lg:mx-[12rem]">
  <div className="py-18 border-t border-b border-gray-300">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
      Brands that we have
    </h2>

    {/* Responsive grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-6 justify-items-center">
      {brands.map((brand, index) => (
        <div
          key={index}
          className="flex items-center gap-2 text-gray-600 hover:text-black transition"
        >
          {brand.icon}
          <span className="font-medium">{brand.name}</span>
        </div>
      ))}
    </div>
  </div>
</div>

  );
};

export default BrandsSection;
