import { motion } from "framer-motion";

import type {  IReview } from "../../Interfaces";
import RenderStars from "../Utility/RenderStars";

interface RateItemProps {
  review: IReview;
}

const RateItem = ({ review }: RateItemProps) => {
  

 const userName =
  review.user && typeof review.user === "object" && "name" in review.user
    ? review.user.name
    : "Unknown User";



  



  const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Invalid date"; 

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

  return (
    <motion.div
      className="py-4 border-b border-gray-100 last:border-b-0"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#3B8D90] rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">
                {userName.charAt(0).toUpperCase() || "U"}
              </span>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 font-roobert">
                {userName}
              </h4>
              <div className="flex items-center gap-1">
                <RenderStars rating={review.rating} />
                <span className="text-sm text-gray-600 ml-1">
                  {review.rating}
                </span>
              </div>
            </div>
          </div>
          <span className="text-sm text-gray-500 font-roobert">
            {formatDate(review.createdAt||"")}
          </span>
        </div>
        <p className="text-gray-700 font-roobert leading-relaxed">
          {review.review}
        </p>
       
      </div>
    </motion.div>
  );
};

export default RateItem;