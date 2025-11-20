//import { useGetCategoriesQuery } from "../../app/Features/categoriesApi";
import type { ICategory } from "../../Interfaces";

import SubTitle from "../Utility/SubTitle";
import CategoryCard from "./CategoryCard"

interface IProps
{
    title:string;
    onClick:()=>void
    btnTitle:string
    data:ICategory[]

}


const CategorySection = ({title,onClick,btnTitle,data}:IProps) => {
    
  return (
    <div>
          <SubTitle title={title} onCLick={onClick} btnTitle={btnTitle} />
        <section className="Categories my-5">

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {data?.slice(0, 6).map((category, index) => (
    <CategoryCard key={category._id} {...category} index={index} />
  ))}
</div>


        </section>

    </div>
  )
}

export default CategorySection