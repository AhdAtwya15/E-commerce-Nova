

import React, {  useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import ManageTitle from "../../Admin/ManageTitle";
import AddAddressForm from "../Add/AddAddressForm";
import AddressCard from "../AddressCard";
import { Quantum } from 'ldrs/react'
import 'ldrs/react/Quantum.css'

import { useGetAddressesQuery } from "../../../app/Features/addressesApi";
import type { IAddress } from "../../../Interfaces";
import NoProductsFound from "../../Utility/NoProductsFound";


const MyAddressesSection = () => {
 

  const { data: addressesData, isLoading, error, refetch } = useGetAddressesQuery();
  const addressesLength = addressesData?.results;

 
  const [addressToEdit, setAddressToEdit] = useState<IAddress | null>(null);

  const handleEdit = (address: IAddress) => {
    setAddressToEdit(address);
    window.scrollTo({ top: 600, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setAddressToEdit(null);
  };

  
  React.useEffect(() => {
    if (!addressToEdit) {
      refetch();
    }
  }, [addressToEdit, refetch]);

  React.useEffect(() => {
    if (addressToEdit && addressesData) {
      const addressStillExists = addressesData.data.some(
        (a) => a._id === addressToEdit._id
      );
      if (!addressStillExists) {
        setAddressToEdit(null);
      }
    }
  }, [addressesData, addressToEdit]);

  const formVariants: Variants = {
    hidden: {
      opacity: 0,
      x: -60,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 80,
        damping: 15,
        duration: 0.6
      }
    }
  };

  const listVariants: Variants = {
    hidden: {
      opacity: 0,
      x: 60,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 80,
        damping: 15,
        duration: 0.6,
        delay: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      x: 40,
      y: 20,
      scale: 0.85,
      rotateY: -15
    },
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotateY: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 18,
        delay: index * 0.08,
        duration: 0.5
      }
    }),
    exit: {
      opacity: 0,
      x: -40,
      y: -20,
      scale: 0.85,
      rotateY: 15,
      transition: {
        duration: 0.35,
        ease: "easeInOut" as const
      }
    }
  };

  return (
    <div className="w-full space-y-8 pb-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ManageTitle title="My Addresses" />
      </motion.div>

      <motion.div
          variants={listVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-medium text-gray-800 tracking-tight">
                All Addresses
              </h2>
            </div>
            {addressesData?.data && addressesData.data.length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-teal-600 text-white rounded-full text-sm font-medium shadow-sm"
              >
                {addressesLength || 0} Total
              </motion.div>
            )}
          </div>

          {isLoading && (
          
      <div className="min-h-screen flex justify-center py-20 bg-gray-50">
        
       
                <Quantum size="45" speed="1.75" color="#E8765E" />
             
      </div>

          )}

          {error && (
           
              <NoProductsFound
isError
/>
          
          )}

          {addressesData && addressesData.data.length > 0 ? (
            <>
              <motion.div
                className="grid grid-cols-1 gap-6"
                layout
              >
                <AnimatePresence mode="popLayout">
                  {addressesData.data.map((address, index) => (
                    <motion.div
                      key={address._id}
                      custom={index}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      layout
                      style={{ perspective: 1000 }}
                    >
                      <AddressCard address={address} onEdit={handleEdit} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

             
            </>
          ) : (
            !isLoading && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-cyan-600/10 to-teal-600/10 rounded-full flex items-center justify-center mb-6">
                  <svg
                    className="w-12 h-12 text-teal-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No addresses yet</h3>
                <p className="text-gray-500 max-w-sm">
                  Add your first address to start managing your delivery locations!
                </p>
              </motion.div>
            )
          )}
        </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-8 lg:gap-10">

        <motion.div
          variants={formVariants}
          initial="hidden"
          animate="visible"
          className="space-y-3"
        >
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-medium text-gray-800 tracking-tight">
              {addressToEdit ? "Edit Address" : "Add New Address"}
            </h2>
          </div>

          <motion.div
            key={addressToEdit?._id || 'new'}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl p-5"
          >
            <AddAddressForm
              addressToEdit={addressToEdit}
              onCancelEdit={handleCancelEdit}
            />
          </motion.div>
        </motion.div>

        
      </div>
    </div>
  );
};

export default MyAddressesSection;
