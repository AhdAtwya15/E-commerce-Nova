import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useGetCategoriesQuery } from "../../app/Features/categoriesApi";
import { Quantum } from 'ldrs/react';

import Button from "../../Compenets/UI/Button";
import SpellText from "../../Compenets/UI/SpellText";
import CategorySlice from "../../Compenets/Category/CategorySlice";
import NoProductsFound from "../../Compenets/Utility/NoProductsFound";



const CategoriesPage = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetCategoriesQuery();
  const categories = data?.data ?? [];

  return (
    <div className="min-h-screen bg-gray-50 font-roobert ">
      <motion.div
        className="relative text-white py-20 px-4 overflow-hidden"
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
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Shop by Category
          </motion.h1>
          
          <SpellText
            text="Find exactly what you're looking for in our curated collections"
            className="text-2xl md:text-3xl mt-7 font-dancing"
          />
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Quantum size="50" speed="1.75" color="#E8765E" />
          </div>
        ) : isError ? (
          <NoProductsFound isError />
        ) : categories.length > 0 ? (
          <>
                <motion.div
              className="mb-12 text-center"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-3">
                Browse Our Collections
              </h2>
              <p className="text-lg text-gray-600">
                {categories.length} categor{categories.length > 1 ? "ies" : "y"} to explore
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-8">
              {categories.map((category, index) => {
                const isEven = index % 2 === 0;
                
                return (
                  <motion.div
                    key={category._id}
                    initial={{ 
                      opacity: 0, 
                      x: isEven ? -100 : 100 
                    }}
                    animate={{ 
                      opacity: 1, 
                      x: 0 
                    }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1,
                      ease: "easeOut"
                    }}
                  >
                    <CategorySlice 
                      category={category} 
                      index={index} 
                      disableInitialAnimation={true}  
                      
                    />
                  </motion.div>
                );
              })}
            </div>
          </>
        ) : (
          <NoProductsFound title="Categories" />
        )}
      </div>

      <motion.div
        className="py-20 px-4"
        style={{ background: 'linear-gradient(90deg, #1f2937 0%, #111827 100%)' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-5xl mx-auto text-center text-white">
          <motion.h2 
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Need Help Finding Something?
          </motion.h2>
          
          <motion.p 
            className="text-xl mb-8 text-gray-300"
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            Our team is here to guide you to the perfect product
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="xl" 
                variant="apply"
                onClick={() => navigate("/products")}
              >
                Browse All Products
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="xl" 
                variant="transparent"
                onClick={() => navigate("/contact")}
              >
                Contact Support
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default CategoriesPage;