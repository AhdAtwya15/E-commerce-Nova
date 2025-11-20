import { motion } from "framer-motion";
import type { ISubCategory } from "../../Interfaces";
import { useState } from "react";
import { useDeleteSubCategoryMutation } from "../../app/Features/subCategoriesApi";
import useNotification from "../../hook/useNotification";
import ConfirmDeleteModal from "../UI/ConfirmDeleteModal";
import { useGetCategoryByIdQuery } from "../../app/Features/categoriesApi";

interface IProps {
    index?: number;
    subCategory: ISubCategory;
    disableInitialAnimation?: boolean;
    isAdmin?: boolean;
    onEdit?: (subCategory: ISubCategory) => void;
}

const SubCategoryCard = ({ 
    index = 0, 
    subCategory, 
    disableInitialAnimation = false, 
    isAdmin = false, 
    onEdit 
}: IProps) => {
    const notify = useNotification;
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [subCategoryToDelete, setSubCategoryToDelete] = useState<string | null>(null);
    const [deleteSubCategory,{isLoading}] = useDeleteSubCategoryMutation();
    const catId=subCategory.category
    const {data:category}=useGetCategoryByIdQuery(catId)
    const catName=category?.data.name

    

    const handleDelete = async () => {
        if (!subCategoryToDelete) return;
        try {
            await deleteSubCategory(subCategoryToDelete).unwrap();
            notify("Subcategory deleted successfully", "success");
        } catch {
            notify("Failed to delete subcategory", "error");
        }
        setIsModalOpen(false);
        setSubCategoryToDelete(null);
    };

    return (
        <>
            <motion.div
                className="group cursor-pointer"
                initial={disableInitialAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.5,
                    delay: disableInitialAnimation ? 0 : index * 0.05,
                    ease: "easeOut",
                }}
                whileHover={{ y: -8 }}
            >
               
                <div className="relative bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 group-hover:shadow-2xl">
                    <div
                        className="aspect-square relative p-6 flex items-center justify-center overflow-hidden"
                        style={{ background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)' }}
                    >
                        <div className="text-center">
                            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-[#3B8D90] transition-colors duration-300">
                                {subCategory.name}
                            </h3>
                            <p className="text-sm text-gray-500 mt-2">
                                Category Name: {catName}
                            </p>
                        </div>

                        {isAdmin && (
                            <>
                                <motion.button
                                    initial={{ x: -320, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.6, ease: "easeInOut" }}
                                    className="absolute top-4 left-4 z-20 bg-[#E8765E] text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-[#9E4A38] duration-300"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (onEdit) {
                                            onEdit(subCategory);
                                        }
                                    }}
                                >
                                    Edit
                                </motion.button>

                                <motion.button
                                    initial={{ x: 320, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.6, ease: "easeInOut" }}
                                    className="absolute top-4 right-4 z-20 bg-[#E8765E] text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-[#9E4A38] duration-300"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsModalOpen(true);
                                        setSubCategoryToDelete(subCategory._id);
                                    }}
                                >
                                    Delete
                                </motion.button>
                            </>
                        )}
                    </div>

                   
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#3B8D90] rounded-2xl transition-colors duration-300 pointer-events-none" />
                </div>
            </motion.div>
            
            {isModalOpen && (
                <ConfirmDeleteModal
                isLoading={isLoading}
                    isOpen={isModalOpen}
                    title="Subcategory"
                    onConfirm={handleDelete}
                    onClose={() => {
                        setIsModalOpen(false);
                        setSubCategoryToDelete(null);
                    }}
                />
            )}
        </>
    );
};

export default SubCategoryCard;