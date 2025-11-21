

import { motion } from "framer-motion";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../../Compenets/UI/Button";
import InputsErrMsg from "../../Compenets/UI/InputsErrMsg";
import { useGetAddressesQuery, useAddAddressMutation } from "../../app/Features/addressesApi";
import { useCreateCashOrderMutation, useCreateCheckoutSessionMutation} from "../../app/Features/ordersApi";
import { addressSchema } from "../../Validation";
import { yupResolver } from "@hookform/resolvers/yup";
import type { IAddress } from "../../Interfaces";
import { FaCreditCard, FaMoneyBillWave, FaMapMarkerAlt, FaArrowLeft, FaPlus } from "react-icons/fa";
import useNotification from "../../hook/useNotification";
import { useDispatch } from "react-redux";
import { cartApi, useGetCartProductQuery } from "../../app/Features/cartApi";

interface IAddressForm {
  alias: string;
  details: string;
  phone: string;
  city: string;
}

const PaymentMethodPage = () => {
  const { cartId } = useParams<{ cartId: string }>();
  const navigate = useNavigate();
  const [selectedAddress, setSelectedAddress] = useState<IAddress | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'visa' | 'cash'>('cash');
  const [isAddingNew, setIsAddingNew] = useState(false);
  const { data: addressesData, isLoading: isLoadingAddresses } = useGetAddressesQuery();
  const addresses = addressesData?.data || [];
  const hasAddresses = addresses.length > 0;
  const [addAddress, { isLoading: isAddingAddress }] = useAddAddressMutation();
  const [createOrder, { isLoading: isCreatingOrder }] = useCreateCashOrderMutation();
  const [createCheckout,{isLoading:isCreatingCheckout}] = useCreateCheckoutSessionMutation()
  const notify = useNotification
  const dispatch = useDispatch();
  const {data:cartData}=useGetCartProductQuery({})
  const totalAfterDisc= cartData?.data.totalAfterDiscount||0
  const totalCart=cartData?.data.totalCartPrice||0

  const total = totalAfterDisc && totalAfterDisc > 0 ? totalAfterDisc : totalCart;

 
  const MIN_PRICE_FOR_VISA = 30;
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IAddressForm>({
    resolver: yupResolver(addressSchema),
    mode: "onSubmit"
  });

  const [openDropdown, setOpenDropdown] = useState(false);

  const onAddressSubmit: SubmitHandler<IAddressForm> = async (values) => {
    try {
      const newAddress = await addAddress(values).unwrap();
      notify("Address added successfully", "success");
      setSelectedAddress(newAddress);
      setIsAddingNew(false);
      reset();
    } catch  (error) {
      if (error && typeof error === "object" && "data" in error) {
        const err = error as { data?: { errors?: { msg: string }[]; message?: string } };

        if (err.data?.errors && Array.isArray(err.data.errors)) {
         
          notify("Failed to add address!", "error");
        } else if (err.data?.message) {
          const message = err.data.message;

          if (message.includes("Duplicate field value")) {
            notify("This address alias already exists!", "error");
          } else {
            notify("Failed to add address, please try again.", "error");
          }
        } else {
          notify("Failed to add address, please try again.", "error");
        }
      } else {
        notify("Failed to add address, please try again.", "error");
      }
    }
  };


  const handleSelectAddress = (addr: IAddress) => {
    setSelectedAddress(addr);
    setOpenDropdown(false);
  };

  const handlePlaceOrder = async () => {
   

    if (!selectedAddress) {
      notify("Please select or add an address", "warning");
      return;
    }



    try {
      const shippingAddress = {
        details: selectedAddress.details,
        phone: selectedAddress.phone,
        city: selectedAddress.city,
      };

       if (paymentMethod === 'visa') {

         if (total < MIN_PRICE_FOR_VISA) {
      notify(
        `Sorry, the total amount is too small for card payment. Minimum is $${MIN_PRICE_FOR_VISA} .`,
        "warning"
      );
      return;
    }
      const res =await createCheckout({ id: cartId!, data: { shippingAddress } }).unwrap();
      dispatch(cartApi.util.invalidateTags(["CartProducts"]));
       console.log("Checkout response:", res);
    
       if (res?.session?.url) {
    window.location.href = res.session.url; 
  } else {
    notify("Payment session URL not found", "error");
  }

   
      
    }
    else{
      await createOrder({ id: cartId!, data: { shippingAddress } }).unwrap();
       dispatch(cartApi.util.resetApiState());
      notify("Order placed successfully!", "success");
   
      
      navigate(`/success/${cartId}`);

    }
      
    } catch (error) {
      console.error("Order placement error:", error);
      
      // معالجة أفضل للأخطاء
      if (error && typeof error === "object" && "data" in error) {
        const err = error as { data?: { message?: string } };
        notify(err.data?.message || "Failed to place order", "error");
      } else {
        notify("Failed to place order", "error");
      }
    } 
  };

  if (isLoadingAddresses) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3B8D90]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-8">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate("/cart")}
            className="flex items-center gap-2 text-[#3B8D90] hover:text-[#E8765E] transition-colors duration-300 mb-4"
          >
            <FaArrowLeft className="text-lg" />
            <span className="font-roobert font-medium">Back to Cart</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900 font-roobert">Payment & Shipping</h1>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <FaMapMarkerAlt className="text-[#3B8D90] text-xl" />
              <h2 className="text-xl font-semibold text-gray-900 font-roobert">Shipping Address</h2>
            </div>
            {hasAddresses && !isAddingNew ? (
              <>
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <button
                    onClick={() => setOpenDropdown((prev) => !prev)}
                    className="w-full h-12 px-4 rounded-xl border border-[#3B8D90] bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#3B8D90] text-left flex justify-between items-center transition-all hover:bg-gray-50"
                    type="button"
                  >
                    {selectedAddress?.alias || "Select Address"}
                    <svg
                      className={`w-2.5 h-2.5 transition-transform ${openDropdown ? "rotate-180" : ""}`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </button>
                  {openDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="absolute mt-2 z-10 w-full bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden"
                    >
                      <ul className="py-1 text-sm text-gray-700 max-h-48 overflow-y-auto">
                        {addresses.map((addr) => (
                          <li key={addr._id}>
                            <button
                              onClick={() => handleSelectAddress(addr)}
                              className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors flex items-center gap-2"
                            >
                              <span className="font-medium">{addr.alias}</span>
                              <span className="text-xs text-gray-500">({addr.city})</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </motion.div>
                {selectedAddress && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200"
                  >
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Selected Address Details</h3>
                    <p className="text-sm text-gray-600">{selectedAddress.details}</p>
                    <p className="text-sm text-gray-600">Phone: {selectedAddress.phone}</p>
                    <p className="text-sm text-gray-600">City: {selectedAddress.city}</p>
                  </motion.div>
                )}
                <motion.button
                  onClick={() => setIsAddingNew(true)}
                  className="mt-4 flex items-center gap-2 text-[#3B8D90] hover:text-[#E8765E] transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  <FaPlus className="text-sm" />
                  <span>Add New Address</span>
                </motion.button>
              </>
            ) : (
              <motion.form
                onSubmit={handleSubmit(onAddressSubmit)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <input
                    type="text"
                    placeholder="Address Alias (e.g., Home)"
                    {...register("alias")}
                    className="w-full h-12 px-4 rounded-xl border border-[#3B8D90] bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3B8D90] transition-all"
                  />
                  {errors.alias && <InputsErrMsg msg={errors.alias.message} />}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <textarea
                    placeholder="Address Details"
                    {...register("details")}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-[#3B8D90] bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3B8D90] resize-none transition-all"
                  />
                  {errors.details && <InputsErrMsg msg={errors.details.message} />}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <input
                    type="text"
                    placeholder="Phone Number"
                    {...register("phone")}
                    className="w-full h-12 px-4 rounded-xl border border-[#3B8D90] bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3B8D90] transition-all"
                  />
                  {errors.phone && <InputsErrMsg msg={errors.phone.message} />}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <input
                    type="text"
                    placeholder="City"
                    {...register("city")}
                    className="w-full h-12 px-4 rounded-xl border border-[#3B8D90] bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3B8D90] transition-all"
                  />
                  {errors.city && <InputsErrMsg msg={errors.city.message} />}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="flex gap-4"
                >
                  <Button
                    type="submit"
                    variant="addBtn"
                    size="md"
                    isLoading={isAddingAddress}
                    className="flex-1"
                  >
                    Add Address
                  </Button>
                  {hasAddresses && (
                    <Button
                      type="button"
                      variant="cancel"
                      size="md"
                      onClick={() => setIsAddingNew(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  )}
                </motion.div>
              </motion.form>
            )}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <FaCreditCard className="text-[#3B8D90] text-xl" />
              <h2 className="text-xl font-semibold text-gray-900 font-roobert">Payment Method</h2>
            </div>
            <div className="space-y-4">
              <motion.div
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  paymentMethod === 'cash'
                    ? 'border-[#3B8D90] bg-[#3B8D90]/5'
                    : 'border-gray-200 hover:border-[#3B8D90]/50'
                }`}
                onClick={() => setPaymentMethod('cash')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    checked={paymentMethod === 'cash'}
                    onChange={() => setPaymentMethod('cash')}
                    className="w-4 h-4 text-[#3B8D90] focus:ring-[#3B8D90]"
                  />
                  <FaMoneyBillWave className="text-[#3B8D90] text-lg" />
                  <span className="font-medium text-gray-900">Cash on Delivery</span>
                </div>
                <p className="text-sm text-gray-600 mt-2 ml-7">Pay when you receive your order</p>
              </motion.div>
              <motion.div
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  paymentMethod === 'visa'
                    ? 'border-[#3B8D90] bg-[#3B8D90]/5'
                    : 'border-gray-200 hover:border-[#3B8D90]/50'
                }`}
                onClick={() => setPaymentMethod('visa')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    checked={paymentMethod === 'visa'}
                    onChange={() => setPaymentMethod('visa')}
                    className="w-4 h-4 text-[#3B8D90] focus:ring-[#3B8D90]"
                  />
                  <FaCreditCard className="text-[#3B8D90] text-lg" />
                  <span className="font-medium text-gray-900">Credit/Debit Card</span>
                </div>
                <p className="text-sm text-gray-600 mt-2 ml-7">Coming soon - Secure online payment</p>
              </motion.div>
            </div>
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Button
                variant="addBtn"
                size="lg"
                className="w-full"
                onClick={handlePlaceOrder}
                
                isLoading={isCreatingOrder|| isCreatingCheckout}
              >
                {paymentMethod === 'visa' ? 'Coming Soon' : 'Place Order'}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodPage;
