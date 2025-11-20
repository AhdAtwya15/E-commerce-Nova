import { motion } from "framer-motion"
import Button from "../UI/Button";

interface IProps {
  title: string;
  onCLick: () => void;
  btnTitle:string
}

const SubTitle = ({ title, onCLick,btnTitle }: IProps) => {
  return (
    <div className="flex justify-between items-center pb-5 ">
    
      <motion.span
        className="text-2xl font-semibold text-[#3B8D90] font-roobert"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        {title}
      </motion.span>

      
      <motion.span
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <Button type="button" variant="outline" onClick={onCLick}>
          {btnTitle}
        </Button>
      </motion.span>
    </div>
  );
};

export default SubTitle;
