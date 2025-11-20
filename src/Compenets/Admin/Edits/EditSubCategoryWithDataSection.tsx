import { motion } from "framer-motion";
import ManageTitle from "../ManageTitle";
import Button from "../../UI/Button";
import type { ISubCategory } from "../../../Interfaces";
import useEditSubCategoryWithDataHook from "../../../hook/subcategories/useEditSubCategoryWithDataHook";
import InputsErrMsg from "../../UI/InputsErrMsg";

interface EditSubCategoryWithDataSectionProps {
  subCategoryToEdit: ISubCategory;
  onCancelEdit: () => void;
}

const EditSubCategoryWithDataSection = ({ 
  subCategoryToEdit, 
  onCancelEdit 
}: EditSubCategoryWithDataSectionProps) => {
  const [
    register,
    handleSubmit,
    onSubmit,
    errors,
    isLoading,
  ] = useEditSubCategoryWithDataHook(subCategoryToEdit,onCancelEdit);

  return (
    <div className="flex flex-col space-y-5">
      <ManageTitle title="Edit Subcategory" />

      <motion.div
        className="relative"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <input
              type="text"
              id="name"
              placeholder="Subcategory Name"
              className="w-full h-12 px-4 rounded-xl border-1 border-[#3B8D90] bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#3B8D90]"
              {...register("name")}
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
          </div>
          
          <div className="relative flex gap-4">
            <Button 
              type="submit" 
              variant="addBtn" 
              size="md" 
              isLoading={isLoading}
            >
              Update Subcategory
            </Button>
            
            <Button 
              type="button" 
              variant="outline" 
              size="md" 
              onClick={onCancelEdit}
            >
              Cancel
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default EditSubCategoryWithDataSection;