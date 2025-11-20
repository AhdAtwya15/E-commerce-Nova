import { motion } from "framer-motion"

interface IProps
{
    title:string
    number?:number
    name?:string

}

const ManageTitle = ({title,number,name}:IProps) => {
  return (
    
        <motion.div 
         whileHover={{
                       scale: 1.01,
                        transition: { duration: 0.2 }
                    }}
                    className="p-2 text-2xl sm:!text-3xl whitespace-nowrap font-roobert text-[#3B8D90] font-bold"
                    >
            {title} {number} {name}
        </motion.div>
        

   
  )
}

export default ManageTitle