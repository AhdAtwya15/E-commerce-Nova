import { useState } from "react";
import { motion } from "framer-motion";
import { FaEdit, FaTrash, FaMapMarkerAlt, FaPhone, FaCity } from "react-icons/fa";
import { useDeleteAddressMutation } from "../../app/Features/addressesApi";

import ConfirmDeleteModal from "../UI/ConfirmDeleteModal";
import { createPortal } from "react-dom";
import type { IAddress } from "../../Interfaces";
import useNotification from "../../hook/useNotification";

interface AddressCardProps {
  address: IAddress;
  onEdit: (address: IAddress) => void;
}

const AddressCard = ({ address, onEdit }: AddressCardProps) => {
  const [deleteAddress, { isLoading }] = useDeleteAddressMutation();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const notify = useNotification

  const tealColor = 'rgb(59, 141, 144)';

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteAddress(address._id).unwrap();
      notify("Address deleted successfully", "success");
      setShowDeleteModal(false);
    } catch {
      notify("Failed to delete address", "error");
    }
  };

  return (
    <>
      <motion.div
        key={address._id}
        className="relative rounded-2xl border-2 p-6 overflow-hidden "
        style={{
          borderColor: tealColor,
          background: 'linear-gradient(to right, #ffffff, rgba(204, 251, 241, 0.3), #ffffff)'
        }}
        initial={{ opacity: 0, x: -60 }}
        animate={{
          opacity: 1,
          x: 0,
          transition: {
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1]
          }
        }}
        exit={{
          opacity: 0,
          scale: 0.8,
          y: -20,
          transition: {
            duration: 0.3,
            ease: 'easeIn'
          }
        }}
        whileHover={{
          scale: 1.01,
          boxShadow: '0 8px 30px rgba(59, 141, 144, 0.15)',
          transition: { duration: 0.3 }
        }}
        layout
      >
        <div 
          className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
          style={{
            background: `linear-gradient(to right, ${tealColor}, rgba(59, 141, 144, 0.5), ${tealColor})`
          }}
        />

        <div className="flex flex-col gap-4">
          <motion.div 
            className="flex items-center gap-4 min-w-0 shrink-0" 
            style={{ width: '220px' }}
            initial={{ opacity: 0, x: -40 }}
            animate={{ 
              opacity: 1, 
              x: 0,
              transition: { duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }
            }}
            exit={{ 
              opacity: 0, 
              x: -40,
              transition: { duration: 0.3 }
            }}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-lg" style={{
              background: 'linear-gradient(to bottom right, rgb(20, 184, 166), rgb(13, 148, 136))'
            }}>
              <FaMapMarkerAlt className="text-white text-lg" />
            </div>
            <div className="min-w-0">
              <h3 className="text-lg font-bold text-gray-800 truncate">
                {address.alias}
              </h3>
              <p className="text-xs text-teal-600 font-medium">Address</p>
            </div>
          </motion.div>

          <motion.div 
            className="flex flex-col gap-4 min-w-0"
            initial={{ opacity: 0, x: 40 }}
            animate={{ 
              opacity: 1, 
              x: 0,
              transition: { duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }
            }}
            exit={{ 
              opacity: 0, 
              x: 40,
              transition: { duration: 0.3 }
            }}
          >

            <motion.div 
              className="flex items-center gap-2 min-w-0"
              initial={{ opacity: 0, x: 30 }}
              animate={{ 
                opacity: 1, 
                x: 0,
                transition: { duration: 0.5, delay: 0.3, ease: [0.4, 0, 0.2, 1] }
              }}
              exit={{ 
                opacity: 0, 
                x: 30,
                transition: { duration: 0.25 }
              }}
            >
              <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center shrink-0">
                <FaMapMarkerAlt className="text-teal-600" size={16} />
              </div>
              <div className="min-w-0 flex gap-2 justify-center items-center">
                <p className="text-xs whitespace-nowrap text-gray-500 font-medium ">Details : </p>
                <p className="text-sm text-gray-700  font-medium">{address.details}</p>
              </div>
            </motion.div>
            <motion.div 
              className="flex items-center gap-2 min-w-0"
              initial={{ opacity: 0, x: 30 }}
              animate={{ 
                opacity: 1, 
                x: 0,
                transition: { duration: 0.5, delay: 0.4, ease: [0.4, 0, 0.2, 1] }
              }}
              exit={{ 
                opacity: 0, 
                x: 30,
                transition: { duration: 0.25 }
              }}
            >
              <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center shrink-0">
                <FaPhone className="text-teal-600" size={14} />
              </div>
              <div className="min-w-0 flex gap-2 justify-center items-center ">
                <p className="text-xs whitespace-nowrap text-gray-500 font-medium ">Phone : </p>
                <p className="text-sm text-gray-700 truncate font-medium">{address.phone}</p>
              </div>
            </motion.div>

            <motion.div 
              className="flex items-center gap-2 min-w-0"
              initial={{ opacity: 0, x: 30 }}
              animate={{ 
                opacity: 1, 
                x: 0,
                transition: { duration: 0.5, delay: 0.5, ease: [0.4, 0, 0.2, 1] }
              }}
              exit={{ 
                opacity: 0, 
                x: 30,
                transition: { duration: 0.25 }
              }}
            >
              <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center shrink-0">
                <FaCity className="text-teal-600" size={14} />
              </div>
              <div className="min-w-0 flex gap-2 justify-center items-center">
                <p className="text-xs whitespace-nowrap text-gray-500 font-medium ">City : </p>
                <p className="text-sm text-gray-700 truncate font-medium">{address.city}</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            className="flex gap-2 shrink-0"
            initial={{ opacity: 0, x: -40 }}
            animate={{ 
              opacity: 1, 
              x: 0,
              transition: { duration: 0.6, delay: 0.6, ease: [0.4, 0, 0.2, 1] }
            }}
            exit={{ 
              opacity: 0, 
              x: -40,
              transition: { duration: 0.3 }
            }}
          >
            <motion.button
              onClick={() => onEdit(address)}
              className="p-3 bg-teal-50 text-teal-600 hover:bg-teal-600 hover:text-white rounded-xl transition-all duration-300 border border-teal-200 hover:border-teal-600"
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <FaEdit size={16} />
            </motion.button>
            <motion.button
              onClick={handleDelete}
              disabled={isLoading}
              className="p-3 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all duration-300 border border-red-200 hover:border-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <FaTrash size={16} />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {showDeleteModal && createPortal(
        <ConfirmDeleteModal
        isLoading={isLoading}
          isOpen={showDeleteModal}
          title="address"
          onConfirm={confirmDelete}
          onClose={() => setShowDeleteModal(false)}
        />,
        document.body
      )}
    </>
  );
};

export default AddressCard;