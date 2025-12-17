import React, { useState, useEffect } from 'react';
import { 
  X, 
  ZoomIn, 
  ChevronLeft, 
  ChevronRight, 
  Image as ImageIcon,
  Filter
} from 'lucide-react';

// --- Mock Data ---
const CATEGORIES = ["All", "Nature", "Architecture", "Abstract", "Minimal"];

// Replaced dynamic generation with static, editable data
const SAMPLE_DATA = [
  {
    id: 1,
    title: "Misty Mountain Peaks",
    category: "Nature",
    author: "Alex Morgan",
    fallbackUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Modern Concrete",
    category: "Architecture",
    author: "Sarah Chen",
    fallbackUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Fluid Shapes",
    category: "Abstract",
    author: "Marcus Leo",
    fallbackUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: "White Space",
    category: "Minimal",
    author: "Emma Davis",
    fallbackUrl: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    title: "Forest Path",
    category: "Nature",
    author: "John Smith",
    fallbackUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    title: "Glass Facade",
    category: "Architecture",
    author: "Maria Garcia",
    fallbackUrl: "https://images.unsplash.com/photo-1485627941502-d2e6429fa34e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 7,
    title: "Neon Nights",
    category: "Abstract",
    author: "David Kim",
    fallbackUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 8,
    title: "Clean Desk",
    category: "Minimal",
    author: "Sophie Wilson",
    fallbackUrl: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80"
  }
];

// --- Sub-Components ---

const ImageCard = ({ item, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <div 
      className="group relative w-full break-inside-avoid rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 ease-out cursor-pointer border border-slate-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(item)}
    >
      {/* Image Container */}
      <div className="aspect-[4/3] overflow-hidden bg-slate-200 relative">
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center text-slate-400 animate-pulse">
            <ImageIcon size={32} />
          </div>
        )}
        <img
          src={item.fallbackUrl} // Using fallback for consistent demo loading
          alt={item.title}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`h-full w-full object-cover transition-transform duration-700 ease-in-out ${
            isHovered ? 'scale-110' : 'scale-100'
          } ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
        
        {/* Overlay */}
        <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 flex items-center justify-center ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <button className="bg-white text-slate-900 rounded-full p-3 shadow-lg hover:bg-indigo-500 hover:text-white transition-colors">
              <ZoomIn size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Content Info */}
      <div className="p-4">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1 block">
          {item.category}
        </span>
        <h3 className="text-lg font-semibold text-slate-800 truncate group-hover:text-indigo-600 transition-colors">
          {item.title}
        </h3>
        <p className="text-sm text-slate-500 mt-1">By {item.author}</p>
      </div>
    </div>
  );
};

const Modal = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in duration-200">
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-white/70 hover:text-white hover:bg-white/10 rounded-full p-2 transition-all"
      >
        <X size={32} />
      </button>
      
      <div className="relative max-w-5xl w-full max-h-[90vh] bg-transparent rounded-lg overflow-hidden flex flex-col items-center">
        <img 
          src={item.fallbackUrl} 
          alt={item.title} 
          className="max-w-full max-h-[80vh] object-contain shadow-2xl rounded-md"
        />
        <div className="mt-4 text-center">
          <h2 className="text-2xl font-bold text-white">{item.title}</h2>
          <p className="text-slate-300">{item.category} • By {item.author}</p>
        </div>
      </div>
    </div>
  );
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Generate page numbers logic
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // Always show first, last, and current vicinity
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex mb-12 justify-center items-center space-x-2 mt-12">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        <ChevronLeft size={20} />
      </button>

      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          disabled={typeof page !== 'number'}
          className={`w-10 h-10 rounded-lg flex items-center justify-center font-medium transition-all ${
            page === currentPage
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 scale-105'
              : typeof page === 'number'
              ? 'bg-white text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 border border-slate-200'
              : 'text-slate-400 cursor-default'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

// --- Main Component ---

const Gallerysection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemsPerPage] = useState(6); // Adjust grid density here

  // Filter Logic
  const filteredItems = activeCategory === "All" 
    ? SAMPLE_DATA 
    : SAMPLE_DATA.filter(item => item.category === activeCategory);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  // Reset to page 1 when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  // Handle Keyboard for Modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedItem(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen  font-sans text-slate-900">
      {/* Header Section */}
      <header className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold tracking-wide mb-4">
           Our Gallery
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Inspiration Gallery
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
Explore a vibrant mix of high-resolution images. Use the categories to uncover visuals that match your creative vision.           </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1">
        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-slate-900 text-white shadow-lg scale-105 ring-2 ring-offset-2 ring-slate-900'
                  : 'bg-white text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentItems.map((item) => (
              <ImageCard 
                key={item.id} 
                item={item} 
                onClick={setSelectedItem} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
              <Filter className="text-slate-400" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-slate-900">No items found</h3>
            <p className="text-slate-500">Try selecting a different category.</p>
          </div>
        )}

        {/* Pagination */}
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={setCurrentPage} 
        />
      </main>

      {/* Lightbox Modal */}
      {selectedItem && (
        <Modal 
          item={selectedItem} 
          onClose={() => setSelectedItem(null)} 
        />
      )}
    </div>
  );
};

export default Gallerysection;