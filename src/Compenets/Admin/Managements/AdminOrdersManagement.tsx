import { motion, type Variants } from "framer-motion";
import { useState, useCallback } from "react";
import AdminOrderItem from "../AdminOrderItem";
import type { IParams } from "../../../Interfaces";
import { useGetAllOrdersQuery } from "../../../app/Features/ordersApi";
import Pagination from "../../Utility/Pagination";
import ManageTitle from "../ManageTitle";
import NoProductsFound from "../../Utility/NoProductsFound";
import { Quantum } from 'ldrs/react';


const AdminOrdersManagement = () => {
  const [params, setParams] = useState<IParams>({
    limit: 6,
    page: 1,
  });

  const { data, isLoading, error } = useGetAllOrdersQuery(params);
  const pagination = data?.paginationResult;
  const orderCount = data?.results || 0;

  const handlePageChange = useCallback((page: number) => {
    setParams((prev) => ({
      ...prev,
      page,
    }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15
      }
    }
  };

  const headerVariants: Variants = {
    hidden: {
      opacity: 0,
      y: -40,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6
      }
    }
  };

  const statsVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12,
        delay: 0.2
      }
    }
  };

  const emptyStateVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      y: 20
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
        duration: 0.7
      }
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center py-40">
            <Quantum size="50" speed="1.75" color="#E8765E" />
          </div>
  }

  if (error) {
    return <NoProductsFound isError />;
  }

  const orders = data?.data || [];


  const paidOrders = orders.filter((order) => order.isPaid).length;
  const deliveredOrders = orders.filter((order) => order.isDelivered).length;
  const totalRevenue = orders.reduce((sum: number, order) => sum + order.totalOrderPrice, 0);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pb-8 px-4 sm:px-6 lg:px-8 font-roobert"
    >
      <div className="max-w-7xl mx-auto">
       
        <motion.div variants={headerVariants} className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div>
             <ManageTitle title="Orders Management"/>
              <p className="text-gray-600 text-lg">
                {orderCount === 0
                  ? "No orders found"
                  : `Managing ${orderCount} order${orderCount > 1 ? "s" : ""}`}
              </p>
            </div>

          
           
          </div>

     
          {orders.length > 0 && (
            <motion.div
              variants={statsVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
            
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                className="bg-white rounded-xl p-5 shadow-md border-2 border-emerald-100"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-medium mb-1">Total Revenue</p>
                    <p className="text-3xl font-bold text-emerald-600">
                      ${totalRevenue.toFixed(2)}
                    </p>
                  </div>
                  <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </motion.div>

         
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                className="bg-white rounded-xl p-5 shadow-md border-2 border-[#e8755e28]"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-medium mb-1">Paid Orders</p>
                    <p className="text-3xl font-bold text-[#E8765E]">
                      {paidOrders}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {orderCount > 0 ? ((paidOrders / orderCount) * 100).toFixed(0) : 0}% of total
                    </p>
                  </div>
                  <div className="w-14 h-14 bg-[#e8755e28] rounded-xl flex items-center justify-center">
                    <svg className="w-7 h-7 text-[#E8765E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                className="bg-white rounded-xl p-5 shadow-md border-2 border-[#3b8d9044]"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-medium mb-1">Delivered</p>
                    <p className="text-3xl font-bold text-[#3B8D90]">
                      {deliveredOrders}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {orderCount > 0 ? ((deliveredOrders / orderCount) * 100).toFixed(0) : 0}% complete
                    </p>
                  </div>
                  <div className="w-14 h-14 bg-[#3b8d902a] rounded-xl flex items-center justify-center">
                    <svg className="w-7 h-7 text-[#3B8D90]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </motion.div>

        {orders.length === 0 ? (
          <motion.div
            variants={emptyStateVariants}
            className="bg-white rounded-2xl shadow-xl p-16 text-center"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.2
              }}
              className="w-32 h-32 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <svg
                className="w-16 h-16 text-[#3B8D90]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </motion.div>
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold text-gray-800 mb-3"
            >
              No Orders Yet
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-600 text-lg"
            >
              Orders will appear here once customers start placing them
            </motion.p>
          </motion.div>
        ) : (
          <>
         
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.5
              }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {orders.map((order, index: number) => (
                <AdminOrderItem
                  key={order._id}
                  order={order}
                  index={index}
                />
              ))}
            </motion.div>

      
            {pagination && pagination.numberOfPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.5,
                  duration: 0.5
                }}
              >
                <Pagination
                  currentPage={params.page ?? 1}
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
        )}
      </div>
    </motion.div>
  );
};

export default AdminOrdersManagement;