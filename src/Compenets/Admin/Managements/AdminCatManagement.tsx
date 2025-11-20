import { useState } from "react";
import { motion } from "framer-motion";
import NoProductsFound from "../../Utility/NoProductsFound";
import ManageTitle from "../ManageTitle"
import { Quantum } from 'ldrs/react';
import { useGetCategoriesQuery } from "../../../app/Features/categoriesApi";
import CategorySlice from "../../Category/CategorySlice";
import AddSection from "../Add/AddSection";
import EditCategorySection from "../Edits/EditCategorySection";
import type { ICategory } from "../../../Interfaces";

const AdminCatManagement = () => {
     const { data, isLoading, isError } = useGetCategoriesQuery();
       const categories = data?.data ?? [];
       const [categoryToEdit, setCategoryToEdit] = useState<ICategory | null>(null);

       const handleEdit = (category: ICategory) => {
         setCategoryToEdit(category);
           window.scrollTo({ top: 0, behavior: "smooth" });
       };

       const handleCancelEdit = () => {
         setCategoryToEdit(null);
       };
     
  return (
    <div className="flex flex-col  space-y-5">
      <ManageTitle title="Categories Management" />

      <div className="mb-5">
        {categoryToEdit ? (
          <EditCategorySection 
            categoryToEdit={categoryToEdit} 
            onCancelEdit={handleCancelEdit} 
          />
        ) : (
          <AddSection
            heading="Add New Category"
            imageLabel="Category Image"
            inputPlaceholder="Category name"
            submitText="Add Category"
          />
        )}
      </div>

      <div >
        {isLoading ? (
          <div className="flex justify-center items-center py-30 ">
            <Quantum size="50" speed="1.75" color="#E8765E" />
          </div>
        ) : isError ? (
          <NoProductsFound isError />
        ) : categories.length > 0 ? (
          <>
           
            <motion.div
              className="mb-5"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
           
              <p className="text-lg text-gray-600">
                {categories.length} categor{categories.length > 1 ? "ies" : "y"} to explore
              </p>
            </motion.div>

           
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
                      isAdmin
                      onEdit={handleEdit}
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

    </div>
  )
}

export default AdminCatManagement