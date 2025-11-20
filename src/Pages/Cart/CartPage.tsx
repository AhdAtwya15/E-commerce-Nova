import CartItem from "../../Compenets/Cart/CartItem";
import CheckoutItem from "../../Compenets/Cart/ChekoutItem";

import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaShoppingBag } from "react-icons/fa";

import { useDeletAllCartProductMutation, useDeletCartProductByIdMutation, useGetCartProductQuery } from "../../app/Features/cartApi";

import { Quantum } from 'ldrs/react';
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import Button from "../../Compenets/UI/Button";
import useNotification from "../../hook/useNotification";
import { preload } from "../../utilis/global-preload";


const CartPage = () => {

  const{data,isLoading,isFetching}=useGetCartProductQuery({});
  const cartProducts=data?.data?.products??[]
  const totalItems=data?.data?.products.length??0;
  const subtotal=data?.data?.totalCartPrice??0;
  const totalAfterDiscount=data?.data?.totalAfterDiscount
  const cartId=data?.data?._id

  const [deletcartItem]=useDeletCartProductByIdMutation()
  const [clearCart,{isLoading:isClearingCart}]=useDeletAllCartProductMutation()
  const navigate=useNavigate();
  const notify = useNotification

  const goToProducts = () => {

    preload(() => import("../Product/ShowProductsPage"));
    navigate("/products");
  };

   const handleRemove = async  (id:string) => {
     try {
   
         await deletcartItem(id).unwrap();
      notify('Product removed from cart', 'success');
   
      
    } catch  {
      notify('Failed to remove product from cart', 'error');
    }
  };
  
  const handleClearCart = async () => {
    try {
      await clearCart().unwrap();
      notify('Cart cleared successfully', 'success');
    } catch {
      notify('Failed to clear cart', 'error');
    }
  };

  return (
    <div className="mt-3" style={{ background: 'linear-gradient(to bottom right, #f9fafb, #ffffff)' }}>
      <div className="container-custom py-8">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={goToProducts}
              className="flex items-center gap-2 text-[#3B8D90] hover:text-[#E8765E] transition-colors duration-300"
            >
              <FaArrowLeft className="text-lg" />
              <span className="font-roobert font-medium">Continue Shopping</span>
            </button>
          </div>
          <div className="flex justify-between ">
            <div className="flex items-center gap-3 mb-2">
            <FaShoppingBag className="text-2xl text-[#3B8D90]" />
            <h1 className="text-3xl font-bold text-gray-900 font-roobert">Shopping Cart</h1>
            </div>
            {totalItems > 0 ? (
        <button 
          className="text-[#3B8D90] hover:text-[#E8765E] transition-colors duration-300 font-roobert font-medium disabled:opacity-50"
          onClick={handleClearCart}
          disabled={isClearingCart || isFetching}
        >
          {isClearingCart ? 'Clearing...' : 'Clear Cart'}
        </button>
      ) : null}

           



          </div>

          
         {
          cartProducts.length>0?
          (<p className="text-gray-600 font-medium">{totalItems} item{totalItems>1?"s":""} in your cart</p>)
          :
          
          null
         }
        </motion.div>

        {
          isLoading?
          (<div className="flex justify-center items-center py-30">
            <Quantum size="50" speed="1.75" color="#E8765E" />
          </div>)
         :
          
          cartProducts.length === 0 ? 
          (
                        <div className=" bg-gray-50 py-8 px-4">
                  <div className="max-w-7xl mx-auto">
                   
          
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex-col items-center justify-center bg-white rounded-lg shadow-sm p-12 md:p-15 text-center"
                    >
                      <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
          
                        <MdOutlineRemoveShoppingCart className="text-8xl text-gray-200 mx-auto mb-6" />
                      </motion.div>
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                        Your cart is Empty
                      </h2>
                      <p className="text-gray-500 mb-8 text-base md:text-lg">
                        Looks like you haven’t added anything yet. Let’s go shopping!
                      </p>
                     <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full flex justify-center"

            >
              <Button 
              fullWidth={false}
                size="xl" 
                variant="apply"
                onClick={() => navigate("/products")}
              >
                Shopping Now
              </Button>
            </motion.div>
                    </motion.div>
                  </div>
                </div>
                   )

          :
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 font-roobert">Cart Items</h2>
              </div>
              <div className="divide-y divide-gray-100">
                <AnimatePresence mode="sync">
                  
                
                {cartProducts.map((item, index) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                  >
                    <CartItem
                    isCart
_id={item._id}
productId={item.product._id}

  title={item.product.title}
  imageCover={item.product.imageCover}
  price={item.price}
  count={item.count}
  color={item.color}
  onRemoveFromCart={handleRemove}
  cat={item.product.category}
  index={index}
                    />
                  </motion.div>
                ))}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <CheckoutItem subtotal={subtotal} totalItems={totalItems}  totalAfterDiscount={totalAfterDiscount} cartId={cartId!}/>
          </motion.div>
        </div>
      
        }
      </div>
    </div>
  )
}

export default CartPage