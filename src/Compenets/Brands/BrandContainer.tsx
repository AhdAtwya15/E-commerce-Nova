import { motion } from "framer-motion";

import type { IBrand } from "../../Interfaces";

interface IProps{
  brands:IBrand[]
}

const BrandContainer = ({brands}:IProps) => {


  const duplicatedBrands = [...brands, ...brands, ...brands];

  return (
    <div className="w-full overflow-hidden mt-5 mb-10 py-8">
      <motion.div
        className="flex items-center  whitespace-nowrap"
        animate={{
          x: [0, -100 * brands.length]
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 10,
            ease: "linear"
          }
        }}
        style={{
          width: `${duplicatedBrands.length * 120}px`
        }}
      >
        {duplicatedBrands.map((brand, index) => (
          <motion.div
            key={`${brand.image}-${index}`}
            className="flex-shrink-0 flex items-center justify-center"
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.2 }
            }}
          >
            <div className="w-48 h-40 flex items-center justify-center px-4 py-2 shadow-sm hover:shadow-md transition-shadow duration-300">
              <img
                className="h-full w-full object-contain filter transition-all duration-300"
                src={brand.image}
                alt={brand.slug}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default BrandContainer