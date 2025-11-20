import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import type { ICounter } from "../../Interfaces";

interface AnimatedCounterProps extends ICounter {
  index: number;
  totalCount: number;
}

const Counter = ({ icon, number, description, index, totalCount }: AnimatedCounterProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once:true, margin: "-100px" });
  const [displayNumber, setDisplayNumber] = useState(0);

  
  const targetNumber = parseInt(number.replace(/[^\d]/g, ''));
  const suffix = number.replace(/[\d]/g, '');

  
  const getAnimationDirection = () => {
    if (totalCount === 1) {
      return index % 2 === 0 ? "right" : "left";
    } else if (totalCount === 2) {
      return index === 0 ? "right" : "left";
    } else if (totalCount === 4) {
      return index < 2 ? "right" : "left";
    }
    return index % 2 === 0 ? "right" : "left";
  };

  const direction = getAnimationDirection();

  useEffect(() => {
    if (isInView) {
      const duration = 2000; 
      const steps = 60; 
      const increment = targetNumber / steps;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const newValue = Math.min(Math.floor(increment * currentStep), targetNumber);
        setDisplayNumber(newValue);

        if (currentStep >= steps) {
          clearInterval(timer);
          setDisplayNumber(targetNumber);
        }
      }, stepDuration);

      return () => clearInterval(timer);
    }
  }, [isInView, targetNumber]);


  const slideVariants = {
    hidden: {
      x: direction === "right" ? 100 : -100,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.2, 
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={slideVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="flex flex-col justify-center items-center gap-3 font-roobert text-center p-5"
    >
      <motion.span
        className="text-5xl text-[#3B8D90]"
        initial={{ scale: 0, rotate: -180 }}
        animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
        transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
      >
        {icon}
      </motion.span>
      
      <motion.span
        className="text-3xl font-medium text-gray-600"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
        transition={{ duration: 0.4, delay: index * 0.2 + 0.5 }}
      >
        {displayNumber.toLocaleString()}{suffix}
      </motion.span>
      
      <motion.div
        className="text-md text-gray-500"
        initial={{ y: 20, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
        transition={{ duration: 0.4, delay: index * 0.2 + 0.7 }}
      >
        {description}
      </motion.div>
    </motion.div>
  );
};

export default Counter