

import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";
import type { ICategory } from "../../Interfaces";
import { FaArrowRight } from "react-icons/fa";

interface CategoryCardProps extends ICategory {
  index?: number;
}

const CategoryCard = ({ _id, name, slug, image, index = 0 }: CategoryCardProps) => {
  const navigate = useNavigate();
    
  const handleClickCategory = (name: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set("category", name);
    navigate({ pathname: "/products", search: params.toString() });
  };

  console.log(_id);

  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl cursor-pointer h-[450px]"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ 
        once: false,
        amount: 0.2,
        margin: "-50px"
      }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      onClick={() => handleClickCategory(name)}
    >
      
      <motion.div 
        className="absolute inset-0"
        whileHover={{ scale: 1.08 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <img
          src={image}
          alt={slug}
          className="w-full h-full object-cover"
        />
        
       
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#E8765E]/20 to-[#3B8D90]/20"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>

      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
        animate={{ translateX: ["-100%", "100%"] }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          repeatDelay: 5,
          ease: "easeInOut" 
        }}
      />

      <div className="relative h-full flex flex-col justify-end p-6">
        <motion.h3 
          className="text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow-lg"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
        >
          {name}
        </motion.h3>

        <motion.div
          className="flex items-center gap-2 text-white/90 group-hover:text-[#E8765E] transition-colors duration-300"
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
        >
          <span className="text-sm font-medium">Explore Collection</span>
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <FaArrowRight  size={18} />
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#E8765E] to-[#3B8D90]"
          initial={{ width: 0 }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.4 }}
        />
      </div>

      <motion.div
        className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100"
        initial={{ scale: 0, rotate: -180 }}
        whileHover={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full h-full flex items-center justify-center text-white">
          <FaArrowRight  size={20} />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CategoryCard;