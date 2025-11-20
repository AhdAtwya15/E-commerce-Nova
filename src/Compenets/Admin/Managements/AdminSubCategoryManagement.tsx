import { useState } from "react";
import { motion } from "framer-motion";
import { useGetSubCategoriesQuery } from "../../../app/Features/subCategoriesApi";
import { Quantum } from 'ldrs/react';
import NoProductsFound from "../../Utility/NoProductsFound";
import ManageTitle from "../ManageTitle";
import AddSubCategorySection from "../Add/AddSubCategorySection";
import EditSubCategoryWithDataSection from "../Edits/EditSubCategoryWithDataSection";
import SubCategoryCard from "../../SubCategory/SubCategoryCard";
import type { ISubCategory } from "../../../Interfaces";

const AdminSubCategoryManagement = () => {
  const { data, isLoading, isError } = useGetSubCategoriesQuery();
  const subCategories = data?.data ?? [];
  const [subCategoryToEdit, setSubCategoryToEdit] = useState<ISubCategory | null>(null);

  const handleEdit = (subCategory: ISubCategory) => {
    setSubCategoryToEdit(subCategory);
      window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setSubCategoryToEdit(null);
    
  };

  return (
    <div className="flex flex-col space-y-5">
      <ManageTitle title="Subcategories Management" />

      <div className="mb-5">
        {subCategoryToEdit ? (
          <EditSubCategoryWithDataSection 
            subCategoryToEdit={subCategoryToEdit} 
            onCancelEdit={handleCancelEdit} 
          />
        ) : (
          <AddSubCategorySection />
        )}
      </div>

      <div>
        {isLoading ? (
          <div className="flex justify-center items-center py-30">
            <Quantum size="50" speed="1.75" color="#E8765E" />
          </div>
        ) : isError ? (
          <NoProductsFound isError />
        ) : subCategories.length > 0 ? (
          <>
            <motion.div
              className="mb-5"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <p className="text-gray-600">
                {subCategories.length} subcategor{subCategories.length > 1 ? "ies" : "y"} available
              </p>
            </motion.div>

       
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {subCategories.map((subCategory, index) => {
                const isEven = index % 2 === 0;
                return (
                  <motion.div
                    key={subCategory._id}
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
                    <SubCategoryCard 
                      subCategory={subCategory} 
                      index={index} 
                      disableInitialAnimation={true}
                      isAdmin
                      onEdit={handleEdit}
                    />
                  </motion.div>
                );
              })}
            </div>
          </>
        ) : (
          <NoProductsFound title="Subcategories" />
        )}
      </div>
    </div>
  );
};

export default AdminSubCategoryManagement;