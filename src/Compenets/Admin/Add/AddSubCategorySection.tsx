import { motion } from "framer-motion";
import useAddSubCategoriesHook from "../../../hook/subcategories/useAddSubCategoriesHook";
import Button from "../../UI/Button";
import InputsErrMsg from "../../UI/InputsErrMsg";

const AddSubCategorySection = () => {
  const [
    open,
    setOpen,
    subCategoryDropdownRef,
    selectedCategory,
    categories,
    register,
    handleSubmit,
    handleSelect,
    onSubmit,
    errors,
    isLoading
  ] = useAddSubCategoriesHook();

  return (
    <div className="w-full font-roobert space-y-6">
       <motion.div 
         whileHover={{
                       scale: 1.01,
                        transition: { duration: 0.2 }
                    }}
                    className="px-2 text-xl font-roobert text-gray-600 font-medium"
                    >
            Add subcategory
        </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr]">
        <form
          className="flex flex-col space-y-10 max-w-3xl"
          onSubmit={handleSubmit(onSubmit)}
        >
          
          <motion.div
            className="relative flex flex-col gap-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <input
              type="text"
              id="name"
              placeholder="Subcategory Name"
              {...register("name")}
              className="w-full h-12 px-4 rounded-xl border-1 border-[#3B8D90] bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#3B8D90]"
            />

            {errors["name"] && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="mt-2"
              >
                <InputsErrMsg msg={errors["name"]?.message} />
              </motion.div>
            )}
          </motion.div>

         
          <motion.div
            className="relative"
             ref={subCategoryDropdownRef}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="w-full h-12 px-4 rounded-xl border-1 border-[#3B8D90] bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#3B8D90] text-left flex justify-between items-center"
              type="button"
            >
              {categories.find((cat) => cat._id === selectedCategory)?.name ||
                "Select Category"}
              <svg
                className="w-2.5 h-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            {open && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="absolute mt-2 z-10 w-full bg-white rounded-lg shadow-sm border border-gray-200"
              >
                <ul className="py-2 text-sm text-gray-700">
                  {categories.map((category) => (
                    <li key={category._id}>
                      <button
                        onClick={() => handleSelect(category._id)}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        {category.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {errors["category"] && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="mt-2"
              >
                <InputsErrMsg msg={errors["category"]?.message} />
              </motion.div>
            )}
          </motion.div>

  
          <motion.div
            className="relative w-48"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button
              type="submit"
              variant="addBtn"
              size="md"
              isLoading={isLoading}
            >
              Save Edits
            </Button>
          </motion.div>
        </form>
      </div>
    </div>
  );
};

export default AddSubCategorySection;
