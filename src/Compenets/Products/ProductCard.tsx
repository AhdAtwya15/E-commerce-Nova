import { motion } from "framer-motion"
import Button from "../UI/Button"
import type { IProduct } from "../../Interfaces"
import { IoHeart } from "react-icons/io5";
import { IoHeartOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useDeletProductMutation } from "../../app/Features/productApi";
import { useEffect, useMemo, useState } from "react";
import ConfirmDeleteModal from "../UI/ConfirmDeleteModal";
import useNotification from "../../hook/useNotification";
import { useAddProductToWishlistMutation, useDeletWishlistProductMutation, useGetWishlistProductsQuery } from "../../app/Features/wishlistApi";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { preload } from "../../utilis/global-preload";


interface ProductCardProps extends IProduct {
  index?: number
  isAdmin?: boolean
  disableInitialAnimation?: boolean 
  onAddToCart?: (productId: string) => void
}

const ProductCard = ({
  _id,
  title,
  slug,
  price,
  imageCover,
  description,
  ratingsQuantity,
  index = 0,
  isAdmin = false,
  disableInitialAnimation = false ,
  onAddToCart = () => {}
}: ProductCardProps) => {
  const notify = useNotification;
  const token = useSelector((state: RootState) => state.auth.token);
  const isHydrated = useSelector((state: RootState) => state.auth.isHydrated);
  const [optimisticAdded, setOptimisticAdded] = useState<string[]>([]);
  const [optimisticRemoved, setOptimisticRemoved] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [deleteProduct,{isLoading}] = useDeletProductMutation();
  const [addToWishlist] = useAddProductToWishlistMutation();
  const [deleteFromWishlist] = useDeletWishlistProductMutation();
   const { data } = useGetWishlistProductsQuery({}, {
    skip: !token 
  });
  const wishlistItems = useMemo(() => data?.data ?? [], [data?.data]);
  
  
 
  useEffect(() => {
    if (!token) {
      setOptimisticAdded([]);
      setOptimisticRemoved([]);
    }
  }, [token]);

  useEffect(() => {
    setOptimisticAdded((prev) =>
      prev.filter((id) => !wishlistItems.some((item) => item._id === id))
    );
    setOptimisticRemoved((prev) =>
      prev.filter((id) => wishlistItems.some((item) => item._id === id))
    );
  }, [wishlistItems]);

  
  const isInWishlist =
    optimisticAdded.includes(_id) ||
    (wishlistItems.some((item) => item._id === _id) && !optimisticRemoved.includes(_id));

  const handleToggleWishlist = async () => {
    if (!isHydrated) return;
    if (!token) {
      notify("Please login first", "error");
       setTimeout(()=>{
        navigate('/login')
      },1500)
      
      return;
    }

    const wasInWishlist = isInWishlist;

    if (wasInWishlist) {
     
      setOptimisticRemoved((prev) => prev.includes(_id) ? prev : [...prev, _id]);
    } else {

      setOptimisticAdded((prev) => prev.includes(_id) ? prev : [...prev, _id]);
    }

    try {
      if (wasInWishlist) {
        await deleteFromWishlist(_id).unwrap();
        notify("Removed from wishlist", "success");
        
      } else {
        await addToWishlist({ productId: _id }).unwrap();
        notify("Added to wishlist", "success");
      
      }
    } catch {

      if (wasInWishlist) {
        setOptimisticRemoved((prev) => prev.filter((id) => id !== _id));
      } else {
        setOptimisticAdded((prev) => prev.filter((id) => id !== _id));
      }
      notify("Error updating wishlist", "error");
    }
  };

  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!productToDelete) return;
    try {
      await deleteProduct(productToDelete).unwrap();
      notify("Product deleted successfully","success")
    } catch  {
      notify("Failed to delete product: ", "error");
    }
    setIsModalOpen(false);
    setProductToDelete(null);
  };
  const handleAddToCart =  () => {
     if (!isHydrated) return;
    if (!token) {
      notify("Please login first", "error");
       setTimeout(()=>{
        navigate('/login')
      },500)
      return;
    }
    if(location.pathname !== "/products/")
    {
      navigate(`/products/${_id}`)
      notify("Please choose a color","info")
    }
    else if(location.pathname.startsWith("/products/"))
    {
      onAddToCart(_id)
    }
  }
  const goToProduct = (id:string) => {
  preload(() => import("../../Pages/Product/ProductDetailsPage"));
  navigate(`/products/${id}`);
};
  
  const isEven = index % 2 === 0;
  const xDirection = isEven ? -100 : 100;

  return (
    <>
      <motion.div
        className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
        initial={disableInitialAnimation ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: xDirection, y: 50 }}
        {...(disableInitialAnimation 
          ? { animate: { opacity: 1, x: 0, y: 0 } } 
          : { 
              whileInView: { opacity: 1, x: 0, y: 0 },
              viewport: { once: true, margin: "-100px 0px -100px 0px" }
            }
        )}
        transition={{
          duration: 0.8,                     
          delay: disableInitialAnimation ? 0 : index * 0.15, 
          ease: [0.25, 0.46, 0.45, 0.94],          
        }}
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.2 }
        }}
        onClick={() => goToProduct(_id)}
      >
        <div 
          className="relative bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden flex-shrink-0"
          style={{
           aspectRatio: isAdmin ? "8/9" : "4/5",

            width: '100%'
          }}
        >
          <motion.img
            src={imageCover}
            alt={slug}
           loading="lazy"
            className="h-full w-full object-cover object-center"
            style={{ 
              objectFit: 'cover',
              objectPosition: 'center top'
            }}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1]
            }}
            whileHover={{
              scale: 1.08,
              transition: { duration: 0.4, ease: "easeOut" }
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />

          {isAdmin && (
            <>
              <motion.button
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className="absolute top-4 left-4 bg-[#E8765E] text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-[#9E4A38] duration-300 shadow-lg backdrop-blur-sm"
                onClick={(e)=>{
                    e.stopPropagation();
                    navigate(`/admin/editProduct/${_id}`)
                }}
              >
                Edit
              </motion.button>

              <motion.button
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className="absolute top-4 right-4 bg-[#E8765E] text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-[#9E4A38] duration-300 shadow-lg backdrop-blur-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsModalOpen(true);
                  setProductToDelete(_id);
                }}
              >
                Delete
              </motion.button>
            </>
          )}
        </div>

        <div className="p-6 space-y-2 flex-1 flex flex-col">
          <motion.div
            className="flex justify-between items-center gap-3"
            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            <span className="text-lg font-medium text-gray-700 line-clamp-1 flex-1">
              {title}
            </span>
            {!isAdmin && (
              <button
                onClick={(e)=>{
                  e.stopPropagation()
                  handleToggleWishlist()
                }}
                className="flex-shrink-0"
              >
                <motion.div
                  key={isInWishlist ? "filled" : "outline"}
                  initial={{ scale: 0.5, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0.5, rotate: 180 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 500, 
                    damping: 20,
                    duration: 0.3
                  }}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isInWishlist ? (
                    <IoHeart className="text-2xl text-[#E8765E] drop-shadow-md" />
                  ) : (
                    <IoHeartOutline className="text-2xl text-[#E8765E]" />
                  )}
                </motion.div>
              </button>
            )}
          </motion.div>

          <motion.div
            className="flex justify-between items-center"
            initial={{ opacity: 0, x: isEven ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            <div className="text-xl font-semibold text-gray-800">
              ${price.toFixed(2)}
            </div>
            <div className="flex items-center gap-2 bg-yellow-50 px-2 py-1 rounded-lg">
              <FaStar className="text-sm text-yellow-400" />
              <span className="text-sm font-medium text-gray-700">{ratingsQuantity}</span>
            </div>
          </motion.div>

          {description && (
            <motion.p
              className="text-sm text-gray-500 line-clamp-2 h-[39px]"
              initial={{ opacity: 0, x: isEven ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            >
              {description}
            </motion.p>
          )}

          {!isAdmin && (
            <motion.div
              className="pt-2 mt-auto"
              initial={{ opacity: 0, x: isEven ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            >
              <Button
                variant="addBtn"
                size="lg"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart();
                }}
              >
                Add to Cart
              </Button>
            </motion.div>
          )}
        </div>
      </motion.div>

      {isModalOpen && (
        <ConfirmDeleteModal
        isLoading={isLoading}
          isOpen={isModalOpen}
          title="product" 
          onConfirm={handleDelete}
          onClose={() => {
            setIsModalOpen(false);
            setProductToDelete(null);
          }}
        />
      )}
    </>
  )
}
export default ProductCard