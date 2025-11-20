import { useForm, type SubmitHandler } from "react-hook-form"
import { registerSchema } from "../../Validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import ErrorMsg from "../../Compenets/UI/ErrorMsg";
import Button from "../../Compenets/UI/Button";
import { motion } from "framer-motion";
import type { IRegForm } from "../../Interfaces";
import { useRegisterMutation } from "../../app/Features/authenticationApi";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../../app/Features/Slices/authSlice";
import useNotification from "../../hook/useNotification";






const Register = () => {
     const [showPassword, setShowPassword] = useState(false);
    const notify = useNotification

     const dispatch = useDispatch();
  
    const [registerUser,{isLoading}]=useRegisterMutation()
    

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IRegForm>({
        resolver: yupResolver(registerSchema),
        mode: "onSubmit",
    });
    const navigate = useNavigate()


    const onSubmit: SubmitHandler<IRegForm> = async (values) => {
        
        try {
           const {token} = await registerUser(values).unwrap();
           
           dispatch(setToken(token));
            notify("Account created successfully , please login","success")
            navigate("/login"); 





            
        }  catch (error) {
  if (error && typeof error === "object" && "data" in error) {
    const err = error as { data?: { errors?: { msg: string }[]; message?: string } };
    
    if (err.data?.errors && Array.isArray(err.data.errors)) {
      const firstError = err.data.errors[0];
    if (firstError.msg === "E-mail already in use") {
        notify("Email already exists", "error");
      } else {
        notify("Something went wrong!", "error");
      }
      
    }  else {
      notify("Registration failed, please try again.","error");
    }
  } 
} finally {
            ;
        }
    };
    return (
        <div className=" bg-gradient-to-br from-gray-50 to-white flex items-center justify-center my-10  px-4 sm:px-6 lg:px-8">
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
                    <h2 className="text-3xl font-bold text-[#3B8D90] font-roobert ">
                        Register Now !
                    </h2>
                    <p className="text-gray-600 font-roobert">
                        Join us and start shopping
                    </p>
                </motion.div>

                <motion.div
                    className="bg-white px-8 pt-5 pb-12 rounded-2xl shadow-xl border border-gray-100"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                        <motion.div
                            className="relative"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <input
                                type="text"
                                id="name"
                                className="peer block w-full py-3 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-[#3B8D90] transition-all duration-300"
                                placeholder=" "
                                {...register("name")}
                            />
                            <label
                                htmlFor="name"
                                className="absolute text-sm text-gray-500 top-3 left-0 transition-all duration-300 transform origin-[0] 
                peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-[#3B8D90]
                peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 
                peer-[&:not(:placeholder-shown)]:-translate-y-6 peer-[&:not(:placeholder-shown)]:scale-75"
                            >
                                Full Name
                            </label>
                            {errors["name"] && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className="mt-2"
                                >
                                    <ErrorMsg msg={errors["name"]?.message} />
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
                            transition={{ duration: 0.5, delay: 0.7 }}
                        >
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                className="peer block w-full py-3 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-[#3B8D90] transition-all duration-300"
                                placeholder=" "
                                {...register("password")}
                            />
                            <label
                                htmlFor="password"
                                className="absolute text-sm text-gray-500 top-3 left-0 transition-all duration-300 transform origin-[0] 
                peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-[#3B8D90]
                peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 
                peer-[&:not(:placeholder-shown)]:-translate-y-6 peer-[&:not(:placeholder-shown)]:scale-75"
                            >
                                Password
                            </label>
                             <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-0 top-3 text-gray-500 hover:text-[#3B8D90] transition-colors duration-300"
                            >
                                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                            </button>
                            {errors["password"] && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className="mt-2"
                                >
                                    <ErrorMsg msg={errors["password"]?.message} />
                                </motion.div>
                            )}
                        </motion.div>

                        <motion.div
                            className="relative"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                        >
                            <input
                                type={showPassword ? "text" : "password"}
                                id="passwordConfirm"
                                className="peer block w-full py-3 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-[#3B8D90] transition-all duration-300"
                                placeholder=" "
                                {...register("passwordConfirm")}
                            />
                            <label
                                htmlFor="passwordConfirm"
                                className="absolute text-sm text-gray-500 top-3 left-0 transition-all duration-300 transform origin-[0] 
                peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-[#3B8D90]
                peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 
                peer-[&:not(:placeholder-shown)]:-translate-y-6 peer-[&:not(:placeholder-shown)]:scale-75"
                            >
                                Confirm password
                            </label>
                             <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-0 top-3 text-gray-500 hover:text-[#3B8D90] transition-colors duration-300"
                            >
                                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                            </button>
                            {errors["passwordConfirm"] && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className="mt-2"
                                >
                                    <ErrorMsg msg={errors["passwordConfirm"]?.message} />
                                </motion.div>
                            )}
                        </motion.div>

                         <motion.div
                            className="relative"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                        >
                            <input
                                type="phone"
                                id="phone"
                                className="peer block w-full py-3 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-[#3B8D90] transition-all duration-300"
                                placeholder=" "
                                {...register("phone")}
                            />
                            <label
                                htmlFor="phone"
                                className="absolute text-sm text-gray-500 top-3 left-0 transition-all duration-300 transform origin-[0] 
                peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-[#3B8D90]
                peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 
                peer-[&:not(:placeholder-shown)]:-translate-y-6 peer-[&:not(:placeholder-shown)]:scale-75"
                            >
                                Phone Number
                            </label>
                            {errors["phone"] && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className="mt-2"
                                >
                                    <ErrorMsg msg={errors["phone"]?.message} />
                                </motion.div>
                            )}
                        </motion.div>

                        <motion.div
                        className="pt-7"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.9 }}
                        >
                            <Button
                                type="submit"
                                variant="addBtn"
                                size="lg"
                                isLoading={isLoading}
                                className="w-full"
                            >
                                {isLoading ? "Creating Account..." : "Create Account"}
                            </Button>
                        </motion.div>

                        <motion.div
                            className="text-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 1.0 }}
                        >
                            <p className="text-sm text-gray-600 font-roobert">
                                Already have an account?{" "}
                                <button
                                    type="button"
                                    onClick={() => navigate("/login")}
                                    className="text-[#3B8D90] hover:text-[#E8765E] font-medium transition-colors duration-300"
                                >
                                    Sign in
                                </button>
                            </p>
                        </motion.div>
                    </form>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default Register;