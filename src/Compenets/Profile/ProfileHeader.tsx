import { motion } from "framer-motion";

import type { ILoggedUser } from "../../Interfaces";

interface IProps {
  user: ILoggedUser;
}

const ProfileHeader = ({ user }: IProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl shadow-xl overflow-hidden"
    >
      <motion.div
        className="h-32 relative"
       animate={{
          backgroundImage: [
            "linear-gradient(270deg, #3B8D90, #2D6B6D, #E8765E, #F3A66A)",
            "linear-gradient(270deg, #2D6B6D, #3B8D90, #F3A66A, #E8765E)",
            "linear-gradient(270deg, #3B8D90, #2D6B6D, #E8765E, #F3A66A)",
            "linear-gradient(270deg, #2D6B6D, #3B8D90, #F3A66A, #E8765E)",
          ],
        }}
        transition={{
          duration: 8,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        style={{
          backgroundSize: "400% 400%",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute -bottom-16 left-8">
          <div className="w-32 h-32 rounded-full bg-[#3B8D90] flex items-center justify-center text-white text-4xl font-bold shadow-2xl border-4 border-white">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
        </div>
      </motion.div>

      <div className="pt-20 pb-6 px-8">
        <h1 className="text-xl md:!text-2xl lg:!text-3xl font-bold text-gray-800">{user?.name}</h1>
        <p className="text-gray-500 mt-1">{user?.email}</p>
        <div className="flex gap-2 mt-3">
          <span
            className="px-3 py-1 text-xs font-semibold rounded-full text-white"
            style={{
              backgroundColor: user?.role === "admin" ? "#3B8D90" : "#E8765E",
            }}
          >
            {user?.role?.toUpperCase()}
          </span>
          {user?.active && (
            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-700" /> Active
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileHeader;
