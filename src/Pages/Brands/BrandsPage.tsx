import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useGetBrandsQuery } from "../../app/Features/brandsApi";
import { Quantum } from 'ldrs/react';
import SpellText from "../../Compenets/UI/SpellText";
import NoProductsFound from "../../Compenets/Utility/NoProductsFound";
import BrandCard from "../../Compenets/Brands/BrandCard";

const BrandsPage = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetBrandsQuery();
  const brands = data?.data ?? [];

  return (
    <div
      className="min-h-screen font-roobert "
      style={{
        background: "linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)",
      }}
    >
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
            className="text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Explore Top Brands
          </motion.h1>

          <SpellText
            text="Discover premium products from world-class brands"
            className="text-2xl md:text-3xl mt-7 font-dancing"
          />
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Quantum size="50" speed="1.75" color="#E8765E" />
          </div>
        ) : isError ? (
          <NoProductsFound isError />
        ) : brands.length > 0 ? (
          <>
                <motion.div
              className="mb-8 text-center"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                All Brands
              </h2>
              <p className="text-gray-600">
                {brands.length} brand{brands.length > 1 ? "s" : ""} available
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
              {brands.map((brand, index) => {
                const isEven = index % 2 === 0;
                return (
                  <motion.div
                    key={brand._id}
                    initial={{
                      opacity: 0,
                      x: isEven ? -100 : 100,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.08,
                      ease: "easeOut",
                    }}
                  >
                    <BrandCard 
                      brand={brand} 
                      index={index} 
                      disableInitialAnimation={true}
                    />
                  </motion.div>
                );
              })}
            </div>
          </>
        ) : (
          <NoProductsFound title="Brands" />
        )}
      </div>

      <motion.div
        className="py-16 px-4 mt-12"
        style={{
          background: "linear-gradient(90deg, #E8765E 0%, #d46550 100%)",
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.h2
            className="text-3xl font-bold mb-4"
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Can't find your favorite brand?
          </motion.h2>

          <motion.p
            className="text-lg mb-6 opacity-90"
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            We're constantly adding new brands. Contact us with your suggestions!
          </motion.p>

          <motion.button
            className="bg-white text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-50 transition-colors duration-300"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/contact")}
          >
            Get in Touch
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default BrandsPage;