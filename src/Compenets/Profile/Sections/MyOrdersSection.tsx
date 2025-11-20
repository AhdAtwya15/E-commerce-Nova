import { motion, type Variants } from "framer-motion";
import { useGetAllOrdersQuery } from "../../../app/Features/ordersApi";
import OrderItem from "../OrderItem";
import { Quantum } from 'ldrs/react'
import 'ldrs/react/Quantum.css'
import type { IParams } from "../../../Interfaces";
import { useCallback, useState } from "react";
import Pagination from "../../Utility/Pagination";
import NoProductsFound from "../../Utility/NoProductsFound";
import ManageTitle from "../../Admin/ManageTitle";

const MyOrdersSection = () => {
  const [params, setParams] = useState<IParams>({
    limit: 3,
    page: 1,
  });

  const { data, isLoading, error } = useGetAllOrdersQuery(params);
  const pagination = data?.paginationResult;
  const orderNums = data?.results || 0;

  const handlePageChange = useCallback((page: number) => {
    setParams((prev) => ({
      ...prev,
      page,
    }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const containerVariants: Variants = {
    hidden: { 
      opacity: 0 
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const headerVariants: Variants = {
    hidden: {
      opacity: 0,
      y: -30,
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
      scale: 0.8,
      y: 10
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12,
        delay: 0.3
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
    return (
      <div className="min-h-screen flex justify-center py-40 bg-gray-50">
        <Quantum size="45" speed="1.75" color="#E8765E" />
      </div>
    );
  }

  if (error) {
    return <NoProductsFound isError />;
  }

  const orders = data?.data || [];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">

        <motion.div variants={headerVariants} className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <ManageTitle title="My Orders" />
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-gray-600 mt-2"
              >
                {orderNums === 0
                  ? "You haven't placed any orders yet"
                  : `Track and manage your ${orderNums} order${orderNums > 1 ? "s" : ""}`}
              </motion.p>
            </div>

            {orders.length > 0 && (
              <motion.div
                variants={statsVariants}
                className="px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-teal-600 text-white rounded-full text-sm font-medium shadow-lg"
              >
                {orderNums} Total
              </motion.div>
            )}
          </div>
        </motion.div>

        {orders.length === 0 ? (
          <motion.div
            variants={emptyStateVariants}
            className="bg-white rounded-2xl shadow-lg p-12 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.3
              }}
              className="w-24 h-24 bg-gradient-to-br from-cyan-600/10 to-teal-600/10 rounded-full flex items-center justify-center mx-auto mb-6"
            >
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
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </motion.div>
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl font-bold text-gray-800 mb-2"
            >
              No Orders Yet
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-gray-600 mb-6"
            >
              Start shopping to see your orders here!
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#3B8D90] text-white px-6 py-3 rounded-lg hover:bg-[#2d6d70] transition-colors shadow-md"
            >
              Start Shopping
            </motion.button>
          </motion.div>
        ) : (
          <>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.6,
                type: "spring",
                stiffness: 80,
                damping: 15
              }}
              className="space-y-4 sm:space-y-6"
            >
              {orders.map((order, index) => (
                <OrderItem
                  key={order._id}
                  order={order}
                  index={index}
                  orderNumber={order.id - 1}
                />
              ))}
            </motion.div>

            {pagination && pagination.numberOfPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.5 + orders.length * 0.08,
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

export default MyOrdersSection;