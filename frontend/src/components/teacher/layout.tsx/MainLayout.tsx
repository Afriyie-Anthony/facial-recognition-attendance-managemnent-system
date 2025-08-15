import Sidebar from "./Sidebar";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import MobileNavbar from "./MobileNavbar";


const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#fff]">
      {/* Sidebar: hidden on mobile, visible on md+ */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* Sidebar Drawer for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="relative w-64">
            <Sidebar />
            <button
              className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-600 focus:outline-none md:hidden"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              &times;
            </button>
          </div>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-30"
            onClick={() => setSidebarOpen(false)}
          />
        </div>
      )}

      <div className="flex flex-col flex-grow min-w-0">
        {/* Mobile Navigation */}
        <div className="md:hidden">
          <MobileNavbar />
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header with hamburger for mobile */}
          <Header onMenuClick={() => setSidebarOpen(true)} />

          <main className="flex-1 overflow-y-auto p-2 sm:p-4 md:p-5">
            {/* Main content */}
            <Outlet />
          </main>
          {/* Footer */}
          <footer className="bg-white text-slate-500 py-3">
            <div className="container mx-auto px-2 sm:px-4 text-center">
              <p>&copy; {new Date().getFullYear()} Attendance Management System</p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;