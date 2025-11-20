import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiFilter, FiChevronDown } from "react-icons/fi";

interface IProps {
  totalResults?: number;
  searchQuery?: string;
  showFilters: boolean;
  onToggleFilters: () => void;
  sort?: string;
  onSortChange?: (sort: string) => void;
  isAdmin?: boolean;
  hasActiveFilters?: boolean; 
}

const SearchCountResult = ({
  totalResults,
  searchQuery,
  showFilters = false,
  onToggleFilters,
  sort = 'most_selling',
  onSortChange,
  isAdmin = false,
  hasActiveFilters = false, 
}: IProps) => {
  const [openSort, setOpenSort] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const sortOptions: { key: string; label: string }[] = [
    { key: 'most_selling', label: 'Most selling' },
    { key: 'top_rated', label: 'Top rated' },
    { key: 'price_asc', label: 'Price: Low to High' },
    { key: 'price_desc', label: 'Price: High to Low' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenSort(false);
      }
    };

    if (openSort) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openSort]);

  return (
    <motion.div
      className={`bg-white py-4 font-roobert
        ${isAdmin ? "border-none rounded-b-3xl" : "border-b border-gray-100"}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container-custom">
        <div className="flex flex-col gap-3 md:flex-row items-center justify-between">
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">
                {searchQuery ? `Results for "${searchQuery}"` : 'All Products'}
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-800 font-semibold">
                {totalResults?.toLocaleString()} {totalResults === 1 ? 'result' : 'results'}
              </span>
            </div>
          </div>

          <div className="flex items-center sm:!space-x-4 space-x-1">
            <div className="relative" ref={dropdownRef}>
              <motion.button
                onClick={() => setOpenSort(prev => !prev)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${openSort
                  ? 'bg-teal-50 text-teal-700 border border-teal-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent'
                  }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-sm font-medium">Sort by</span>
                <motion.div
                  animate={{ rotate: openSort ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FiChevronDown className="w-4 h-4" />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {openSort && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute mt-2 w-64 bg-white shadow-xl rounded-xl border border-gray-200 z-30 overflow-hidden"
                  >
                    <div className="py-2">
                      {sortOptions.map((opt) => (
                        <button
                          key={opt.key}
                          className={`w-full text-left px-4 py-3 text-sm font-roobert transition-colors duration-150 ${opt.key === sort
                            ? 'bg-teal-50 text-teal-700 font-medium'
                            : 'text-gray-700 hover:bg-gray-50'
                            }`}
                          onClick={() => {
                            onSortChange?.(opt.key);
                            setOpenSort(false);
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <span>{opt.label}</span>
                            {opt.key === sort && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-2 h-2 bg-teal-600 rounded-full"
                              />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.button
              onClick={onToggleFilters}
              className={`relative flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${showFilters
                ? 'bg-teal-100 text-teal-700 border border-teal-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiFilter className="w-4 h-4" />
              <span className="text-sm font-medium">Filters</span>

              <AnimatePresence>
                {hasActiveFilters && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"
                  />
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SearchCountResult;