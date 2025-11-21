import SubTitle from "../../Compenets/Utility/SubTitle";
import ProductsSection from "../../Compenets/Products/ProductsSection";
import CategorySection from "../../Compenets/Category/CategorySection";
import Slider from "../../Compenets/Slider/Slider";
import Countercontainer from "../../Compenets/Counter/CounterContainer";
import BrandContainer from "../../Compenets/Brands/BrandContainer";
import { preload } from "../../utilis/global-preload";
import { useNavigate } from "react-router-dom";
import { useHomeData } from "../../hook/Home/useHomeDataHook";
import LoadingSpinner from "../../Compenets/UI/LoadingSpinner";

const HomePage = () => {
  const navigate = useNavigate();
  const { isReady, categories, bestSellers, fashion, brands } = useHomeData();

  const goToCategories = () => {
    preload(() => import("../Categories/CategoriesPage"));
    navigate("/categories");
  };

  const goToBrands = () => {
    preload(() => import("../Brands/BrandsPage"));
    navigate("/Brands");
  };

  if (!isReady) {
    return <LoadingSpinner size="full" />;
  }


  return (
    <div>
      <div >
        <Slider />
      </div>

      <div className="container-custom my-15">
        <CategorySection
          title="Category"
          onClick={goToCategories}
          btnTitle="More"
          data={categories.data?.data || []} 
        />
      </div>

      <div className="bg-[#e8e8e83e] p-5">
        <div className="container-custom my-10">
          <ProductsSection
            title="Best Seller"
            btnTitle="Show All"
            bestData={bestSellers.data?.data || []}
          />
        </div>
      </div>

      <div className="container-custom p-5 my-10">
        <Countercontainer />
      </div>

      <div className="bg-[#e8e8e83e] p-5">
        <div className="container-custom my-10">
          <ProductsSection
            title="Latest Fashion"
            btnTitle="More"
            fashionData={fashion.data?.data || []}
          />
        </div>
      </div>

      <div className="my-10">
        <div className="container-custom mt-10">
          <SubTitle title="Brands" onCLick={goToBrands} btnTitle="More" />
        </div>
        <BrandContainer brands={brands.data?.data || []} />
      </div>
    </div>
  );
};

export default HomePage;