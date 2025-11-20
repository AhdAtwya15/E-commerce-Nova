
import { motion, AnimatePresence } from 'framer-motion';
import { IoHeart,  IoArrowBack } from 'react-icons/io5';

import CartItem from '../../Compenets/Cart/CartItem';
import { useDeletWishlistProductMutation, useGetWishlistProductsQuery } from '../../app/Features/wishlistApi';
import { Quantum } from 'ldrs/react';
import NoProductsFound from '../../Compenets/Utility/NoProductsFound';

import Button from '../../Compenets/UI/Button';
import { useNavigate } from 'react-router-dom';
import useNotification from '../../hook/useNotification';


const WishlistPage = () => {
  const{data,isLoading,isError}=useGetWishlistProductsQuery({})
  const wishlistItems=data?.data?? []
  const [deleteWishlistItem]=useDeletWishlistProductMutation()
  const navigate=useNavigate();
  const notify = useNotification

  const handleRemove = async  (id:string) => {
     try {
   
         await deleteWishlistItem(id).unwrap();
      notify('Product removed from wishlist', 'success');
   
      
    } catch  {
      notify('Failed to remove product from wishlist', 'error');
    }
  };

  

 
  return (
    <div className=" bg-gray-50 py-8 mt-3">
      <motion.div
  initial={{ opacity: 0, x: 60, y: 20 }}
  animate={{ opacity: 1, x: 0, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  className="max-w-7xl container-custom "
>

        <motion.div
  initial={{ opacity: 0, x: -60 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  className="mb-6"
>

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#3B8D90] hover:text-[#E8765E] transition-colors mb-4 font-medium"
          >
            <IoArrowBack className="text-xl" />
            Back 
          </button>
          
          <div className="flex items-center justify-between flex-wrap gap-4">
  <motion.h1
    initial={{ opacity: 0, x: -80 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="text-3xl md:text-4xl font-bold text-gray-900"
  >
    <IoHeart className="inline-block text-[#E8765E] mr-2 mb-1" />
    My Wishlist
  </motion.h1>

  {!isLoading && (
    <motion.div
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
      className="text-gray-600"
    >
      You have{" "}
      <span className="font-bold text-[#3B8D90]">{wishlistItems.length}</span>
      {wishlistItems.length === 0 ? " item " : " items "} in your wishlist
    </motion.div>
  )}
</div>

        </motion.div>

        
          {isLoading ? (
          <div className="flex justify-center items-center py-30">
            <Quantum size="50" speed="1.75" color="#E8765E" />
          </div>
        ) : isError ? (
          <NoProductsFound isError />
        ) : wishlistItems.length === 0 ?
         (
              <div className=" bg-gray-50 py-8 px-4">
        <div className="max-w-7xl mx-auto">
         

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-sm p-12 md:p-15 text-center"
          >
            <motion.div
  initial={{ opacity: 0, y: 50, scale: 0.9 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>

              <IoHeart className="text-8xl text-gray-200 mx-auto mb-6" />
            </motion.div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
              Your Wishlist is Empty
            </h2>
            <p className="text-gray-500 mb-8 text-base md:text-lg">
              Save items you love so you don't lose sight of them
            </p>
           <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full flex justify-center"

            >
              <Button 
              fullWidth={false}
                size="xl" 
                variant="remove"
                onClick={() => navigate("/products")}
              >
                Shopping Now
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
         ):
         (
          <>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  className="divide-y divide-gray-100"
>
  <AnimatePresence mode="sync">
    {wishlistItems.map((item, index) => (
      <CartItem
        key={item._id}
        {...item}
        isWishlist
        onRemoveFromWishlit={handleRemove}
        
        index={index}
      />
    ))}
  </AnimatePresence>
</motion.div>
        </div>

          </>
          
         )
      }
      

        
      </motion.div>
    </div>
  );
};

export default WishlistPage;