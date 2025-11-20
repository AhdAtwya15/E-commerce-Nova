import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaUser } from "react-icons/fa";
import { BsTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { useForm, Controller } from "react-hook-form";
import Button from "../UI/Button";
import { useUpdateOrderToDeliverMutation, useUpdateOrderToPaidMutation } from "../../app/Features/ordersApi";
import useNotification from "../../hook/useNotification";

interface IProps {
  orderId: string;
  name: string;
  email: string;
  phone: string;
 
  isPaid?: boolean;
  isDelivered?: boolean;
}

interface FormData {
  paymentStatus: string;
  deliveryStatus: string;
}

const ClientDetails = ({ name, email, phone,  orderId, isPaid = false, isDelivered = false }: IProps) => {
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [deliveryOpen, setDeliveryOpen] = useState(false);
  
  const paymentDropdownRef = useRef<HTMLDivElement>(null);
  const deliveryDropdownRef = useRef<HTMLDivElement>(null);

  const [updateToPaid] = useUpdateOrderToPaidMutation();
  const [updateToDeliver] = useUpdateOrderToDeliverMutation();

  const { control, handleSubmit, watch, setValue } = useForm<FormData>({
    defaultValues: {
      paymentStatus: isPaid ? "paid" : "pending",
      deliveryStatus: isDelivered ? "delivered" : "shipping"
    }
  });
  const notify = useNotification

  const selectedPaymentStatus = watch("paymentStatus");
  const selectedDeliveryStatus = watch("deliveryStatus");

  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (paymentDropdownRef.current && !paymentDropdownRef.current.contains(event.target as Node)) {
        setPaymentOpen(false);
      }
      if (deliveryDropdownRef.current && !deliveryDropdownRef.current.contains(event.target as Node)) {
        setDeliveryOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const paymentStatuses = [
    { value: "pending", label: "Not Paid", color: "text-[#E8765E]" },
    { value: "paid", label: "Paid", color: "text-green-600" }
  ];

  const deliveryStatuses = [
    { value: "shipping", label: "In Shipping", color: "text-yellow-600" },
    { value: "delivered", label: "Delivered", color: "text-green-600" }
  ];

  const handlePaymentSelect = (value: string) => {
    setValue("paymentStatus", value);
    setPaymentOpen(false);
  };

  const handleDeliverySelect = (value: string) => {
    setValue("deliveryStatus", value);
    setDeliveryOpen(false);
  };

  const getStatusLabel = (statuses: typeof paymentStatuses, value: string) => {
    return statuses.find(s => s.value === value)?.label || "";
  };

  const getStatusColor = (statuses: typeof paymentStatuses, value: string) => {
    return statuses.find(s => s.value === value)?.color || "";
  };

  const onSubmit = async (data: FormData) => {
    try {
      
      if (data.paymentStatus === "paid" && !isPaid) {
        await updateToPaid(orderId).unwrap();
        notify("Payment status updated successfully", "success");
      }

      
      if (data.deliveryStatus === "delivered" && !isDelivered) {
        await updateToDeliver(orderId).unwrap();
        notify("Delivery status updated successfully", "success");
      }

    
    } catch  {
      notify("Failed to update status", "error");
    }
  };

  return (
    <div className="flex flex-col space-y-9 p-5 bg-white rounded-2xl shadow-md font-roobert">
      <div className="p-2 border-b border-gray-100">
        <motion.h2
          className="text-3xl font-bold font-dancing"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            background: 'linear-gradient(45deg, #3B8D90, #E8765E, #3B8D90)',
            backgroundSize: '200% 200%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            transition: { duration: 3, repeat: Infinity, ease: 'linear' }
          }}
        >
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.1 }}>C</motion.span>
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.1, delay: 0.1 }}>l</motion.span>
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.1, delay: 0.2 }}>i</motion.span>
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.1, delay: 0.3 }}>e</motion.span>
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.1, delay: 0.4 }}>n</motion.span>
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.1, delay: 0.5 }}>t</motion.span>
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.1, delay: 0.6 }}>{" "}</motion.span>
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.1, delay: 0.7 }}>D</motion.span>
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.1, delay: 0.8 }}>e</motion.span>
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.1, delay: 0.9 }}>t</motion.span>
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.1, delay: 1.0 }}>a</motion.span>
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.1, delay: 1.1 }}>i</motion.span>
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.1, delay: 1.2 }}>l</motion.span>
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.1, delay: 1.3 }}>s</motion.span>
        </motion.h2>
      </div>

      <div>
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex items-center gap-3">
            <FaUser className="text-xl mt-1 text-[#3B8D90]" />
            <div className="font-medium text-gray-700">
              Name: <span className="text-gray-500">{name}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <BsTelephoneFill className="text-xl mt-1 text-[#3B8D90]" />
            <div className="font-medium text-gray-700">
              Phone: <span className="text-gray-500">{phone}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MdEmail className="text-xl mt-1 text-[#3B8D90]" />
            <div className="font-medium text-gray-700">
              Email: <span className="text-gray-500">{email}</span>
            </div>
          </div>

          <div className="flex flex-col space-y-6">
            

           
            <Controller
              name="paymentStatus"
              control={control}
              render={() => (
                <motion.div
                  ref={paymentDropdownRef}
                  className="relative"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Status
                  </label>
                  
                 
                  {selectedPaymentStatus && (
                    <div className="flex gap-2 mb-3">
                      <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(paymentStatuses, selectedPaymentStatus)} bg-gray-50 border-2 ${selectedPaymentStatus === 'paid' ? 'border-green-300' : 'border-[#e8755e4e]'}`}>
                        <span>{getStatusLabel(paymentStatuses, selectedPaymentStatus)}</span>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => setPaymentOpen(!paymentOpen)}
                    type="button"
                    disabled={isPaid}
                    className={`w-full h-12 px-3 rounded-xl border border-[#3B8D90] bg-white text-gray-800 text-left flex justify-between items-center transition ${
                      isPaid
                        ? "opacity-60 cursor-not-allowed"
                        : "hover:bg-gray-50 focus:ring-1 focus:ring-[#3B8D90]"
                    }`}
                  >
                    Change Payment Status
                    <svg
                      className="w-2.5 h-2.5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 3 3 3-3"
                      />
                    </svg>
                  </button>

                  {paymentOpen && (
                    <div className="absolute mt-2 z-10 w-full bg-white rounded-lg shadow-lg border border-gray-200">
                      <ul className="py-2 text-sm">
                        {paymentStatuses.map((status) => (
                          <li key={status.value}>
                            <button
                              type="button"
                              onClick={() => handlePaymentSelect(status.value)}
                              className={`block w-full text-left px-4 py-3 hover:bg-gray-100 transition ${getStatusColor(paymentStatuses, status.value)} ${selectedPaymentStatus === status.value ? 'bg-gray-50 font-semibold' : ''}`}
                            >
                              {status.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              )}
            />

            
            <Controller
              name="deliveryStatus"
              control={control}
              render={() => (
                <motion.div
                  ref={deliveryDropdownRef}
                  className="relative"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Status
                  </label>
                  
                 
                  {selectedDeliveryStatus && (
                    <div className="flex gap-2 mb-3">
                      <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(deliveryStatuses, selectedDeliveryStatus)} bg-gray-50 border-2 ${selectedDeliveryStatus === 'delivered' ? 'border-green-300' : 'border-[#9fa24fe4]'}`}>
                        <span>{getStatusLabel(deliveryStatuses, selectedDeliveryStatus)}</span>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => setDeliveryOpen(!deliveryOpen)}
                    type="button"
                    className={`w-full h-12 px-3 rounded-xl border border-[#3B8D90] bg-white text-gray-800 text-left flex justify-between items-center transition ${
                      isDelivered
                        ? "opacity-60 cursor-not-allowed"
                        : "hover:bg-gray-50 focus:ring-1 focus:ring-[#3B8D90]"
                    }`}
                  >
                    Change Delivery Status
                    <svg
                      className="w-2.5 h-2.5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 3 3 3-3"
                      />
                    </svg>
                  </button>

                  {deliveryOpen && (
                    <div className="absolute mt-2 z-10 w-full bg-white rounded-lg shadow-lg border border-gray-200">
                      <ul className="py-2 text-sm">
                        {deliveryStatuses.map((status) => (
                          <li key={status.value}>
                            <button
                              type="button"
                              onClick={() => handleDeliverySelect(status.value)}
                              className={`block w-full text-left px-4 py-3 hover:bg-gray-100 transition ${getStatusColor(deliveryStatuses, status.value)} ${selectedDeliveryStatus === status.value ? 'bg-gray-50 font-semibold' : ''}`}
                            >
                              {status.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              )}
            />

            <div className="flex items-center justify-center pt-2">
              <Button 
                onClick={handleSubmit(onSubmit)} 
                className="text-sm py-2.5 px-8" 
                variant="apply" 
                size="md"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ClientDetails;