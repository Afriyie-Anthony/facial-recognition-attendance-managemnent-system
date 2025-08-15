
import React, { useState, useEffect } from "react";
import { Clock, Menu } from "lucide-react";

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString();
  };

  return (
    <header className="flex items-center justify-between bg-white px-2 sm:px-4 md:px-6 py-4 md:py-5 shadow border-b border-gray-200">
      {/* Hamburger for mobile */}
      <div className="flex items-center gap-2 w-full max-w-xs">
        <button
          className="md:hidden mr-2 p-2 rounded-lg hover:bg-gray-100 focus:outline-none"
          onClick={onMenuClick}
          aria-label="Open sidebar"
        >
          <Menu size={24} />
        </button>
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-400 text-sm bg-gray-50"
        />
      </div>
      {/* Date & Time */}
      <div className="flex items-center gap-2 sm:gap-3 px-2 sm:px-4 py-2 rounded-lg bg-gradient-to-r from-green-600 to-blue-600 shadow text-white font-bold animate-pulse text-xs sm:text-base">
        <Clock size={20} className="text-white drop-shadow" />
        <span className="tracking-wide hidden xs:inline-block md:text-lg">{formatDate(now)}</span>
        <span className="font-mono text-sm sm:text-lg md:text-xl bg-white/20 px-2 py-1 rounded-lg shadow-inner">{formatTime(now)}</span>
      </div>
    </header>
  );
};

export default Header;
