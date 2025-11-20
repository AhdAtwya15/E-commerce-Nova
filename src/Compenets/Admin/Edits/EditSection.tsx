import { motion } from "framer-motion";
import Button from "../../UI/Button";
import useEditSectionWithDataHook from "../../../hook/useEditSectionWithDataHook";
import InputsErrMsg from "../../UI/InputsErrMsg";
import type { ICategory, IBrand } from "../../../Interfaces";

interface EditSectionProps {
  heading: string;
  imageLabel?: string;
  inputPlaceholder?: string;
  submitText?: string;
  editData?: ICategory | IBrand | null;
  onCancelEdit: () => void;
}

const EditSection = ({
  heading,
  imageLabel = "Update Image",
  inputPlaceholder = "Enter name",
  submitText = "Update",
  editData = null,
  onCancelEdit,
}: EditSectionProps) => {
  
  const [
    register,
    handleSubmit,
    fileInputRef,
    selectedImage,
    previewUrl,
    handleBrowse,
    handleFileChange,
    onSubmit,
    errors,
    isCategoryLoading,
    isBrandLoading,
  ] = useEditSectionWithDataHook(heading, editData,onCancelEdit);

  return (
    <div className="w-full font-roobert space-y-5">
       <motion.div 
         whileHover={{
                       scale: 1.01,
                        transition: { duration: 0.2 }
                    }}
                    className="px-2 text-xl font-roobert text-gray-600 font-medium"
                    >
            {heading}
        </motion.div>
      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr]">
        <form
          className="flex flex-col space-y-8 max-w-3xl"
          onSubmit={handleSubmit(onSubmit)}
        >
          <motion.div
            className="relative flex flex-col gap-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <span className="text-sm text-gray-400">{imageLabel}</span>
            <div
              className="w-[260px] h-[180px] rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-900 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-neutral-800 transition"
              onClick={handleBrowse}
            >
              {selectedImage || previewUrl ? (
                <img
                  src={selectedImage ? URL.createObjectURL(selectedImage) : previewUrl}
                  alt="preview"
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-10 text-gray-400"
                  >
                    <path d="M19.5 6h-15A1.5 1.5 0 003 7.5v9A1.5 1.5 0 004.5 18h15a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0019.5 6zm-9 9l2.25-3 3 4.5h-9l2.25-3zM9 9.75a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
                  </svg>
                  <span className="text-xs text-gray-500">Click to upload</span>
                </>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            {errors.image && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="mt-2"
              >
                <InputsErrMsg msg={errors.image?.message as string} />
              </motion.div>
            )}
          </motion.div>

          <div className="space-y-8">
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <input
                type="text"
                id="name"
                placeholder={inputPlaceholder}
                {...register("name")}
                className="w-full h-12 px-4 rounded-xl border-1 border-[#3B8D90] bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#3B8D90]"
              />

              {errors.name && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="mt-2"
                >
                  <InputsErrMsg msg={errors.name?.message as string} />
                </motion.div>
              )}
            </motion.div>

            <motion.div
              className="relative flex gap-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button
                type="submit"
                variant="addBtn"
                size="md"
                isLoading={heading === "Edit Category" ? isCategoryLoading : isBrandLoading}
              >
                {submitText}
              </Button>
              
              {onCancelEdit && (
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={onCancelEdit}
                >
                  Cancel
                </Button>
              )}
            </motion.div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSection;