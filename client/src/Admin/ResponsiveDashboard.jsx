// src/Admin/ResponsiveDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  Bell, 
  Search, 
  User, 
  LogOut 
} from 'lucide-react';
import { BsFillHousesFill } from "react-icons/bs";

// --- Your Separate Files ---
import Breadcrumbs from './Breadcrumbs';
import { sidebarLinks } from './sidebarLinks';

// --- Auth Context ---
import { useAuth } from '@/Context/Authcontext'; // Adjust path if needed

// --- Theme Configuration ---
const THEME = {
  bg: "bg-gray-50",
  text: "text-gray-900",
  textSecondary: "text-gray-600",
  textMuted: "text-gray-400",
  sidebar: "bg-white border-r border-gray-300",
  sidebarActive: "bg-blue-50 text-blue-700 font-semibold",
  sidebarInactive: "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
  header: "bg-white/90 backdrop-blur-xl border-b border-gray-300",
  card: "bg-white border border-gray-300 shadow-sm",
  inputBg: "bg-white",
  inputBorder: "border-gray-300",
  inputPlaceholder: "placeholder:text-gray-400",
  iconButton: "bg-white border border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-gray-900",
};

// --- Sidebar Component ---
const Sidebar = ({ isOpen, setIsOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
    setIsOpen(false); // Close sidebar on mobile
  };

  const getInitials = (name) => {
    if (!name) return "A";
    return name.trim().split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
 <>
      <div 
        className={`fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-20 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      />

      <aside className={`fixed inset-y-0 left-0 z-30 w-72 ${THEME.sidebar} transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="h-24 flex items-center px-8">
            <div className="flex items-center gap-3">
              <div>
                <h1 className={`font-bold text-xl tracking-tight ${THEME.text}`}>Admin</h1>
                <p className={`text-[11px] font-semibold uppercase tracking-widest ${THEME.textMuted}`}>CoreTalents</p>
              </div>
            </div>
          </div>

          {/* Links */}
          <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
             <div className={`px-4 mb-2 text-xs font-semibold uppercase tracking-wider ${THEME.textMuted}`}>Main Menu</div>

            {/* Dynamic Links from file */}
            {sidebarLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => { if (window.innerWidth < 1024) setIsOpen(false); }}
                className={({ isActive }) => `w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${
                  isActive ? THEME.sidebarActive : THEME.sidebarInactive
                }`}
              >
                <span className={`relative z-10 transition-colors duration-200 text-xl`}>
                  {link.icon}
                </span>
                <span className="relative z-10">{link.label}</span>
                {({ isActive }) => isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-600 rounded-r-full" />}
              </NavLink>
            ))}
          </nav>

          {/* Profile */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors">
              {/* Avatar */}
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-sm shadow-md">
                {getInitials(user?.name)}
              </div>

              {/* User Info */}
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-bold truncate ${THEME.text}`}>
                  {user?.name || "Admin User"}
                </p>
                <p className={`text-xs truncate ${THEME.textSecondary}`}>
                  {user?.email || "admin@example.com"}
                </p>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

// --- MAIN COMPONENT ---

const ResponsiveDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  
  // --- SEARCH FUNCTIONALITY STATE ---
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  // 1. Create a master list of all searchable links
  const allLinks = [
    ...sidebarLinks // Spread the links imported from your file
  ];

  // 2. Handle Search Input Logic
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
    } else {
      const filtered = allLinks.filter((link) =>
        link.label.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
    }
  }, [searchQuery]);

  // 3. Handle Click on Result
  const handleResultClick = (path) => {
    navigate(path);
    setSearchQuery(""); // Clear search after navigation
    setSearchResults([]); // Hide dropdown
  };

  return (
    <div className={`flex h-screen ${THEME.bg} font-sans transition-colors duration-300 overflow-hidden`}>
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col h-full relative overflow-hidden">
        
        {/* Header */}
        <header className={`h-20 flex items-center justify-between px-6 lg:px-10 z-10 transition-colors duration-300 ${THEME.header}`}>
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleSidebar} 
              className={`p-2 -ml-2 rounded-lg lg:hidden transition-colors ${THEME.textSecondary} hover:bg-gray-100/10`}
            >
              <Menu size={24} />
            </button>
            <div className="hidden md:block">
              <Breadcrumbs />
            </div>
          </div>

          <div className="flex items-center gap-4">
            
            {/* --- SEARCH BOX COMPONENT --- */}
            <div className="relative hidden md:block">
              <div className={`flex items-center px-4 py-2.5 rounded-xl border shadow-sm focus-within:ring-2 focus-within:ring-blue-500/20 transition-all w-64 ${THEME.inputBg} ${THEME.inputBorder}`}>
                <Search size={18} className={THEME.textMuted} />
                <input 
                  type="text" 
                  placeholder="Search pages..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`bg-transparent border-none outline-none text-sm ml-3 w-full ${THEME.text} ${THEME.inputPlaceholder}`}
                />
              </div>

              {/* Dropdown Results */}
              {searchResults.length > 0 && (
                <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  {searchResults.map((result, index) => (
                    <div
                      key={index}
                      onClick={() => handleResultClick(result.path)}
                      className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-blue-50 transition-colors border-b border-gray-50 last:border-none"
                    >
                      <span className="text-gray-500 text-sm">{result.icon}</span>
                      <span className="text-sm font-medium text-gray-700">{result.label}</span>
                    </div>
                  ))}
                </div>
              )}
              
              {/* No Results State (Optional) */}
              {searchQuery && searchResults.length === 0 && (
                 <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-xl shadow-xl border border-gray-200 p-4 text-center text-sm text-gray-500 z-50">
                    No pages found.
                 </div>
              )}
            </div>
            {/* --- END SEARCH BOX --- */}

          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 lg:p-10 scrollbar-hide">
           <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ResponsiveDashboard;