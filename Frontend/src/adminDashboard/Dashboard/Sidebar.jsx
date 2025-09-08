// adminDashboard/Dashboard/Sidebar.jsx
import React from "react";
import {
  FaHome,
  FaBox,
  FaTags,
  FaChartBar,
  FaUsers,
  FaBell,
  FaCog,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const links = [
    { label: "Dashboard", icon: <FaHome />, path: "/admin-dashboard" },
    { label: "Products", icon: <FaBox />, path: "/admin-dashboard/products" },

    {
      label: "Order Details",
      icon: <FaUsers />,
      path: "/admin-dashboard/admin/details",
    },
    {
      label: "Change Order Status",
      icon: <FaChartBar />,
      path: "/admin-dashboard/admin/order-details",
    },
    {
      label: "Customers Details",
      icon: <FaUsers />,
      path: "/admin-dashboard/admin/custumer-details",
    },
    {
      label: "Enquiry Details",
      icon: <FaTags />,
      path: "/admin-dashboard/contact-details",
    },
    {
      label: "Add Testimonial",
      icon: <FaTags />,
      path: "/admin-dashboard/admin/add-testimonial",
    },
  ];

  return (
    <div className="w-64 bg-gray-100 p-5 shadow-md h-screen">
      <h2 className="text-xl font-bold text-gray-700 mb-5">Admin Panel</h2>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.path}>
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 p-2 rounded-lg ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "hover:bg-blue-100 text-gray-700"
                }`
              }
            >
              {link.icon}
              <span>{link.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
