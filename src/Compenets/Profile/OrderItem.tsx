
import { motion, type Variants } from "framer-motion";
import type { IOrder } from "../../Interfaces";

interface IProps {
  order: IOrder;
  index: number;
  orderNumber: number;
}

const OrderItem = ({ order, index, orderNumber }: IProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = () => {
    if (order.isDelivered) return "bg-green-100 text-green-700";
    if (order.isPaid) return "bg-[#e8755e28] text-[#E8765E]";
    return "bg-yellow-100 text-yellow-700";
  };

  const getStatusText = () => {
    if (order.isDelivered) return "Delivered";
    if (order.isPaid) return "Paid - Shipping";
    return "Shipping";
  };

  const subtotal = order.totalOrderPrice - order.taxPrice - order.shippingPrice;

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
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
        delay: index * 0.1,
        duration: 0.6
      }
    }
  };

  const headerVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 14,
        delay: index * 0.1 + 0.15
      }
    }
  };

  const badgeVariants: Variants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      x: 20 
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 12,
        delay: index * 0.1 + 0.25
      }
    }
  };

  const productItemVariants: Variants = {
    hidden: {
      opacity: 0,
      x: -30,
      scale: 0.9
    },
    visible: (itemIndex: number) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 14,
        delay: index * 0.1 + 0.3 + itemIndex * 0.08
      }
    })
  };

  const addressVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 15,
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
        delay: index * 0.1 + 0.4 + order.cartItems.length 
 * 0.08
      }
    }
  };

  const priceRowVariants: Variants = {
    hidden: { 
      opacity: 0, 
      x: 20 
    },
    visible: (rowIndex: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 14,
        delay: index * 0.1 + 0.5 + order.cartItems.length 
 * 0.08 + rowIndex * 0.05
      }
    })
  };

  const totalVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      y: 10
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 140,
        damping: 12,
        delay: index * 0.1 + 0.65 + order.cartItems.length 
 * 0.08
      }
    }
  };

  const paymentInfoVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 10 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: index * 0.1 + 0.75 + order.cartItems.length 
 * 0.08
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ 
       
       
        transition: { 
          type: "spring",
          stiffness: 300,
          damping: 20
        } 
      }}
      className="bg-white rounded-xl shadow-sm   duration-300 overflow-hidden border border-gray-100"
    >
      <div className="p-5">

        <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
          <motion.div 
            variants={headerVariants}
            className="flex items-center gap-3"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: index * 0.1 + 0.1
              }}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-600/10 to-teal-600/10 flex items-center justify-center"
            >
              <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </motion.div>
            <div>
              <h3 className="text-base font-semibold text-[#3B8D90]">Order #{orderNumber}</h3>
              <p className="text-sm text-gray-500 mt-0.5">{formatDate(order.createdAt)}</p>
            </div>
          </motion.div>

          <motion.div variants={badgeVariants} className="relative">
            <div className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor()} shadow-sm`}>
              {getStatusText()}
            </div>
          </motion.div>
        </div>

        <div className="space-y-2.5 mb-4">
          {order?.cartItems?.length ?
  order.cartItems.map((item, idx) => (
            <motion.div
              key={item._id}
              custom={idx}
              variants={productItemVariants}
              whileHover={{ 
                
                transition: { 
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }
              }}
              className="flex gap-3 p-2.5 rounded-lg bg-gray-50 hد transition-colors duration-200"
            >
              <motion.div
                whileHover={{ 
                 
            
                  transition: { duration: 0.2 }
                }}
                className="flex-shrink-0"
              >
                <img
                  src={`${item.product.imageCover}`}
                  alt={item.product.title}
                  className="w-14 h-14 object-cover rounded-lg shadow-sm"
                />
              </motion.div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm text-gray-900 truncate">{item.product.title}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-gray-500">Qty {item.count}</span>
                  {item.color && (
                    <>
                      <span className="text-gray-300 text-sm">•</span>
                      <div className="flex items-center gap-1.5">
                        <motion.div
                          whileHover={{ 
                           
                            transition: { duration: 0.3 }
                          }}
                          className="w-3 h-3 rounded-full border-2 border-gray-200 shadow-sm"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm text-gray-500 capitalize">{item.color}</span>
                      </div>
                    </>
                  )}
                </div>
                <p className="text-orange-600 font-semibold text-sm mt-1">${item.price.toFixed(2)}</p>
              </div>
            </motion.div>
          )):""}
        </div>

        {order.shippingAddress && (
          <motion.div 
            variants={addressVariants}
            whileHover={{ 
              
              transition: { duration: 0.2 }
            }}
            className="mb-4 p-3 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-lg border border-gray-100"
          >
            <h4 className="font-medium text-sm text-gray-900 mb-1.5 flex items-center gap-2">
              <motion.svg 
                initial={{ rotate: -180, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: index * 0.1 + 0.4 + order.cartItems.length 
 * 0.08
                }}
                className="w-4 h-4 text-teal-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </motion.svg>
              Shipping Address
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              {order.shippingAddress.details || ""}
              {order.shippingAddress.city && `, ${order.shippingAddress.city}`}
            </p>
            {order.shippingAddress.phone && (
              <p className="text-sm text-gray-600 mt-1 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {order.shippingAddress.phone}
              </p>
            )}
          </motion.div>
        )}

        <div className="pt-4 border-t border-gray-100">
          <div className="space-y-1.5 mb-3">
            <motion.div 
              custom={0}
              variants={priceRowVariants}
              className="flex justify-between text-sm"
            >
              <span className="text-gray-500">Subtotal</span>
              <span className="text-gray-900 font-medium">${subtotal.toFixed(2)}</span>
            </motion.div>
            {order.taxPrice > 0 && (
              <motion.div 
                custom={1}
                variants={priceRowVariants}
                className="flex justify-between text-sm"
              >
                <span className="text-gray-500">Tax</span>
                <span className="text-gray-900 font-medium">${order.taxPrice.toFixed(2)}</span>
              </motion.div>
            )}
            {order.shippingPrice > 0 && (
              <motion.div 
                custom={2}
                variants={priceRowVariants}
                className="flex justify-between text-sm"
              >
                <span className="text-gray-500">Shipping</span>
                <span className="text-gray-900 font-medium">${order.shippingPrice.toFixed(2)}</span>
              </motion.div>
            )}
          </div>

          <motion.div 
            variants={totalVariants}
            whileHover={{ 
             
              transition: { duration: 0.2 }
            }}
            className="flex justify-between items-center pt-3 border-t border-gray-100 bg-gradient-to-r from-orange-50/50 to-orange-100/30 -mx-2 px-2 py-2.5 rounded-lg"
          >
            <span className="text-sm font-semibold text-gray-900">Total</span>
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: index * 0.1 + 0.7 + order.cartItems.length  * 0.08
              }}
              className="text-xl font-bold text-orange-600"
            >
              ${order.totalOrderPrice.toFixed(2)}
            </motion.span>
          </motion.div>

          <motion.div 
            variants={paymentInfoVariants}
            className="flex items-center gap-3 mt-3 text-sm text-gray-600"
          >
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <span className="font-medium text-gray-700">{order.paymentMethodType}</span>
            </span>
            <span className="text-gray-300">•</span>
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: index * 0.1 + 0.8 + order.cartItems.length  * 0.08
              }}
              className="flex items-center gap-1.5"
            >
              {order.isPaid ? (
                <>
                  <motion.svg 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 15,
                      delay: index * 0.1 + 0.85 + order.cartItems.length  * 0.08
                    }}
                    className="w-3.5 h-3.5 text-emerald-600" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </motion.svg>
                  <span className="text-emerald-600 font-medium">Paid</span>
                </>
              ) : (
                <>
                  <motion.svg 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: 360 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      delay: index * 0.1 + 0.85 + order.cartItems.length  * 0.08
                    }}
                    className="w-3.5 h-3.5 text-amber-600" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </motion.svg>
                  <span className="text-amber-600 font-medium">Pending</span>
                </>
              )}
            </motion.span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderItem;