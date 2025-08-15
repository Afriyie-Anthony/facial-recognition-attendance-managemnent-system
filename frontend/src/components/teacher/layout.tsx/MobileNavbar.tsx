import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { Menu, X } from "lucide-react";
import { navLinks } from "../../../assets/data/NavLinks";


const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="md:hidden bg-slate-800 text-white">
      <div className="flex justify-between items-center p-4 bg-maroon text-white">
        <h2 className="text-gold text-xl font-bold">School Portal</h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-white rounded-md hover:bg-maroon-dark"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-slate-800 z-50 pt-16">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 p-2 text-white"
          >
            <X size={24} />
          </button>

          {navLinks.map((item, index) => (
            <nav className="px-4" key={index}>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-5">
                  {item.title}
                </h3>
              <ul>
                {item.menuItems.map((link) => {
                  const isActive = location.pathname === link.to;
                  return (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                          isActive
                            ? "bg-gold text-maroon font-medium"
                            : "text-white hover:bg-maroon-dark hover:text-gold"
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="mr-3">
                          <link.icon />
                        </span>
                        <span>{link.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileNavbar;
