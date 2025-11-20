import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useGetCategoriesQuery } from "../../app/Features/categoriesApi";
interface IProps {
  activeCategory?: string;
  onCategoryChange?: (category: string) => void;
  isAdmin?:boolean
}

const CategoryHeader = ({

  
  activeCategory = "All",
  onCategoryChange,
  isAdmin=false
}: IProps) => {

  const {data}=useGetCategoriesQuery();
  const categoriesData=data?.data?? [];
  const [activeTab, setActiveTab] = useState(activeCategory);

  useEffect(() => {
    setActiveTab(activeCategory);
  }, [activeCategory]);

  const handleCategoryClick = (category: string) => {
    setActiveTab(category);
    onCategoryChange?.(category);
  };


  return (
    <div className={`bg-white border-b  sticky top-0 z-10  font-roobert
    ${isAdmin?"rounded-t-3xl border-gray-200":"shadow-sm border-gray-100"}`}>
      <div className="container-custom px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 sm:gap-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
            Products
          </h2>

          <div className="hidden sm:flex items-center space-x-1 bg-gray-50 rounded-full p-1 overflow-x-auto scrollbar-hide whitespace-nowrap">

            <motion.button
          
                onClick={() => handleCategoryClick("All")}
                className={`relative px-4 lg:px-6 py-2 rounded-full transition-all duration-300 ${activeTab === "All"
                  ? "text-white font-semibold"
                  : "text-gray-600 hover:text-gray-800 font-medium"
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: -1 * 0.1 }}
              >
                {activeTab === "All" && (
                  <motion.div
                    className="absolute inset-0 btn-gradient rounded-full"
                    layoutId="activeTab"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 text-sm lg:text-base">
                  All
                </span>
              </motion.button>
            {categoriesData.map((category, index) => (
              <motion.button
                key={category._id}
                onClick={() => handleCategoryClick(category.name)}
                className={`relative px-4 lg:px-6 py-2 rounded-full transition-all duration-300 ${activeTab === category.name
                  ? "text-white font-semibold"
                  : "text-gray-600 hover:text-gray-800 font-medium"
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {activeTab === category.name && (
                  <motion.div
                    className="absolute inset-0 btn-gradient rounded-full"
                    layoutId="activeTab"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 text-sm lg:text-base">
                  {category.name}
                </span>
              </motion.button>
            ))}
          </div>

  
          <div className="sm:hidden">
            <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-hide whitespace-nowrap">

              <motion.button

                  onClick={() => handleCategoryClick("All")}
                  className={`relative px-4 py-2 rounded-full transition-all duration-300 whitespace-nowrap ${activeTab === "All"
                    ? "text-white font-semibold"
                    : "text-gray-600 hover:text-gray-800 font-medium bg-gray-50"
                    }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: -1 * 0.05 }}
                >
                  {activeTab === "All" && (
                    <motion.div
                      className="absolute inset-0 btn-gradient rounded-full"
                      layoutId="activeTabMobile"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10 text-sm">
                    All
                  </span>
                </motion.button>
              {categoriesData.map((category, index) => (
                <motion.button
                  key={category._id}
                  onClick={() => handleCategoryClick(category.name)}
                  className={`relative px-4 py-2 rounded-full transition-all duration-300 whitespace-nowrap ${activeTab === category.name
                    ? "text-white font-semibold"
                    : "text-gray-600 hover:text-gray-800 font-medium bg-gray-50"
                    }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {activeTab === category.name && (
                    <motion.div
                      className="absolute inset-0 btn-gradient rounded-full"
                      layoutId="activeTabMobile"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10 text-sm">
                    {category.name}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryHeader;