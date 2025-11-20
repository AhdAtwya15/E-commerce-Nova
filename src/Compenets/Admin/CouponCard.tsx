import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEdit, FaTrash,  FaClock, FaTag } from "react-icons/fa";
import { useDeleteCouponMutation } from "../../app/Features/couponApi";
import ConfirmDeleteModal from "../UI/ConfirmDeleteModal";
import { createPortal } from "react-dom";
import type { ICoupon } from "../../Interfaces";
import useNotification from "../../hook/useNotification";



interface CouponCardProps {
  coupon: ICoupon;
  onEdit: (coupon: ICoupon) => void;
}

const CouponCard = ({ coupon, onEdit }: CouponCardProps) => {
  const [deleteCoupon, { isLoading }] = useDeleteCouponMutation();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const notify = useNotification

  const tealColor = 'rgb(59, 141, 144)';
  const tealLight = 'rgb(74, 164, 168)';
  const tealDark = 'rgb(42, 107, 122)';

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteCoupon(coupon._id).unwrap();
      notify("Coupon deleted successfully", "success");
      setShowDeleteModal(false);
    } catch {
      notify("Failed to delete coupon", "error");
    } finally {
      setIsDeleting(false);
    }
  };

  const expireDate = new Date(coupon.expire);
  const now = new Date();

  const isExpired = expireDate < now;
  
  
 
  const timeDiff = expireDate.getTime() - now.getTime();
  const daysRemaining = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hoursRemaining = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutesRemaining = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));


  const timeRemainingText = isExpired 
    ? "Expired" 
    : `${daysRemaining}d ${hoursRemaining}h ${minutesRemaining}m`;

 
  const discountPercentage = coupon.discount ?? 0;

  return (
    <>
      <AnimatePresence mode="wait" onExitComplete={() => {
       
      }}>
        {!isDeleting && (
          <motion.div
            key="coupon-card" 
            className={`relative rounded-3xl border-2 p-5 overflow-hidden group ${
              isExpired 
                ? 'bg-gradient-to-br from-red-50 via-white to-red-50' 
                : 'bg-gradient-to-br from-white via-teal-50 to-white'
            }`}
            style={{
              borderColor: isExpired ? '#FCA5A5' : tealColor
            }}
            initial={{ opacity: 0, x: -60, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              x: 0, 
              scale: 1,
              transition: {
                type: 'spring',
                stiffness: 100,
                damping: 20,
                duration: 0.6
              }
            }}
            exit={{ 
              opacity: 0,
              scale: 0.8,
              y: -20,
              transition: {
                duration: 0.3,
                ease: 'easeIn'
              }
            }}
            whileHover={{
              y: -8,
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
            layout
          >
      
            <motion.div
              className="absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none"
              style={{
                background: isExpired
                  ? 'radial-gradient(circle at 50% 0%, rgba(239, 68, 68, 0.08) 0%, transparent 70%)'
                  : `radial-gradient(circle at 50% 0%, rgba(59, 141, 144, 0.12) 0%, transparent 70%)`
              }}
            />

      
            <motion.div
              className="relative flex justify-between items-start mb-5"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
            >
              <div className="flex-1 pr-4">
                <motion.div
                  className="flex items-center gap-2 mb-3"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <FaTag className="text-teal-600 text-sm" />
                  <h3 className="text-xl font-bold text-gray-800 truncate">
                    {coupon.name}
                  </h3>
                </motion.div>
                
                <motion.div
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm ${
                    isExpired
                      ? 'bg-red-100 text-red-700 border border-red-200'
                      : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                  }`}
                  initial={{ opacity: 0, scale: 0.8, x: -20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className={`w-2 h-2 rounded-full ${isExpired ? 'bg-red-500' : 'bg-emerald-500'}`}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [1, 0.7, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  />
                  {isExpired ? 'Expired' : 'Active'}
                </motion.div>
              </div>

             
              <motion.div
                className="flex gap-2"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <motion.button
                  onClick={() => onEdit(coupon)}
                  className="p-2.5 bg-white text-teal-600 hover:bg-teal-600 hover:text-white rounded-xl transition-all duration-300 shadow-sm border border-teal-200 hover:border-teal-600"
                  whileHover={{
                    scale: 1.15,
                    rotate: 8,
                    transition: { duration: 0.1 }
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaEdit size={14} />
                </motion.button>
                <motion.button
                  onClick={handleDelete}
                  disabled={isLoading}
                  className="p-2.5 bg-white text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all duration-300 shadow-sm border border-red-200 hover:border-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{
                    scale: 1.15,
                    rotate: -8,
                    transition: { duration: 0.1 }
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaTrash size={14} />
                </motion.button>
              </motion.div>
            </motion.div>

          
            <motion.div
              className="relative space-y-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              
              <motion.div
                className="relative flex-col p-4 bg-gradient-to-br from-teal-50 via-white to-teal-50 rounded-2xl border border-teal-200 overflow-hidden"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ 
                  scale: 1.03,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-semibold text-sm flex items-center gap-2">
                    Discount
                  </span>
                  <motion.div
                    className="flex items-baseline gap-1"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
                  >
                    <span 
                      className="text-4xl font-black"
                      style={{
                        background: `linear-gradient(to right, ${tealColor}, ${tealDark})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}
                    >
                      {discountPercentage}
                    </span>
                    <span className="text-2xl font-bold text-teal-600">%</span>
                  </motion.div>
                </div>

                {!isExpired && (
                  <motion.div
                    className="p-4 bg-gradient-to-r from-teal-50 via-teal-100 to-teal-50 rounded-2xl"
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  >
                    <div className="relative w-full bg-gray-200 rounded-full h-2.5 overflow-hidden shadow-inner">
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: `linear-gradient(to right, ${tealColor}, ${tealLight}, ${tealDark})`
                        }}
                        initial={{ width: 0 }}
                        animate={{
                          width: `${discountPercentage}%`
                        }}
                        transition={{
                          duration: 1.5,
                          delay: 1,
                          ease: 'easeOut'
                        }}
                      >
                     
                        <motion.div
                          className="absolute inset-0"
                          style={{
                            background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent)'
                          }}
                          animate={{
                            x: ['-100%', '200%']
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'linear',
                            repeatDelay: 1
                          }}
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </motion.div>

              <motion.div
                className={`p-4 rounded-2xl border ${
                  isExpired 
                    ? 'bg-red-50 border-red-200' 
                    : 'bg-gray-50 border-gray-200'
                }`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                whileHover={{ 
                  scale: 1.03,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600 font-semibold text-sm flex items-center gap-2">
                    <FaClock className={isExpired ? 'text-red-500' : 'text-teal-600'} size={12} />
                    {isExpired ? 'Expired On' : 'Expires On'}
                  </span>
                  <span className={`font-bold text-sm ${isExpired ? 'text-red-600' : 'text-gray-800'}`}>
                    {expireDate.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
               <div className="flex justify-between items-center">
                
                 {!isExpired && (
                  <>
                  <span className="text-gray-600 font-semibold text-xs ">
                    remaining time
                  </span>

                    <span className="text-xs font-semibold text-teal-600 bg-teal-50 px-2 py-1 rounded-lg">
                      {timeRemainingText}
                    </span>
                  </>
                )}

               </div>
              </motion.div>
            </motion.div>


            <motion.div
              className="absolute bottom-0 left-0 right-0 h-1 rounded-full"
              style={{
                background: 'linear-gradient(to right, transparent, rgba(59, 141, 144, 0.3), transparent)'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {showDeleteModal && createPortal(
        <ConfirmDeleteModal
          isOpen={showDeleteModal}
          title="coupon"
          onConfirm={confirmDelete}
          onClose={() => setShowDeleteModal(false)}
          isLoading={isLoading}
        />,
        document.body
      )}
    </>
  );
};

export default CouponCard;