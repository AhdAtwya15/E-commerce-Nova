import React, { useCallback, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import Pagination from "../../Utility/Pagination";
import { useGetAllCouponsQuery } from "../../../app/Features/couponApi";
import type { ICoupon, IParams } from "../../../Interfaces";
import ManageTitle from "../ManageTitle";
import AddCouponForm from "../Add/AddCouponForm";
import CouponCard from "../CouponCard";
import { Quantum } from "ldrs/react";

interface Coupon {
  _id: string;
  name: string;
  expire: string;
  discount: number;
}

const AdminCouponsManagement = () => {


  const [params, setParams] = useState<IParams>({
      limit: 8,
      page: 1,
      
     
    });
  
  const { data: couponsData, isLoading, error, refetch } = useGetAllCouponsQuery(params);
  const couponLength=couponsData?.results
  
  const pagination = couponsData?.paginationResult;
  const [couponToEdit, setCouponToEdit] = useState<ICoupon | null>(null);

  const handleEdit = (coupon: Coupon) => {
    setCouponToEdit(coupon);
  };

  const handleCancelEdit = () => {
    setCouponToEdit(null);
  };

   const handlePageChange = useCallback((page: number) => {
      setParams((prev) => ({
        ...prev,
        page,
      }));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);
  

  React.useEffect(() => {
    if (!couponToEdit) {
      refetch();
    }
  }, [couponToEdit, refetch]);

  React.useEffect(() => {
    if (couponToEdit && couponsData) {
      const couponStillExists = couponsData.data.some(
        (c) => c._id === couponToEdit._id
      );
      if (!couponStillExists) {
        setCouponToEdit(null);
      }
    }
  }, [couponsData, couponToEdit]);

  const formVariants: Variants = {
    hidden: { 
      opacity: 0, 
      x: -60,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 80,
        damping: 15,
        duration: 0.6
      }
    }
  };

  const listVariants: Variants = {
    hidden: { 
      opacity: 0, 
      x: 60,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 80,
        damping: 15,
        duration: 0.6,
        delay: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      x: 40,
      y: 20,
      scale: 0.85,
      rotateY: -15
    },
    visible: (index: number) => ({ 
      opacity: 1, 
      x: 0,
      y: 0,
      scale: 1,
      rotateY: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 18,
        delay: index * 0.08,
        duration: 0.5
      }
    }),
    exit: { 
      opacity: 0, 
      x: -40,
      y: -20,
      scale: 0.85,
      rotateY: 15,
      transition: {
        duration: 0.35,
        ease: "easeInOut" as const
      }
    }
  };

  return (
    <div className="w-full space-y-4 pb-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ManageTitle title="Coupons Management" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-8 lg:gap-10">
        
        <motion.div
          variants={formVariants}
          initial="hidden"
          animate="visible"
          className="space-y-3"
        >
          <div className="flex items-center gap-3">
            
             <motion.div 
         whileHover={{
                       scale: 1.01,
                        transition: { duration: 0.2 }
                    }}
                    className="px-2 text-xl font-roobert text-gray-600 font-medium"
                    >
           {couponToEdit ? "Edit Coupon" : "Add New Coupon"}
        </motion.div>
          </div>
          
          <motion.div
            key={couponToEdit?._id || 'new'}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl  p-5 "
          >
            <AddCouponForm
              couponToEdit={couponToEdit}
              onCancelEdit={handleCancelEdit}
            />
          </motion.div>
        </motion.div>
        <motion.div
          variants={listVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              
              <h2 className="text-2xl font-medium text-gray-800 tracking-tight">
                All Coupons
              </h2>
            </div>
            {couponsData?.data && couponsData.data.length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-teal-600 text-white rounded-full text-sm font-medium shadow-sm"
              >
                {couponLength || 0} Total
              </motion.div>
            )}
          </div>

          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20"
            >
                <Quantum size="50" speed="1.75" color="#E8765E" />
              <p className="mt-4 text-gray-500 font-medium">Loading coupons...</p>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <p className="text-red-500 font-medium">Failed to load coupons</p>
              <button
                onClick={() => refetch()}
                className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
              >
                Try Again
              </button>
            </motion.div>
          )}

          {couponsData && couponsData.data.length > 0 ? (
            <>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-6"
                layout
              >
                <AnimatePresence mode="popLayout">
                  {couponsData.data.map((coupon, index) => (
                    <motion.div
                      key={coupon._id}
                      custom={index}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      layout
                      style={{ perspective: 1000 }}
                    >
                      <CouponCard coupon={coupon} onEdit={handleEdit} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {pagination && pagination.numberOfPages > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="flex justify-center pt-6"
                >
                  <Pagination
                    currentPage={pagination.currentPage}
                    totalPages={pagination.numberOfPages}
                    onPageChange={handlePageChange}
                    siblingCount={1}
                    boundaryCount={1}
                    showFirstLast
                    showPageInfo
                  />
                </motion.div>
              )}
            </>
          ) : (
            !isLoading && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-cyan-600/10 to-teal-600/10 rounded-full flex items-center justify-center mb-6">
                  <svg 
                    className="w-12 h-12 text-teal-600" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" 
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No coupons yet</h3>
                <p className="text-gray-500 max-w-sm">
                  Create your first coupon to start offering discounts to your customers!
                </p>
              </motion.div>
            )
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminCouponsManagement;