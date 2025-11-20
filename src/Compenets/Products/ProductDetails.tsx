import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FaStar, FaHeart, FaShoppingCart, FaTruck, FaShieldAlt, FaUndo } from "react-icons/fa";
import Button from "../UI/Button";
import type { IProduct } from "../../Interfaces";

import { useAddProductToWishlistMutation, useDeletWishlistProductMutation, useGetWishlistProductsQuery } from "../../app/Features/wishlistApi";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import useNotification from "../../hook/useNotification";
import { useNavigate } from "react-router-dom";

interface ProductDetailsProps {
  product: IProduct;
  onColorChange?: (color: string) => void; 
  onAddToCart?: () => void; 
  categoryName?:string;
  brandName?:string;


}

const ProductDetails = ({ product, onColorChange, onAddToCart,categoryName,brandName }: ProductDetailsProps) => {
  const token = useSelector((state: RootState) => state.auth.token);
  const isHydrated = useSelector((state: RootState) => state.auth.isHydrated);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [optimisticAdded, setOptimisticAdded] = useState<string[]>([]);
  const [optimisticRemoved, setOptimisticRemoved] = useState<string[]>([]);
  
  const [addToWishlist] = useAddProductToWishlistMutation();
  const [deleteFromWishlist] = useDeletWishlistProductMutation();
  const navigate=useNavigate()

  

  const { data } = useGetWishlistProductsQuery({}, {
    skip: !token 
  });
  const wishlistItems = useMemo(() => data?.data ?? [], [data?.data]);
  const notify = useNotification

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
    optimisticAdded.includes(product._id) ||
    (wishlistItems.some((item) => item._id === product._id) && !optimisticRemoved.includes(product._id));
    
  const handleToggleWishlist = async () => {
    if (!isHydrated) return;
    if (!token) {
      notify("Please login first", "error");
       setTimeout(()=>{
        navigate('/login')
      },500)
      return;
    }

    const wasInWishlist = isInWishlist;

    if (wasInWishlist) {
      setOptimisticRemoved((prev) => prev.includes(product._id) ? prev : [...prev, product._id]);
    } else {
      setOptimisticAdded((prev) => prev.includes(product._id) ? prev : [...prev, product._id]);
    }

    try {
      if (wasInWishlist) {
        await deleteFromWishlist(product._id).unwrap();
        notify("Removed from wishlist", "success");
      } else {
        await addToWishlist({ productId: product._id }).unwrap();
        notify("Added to wishlist", "success");
      }
    } catch {
      if (wasInWishlist) {
        setOptimisticRemoved((prev) => prev.filter((id) => id !== product._id));
      } else {
        setOptimisticAdded((prev) => prev.filter((id) => id !== product._id));
      }
      notify("Error updating wishlist", "error");
    }
  };

  const handleColorSelect = (index: number) => {
    setSelectedColor(index);
    if (onColorChange && product.availableColors) {
      onColorChange(product.availableColors[index]);
    }
  };

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart();
    }
  };

  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const slideFromLeft = {
    hidden: { x: -60, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1] as const
      }
    }
  };

  const slideFromRight = {
    hidden: { x: 60, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1] as const
      }
    }
  };

  const fadeInUp = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  const scaleIn = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const
      }
    }
  };

  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 font-roobert max-w-7xl mx-auto px-4 sm:px-6"
    >

      <motion.div variants={slideFromLeft} className="space-y-4 lg:space-y-6">
        <div className="relative group">
          <motion.div
            className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg bg-gray-50"
            style={{ aspectRatio: '3/4' }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={selectedImage === 0 ? product.imageCover : product.images?.[selectedImage - 1]}
              alt={product.slug}
              className="w-full h-full object-contain"
              loading="lazy"
            />
          </motion.div>

          {product.images && product.images.length > 0 && (
            <>
              <motion.button
                className="absolute left-2 sm:left-2 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-100"
                onClick={() => setSelectedImage(selectedImage === 0 ? product.images!.length : selectedImage - 1)}
                whileHover={{ scale: 1.1, x: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <IoIosArrowBack className="text-gray-500" size={20}/>
              </motion.button>

              <motion.button
                className="absolute right-2 sm:right-2 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-100"
                onClick={() => setSelectedImage(selectedImage === product.images!.length ? 0 : selectedImage + 1)}
                whileHover={{ scale: 1.1, x: 2 }}
                whileTap={{ scale: 0.9 }}
              >
                <IoIosArrowForward  className="text-gray-500" size={20}/>
              </motion.button>
            </>
          )}
        </div>

        <motion.div 
          variants={fadeInUp}
          className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4"
        >
   
          <motion.button
            className={`relative aspect-square rounded-lg lg:rounded-xl overflow-hidden border-2 transition-all duration-300 ${
              selectedImage === 0
                ? 'border-[#3B8D90] shadow-lg ring-2 ring-[#3B8D90]/30'
                : 'border-gray-200 hover:border-gray-400'
            }`}
            onClick={() => setSelectedImage(0)}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src={product.imageCover}
              alt={`${product.slug} cover`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </motion.button>

          {product.images?.map((image, index) => (
            <motion.button
              key={index + 1}
              className={`relative aspect-square rounded-lg lg:rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                selectedImage === index + 1
                  ? 'border-[#3b908d] shadow-lg ring-2 ring-[#3B8D90]/30'
                  : 'border-gray-200 hover:border-gray-400'
              }`}
              onClick={() => setSelectedImage(index + 1)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={image}
                alt={`${product.slug} view ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.button>
          ))}
        </motion.div>
      </motion.div>

      <motion.div variants={slideFromRight} className="space-y-5 lg:space-y-6 lg:pt-4">

        <motion.div variants={scaleIn} className="space-y-3 lg:space-y-4">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="text-xs sm:text-sm font-semibold text-[#3B8D90] bg-[#3B8D90]/10 px-3 sm:px-4 py-1.5 rounded-full">
              {categoryName}
            </span>
            <div className="flex items-center gap-1.5 bg-yellow-50 px-3 py-1.5 rounded-full">
              <FaStar className="text-yellow-400 text-sm" />
              <span className="text-xs sm:text-sm font-semibold text-gray-700">
                {product.ratingsQuantity}
              </span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
            {product.title}
          </h1>

          {brandName && (
            <p className="text-base sm:text-lg text-gray-600">
              Brand : <span className="font-semibold text-gray-800">{brandName}</span>
            </p>
          )}
        </motion.div>

        <motion.div variants={fadeInUp} className="space-y-2">
          <div className="flex items-center gap-4">
            <span className={`text-3xl font-bold text-[#3B8D90] ${
              product.priceAfterDiscount ? "line-through" : ""
            }`}>
              ${product.price?.toLocaleString()}
            </span>
          </div>
          {product.priceAfterDiscount && (
            <p className="text-md text-green-600 font-medium">
              After discount: ${product?.priceAfterDiscount} 
              
            </p>
          )}
        </motion.div>

        <motion.p variants={fadeInUp} className="text-sm sm:text-base text-gray-600 leading-relaxed">
          {product.description}
        </motion.p>

        {product.availableColors && product.availableColors.length > 0 && (
          <motion.div variants={fadeInUp} className="space-y-3">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800">
              Color : <span className="font-normal text-gray-600 capitalize">{product.availableColors[selectedColor]}</span>
            </h3>
            <div className="flex gap-2.5 sm:gap-3">
              {product.availableColors.map((color, index) => (
                <motion.button
                  key={index}
                  className={`relative w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 transition-all duration-300 ${
                    selectedColor === index
                      ? 'border-gray-900 shadow-lg scale-110 ring-2 ring-gray-900/20'
                      : 'border-gray-300 hover:border-gray-500 hover:scale-105'
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorSelect(index)}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {selectedColor === index && (
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-white"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div variants={fadeInUp} className="flex gap-3 sm:gap-4">
          <Button
            variant="addBtn"
            size="lg"
            onClick={handleAddToCart}
            className="flex-1"
          >
            <div className="flex gap-2 sm:gap-3 items-center">
              <FaShoppingCart />
              Add to Cart
            </div>
          </Button>

          <motion.button
            className={`p-4 rounded-xl border-2 transition-all duration-300 ${
              isInWishlist
                ? 'border-[#E8765E] bg-red-50 text-[#E8765E]'
                : 'border-gray-200 hover:border-red-300 text-gray-600 hover:text-[#E8765E]'
            }`}
            onClick={handleToggleWishlist}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaHeart className="text-lg" />
          </motion.button>
        </motion.div>

        <motion.div 
          variants={fadeInUp}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-4 lg:pt-6 mt-4 lg:mt-6 border-t border-gray-200"
        >
          <div className="flex items-center gap-2.5 sm:gap-3 text-sm text-gray-600">
            <FaTruck className="text-[#3B8D90]" />
            <span>Free Shipping</span>
          </div>
          <div className="flex items-center gap-2.5 sm:gap-3 text-sm text-gray-600">
            <FaShieldAlt className="text-[#3B8D90]" />
            <span>2 Year Warranty</span>
          </div>
          <div className="flex items-center gap-2.5 sm:gap-3 text-sm text-gray-600">
            <FaUndo className="text-[#3B8D90]" />
            <span>30 Day Returns</span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ProductDetails;