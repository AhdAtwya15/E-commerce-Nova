import { useState } from "react";
import { motion } from "framer-motion";
import { useGetBrandsQuery } from "../../../app/Features/brandsApi";
import NoProductsFound from "../../Utility/NoProductsFound";
import ManageTitle from "../ManageTitle"
import { Quantum } from 'ldrs/react';
import BrandCard from "../../Brands/BrandCard";
import AddSection from "../Add/AddSection";
import EditBrandSection from "../Edits/EditBrandSection";
import type { IBrand } from "../../../Interfaces";

const AdminBrandsManagement = () => {
     const { data, isLoading, isError } = useGetBrandsQuery();
      const brands = data?.data ?? [];
      const [brandToEdit, setBrandToEdit] = useState<IBrand | null>(null);

      const handleEdit = (brand: IBrand) => {
        setBrandToEdit(brand);
          window.scrollTo({ top: 0, behavior: "smooth" });
      };

      const handleCancelEdit = () => {
        setBrandToEdit(null);
         
      };

  return (
    <div className="flex flex-col  space-y-5">
      <ManageTitle title="Brands Management" />

      <div className="mb-4">
        {brandToEdit ? (
          <EditBrandSection 
            brandToEdit={brandToEdit} 
            onCancelEdit={handleCancelEdit} 
          />
        ) : (
          <AddSection
            heading="Add New Brand"
            imageLabel="Brand Logo"
            inputPlaceholder="Brand name"
            submitText="Add Brand"
          />
        )}
      </div>

      <div>
        {isLoading ? (
          <div className="flex justify-center items-center py-30">
            <Quantum size="50" speed="1.75" color="#E8765E" />
          </div>
        ) : isError ? (
          <NoProductsFound isError />
        ) : brands.length > 0 ? (
          <>
           
            <motion.div
            className="mb-5"
          
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <p className="text-gray-600">
                {brands.length} brand{brands.length > 1 ? "s" : ""} available
              </p>
            </motion.div>

           
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
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
                      isAdmin
                      onEdit={handleEdit}
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

    </div>
  )
}

export default AdminBrandsManagement