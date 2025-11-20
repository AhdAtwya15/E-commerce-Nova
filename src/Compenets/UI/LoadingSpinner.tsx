import { motion } from "framer-motion";

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large" | "full";
  color?: string; 
}

const LoadingSpinner = ({ 
  size = "large",
  color = "#E8765E"
}: LoadingSpinnerProps) => {

  const sizeClasses = {
    small: "w-8 h-8",
    medium: "w-12 h-12",
    large: "w-16 h-16",
    full: "w-20 h-20",
  };

  const currentSize = size === "full" ? sizeClasses.large : sizeClasses[size];


  if (size === "full") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
        <motion.div
          className={`${currentSize} border-4 border-gray-200 rounded-full`}
          style={{
            borderTopColor: color,
            borderRightColor: color,
            borderBottomColor: "transparent",
            borderLeftColor: "transparent",
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
    );
  }

  return (
    <motion.div
      className={`${currentSize} border-4 border-gray-200 rounded-full`}
      style={{
        borderTopColor: color,
        borderRightColor: color,
        borderBottomColor: "transparent",
        borderLeftColor: "transparent",
      }}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
};

export default LoadingSpinner;