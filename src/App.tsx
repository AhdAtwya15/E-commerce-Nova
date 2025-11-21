import { RouterProvider } from "react-router-dom"
import Router from "./Router/Router"
import { ToastContainer } from 'react-toastify';
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { hydrateAuth } from "./app/Features/Slices/authSlice";
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const token = localStorage.getItem("token");
  //     dispatch(hydrateAuth(token));
  //   }
  // }, [dispatch]);

  
  // useEffect(() => {
  //   const handleStorage = (e: StorageEvent) => {
  //     if (e.key === "token") {
  //       dispatch(hydrateAuth(e.newValue));
  //     }
  //   };
  //   window.addEventListener("storage", handleStorage);
  //   return () => window.removeEventListener("storage", handleStorage);
  // }, [dispatch]);

  useEffect(() => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    dispatch(hydrateAuth({ token, role }));
  }
}, [dispatch]);

useEffect(() => {
  const handleStorage = (e: StorageEvent) => {
    if (e.key === "token" || e.key === "role") {
      dispatch(
        hydrateAuth({
          token: localStorage.getItem("token"),
          role: localStorage.getItem("role"),
        })
      );
    }
  };
  window.addEventListener("storage", handleStorage);
  return () => window.removeEventListener("storage", handleStorage);
}, [dispatch]);


  return (
    <main>
      <RouterProvider router={Router} />
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
       className="font-roobert text-sm"
       toastClassName="font-roobert rounded-lg shadow-lg text-sm" 
      />
    </main>


  )
}

export default App