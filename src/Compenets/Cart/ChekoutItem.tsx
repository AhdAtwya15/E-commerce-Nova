import { motion } from "framer-motion";
import Button from "../UI/Button";
import { FaCreditCard, FaShieldAlt, FaTruck, FaGift } from "react-icons/fa";
import { useForm, type SubmitHandler } from "react-hook-form"
import type { IApplyCoupon } from "../../Interfaces";

import { useApplyCouponMutation } from "../../app/Features/cartApi";
import { useNavigate } from "react-router-dom";
import useNotification from "../../hook/useNotification";

interface IProps {
  subtotal: number;
  totalItems: number;
  totalAfterDiscount?:number;
  cartId:string
}



const CheckoutItem = ({ subtotal, totalItems,totalAfterDiscount ,cartId}: IProps) => {
  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal + shipping ;
  const[applyCoupon,{isLoading}]=useApplyCouponMutation()
  const navigate=useNavigate()
  const notify = useNotification


    const {
        register,
        handleSubmit,  
        reset,     
    
    
      } = useForm<IApplyCoupon>({
          
        });
    

   const onSubmit: SubmitHandler<IApplyCoupon> = async (values) => {
       
    
       
            try
            {
               await applyCoupon(values).unwrap();
         
          notify("Coupon applied successfully","success")
          reset()
    
    
            }
            catch
            {
              notify("Coupon is invalid or has expired !","error")
            }
    
        
    
       
      };
    

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden sticky top-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >

      <div className="p-6 border-b border-gray-100 bg-white">
        <motion.h2
          className="text-3xl font-bold font-dancing"
          style={{
            background: 'linear-gradient(45deg, #3B8D90, #E8765E, #3B8D90)',
            backgroundSize: '200% 200%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear'
          }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
          >
            O
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, delay: 0.1 }}
          >
            r
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, delay: 0.2 }}
          >
            d
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, delay: 0.3 }}
          >
            e
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, delay: 0.4 }}
          >
            r
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, delay: 0.5 }}
          >
            {" "}
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, delay: 0.6 }}
          >
            S
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, delay: 0.7 }}
          >
            u
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, delay: 0.8 }}
          >
            m
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, delay: 0.9 }}
          >
            m
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, delay: 1.0 }}
          >
            a
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, delay: 1.1 }}
          >
            r
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, delay: 1.2 }}
          >
            y
          </motion.span>
        </motion.h2>
        <p className="text-gray-600 text-sm mt-1">{totalItems} items in your cart</p>
      </div>

      <div className="p-6 space-y-4">
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-roobert">Subtotal</span>
            <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-roobert">Shipping</span>
            <span className="font-semibold text-gray-900">
              {shipping === 0 ? (
                <span className="text-green-600">FREE</span>
              ) : (
                `$${shipping.toFixed(2)}`
              )}
            </span>
          </div>

          <div className="border-t flex flex-col border-gray-200 pt-3">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-gray-900 font-roobert">Total</span>
              <span className={`text-xl font-bold text-[#3B8D90]
              ${totalAfterDiscount&&`line-through`}
                `}>${total.toFixed(2)}</span>
            </div>
            <div>
              {totalAfterDiscount&&
               <p className="text-md text-green-600 font-medium">
              After discount : ${totalAfterDiscount}
            </p>

              }
              
            </div>
          </div>
        </div>

      
        <motion.div
          className="border border-gray-200 rounded-lg p-4"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <FaGift className="text-[#3B8D90]" />
            <span className="font-medium text-gray-900 font-roobert">Coupon Code</span>
          </div>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="Enter code"
              {...register("couponName")}
              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B8D90] focus:border-transparent text-sm"
            />
            <div className="w-20 ">
              <Button isLoading={isLoading} type="submit" variant="outline" size="xsm">
              Apply
            </Button>
              </div>
            
          </form>
        </motion.div>

       
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button variant="addBtn" size="lg"
           className="w-full"
           onClick={()=>navigate(`/paymentMethod/${cartId}`)}
           >
            <div className="flex items-center gap-2 ">
              <FaCreditCard />
              <span>Proceed to Checkout</span>
            </div>
          </Button>
        </motion.div>

      
        <div className="space-y-3 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <FaShieldAlt className="text-[#3B8D90]" />
            <span>Secure checkout with SSL encryption</span>
          </div>

          <div className="flex items-center gap-3 text-sm text-gray-600">
            <FaTruck className="text-[#3B8D90]" />
            <span>
              {shipping === 0 ?
                "Free shipping on orders over $100" :
                `Add $${(100 - subtotal).toFixed(2)} more for free shipping`

              }
            </span>
          </div>
        </div>
        <div className="pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-600 mb-3 font-roobert">We accept:</p>
          <div className="flex gap-2">
            {['Visa', 'Mastercard', 'PayPal', 'Apple Pay'].map((method, index) => (
              <motion.div
                key={method}
                className="px-3 py-1 bg-gray-100 rounded-lg text-xs font-medium text-gray-700"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.6 + (index * 0.1) }}
              >
                {method}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default CheckoutItem