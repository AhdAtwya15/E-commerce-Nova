import { motion } from "framer-motion"
import type { IBrand } from "../../Interfaces"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDeleteBrandMutation } from "../../app/Features/brandsApi";
import useNotification from "../../hook/useNotification";
import ConfirmDeleteModal from "../UI/ConfirmDeleteModal";

interface IProps {
    index?: number,
    brand: IBrand,
    disableInitialAnimation?: boolean 
    isAdmin?:boolean
    onEdit?: (brand: IBrand) => void
}

const BrandCard = ({ index = 0, brand, disableInitialAnimation = false,isAdmin=false, onEdit }: IProps) => {
    const notify = useNotification;
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
      const [brandToDelete, setBrandToDelete] = useState<string | null>(null);
      const [deleteBrand,{isLoading}] = useDeleteBrandMutation()


    const navigate = useNavigate();

    const handleDelete = async () => {
        if (!brandToDelete) return;
        try {
          await deleteBrand(brandToDelete).unwrap();
          notify("Brand deleted successfully","success")
          
        } catch {
            notify("Failed to delete product","error")
         
        }
        setIsModalOpen(false);
        setBrandToDelete(null);
      };
    
     
    

    const handleBrandClick = (brandName: string) => {
        navigate(`/products?brand=${encodeURIComponent(brandName)}`);
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
            onClick={() => handleBrandClick(brand.name)}
        >
            <div className="relative bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 group-hover:shadow-2xl">
                <div
                    className="aspect-square relative p-6 flex items-center justify-center overflow-hidden"
                    style={{ background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)' }}
                >
                    
                    <img
                        src={brand.image}
                        alt={brand.name}
                        className="w-full h-full object-contain relative z-10 transition-transform duration-300 group-hover:scale-110"
                    />

                    {isAdmin && (
                                <>
                                  <motion.button
                                    initial={{ x: -320, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.6, ease: "easeInOut" }}
                                    className="absolute top-4 left-4 z-20 bg-[#E8765E] text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-[#9E4A38] duration-300"
                                    onClick={(e)=>{
                                        e.stopPropagation();
                                        if (onEdit) {
                                            onEdit(brand);
                                        } else {
                                            navigate(`/admin/editBrand/${brand._id}`)
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
                                      setBrandToDelete(brand._id);
                                    }}
                                  >
                                    Delete
                                  </motion.button>
                                </>
                              )}

                </div>


                <div className="p-4 bg-white">
                    <h3 className="text-center text-sm font-semibold text-gray-800 group-hover:text-[#3B8D90] transition-colors duration-300 line-clamp-1">
                        {brand.name}
                    </h3>
                </div>

                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#3B8D90] rounded-2xl transition-colors duration-300 pointer-events-none" />
            </div>
        </motion.div>
        {isModalOpen && (
<ConfirmDeleteModal
isLoading={isLoading}
  isOpen={isModalOpen}
  title="Brand" 
  onConfirm={handleDelete}
  onClose={() => {
    setIsModalOpen(false);
    setBrandToDelete(null);
  }}
/>
      )}

        </>
    )
}

export default BrandCard