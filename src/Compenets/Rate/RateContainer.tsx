import { motion } from "framer-motion";

import RatePost from "./RatePost";
import RateItem from "./RateItem";

import { useGetOneProductReviewQuery } from "../../app/Features/reviewApi";
import RenderStars from "../Utility/RenderStars";
import type { RootState } from "../../app/store";
import { useSelector } from "react-redux";

interface RateContainerProps {
  productId: string;
 
}

const RateContainer = ({productId}: RateContainerProps) => {

  const{data}=useGetOneProductReviewQuery({id:productId,params:{}})
  const reviews=data?.data ??[];
  const role = useSelector((state: RootState) => state.auth.role);




  const averageRating =
  data?.data.length
    ? data.data.reduce((sum, review) => sum + review.rating, 0) / data.data.length
    : 0;


  

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mt-16"
    >
     {
      reviews.length===0?
       <motion.div variants={itemVariants} className="mb-8">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-gray-800 font-roobert">
                Reviews
              </h2>
              <div className="flex items-center gap-2">
               
                <span className="text-gray-600 font-roobert">
                  ({}No reviews yet)
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      :
       <motion.div variants={itemVariants} className="mb-8">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between ">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-gray-800 font-roobert">
                Reviews
              </h2>
              <div className="flex items-center gap-2 flex-wrap">
                <RenderStars rating={averageRating} />
                <span className="text-xl font-bold text-gray-800 font-roobert">
                  {averageRating.toFixed(1)}
                </span>
                <span className="text-gray-600 font-roobert">
                  ({reviews.length} { reviews.length === 1 ? "review" : "reviews"})
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
     }
        { role !== "admin" && (
          
      <motion.div variants={itemVariants}>
       
           <RatePost
           productId={productId}
           
        />

    
       
      </motion.div>
        )

        }

     { reviews.length>0 &&
      <motion.div variants={itemVariants}>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden px-8 pt-8 pb-1" >
          <div className=" pb-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 font-roobert">
              Customer Reviews
            </h3>
          </div>
          <div className="divide-y divide-gray-100">
            {reviews.map((review, index) => (
              <motion.div
                key={review._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <RateItem review={review} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>}
    </motion.div>
  );
};

export default RateContainer;