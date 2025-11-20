import { FaStar } from "react-icons/fa";

interface IProps{
    rating:number
}

const RenderStars = ({rating}:IProps) => {
    return Array.from({ length: 5 }, (_, index) => {
      const fillLevel = Math.min(Math.max(rating - index, 0), 1);

      return (
        <span key={index} className="relative inline-block text-xl">
          
          <FaStar
            className={`${
              fillLevel > 0 ? "text-yellow-300" : "text-gray-300"
            }`}
          />

        
          <span
            className="absolute top-0 left-0 h-full text-yellow-400 overflow-hidden"
            style={{ width: `${fillLevel * 100}%` }}
          >
            <FaStar />
          </span>
        </span>
      );
    });
  };
  export default RenderStars;