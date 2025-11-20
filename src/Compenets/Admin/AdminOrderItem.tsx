import { motion, type Variants } from "framer-motion";
import type { IOrder } from "../../Interfaces";
import { useNavigate} from "react-router-dom";


interface IProps {
  order: IOrder;
  index: number;
}

const AdminOrderItem = ({ order, index }: IProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
   const navigate = useNavigate();

  const getDeliveryStatusColor = () => {
    if (order.isDelivered) return "bg-emerald-100 text-emerald-700 border-emerald-200";
    return "bg-amber-100 text-amber-700 border-amber-200";
  };

  const getPaymentStatusColor = () => {
    if (order.isPaid) return "bg-emerald-100 text-emerald-700 border-emerald-200";
    return "bg-rose-100 text-rose-700 border-rose-200";
  };

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.96
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: index * 0.08,
      }
    }
  };

  const headerVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: index * 0.08 + 0.1,
        duration: 0.4
      }
    }
  };

  const badgeVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 12,
        delay: index * 0.08 + 0.2
      }
    }
  };

  const contentVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.08 + 0.3,
        duration: 0.4
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ 
        y: -4,
        boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        transition: { 
          type: "spring",
          stiffness: 300,
          damping: 20
        } 
      }}
      className="bg-white  rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 font-roobert"
      onClick={()=>(navigate(`/admin/allOrders/${order._id}`))}
    >
      <div className="p-5 space-y-4">
        
        <motion.div 
          variants={headerVariants}
          className="flex items-center justify-between   pb-4 border-b-2 border-gray-100"
        >
          <div className="flex items-center  gap-2">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: index * 0.08 + 0.05
              }}
              className="w-9 h-9 rounded-xl flex items-center justify-center"
            >
              <svg className="w-6 h-6 text-[#3B8D90]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </motion.div>
            <div>
              <h3 className="text-lg font-bold text-[#3B8D90]">Order #{order.id}</h3>
              <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formatDate(order.createdAt)}
              </p>
            </div>
          </div>

        
          
        </motion.div>

        <motion.div 
          variants={contentVariants}
          className="space-y-2 p-4 bg-[#3b8d9019] rounded-xl border border-blue-100"
        >
          <h4 className="font-semibold text-sm text-gray-900  flex items-center gap-2">
            <svg className="w-5 h-5 text-[#3B8D90]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Customer Details
          </h4>
          {order.user ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="font-medium text-gray-900">{order.user.name}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-600">{order.user.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-gray-600">{order.user.phone}</span>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500 italic">Customer information unavailable</p>
          )}
        </motion.div>

        {order.shippingAddress && (
          <motion.div 
            variants={contentVariants}
            className="p-4 bg-gradient-to-br from-teal-50 to-cyan-50/50 rounded-xl border border-teal-100"
          >
            <h4 className="font-semibold text-sm text-gray-900 mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Shipping Address
            </h4>
            <div className="space-y-1.5 text-sm text-gray-700">
              <p className="font-medium">{order.shippingAddress.details}</p>
              
              <p className="flex items-center gap-1.5 text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {order.shippingAddress.phone}
              </p>
            </div>
          </motion.div>
        )}

        <motion.div 
          variants={contentVariants}
          className="flex flex-wrap gap-3"
        >

          <div className={`flex-1 min-w-[140px] px-4 py-3 rounded-xl border-2 ${getPaymentStatusColor()} transition-all duration-200`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {order.isPaid ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                )}
                <span className="text-sm font-bold">
                  {order.isPaid ? "Paid" : "Unpaid"}
                </span>
              </div>
            </div>
            <p className="text-xs mt-1 opacity-80">{order.paymentMethodType}</p>
          </div>

          <div className={`flex-1 min-w-[140px] px-4 py-3 rounded-xl border-2 ${getDeliveryStatusColor()} transition-all duration-200`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {order.isDelivered ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
                <span className="text-sm font-bold">
                  {order.isDelivered ? "Delivered" : "Pending"}
                </span>
              </div>
            </div>
            <p className="text-xs mt-1 opacity-80">
              {order.isDelivered ? "Completed" : "In Shipping"}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.08 + 0.4 }}
          className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-sm"
        >
          <span className="text-gray-600 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {order.cartItems.length} item{order.cartItems.length > 1 ? 's' : ''}
          </span>

          <motion.div
            variants={badgeVariants}
            className="flex justify-center items-center gap-2"
          >
            <p className="text-xs text-gray-500 ">Total :</p>
            <p className="text-base md:!text-lg font-bold text-gray-700">
              ${order.totalOrderPrice.toFixed(2)}
            </p>
          </motion.div>
          
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AdminOrderItem;