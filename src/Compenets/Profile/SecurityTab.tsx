import  {  useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { FaLock } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";

import { motion } from "framer-motion";
import type { IUpdatePassword } from "../../Interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import { updatePassSchema } from "../../Validation";
import { useUpdateUserPasswordMutation } from "../../app/Features/loggedUserApi";
import ErrorMsg from "../UI/ErrorMsg";
import useNotification from "../../hook/useNotification";




const SecurityTab = () => {
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const[updatePassword,{isLoading:isUpdating,status}]=useUpdateUserPasswordMutation();  
  const notify = useNotification

  const {
    register,
    handleSubmit,
    formState: { errors },
  } =  useForm<IUpdatePassword>({
          resolver: yupResolver(updatePassSchema),
          mode: "onSubmit",
      });

  

  

  const onSubmit: SubmitHandler<IUpdatePassword> = async (values) => {
    try {
      await updatePassword(values).unwrap();
    
    } catch {
      notify("Failed to update password:","error");
    }
  };

  return (
    <div>
      <h2 className="text-lg md:!text-2xl whitespace-nowrap md:!whitespace-pre-wrap font-bold text-gray-800 mb-6">Change Password</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.35 }}>
          <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
          <div className="relative">
            <FaLock className="absolute left-3 top-4 text-gray-400" size={18} />
            <input
              type={showPassword.current ? "text" : "password"}
              {...register("currentPassword")}
               className="w-full pl-11 pr-12 py-3 text-sm border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-0 focus:border-[#3B8D90]"
              placeholder="Enter current password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((p) => ({ ...p, current: !p.current }))}
              className="absolute right-3 top-4 text-gray-400 hover:text-gray-600"
            >
              {showPassword.current ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>
          {errors["currentPassword"] && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className="mt-2"
                                >
                                    <ErrorMsg msg={errors["currentPassword"]?.message} />
                                </motion.div>
                            )}
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.35 }}>
          <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
          <div className="relative">
            <FaLock className="absolute left-3 top-4 text-gray-400" size={18} />
            <input
              type={showPassword.new ? "text" : "password"}
              {...register("password")}
               className="w-full pl-11 pr-12 py-3 text-sm border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-0 focus:border-[#3B8D90]"
              placeholder="Enter new password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((p) => ({ ...p, new: !p.new }))}
              className="absolute right-3 top-4 text-gray-400 hover:text-gray-600"
            >
              {showPassword.new ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>
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

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
          <div className="relative">
            <FaLock className="absolute left-3 top-4 text-gray-400" size={18} />
            <input
              type={showPassword.confirm ? "text" : "password"}
              {...register("passwordConfirm")}
               className="w-full pl-11 pr-12 py-3 text-sm border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-0 focus:border-[#3B8D90]"
              placeholder="Confirm new password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((p) => ({ ...p, confirm: !p.confirm }))}
              className="absolute right-3 top-4 text-gray-400 hover:text-gray-600"
            >
              {showPassword.confirm ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>
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

        <button
          type="submit"
         
          className="w-full bg-[#3B8D90] hover:bg-[#00645B] flex items-center justify-center gap-2 py-3 rounded-lg font-medium text-white transition-all duration-300 hover:shadow-lg disabled:opacity-50"
          
        >

          {isUpdating ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                            Updating...
                          </>
                        ) : (
                          <>
                             <FaLock />
              Update Password
                          </>
                        )}
         
             
     
        </button>

        
          {status==="fulfilled" && (
          <div className="px-4 py-2 bg-green-50 border-2 border-green-200 rounded-lg">
            <p className="text-green-700 font-medium">✓ Password updated successfully !</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default SecurityTab;
