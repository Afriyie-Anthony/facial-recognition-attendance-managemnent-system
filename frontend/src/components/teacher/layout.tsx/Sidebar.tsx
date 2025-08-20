import React from "react";
import { Link, useLocation } from "react-router-dom";
import { BarChart2, Users, ClipboardList, Settings } from "lucide-react";

const navItems = [
  {
    label: "Dashboard",
    to: "/teacher",
    icon: <BarChart2 size={20} className="" />,
  },
  {
    label: "Students",
    to: "students",
    icon: <Users size={20} className="" />,
  },
  {
    label: "Attendance Records",
    to: "attendance-records",
    icon: <ClipboardList size={20} className="" />,
  },
  {
    label: "Settings",
    to: "settings",
    icon: <Settings size={20} className="" />,
  },
];

const Sidebar = () => {
  const location = useLocation();
  return (
    <aside className="h-screen w-64 shadow bg-white border-r border-gray-200 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between px-6 pt-5">
          <div>
            <div className="text-xl font-bold text-blue-500">TeacherSync</div>
            <div className="text-xs text-gray-400 font-medium mt-1">
              Facial Attendance
            </div>
          </div>
          <button className="text-2xl text-gray-400 hover:text-gray-600 focus:outline-none">
            &times;
          </button>
        </div>
        <hr className="my-3 border-gray-200" />
        <nav className="px-4 pt-5">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className={`flex items-center gap-3 px-2 py-3 rounded-lg font-medium text-base transition-colors ${
                      isActive
                        ? "bg-blue-500 text-white font-semibold"
                        : "hover:bg-gray-100 text-gray-800"
                    }`}
                  >
                    <span
                      className={
                        isActive ? "text-white bg-blue-500" : "text-gray-500"
                      }
                    >
                      {item.icon}
                    </span>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      <div className="px-4 pb-6">
        <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
          <div className="bg-blue-500 text-white font-bold rounded-full w-10 h-10 flex items-center justify-center text-lg">
            JD
          </div>
          <div className="text-left">
            <div className="font-semibold text-gray-800 leading-tight">
              John Doe
            </div>
            <div className="text-xs text-gray-400">Mathematics Teacher</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
