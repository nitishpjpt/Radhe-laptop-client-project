import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar for desktop */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Sidebar Drawer (Mobile) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 bg-opacity-40 md:hidden"
          onClick={closeSidebar}
        >
          <div
            className="w-64 bg-white h-full shadow-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-xl text-gray-700"
              onClick={closeSidebar}
            >
              <FiX />
            </button>
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Topbar for mobile */}
        <div className="md:hidden p-4 bg-white shadow flex items-center justify-between">
          <button onClick={toggleSidebar}>
            <FiMenu className="text-2xl text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold">Dashboard</h1>
        </div>

        <main className="flex-1 p-4 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
