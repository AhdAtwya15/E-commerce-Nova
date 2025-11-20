import React from "react";
import { motion } from "framer-motion";

interface SpellTextProps {
  text: string;
  className?: string;
  letterDelay?: number;
  startDelay?: number;
}

const SpellText: React.FC<SpellTextProps> = ({
  text,
  className = "",
  letterDelay = 0.05,
  startDelay = 0,
}) => {
  const letters = Array.from(text);

  return (
    <div className="flex justify-center items-center">
      <motion.p
        className={`${className} relative`}
        initial="hidden"
        animate="visible"
        style={{ display: "inline-block" }}
      >
        {letters.map((char, index) => (
          <motion.span
            key={index}
            style={{
              display: "inline-block",
              whiteSpace: "pre",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: startDelay + index * letterDelay,
              duration: 0.03,
              ease: "easeInOut",
            }}
          >
            {char}
          </motion.span>
        ))}

        <motion.span
          className="ml-1 inline-block bg-white"
          style={{
            width: "2px",
            height: "1.5em",
            verticalAlign: "middle",
          }}
          animate={{
            opacity: [0, 1, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 0.8,
            ease: "easeInOut",
          }}
        />
      </motion.p>
    </div>
  );
};

export default SpellText;
