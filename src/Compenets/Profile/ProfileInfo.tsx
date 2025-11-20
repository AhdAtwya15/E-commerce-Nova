import React, { useEffect, useState } from "react";
import { useForm, type Resolver, type SubmitHandler } from "react-hook-form";
import { FaUser, FaPhone, FaSave,FaEdit } from "react-icons/fa";
import { motion } from "framer-motion";
import type { ILoggedUser, IUpdateProfileData} from "../../Interfaces";
import { useUpdateUserDataMutation } from "../../app/Features/loggedUserApi";
import { updateUserDataSchema } from "../../Validation";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMsg from "../UI/ErrorMsg";
import { MdEmail } from "react-icons/md";
import useNotification from "../../hook/useNotification";

interface Props {
  user?: ILoggedUser;
 
}


const ProfileInfo: React.FC<Props> = ({ user}) => {
  const [isEditing, setIsEditing] = useState(false);
  const[updateUserData,{isLoading:isUpdating,status}]=useUpdateUserDataMutation();
  const notify = useNotification

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IUpdateProfileData>({
         resolver: yupResolver(updateUserDataSchema) as Resolver<IUpdateProfileData>,
          mode: "onSubmit",
      });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name ?? "",
        phone: user.phone ?? "",
        email: user.email ?? "",
      });
    }
  }, [user, reset]);

  useEffect(() => {
    if (status === "fulfilled") {
      setIsEditing(false);
     
    }
  }, [status ]);

  const onSubmit: SubmitHandler<IUpdateProfileData> = async (values) => {
    try {
        
        const payload = { ...values };
    if (values.email === user?.email) {
      delete payload.email;
    }

    await updateUserData(payload).unwrap();
    notify("Profile updated successfully!", "success");
    } catch  {
    notify("Failed to update your profile","error")  
    }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-3 justify-between items-center mb-6">
        <h2 className="text-lg md:!text-2xl whitespace-nowrap md:!whitespace-pre-wrap font-bold text-gray-800">Personal Information</h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center bg-[#3B8D90] hover:bg-[#00645B]  gap-2 px-4 py-2 rounded-lg font-medium text-white transition-all hover:shadow-lg"
           
          >
            <FaEdit size={16} /> Edit Profile
          </button>
        ) : (
          <button
            onClick={() => {
              setIsEditing(false);
              reset();
            }}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-lg font-medium text-gray-700 transition-all hover:bg-gray-300"
          >
             Cancel
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <div className="relative">
            <FaUser className="absolute left-3 top-4 text-gray-400" size={18} />
            <input
              {...register("name")}
              disabled={!isEditing}
              className={`w-full pl-11 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-all ${
                isEditing ? "border-gray-300 focus:border-[#3B8D90] bg-white" : "border-gray-200 bg-gray-50"
              }`}
              placeholder="Enter your name"
            />
          </div>
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
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <div className="relative">
            <FaPhone className="absolute left-3 top-4 text-gray-400" size={18} />
            <input
              {...register("phone")}
              disabled={!isEditing}
              className={`w-full pl-11 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-all ${
                isEditing ? "border-gray-300 focus:border-[#3B8D90] bg-white" : "border-gray-200 bg-gray-50"
              }`}
              placeholder="Enter your phone number"
            />
          </div>
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
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
          <div className="relative">
          <MdEmail className="absolute left-3 top-4 text-gray-400" size={18} />
            <input
              {...register("email")}
              disabled={!isEditing}
              className={`w-full pl-11 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-all ${
                isEditing ? "border-gray-300 focus:border-[#3B8D90] bg-white" : "border-gray-200 bg-gray-50"
              }`}
              placeholder="Enter your email"
            />
          </div>
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


        {isEditing && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex gap-4"
          >
            <button
              type="submit"
              disabled={isUpdating}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#3B8D90] hover:bg-[#00645B] rounded-lg font-medium text-white transition-all hover:shadow-lg duration-300 disabled:opacity-50"
            
            >
              {isUpdating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                  Saving...
                </>
              ) : (
                <>
                  <FaSave size={18} />
                  Save Changes
                </>
              )}
            </button>
          </motion.div>
        )}

        {status==="fulfilled" && (
          <div className="px-4 py-2 bg-green-50 border-2 border-green-200 rounded-lg">
            <p className="text-green-700 font-medium">✓ Profile updated successfully !</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default ProfileInfo;
