import { motion } from "framer-motion";
import { TfiFacebook } from "react-icons/tfi";
import { FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { MdLocalShipping, MdCardGiftcard, MdAccessTime } from "react-icons/md";
import { SiGmail } from "react-icons/si";
import { FaWhatsapp } from "react-icons/fa";
import type { INavPages } from "../../Interfaces";
import { NavLink, useNavigate } from "react-router-dom";
import { preload } from "../../utilis/global-preload";

const Footer = () => {

  const footerLinks: INavPages[] = [

  { text: "About Us",
    path: "/about",
    importFn: () => import("../../Pages/About/AboutPage")
     },
  { text: "Products",
    path: "/products",
  importFn: () => import("../../Pages/Product/ShowProductsPage"),
},
 { text: "Categories", 
    path: "/categories",
    importFn: () => import("../../Pages/Categories/CategoriesPage"),
   },
  { text: "Brands",
    path: "/brands",
    importFn: () => import("../../Pages/Brands/BrandsPage")
     },
 
];
const navigate=useNavigate()


  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <footer className="bg-[#e8e8e83e] relative overflow-hidden">

      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#3B8D90] rounded-full -translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#E8765E] rounded-full translate-x-48 translate-y-48"></div>
      </div>

      <motion.div
        className="relative mx-auto w-full max-w-screen-xl p-5  pt-10 lg:pt-16 pb-4 lg:pb-7"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          variants={itemVariants}
        >

          <motion.div
            className="text-center group"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" style={{ background: 'linear-gradient(135deg, #3B8D90, rgba(59, 141, 144, 0.8))' }}>
                <MdLocalShipping className="text-white text-xl" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">FREE SHIPPING</h3>
              <p className="text-gray-600 font-medium">Shipping is free on all orders over $100</p>
            </div>
          </motion.div>


          <motion.div
            className="text-center group"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" style={{ background: 'linear-gradient(135deg, #E8765E, rgba(232, 118, 94, 0.8))' }}>
                <MdCardGiftcard className="text-white text-xl" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">SPECIAL SALE</h3>
              <p className="text-gray-600 font-medium">Extra 5$ off on all items this week</p>
            </div>
          </motion.div>

          <motion.div
            className="text-center group"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" style={{ background: 'linear-gradient(135deg, #3B8D90, #E8765E)' }}>
                <MdAccessTime className="text-white text-xl" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">24/7 SUPPORT</h3>
              <p className="text-gray-600 font-medium">Round the clock customer services</p>
            </div>
          </motion.div>
        </motion.div>


        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8"
          variants={itemVariants}
        >
          <div className="md:col-span-2">
            <motion.div
              className="mb-6"
              variants={itemVariants}
            >
              <h2 className="text-2xl font-bold mb-4" style={{ background: 'linear-gradient(to right, #3B8D90, #E8765E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Nova
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Your trusted partner for quality products and exceptional service.
                We're committed to bringing you the best shopping experience with
                fast delivery and 24/7 customer support.
              </p>

              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <FaPhone className="text-[#3B8D90] mr-3" />
                  <span>+201287677534</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaEnvelope className="text-[#3B8D90] mr-3" />
                  <span>support@nova.com</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaMapMarkerAlt className="text-[#3B8D90] mr-3" />
                  <span>123 Shopping Street, City, Country</span>
                </div>
              </div>
            </motion.div>
          </div>
          <div>
            <motion.h3
              className="text-lg font-bold text-gray-800 mb-4"
              variants={itemVariants}
            >
              Quick Links
            </motion.h3>
            <motion.ul
              className="space-y-3"
              variants={itemVariants}
            >
              {footerLinks.map((link,index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <NavLink
                to={link.path}
                 onMouseEnter={() => preload(link.importFn)}
                                onClick={(e) => {
                    e.preventDefault();         
                    preload(link.importFn);      
                    navigate(link.path);     }}
                end
                className="text-gray-600 hover:text-[#3B8D90] transition-colors duration-300 flex items-center group"
                
              >
                 <span className="w-2 h-2 bg-[#E8765E] rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></span>
                {link.text}
              </NavLink>
                </motion.li>
              ))}
            </motion.ul>
          </div>
          <div>
            <motion.div
              className="relative w-48 h-48 mx-auto"
              variants={itemVariants}
            >
              <motion.div
                className="absolute inset-0  flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <svg
                  className="w-40 h-40 "
                  viewBox="0 0 200 200"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <path
                      id="circle"
                      d="M 100, 100 m -80, 0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0"
                    />
                  </defs>
                  <text
                    fontSize="21"
                    fill="#E8765E"
                    fontWeight="bold"
                    fontFamily="Times New Roman, Times, serif"

                  >
                    <textPath href="#circle" startOffset="1%">
                      * WELCOME * TO * NOVA * STORE * SHOP * NOW
                    </textPath>
                  </text>
                </svg>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="border-t border-gray-200 pt-3"
          variants={itemVariants}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.p
              className="text-gray-600 mb-4 md:mb-0"
              variants={itemVariants}
            >
              © 2025 Nova. All rights reserved. Made with love for our customers.
            </motion.p>
            <motion.div
              className="flex space-x-4"
              variants={itemVariants}
            >
              {[
                { icon: TfiFacebook, color: "hover:text-blue-600" },
                { icon: FaInstagram, color: "hover:text-pink-600" },
                { icon: FaWhatsapp, color: "hover:text-green-600" },
                { icon: SiGmail, color: "hover:text-red-600" }
              ].map(({ icon: Icon, color }, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className={`w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-600 shadow-lg hover:shadow-xl transition-all duration-300 ${color}`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="text-xl" />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;

