import { motion, AnimatePresence } from "framer-motion";
import type { IAdminDashboard } from "../../Interfaces";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { HiMenu } from "react-icons/hi";
import { MdClose } from "react-icons/md";
import { preload } from "../../utilis/global-preload";



const ProfileSideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate=useNavigate()

  const navbarVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };

  const navLinkVariants = {
    hidden: { x: -1000, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
    }
  };

  const sections: IAdminDashboard[] = [
    { sectionName: "My Profile",
       path: "/profile" ,
      importFn: () => import("../../Compenets/Profile/Sections/MyProfileSection"),
    },
    { sectionName: "My Addresses",
       path: "/profile/addresses",
      importFn: () => import("../../Compenets/Profile/Sections/MyAddressesSection"),
    },
    { sectionName: "My Orders",
       path: "/profile/orders",
      importFn: () => import("../../Compenets/Profile/Sections/MyOrdersSection"),
     },
   
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
  };
  const DesktopSidebar = (
    <motion.nav
      className=" hidden min-h-screen sm:block bg-white shadow-lg w-65  overflow-y-auto rounded-2xl font-roobert sticky top-0"
      variants={navbarVariants}
      initial={{ x: -320, opacity: 0 }} 
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <div className="p-5">
        <motion.ul
          className="flex flex-col justify-center space-y-3 "
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {sections.map((sec, index) => (
            <motion.li
            className="pb-3 last:pb-0 border-b-1 last:border-b-0 border-gray-200"
           
              key={index}
              variants={navLinkVariants}
              initial="hidden"
              animate="visible"
              transition={{
                delay: 0.1 + index * 0.05,
                duration: 0.3,
                ease: "easeOut"
              }}
            >
              <NavLink
                to={sec.path}
                 onMouseEnter={() => preload(sec.importFn)}
                onClick={(e) => {
    e.preventDefault();         
    preload(sec.importFn);      
    navigate(sec.path); 
      }}
                end
                className={({ isActive }) =>
                  `block text-center text-[#3B8D90] p-3 hover:bg-gray-100 hover:text-[#E8765E] transition duration-300 rounded-2xl whitespace-nowrap
                  ${isActive ? "bg-gray-100 border-r-3 border-[#E8765E] text-[#E8765E] " : ""}`
                }
              >
                {sec.sectionName}
              </NavLink>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.nav>
  );

  const MobileMenuButton = (
    <div className="sm:hidden   bg-white hover:bg-gray-100 text-gray-400 rounded-full ">
      <motion.button
        onClick={() => setIsOpen(true)}
        className="p-3   transition duration-300"
        whileTap={{ scale: 0.95 }}
      >
      <HiMenu  size={24} />
      </motion.button>
    </div>
  );

  
  const MobileSideDrawer = (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 z-40 sm:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            transition={{ duration: 0.2 }}
          />

         
          <motion.nav
            className="fixed top-0 left-0 h-screen w-80 max-w-[90vw] bg-white shadow-2xl z-40 sm:hidden overflow-y-auto  font-roobert rounded-r-2xl"
            initial={{ x: "-100%", opacity: 0 }} 
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center ">
              <h3 className="text-lg  font-medium text-[#3B8D90]">Admin Dashboard</h3>
              <motion.button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition duration-300"
                
                whileTap={{ scale: 0.95 }}
              >
                <MdClose size={24} className="text-gray-400" />
              </motion.button>
            </div>

            <div className="p-4">
              <motion.ul
                className="flex flex-col space-y-3 "
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {sections.map((sec, index) => (
                  <motion.li
                  className="pb-3 border-b-1 border-gray-200"
                    key={index}
                    initial={{ opacity: 0, x: -20 }} 
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + index * 0.03 }}
                  >
                    <NavLink
                      to={sec.path}
                      end
                      onClick={handleLinkClick}
                      className={({ isActive }) =>
                  `block text-center text-[#3B8D90] p-3 hover:bg-gray-100 hover:text-[#E8765E] transition duration-300 rounded-2xl whitespace-nowrap
                  ${isActive ? "bg-gray-100 border-r-3 border-[#E8765E] text-[#E8765E] " : ""}`
                      }
                    >
                      {sec.sectionName}
                    </NavLink>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {DesktopSidebar}
      {MobileMenuButton}
      {MobileSideDrawer}
    </>
  );
};

export default ProfileSideBar;
