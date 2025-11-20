import { useEffect, useState } from 'react';
import { useGetCategoriesQuery } from '../../app/Features/categoriesApi';
import { useGetProductsQuery } from '../../app/Features/productApi';
import { useGetBrandsQuery } from '../../app/Features/brandsApi';


export const useHomeData = () => {
  const [isReady, setIsReady] = useState(false);

  const categories = useGetCategoriesQuery();
  const bestSellers = useGetProductsQuery({ limit: 4 });
  const fashion = useGetProductsQuery({
    category: "69179c8247ed48ca20a0f364",
    limit: 4,
  });
  const brands = useGetBrandsQuery();

  useEffect(() => {
    
    if (
      categories.isSuccess ||
      categories.isError ||
      bestSellers.isSuccess ||
      bestSellers.isError ||
      fashion.isSuccess ||
      fashion.isError ||
      brands.isSuccess ||
      brands.isError
    ) {
      const allSettled =
        categories.isSuccess || categories.isError &&
        bestSellers.isSuccess || bestSellers.isError &&
        fashion.isSuccess || fashion.isError &&
        brands.isSuccess || brands.isError;

      if (allSettled) {
        setIsReady(true);
      }
    }
  }, [categories, bestSellers, fashion, brands]);

  return {
    isReady,
    categories,
    bestSellers,
    fashion,
    brands,
  };
};