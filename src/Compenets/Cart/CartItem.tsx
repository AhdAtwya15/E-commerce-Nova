import { motion } from 'framer-motion';
import { FaStar, FaMinus, FaPlus } from 'react-icons/fa';
import {  IoCartOutline } from 'react-icons/io5';

import { IoHeart } from "react-icons/io5";
import { useGetBrandByIdQuery } from '../../app/Features/brandsApi';
import { useGetCategoryByIdQuery } from '../../app/Features/categoriesApi';
import { useUpdateQuantityCartMutation } from '../../app/Features/cartApi';
import { useState } from 'react';
import useNotification from '../../hook/useNotification';
import { useNavigate } from 'react-router-dom';

interface CartItemProps {
  _id: string;
  productId?:string;
  imageCover: string;
  title: string;
  slug?: string;
  cat?:{
    name:string
  }
  category?: string;
  description?: string;
  brand?: string;
  ratingsQuantity?: number;
  price: number;
  count?: number;
  color?:string;
  
  onRemoveFromWishlit?: (id: string) => void;
  onRemoveFromCart?: (id: string) => void;
  isWishlist?: boolean;
  index?: number;
  isCart?:boolean;
}

const CartItem = ({
  _id,
  productId,
  imageCover,
  title,
  slug,
  category,
  description,
  brand,
  ratingsQuantity,
  price,
  count = 1,
  color,
  cat,
  
  onRemoveFromWishlit,
  onRemoveFromCart,
  
  isWishlist = false,
  isCart=false,
  index = 0
}: CartItemProps) => {
  const notify = useNotification;
  const [localCount, setLocalCount] = useState(count);
  const navigate = useNavigate();
  
  const { data: brandData } = useGetBrandByIdQuery(brand!, {
  skip: !brand,
});
  const brandName=brandData?.data.name
  const { data: categoryData } = useGetCategoryByIdQuery(category!, {
  skip: !category,
});
  const categoryName=categoryData?.data.name

  const [updateQuantityCart] = useUpdateQuantityCartMutation();
  

 const handleRemove = () =>
 {
  if(isWishlist&& onRemoveFromWishlit){
    onRemoveFromWishlit(_id)
  }
  if (isCart && onRemoveFromCart && productId) {
  onRemoveFromCart(productId);
}

    
 }


 const getColorValue = (colorName: string) => {
        const colorMap: { [key: string]: string } = {
            'black': '#000000',
            'white': '#FFFFFF',
            'red': '#FF0000',
            'blue': '#0000FF',
            'green': '#008000',
            'yellow': '#FFFF00',
            'orange': '#FFA500',
            'purple': '#800080',
            'pink': '#FFC0CB',
            'gray': '#808080',
            'brown': '#A52A2A',
            'navy': '#000080',
            'maroon': '#800000',
            'olive': '#808000',
            'lime': '#00FF00',
            'aqua': '#00FFFF',
            'silver': '#C0C0C0',
            'gold': '#FFD700'
        };

        return colorMap[colorName.toLowerCase()] || colorName;
    };
    

 
  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 1 ) return;

    const previous = localCount;
    setLocalCount(newQuantity); 
    try {
      await updateQuantityCart({
        id: _id,
        data: { count: String(newQuantity) },
      }).unwrap();
     
    } catch  {
      
      setLocalCount(previous); 
    }
  };

   const handleAddToCart =  () => {
    
      if(location.pathname !== "/products/")
      {
        navigate(`/products/${_id}`)
        notify("Please choose a color","info")
  
      }
    }

  const displayTitle = title || description || slug || 'Product';

  return (
   <motion.div
  layout
  initial={{ opacity: 0, x: index % 2 === 0 ? 60 : -60, y: 10, scale: 0.98 }}
  animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
  exit={{ opacity: 0, x: index % 2 === 0 ? 60 : -60, y: 10, scale: 0.95 }}
  transition={{
    duration: 0.45,
    ease: [0.25, 0.1, 0.25, 1], 
    delay: index * 0.04, 
  }}
  className="p-6 hover:bg-gray-50 transition-colors duration-200"
>



      <div className="flex gap-4 md:gap-6 ">
       
      
        <motion.div
          className="flex-shrink-0 relative group cursor-pointer"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.2 }}
        >
             {
            isWishlist &&
            <motion.div
            className=' w-6 h-6 rounded-full absolute top-0 left-0 bg-[#E8765E] flex items-center justify-center '
             initial={{ x: -320, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                < IoHeart  
            className=" text-white  "/>

            </motion.div>
            
        }
          <div className="w-24 h-24 md!:w-40 md:!h-30 rounded-xl overflow-hidden bg-gray-100">
            <img
              src={`${imageCover}`} 
              alt={displayTitle}
              className="w-full h-full object-cover"
            />
          </div>



     
        </motion.div>

        
        <div className="flex-1 min-w-0">
          <div className="flex flex-col h-full justify-between">
   
            <div className="space-y-2">
    
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-medium text-[#3B8D90] bg-[#3B8D90]/10 px-3 py-1 rounded-full">
                  {categoryName} {cat?.name}
                </span>
                <div className="flex items-center gap-1">
                  <FaStar className="text-yellow-400 text-sm" />
                  <span className="text-sm font-medium text-gray-700">
                    {ratingsQuantity}
                  </span>
                </div>
              </div>

              <h3 className="text-base md:text-lg font-semibold text-gray-900 line-clamp-2 hover:text-[#3B8D90] transition-colors cursor-pointer">
                {title}
              </h3>

          
             {!isCart&& <p className="text-sm text-gray-500">
                Brand: <span className="font-medium text-gray-700">{brandName}</span>
              </p>}

             
                 {color && (
                   
  <div
                                    className="w-5 h-5  sm:!w-8 sm:!h-8 rounded-full border-2 border-gray-300 cursor-pointer hover:scale-110 transition-transform"
                                    style={{ backgroundColor: getColorValue(color) }}
                                    title={color}
                                />
  
)}

             
             
            </div>

            <div className="mt-3">
      
              {!isWishlist && (
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-sm text-gray-600">Quantity:</span>
                  <div className="flex items-center border border-gray-200 rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(localCount - 1)}
                      className="p-3 hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-l-lg"
                      disabled={localCount <= 1}
                    >
                      <FaMinus className="text-xs text-gray-600" />
                    </button>
                    <span className="px-3 py-2 text-sm font-medium text-gray-900 min-w-[3rem] text-center">
                      {localCount}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(localCount + 1)}
                      className="p-3 hover:bg-gray-100 transition-colors duration-200 rounded-r-lg"
                    >
                      <FaPlus className="text-xs text-gray-600" />
                    </button>
                  </div>
                </div>
              )}
          
              <div className=" flex  items-center justify-between gap-4 flex-wrap">

                  <div className="text-xl md:text-2xl font-bold text-gray-900">
                    ${price.toFixed(2)}
                  </div>
                  
               

                
                <div className="flex items-center gap-3">

                  {isWishlist &&  (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleAddToCart}
                      className=" btn-gradient  text-white px-4 md:px-6 py-2.5 rounded-lg font-semibold hover:opacity-90 transition-all inline-flex items-center gap-2 text-sm md:text-base"
                    >
                      <IoCartOutline className="text-lg" />
                      <span className="hidden sm:inline">Add to Cart</span>
                    </motion.button>
                  )}

                  <button
                    onClick={handleRemove}
                    className="text-[#E8765E] hover:bg-[#E8765E]/10 px-4 py-2.5 rounded-lg font-medium transition-all text-sm md:text-base border border-[#E8765E]/20"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItem;