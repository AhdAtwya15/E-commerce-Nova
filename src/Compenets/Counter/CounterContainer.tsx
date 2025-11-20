import type { ICounter } from "../../Interfaces"
import { IoIosPeople } from "react-icons/io";
import { MdRecommend } from "react-icons/md";
import { BsFillCartPlusFill } from "react-icons/bs";
import { FaEarthAmericas } from "react-icons/fa6";
import Counter from "./Counter";




const Countercontainer = () => {
    const counters: ICounter[] = [
        {
            icon: <IoIosPeople />,
            number: "10000+",
            description: "Served Customers"
        },
        {
            icon: <MdRecommend />,
            number: "97%",
            description: "Clients Recommend"
        },
        {
            icon: <BsFillCartPlusFill />,
            number: "500+",
            description: "Items in our Store"
        },
        {
            icon: <FaEarthAmericas />,
            number: "90",
            description: "Countries we ship to"
        }
    ]

    return (
        <div className="my-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4  gap-4  ">
            {
                counters.map((counter, index) => (
                    <Counter
                        key={index}
                        icon={counter.icon}
                        number={counter.number}
                        description={counter.description}
                        index={index}
                        totalCount={counters.length}
                    />
                ))
            }

        </div>
    )
}

export default Countercontainer