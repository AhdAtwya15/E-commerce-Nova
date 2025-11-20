import { useForm, type SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPassSchema } from "../../Validation";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import ErrorMsg from "../../Compenets/UI/ErrorMsg";
import Button from "../../Compenets/UI/Button";
import { motion } from "framer-motion";
import type { IResetPassForm } from "../../Interfaces";
import {  useResetPasswordMutation } from "../../app/Features/authenticationApi";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { setToken } from "../../app/Features/Slices/authSlice";
import useNotification from "../../hook/useNotification";



const ResetPasswordPage = () => {
     const [showPassword, setShowPassword] = useState(false);

    const [errorMsg, setError] = useState<string>("")
    const[resetPassword,{isLoading}]=useResetPasswordMutation()
    const notify = useNotification
     const dispatch = useDispatch();
 

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IResetPassForm>({
        resolver: yupResolver(resetPassSchema),
        mode: "onSubmit",
    });
    const navigate = useNavigate()
    const onSubmit: SubmitHandler<IResetPassForm> = async (values) => {
       
    
        try {
            const {token} = await resetPassword(values).unwrap();
          
           dispatch(setToken(token));

            notify("Welcome to Nova !","success")
            setTimeout(() => {
               
      navigate("/");
    }, 1500);

           
        }   catch (error) {
  if ("data" in (error as FetchBaseQueryError)) {
    
    const err = error as FetchBaseQueryError;
    const errorMessage =
      (err.data as { message?: string })?.message || "Something went wrong";

    setError(errorMessage);
   
  }
        }     
    };

    return (
        <div className=" bg-gradient-to-br from-gray-50 to-white flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 my-10">
            <motion.div
                className="max-w-md w-full space-y-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <h2 className="text-3xl font-bold text-[#3B8D90] font-roobert mb-2">
                        Reset Your Password
                    </h2>
                    <p className="text-gray-600 font-roobert">
                        Enter your email and new password
                    </p>
                </motion.div>

                <motion.div
                    className="bg-white px-8 pt-8 pb-12 rounded-2xl shadow-xl border border-gray-100"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                        {errorMsg && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ErrorMsg msg={errorMsg} />
                            </motion.div>
                        )}

                        <motion.div
                            className="relative"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <input
                                type="email"
                                id="email"
                                className="peer block w-full py-3 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-[#3B8D90] transition-all duration-300"
                                placeholder=" "
                                {...register("email")}
                            />
                            <label
                                htmlFor="email"
                                className="absolute text-sm text-gray-500 top-3 left-0 transition-all duration-300 transform origin-[0] 
                peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-[#3B8D90]
                peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 
                peer-[&:not(:placeholder-shown)]:-translate-y-6 peer-[&:not(:placeholder-shown)]:scale-75"
                            >
                                Email address
                            </label>
                            {errors["email"] && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className="mt-2"
                                >
                                    <ErrorMsg msg={errors["email"]?.message} />
                                </motion.div>
                            )}
                        </motion.div>

                        <motion.div
                            className="relative"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                        >
                            <input
                                type={showPassword ? "text" : "password"}
                                id="newPassword"
                                className="peer block w-full py-3 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-[#3B8D90] transition-all duration-300"
                                placeholder=" "
                                {...register("newPassword")}
                            />
                            <label
                                htmlFor="newPassword"
                                className="absolute text-sm text-gray-500 top-3 left-0 transition-all duration-300 transform origin-[0] 
                peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-[#3B8D90]
                peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 
                peer-[&:not(:placeholder-shown)]:-translate-y-6 peer-[&:not(:placeholder-shown)]:scale-75"
                            >
                                New Password
                            </label>
                             <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-0 top-3 text-gray-500 hover:text-[#3B8D90] transition-colors duration-300"
                            >
                                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                            </button>
                            {errors["newPassword"] && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className="mt-2"
                                >
                                    <ErrorMsg msg={errors["newPassword"]?.message} />
                                </motion.div>
                            )}


                        
                        </motion.div>

                        <motion.div
                        className="pt-5"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            
                        >
                            <Button
                                type="submit"
                                variant="addBtn"
                                size="lg"
                                isLoading={isLoading}
                                className="w-full"
                            >
                                {isLoading ? "Signing in..." : "Sign In"}
                            </Button>
                        </motion.div>

                        
                    </form>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default ResetPasswordPage