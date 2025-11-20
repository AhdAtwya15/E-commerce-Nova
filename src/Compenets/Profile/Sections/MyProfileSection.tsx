import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


import { Quantum } from "ldrs/react";
import { useGetUserDataQuery } from "../../../app/Features/loggedUserApi";
import ProfileTabs from "../ProfileTabs";
import ProfileInfo from "../ProfileInfo";
import SecurityTab from "../SecurityTab";
import ProfileHeader from "../ProfileHeader";
import DangerZone from "../DangerZone";


const MyProfileSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"profile" | "security" | "danger">(
    "profile"
  );

  const { data: userData, isLoading } = useGetUserDataQuery("");
  

  const user = userData?.data;

  if (isLoading) {
    return (
        <div className="flex justify-center items-center py-30">
            <Quantum size="50" speed="1.75" color="#E8765E" />
          </div>
    );
  }

  return (
    <div
    
      className="min-h-screen bg-gray-50 mt-3 py-12 px-4 font-roobert">
      <div className="max-w-4xl  space-y-6">
        <ProfileHeader user={user!} />

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          <div className="p-8">
            <AnimatePresence mode="wait">
              {activeTab === "profile" && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, x: -80 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 80 }}
                  transition={{ duration: 0.45 }}
                >
                  <ProfileInfo
                    user={user}
                   
      
                    
                  />
                </motion.div>
              )}

              {activeTab === "security" && (
                <motion.div
                  key="security"
                  initial={{ opacity: 0, x: 80 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -80 }}
                  transition={{ duration: 0.45 }}
                >
                  <SecurityTab
                   
                   
                  />
                </motion.div>
              )}

              {activeTab === "danger" && (
                <motion.div
                  key="danger"
                   initial={{ opacity: 0, x: -80 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 80 }}
                  transition={{ duration: 0.45 }}
                >
                  <DangerZone
                  
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 mt-6">
          <h3 className="text-xl font-semibold text-[#3B8D90] mb-8">Account Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 space-y-5 text-sm">
            <div className="space-y-3">
              <p className="text-gray-500 text-base">Member Since</p>
              <p className="font-semibold text-gray-800 text-sm">
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "N/A"}
              </p>
            </div>
            <div className="space-y-3">
              <p className="text-gray-500 text-base">Last Updated</p>
              <p className="font-semibold text-gray-800 text-sm">
                {user?.updatedAt
                  ? new Date(user.updatedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "N/A"}
              </p>
            </div>
            <div className="space-y-3">
              <p className="text-gray-500 text-base">Wishlist Items</p>
              <p className="font-semibold text-gray-800 text-sm">{user?.wishlist?.length || 0}</p>
            </div>
            <div className="space-y-3">
              <p className="text-gray-500 text-base">Saved Addresses</p>
              <p className="font-semibold text-gray-800 text-sm">{user?.addresses?.length || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfileSection;
