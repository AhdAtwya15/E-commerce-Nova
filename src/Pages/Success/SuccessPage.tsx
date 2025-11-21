import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AiFillCheckCircle } from "react-icons/ai";
import axios from "axios";
import useNotification from "../../hook/useNotification";

export default function SuccessPage() {
  const navigate = useNavigate();
  const { cartId } = useParams<{ cartId: string }>();
  const [loading, setLoading] = useState(true);
  const [orderCreated, setOrderCreated] = useState(false);
  const notify = useNotification;

  useEffect(() => {
    const verifyOrder = async () => {
      try {
        const res = await axios.get(`/api/v1/orders/verify/${cartId}`);
        if (res.data.data) {
          setOrderCreated(true);
          notify("Order confirmed!", "success");
         
          setTimeout(() => navigate("/"), 3000);
        } else {
          setOrderCreated(false);
          notify("Order not found yet. Please refresh.", "warning");
        }
      } catch (err) {
        console.error(err);
        notify("Error verifying order", "error");
      } finally {
        setLoading(false);
      }
    };

    verifyOrder();
  }, [cartId, navigate, notify]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-green-100 font-roobert">
      <div className="bg-white shadow-xl rounded-2xl p-10 text-center max-w-md w-full animate-fade-in">
        <div className="flex justify-center mb-4">
          <AiFillCheckCircle className="w-24 h-24 text-green-600 animate-bounce" />
        </div>

        <h1 className="text-3xl font-bold text-green-700 mb-2">
          {orderCreated ? "Order Successful!" : "Order Pending"}
        </h1>

        <p className="text-gray-600 text-lg">
          {orderCreated
            ? "Your order has been placed successfully."
            : "We are still processing your payment. Please refresh in a few seconds."}
        </p>
      </div>
    </div>
  );
}



// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { AiFillCheckCircle } from "react-icons/ai";
// import { motion } from "framer-motion";

// export default function SuccessPage() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       navigate("/");
//     }, 3000);

//     return () => clearTimeout(timer);
//   }, [navigate]);

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-green-100 font-roobert">
//       <div className="bg-white shadow-xl rounded-2xl p-10 text-center max-w-md w-full animate-fade-in">
        
//         <div className="flex justify-center mb-4">
//           <AiFillCheckCircle className="w-24 h-24 text-green-600 animate-bounce" />
//         </div>

//         <h1 className="text-3xl font-bold text-green-700 mb-2">
//           Order Successful!
//         </h1>

//         <p className="text-gray-600 text-lg">
//           Your order has been placed successfully.
//         </p>
//          <p className="text-gray-500 mt-3">
//             Continue shopping in <span className="font-semibold">3 seconds</span>.
//         </p>

//         <div className="mt-6 flex justify-center">
//              <motion.div
//           className={`w-10 h-10 border-4 border-green-300 border-t-green-600 rounded-full`}
//           style={{
          
//             borderBottomColor: "transparent",
//             borderLeftColor: "transparent",
//           }}
//           animate={{ rotate: 360 }}
//           transition={{
//             duration: 1,
//             repeat: Infinity,
//             ease: "linear",
//           }}
//         />
//         </div>
//       </div>
//     </div>
//   );
// }
