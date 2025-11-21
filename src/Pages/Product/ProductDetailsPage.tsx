import {  motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import ProductDetails from "../../Compenets/Products/ProductDetails";
import RateContainer from "../../Compenets/Rate/RateContainer";
import { Quantum } from 'ldrs/react';

import { useGetProductByIdQuery, useGetProductsMayLikeQuery } from "../../app/Features/productApi";
import ProductCard from "../../Compenets/Products/ProductCard";
import ManageTitle from "../../Compenets/Admin/ManageTitle";
import { useAddProductToCartMutation } from "../../app/Features/cartApi";
import { useState } from "react";

import NoProductsFound from "../../Compenets/Utility/NoProductsFound";
import useNotification from "../../hook/useNotification";
import { useGetCategoryByIdQuery } from "../../app/Features/categoriesApi";
import { useGetBrandByIdQuery } from "../../app/Features/brandsApi";
import type { RootState } from "../../app/store";
import { useSelector } from "react-redux";



const ProductDetailsPage = () => {
  const [selectedColor, setSelectedColor] = useState<string>("");
  const { id } = useParams();
  const navigate = useNavigate();
  const notify = useNotification;
    const token = useSelector((state: RootState) => state.auth.token);
    const isHydrated = useSelector((state: RootState) => state.auth.isHydrated);

  const { data: productDetailsData, isLoading: isProductLoading, isError } = useGetProductByIdQuery(id!);
  const productDetails = productDetailsData?.data;
  const catId = productDetails?.category;
  const brandId = productDetails?.brand;

  const { data: categoryData, isLoading: isCatLoading } = useGetCategoryByIdQuery(catId ?? "", { skip: !catId });
  const { data: brandData, isLoading: isBrandLoading } = useGetBrandByIdQuery(brandId ?? "", { skip: !brandId });

  const categoryName = categoryData?.data.name;
  const brandName = brandData?.data.name;

  const { data: productsMayLike } = useGetProductsMayLikeQuery(catId ?? "");
  const productsLike = productsMayLike?.data;

  const [addToCart,{isLoading:isAddToCart}] = useAddProductToCartMutation();

  const handleAddToCart = async () => {
     if (!isHydrated) return;
    if (!token) {
      notify("Please login first", "error");
       setTimeout(()=>{
        navigate('/login')
      },500)
      return;
    }
    const colorToSend = selectedColor || productDetails?.availableColors?.[0];
    if (!colorToSend) {
      notify("Please select a color", "warning");
      return;
    }

    try {
      await addToCart({ productId: id!, color: colorToSend }).unwrap();
      notify("Product added to cart", "success");
    } catch {
      notify("Failed to add product to cart", "error");
    }
  };

 
  const isLoading = isProductLoading || (productDetails && (isCatLoading || isBrandLoading));

  return (
    <div className="min-h-screen " style={{ background: 'linear-gradient(to bottom right, #f9fafb, #ffffff)' }}>
      <div className="container-custom py-8">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-[#3B8D90] hover:text-[#E8765E] transition-colors duration-300"
            >
              <FaArrowLeft className="text-lg" />
              <span className="font-roobert font-medium">Back</span>
            </button>
          </div>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center py-40">
            <Quantum size="50" speed="1.75" color="#E8765E" />
          </div>
        ) : isError ? (
          <NoProductsFound isError />
        ) : productDetails && categoryName && brandName ? (
          <>
            <ProductDetails
              product={productDetails}
              categoryName={categoryName}
              brandName={brandName}
              onColorChange={setSelectedColor}
              onAddToCart={handleAddToCart}
              isLoading={isAddToCart}
            />
            <RateContainer productId={productDetails._id} />

            <div className="my-5">
              <ManageTitle title="Products you may like" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {productsLike?.filter((p) => p._id !== productDetails._id).slice(0, 8).map((product, index) => (
                <ProductCard key={index} {...product} index={index} onAddToCart={handleAddToCart} />
              ))}
            </div>
          </>
        ) : (
          <p>Product not found</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsPage;






