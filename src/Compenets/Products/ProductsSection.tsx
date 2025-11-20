import { useNavigate } from "react-router-dom";
//import { useGetProductsQuery } from "../../app/Features/productApi";

import SubTitle from "../Utility/SubTitle";
import ProductCard from "./ProductCard"
import type { IProduct } from "../../Interfaces";
import { preload } from "../../utilis/global-preload";

interface IProps
{
    title:string;
    btnTitle:string
   bestData?:IProduct[]
   fashionData?:IProduct[]

}


const ProductsSection = ({title,btnTitle,bestData,fashionData}:IProps) => {
  const navigate=useNavigate()
    
 
;
   

      const navigateToAllProduct=()=>{

        preload(() => import("../../Pages/Product/ShowProductsPage"))
        navigate('/products')
        
      }

      const navigateToFashionProduct=()=>{
         preload(() => import("../../Pages/Product/ShowProductsPage"))

        navigate('/products?category=Fashion')
        
      }
    
    
  return (
    <div>
          {
             title==="Latest Fashion"?
             <SubTitle title={title} onCLick={navigateToFashionProduct} btnTitle={btnTitle} />
             :
             <SubTitle title={title} onCLick={navigateToAllProduct} btnTitle={btnTitle} />


          }
        <section className="Products my-5">
         {
          title==="Latest Fashion"?
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7  lg:!gap-5  ">
         { fashionData?.map((product, index) => (
            <ProductCard
            key={index}
                                    {...product}
                                    index={index}
                                  
            
                                  />
          ))}
        </div>
          :
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7  lg:!gap-5  ">
         { bestData?.map((product, index) => (
            <ProductCard
            key={index}
                                    {...product}
                                    index={index}
                                  
            
                                  />
          ))}
        </div>
         }


        </section>

    </div>
  )
}

export default ProductsSection