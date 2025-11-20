import { cn } from "../lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

import type { HTMLAttributes, ReactNode } from "react";


const buttonVariants = cva(
  "flex items-center justify-center font-medium text-white duration-300   disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default: "font-roobert bg-black dark:bg-[#FFFFFF] hover:opacity-75  duration-300  disabled:bg-opacity-50 dark:text-black ",
        danger: "font-roobert bg-red-600 hover:bg-red-800 text-white ocus:ring-4 focus:outline-none focus:ring-red-300 font-medium",
        remove: "font-roobert text-[#E8765E] hover:bg-[#E8765E]/10 font-medium transition-all  border border-[#E8765E]/20",
        apply: "font-roobert bg-[#3B8D90] hover:bg-[#00645B] text-white focus:ring-3 focus:outline-none focus:ring-[#3B8D90] font-medium",
        outline: "font-roobert border-[2px] border-[#3B8D90] hover:text-white bg-transparent text-[#E8765E] hover:border-transparent hover:bg-[#3B8D90]",
        addBtn: "font-roobert text-white font-medium shadow-lg btn-gradient transition-all duration-300 rounded-full",
        cancel:"font-roobert bg-gray-300 hover:bg-gray-400 text-black ocus:ring-4 focus:outline-none focus:ring-gray-200 font-medium",
        transparent:"bg-transparent border-2 border-white text-white font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300"


      },
      size: {
        default: "px-8 py-3 rounded-xl w-full",
        sm: "text-xs px-8 py-1 rounded-lg",
        xsm: "px-4 py-2.5 text-sm md:text-base rounded-lg",
        md: "px-7 py-2 rounded-lg w-full",
        lg: "px-8 py-3 rounded-full w-full",
        xl: "px-8 py-4 rounded-full "
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps
  extends HTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  children: ReactNode;
  isLoading?: boolean;
  type?: "submit" | "button" | "reset";
}

const Button = ({
  type,
  variant,
  size,
  fullWidth,
  className,
  children,
  isLoading,
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type || "button"}
      className={cn(buttonVariants({ variant, size, fullWidth, className }))}
      {...props}
      disabled={isLoading}
    >
      <div className="flex items-center justify-center  gap-2">
        {isLoading && (
          <svg
            className=" animate-spin size-4 ml-[-1rem]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        <span className={isLoading ? "opacity-95" : ""}>{children}</span>
      </div>
    </button>

  );
};

export default Button;