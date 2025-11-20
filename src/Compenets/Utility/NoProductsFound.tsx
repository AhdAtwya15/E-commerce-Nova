import { motion } from "framer-motion";
import { FiBox } from "react-icons/fi";
import { BiSolidError } from "react-icons/bi";

interface IProps{
    onToggleFilters?: () => void;
    title?:string
    isSomethingElse?:boolean

    isError?:boolean
}

const NoProductsFound = ({isError=false,title="Products", onToggleFilters }:IProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
     
      <motion.div
        initial={{ scale: 0.7, rotate: -8, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
       
        <div className="absolute inset-0 bg-gradient-to-tr from-[#3B8D90]/20 to-transparent blur-2xl opacity-60" />
        {isError?
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 p-6 rounded-2xl bg-white border border-gray-200 shadow-md"
        >
          <BiSolidError className="text-6xl text-[#3B8D90]" />
        </motion.div>:
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 p-6 rounded-2xl bg-white border border-gray-200 shadow-md"
        >
          <FiBox className="text-6xl text-[#3B8D90]" />
        </motion.div>
        }
      </motion.div>

      
     {
      isError?
       <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-2xl font-semibold text-gray-800 mt-8"
      >
        Something went Wrong
      </motion.h2>
      :
       <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-2xl font-semibold text-gray-800 mt-8"
      >
        No {title} Found
      </motion.h2>
     }

      {
        isError?
        <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-gray-500 mt-2 text-sm max-w-md"
      >
        Please Try Again
      </motion.p>
        :
        (
          title!=="Products"?
          <>
           <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-gray-500 mt-2 text-sm max-w-md"
      >
        We're working on adding new {title} !
      </motion.p>
       </>
:<>
       
        
            <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-gray-500 mt-2 text-sm max-w-md"
      >
        We couldn’t find any products matching your filters. Try adjusting your search or resetting the filters.
      </motion.p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        onClick={ onToggleFilters}
        className="mt-6 px-6 py-2 bg-[#3B8D90] text-white rounded-xl shadow-sm hover:bg-[#337a7d] transition"
      >
        Reset Filters
      </motion.button>
       </>

        )
        

      }
    
      
    </div>
  );
};

export default NoProductsFound