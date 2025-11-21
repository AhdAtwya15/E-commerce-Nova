import { motion } from "framer-motion";
import Button from "./Button";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  title: string;
  onConfirm: () => void;
  onClose: () => void;
  isLoading:boolean
}

const ConfirmDeleteModal = ({ isOpen, title, onConfirm, onClose,isLoading=false }: ConfirmDeleteModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex justify-center items-center bg-black/50 "
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl shadow-lg p-10 w-[90%] max-w-md text-center relative"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-1.5 right-2.5 text-grey-100 hover:bg-gray-200 transition duration-300 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close modal</span>
        </button>

        <h3 className="mb-5 text-sm sm:!text-lg font-semibold text-gray-800 whitespace-nowrap">
          Are you sure you want to delete this {title} ? 
        </h3>

        <div className="flex justify-center gap-3">
          <Button isLoading={isLoading} variant="danger" size="md" onClick={onConfirm}>
            Yes
          </Button>
          <Button variant="cancel" size="md" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default ConfirmDeleteModal;
