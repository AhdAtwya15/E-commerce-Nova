import { motion } from "framer-motion"
import type { ICategory } from "../../Interfaces"
import { useNavigate } from "react-router-dom"
import { FiArrowRight } from "react-icons/fi"
import { useState } from "react"
import { useDeleteCategoryMutation } from "../../app/Features/categoriesApi"
import notify from "../../hook/useNotification"
import ConfirmDeleteModal from "../UI/ConfirmDeleteModal"

interface IProps {
    category: ICategory
    index?: number
    disableInitialAnimation?: boolean 
    isAdmin?:boolean
    onEdit?: (category: ICategory) => void
}

const CategorySlice = ({ category, index = 0, disableInitialAnimation = false ,isAdmin=false, onEdit}: IProps) => {
     const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
      const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
      const [deleteCategory,{isLoading}] = useDeleteCategoryMutation()

    const navigate = useNavigate();

     const handleDelete = async () => {
        if (!categoryToDelete) return;
        try {
          await deleteCategory(categoryToDelete).unwrap();
          notify("Category deleted successfully","success")
          
        } catch {
            notify("Failed to delete category","error")
         
        }
        setIsModalOpen(false);
        setCategoryToDelete(null);
      };

    const handleCategoryClick = (categoryName: string) => {
        navigate(`/products?category=${encodeURIComponent(categoryName)}`);
    };

    return (
        <>
        <motion.div
            className="group cursor-pointer "
            initial={disableInitialAnimation ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.5,
                delay: disableInitialAnimation ? 0 : index * 0.08,
                ease: "easeOut",
            }}
            whileHover={{ scale: 1.03 }}
            onClick={() => handleCategoryClick(category.name)}
        >
            <div className="relative bg-white rounded-3xl shadow-lg overflow-hidden transition-all duration-300 h-full">
                <div className="relative h-64 overflow-hidden">
    
                    <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {isAdmin && (
                                <>
                                  <motion.button
                                    initial={{ x: -320, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.6, ease: "easeInOut" }}
                                    className="absolute top-4 left-4 z-30 bg-[#E8765E] text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-[#9E4A38] duration-300"
                                    onClick={(e)=>{
                                        e.stopPropagation();
                                        if (onEdit) {
                                            onEdit(category);
                                        } else {
                                            navigate(`/admin/editCategory/${category._id}`)
                                        }
                                    }}
                                  >
                                    Edit
                                  </motion.button>
                    
                                  <motion.button
                                    initial={{ x: 320, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.6, ease: "easeInOut" }}
                                    className="absolute top-4 right-4 z-30 bg-[#E8765E] text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-[#9E4A38] duration-300"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setIsModalOpen(true);
                                      setCategoryToDelete(category._id);
                                    }}
                                  >
                                    Delete
                                  </motion.button>
                                </>
                              )}

                    <div className="absolute inset-0 flex items-end p-6 z-20">
                        <div className="w-full">
                            <h3 className="text-2xl font-bold text-white mb-2 transform transition-transform duration-300 group-hover:translate-x-2">
                                {category.name}
                            </h3>
                            <div className="flex items-center text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <span className="mr-2">Explore Now</span>
                                <FiArrowRight className="text-lg" />
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className="p-5"
                    style={{ background: 'linear-gradient(90deg, #f9fafb 0%, #ffffff 100%)' }}
                >
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 font-medium">
                            View Products
                        </span>
                        <motion.div
                            className="w-10 h-10 rounded-full bg-[#3B8D90] flex items-center justify-center group-hover:bg-[#E8765E] transition-colors duration-300"
                            whileHover={{ rotate: 45 }}
                            transition={{ duration: 0.3 }}
                        >
                            <FiArrowRight className="text-white text-lg" />
                        </motion.div>
                    </div>
                </div>

                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#3B8D90] rounded-3xl transition-all duration-300 pointer-events-none" />
            </div>
        </motion.div>

        {isModalOpen && (
<ConfirmDeleteModal
isLoading={isLoading}
  isOpen={isModalOpen}
  title="Category" 
  onConfirm={handleDelete}
  onClose={() => {
    setIsModalOpen(false);
    setCategoryToDelete(null);
  }}
/>
      )}
        </>
    )
}

export default CategorySlice