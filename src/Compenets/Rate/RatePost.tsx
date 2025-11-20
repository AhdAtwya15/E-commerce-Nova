import { useState } from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import Button from "../UI/Button";
import { useCreateReviewOnProductMutation } from "../../app/Features/reviewApi";
import { useGetUserDataQuery } from "../../app/Features/loggedUserApi";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

import { useNavigate } from "react-router-dom";
import useNotification from "../../hook/useNotification";

interface RatePostProps {
  productId: string;
 
}


const RatePost = ({productId }: RatePostProps) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const {data}=useGetUserDataQuery("")
  const userName=data?.data.name??"Guest";
  const [createReview]=useCreateReviewOnProductMutation()
  const navigate=useNavigate();
  const notify = useNotification
  
 
  const handleSubmit = async() => {
    try{
          if (rating > 0 && comment.trim()) {

            await createReview({id:productId,data:{
              rating,
              review:comment
            }}).unwrap();

      
      setRating(0);
      setComment("");
    }


    }catch (error) {
  const err = error as FetchBaseQueryError & {
    data?: { errors?: { msg?: string }[]; message?: string };
  };

  const msg =
    err?.data?.errors?.[0]?.msg ||
    err?.data?.message ||
    "Something went wrong!";
    if(msg==="You already added review on this product"){
      notify('You have already reviewed this product.', 'error');

    }
    else if(msg==="You are not logged in. Please login to get access"){
      notify('Please login to add a review.', 'error');
      setTimeout(()=>{
        navigate('/login')
      },500)
    }

    }
}

  const renderStars = () => {
  return Array.from({ length: 5 }, (_, index) => {
    const starIndex = index + 1;
   
    return (
      <motion.div
        key={index}
        className="relative inline-block text-2xl cursor-pointer"
        onMouseMove={(e) => {
          const { left, width } = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - left;
          const newRating = index + x / width; 
          setHoveredRating(Number(newRating.toFixed(1)));
        }}
        onMouseLeave={() => setHoveredRating(0)}
        onClick={() => {
          setRating(hoveredRating || starIndex);
        }}
      >
        <FaStar
          className={`transition-colors duration-200 ${
            (hoveredRating || rating) >= starIndex
              ? "text-yellow-400"
              : (hoveredRating || rating) > index
              ? "text-yellow-300"
              : "text-gray-300"
          }`}
        />
        <div
          className="absolute top-0 left-0 h-full text-yellow-400 overflow-hidden pointer-events-none"
          style={{
            width: `${
              Math.min(
                1,
                Math.max(0, (hoveredRating || rating) - index)
              ) * 100
            }%`,
          }}
        >
          <FaStar />
        </div>
      </motion.div>
    );
  });
};


  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#3B8D90] rounded-full flex items-center justify-center">
            <span className="text-white font-medium text-sm">
              {userName.charAt(0).toUpperCase()}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 font-roobert">
            {userName}
          </h3>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium text-gray-700 font-roobert">
            Rate this product :
          </div>
          <div className="flex items-center gap-1">
            {renderStars()}
            {rating > 0 && (
              <span className="text-sm text-gray-600 ml-2 font-roobert">
                {rating} star{rating !== 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>

        
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 font-roobert">
            Write your review :
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience with this product..."
            className=" mt-2 w-full h-32 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B8D90] focus:border-transparent resize-none font-roobert"
            maxLength={500}
          />
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>Share your honest opinion</span>
            <span>{comment.length}/500</span>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            variant="addBtn"
            size="md"
            onClick={handleSubmit}
            className={`px-6 py-2 ${rating > 0 && comment.trim()
                ? "opacity-100"
                : "opacity-50 cursor-not-allowed "
              }`}
          >
            Add Review
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default RatePost;