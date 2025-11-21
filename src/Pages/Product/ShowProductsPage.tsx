import { useState, useMemo, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";

import CategoryHeader from "../../Compenets/Category/CategoryHeader";
import SearchCountResult from "../../Compenets/Utility/SearchCountResult";
import SideFilter from "../../Compenets/Utility/SideFilter";
import ProductCard from "../../Compenets/Products/ProductCard";
import Pagination from "../../Compenets/Utility/Pagination";

import { useGetProductsQuery } from "../../app/Features/productApi";
import { useGetCategoriesQuery } from "../../app/Features/categoriesApi";
import { useGetBrandsQuery } from "../../app/Features/brandsApi";

import {
  toggleCategory,
  toggleBrand,
  setRating,
  setPriceRange,
  setSort,
  setPage,
  clearFilters,
  setActiveCategory,
  selectFilterState,
  selectApiParams,
} from "../../app/Features/Slices/filterSlice";

import { useURLSync } from "../../hook/products/useURLSync";

import { Quantum } from 'ldrs/react'
import 'ldrs/react/Quantum.css'
import NoProductsFound from "../../Compenets/Utility/NoProductsFound";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

interface IProps {
  isForAdmin?: boolean;
}

const ShowProductsPage = ({ isForAdmin = false }: IProps) => {
  const dispatch = useDispatch();
  const navigate=useNavigate();

  const filterState = useSelector(selectFilterState);
  const apiParams = useSelector(selectApiParams);

  const [showFilters, setShowFilters] = useState(false);

  const { data: categoryDetails } = useGetCategoriesQuery();
  const categoriesData = useMemo(() => categoryDetails?.data ?? [], [categoryDetails]);

  const { data: brandDetails } = useGetBrandsQuery();
  const brandsData = useMemo(() => brandDetails?.data ?? [], [brandDetails]);

  useURLSync({ categoriesData, brandsData, filterState });

  const finalParams = useMemo(() => ({
    ...apiParams,
    ...(filterState.keyword ? { keyword: filterState.keyword } : {}),
  }), [apiParams, filterState.keyword]);

  const {
    data: allProductsData,
    isLoading,
    isError,
  } = useGetProductsQuery(finalParams);

  const products = useMemo(() => allProductsData?.data ?? [], [allProductsData]);
  const pagination = allProductsData?.paginationResult;
  const numOfResults = allProductsData?.results;

  
  const hasActiveFilters = useMemo(() => {
    return (
      filterState.selectedCategories.length > 0 ||
      filterState.selectedBrands.length > 0 ||
      filterState.selectedRating !== null ||
      filterState.priceRange[0] > 0 ||
      filterState.priceRange[1] < 500
    );
  }, [filterState]);

  const handleCategoryChange = useCallback(
    (categoryName: string) => {
      if (categoryName === 'All') {
        dispatch(setActiveCategory({ name: 'All', id: null }));
      } else {
        const category = categoriesData.find((c) => c.name === categoryName);
        if (category) {
          dispatch(setActiveCategory({ name: categoryName, id: category._id }));
        }
      }
    },
    [dispatch, categoriesData]
  );

  const handleToggleFilters = useCallback(() => {
    setShowFilters((prev) => !prev);
  }, []);

  const handleFilterChange = useCallback(
    (section: string, value: string, checked: boolean) => {
      if (section === 'Category') {
        dispatch(toggleCategory(value));
      } else if (section === 'Brand') {
        dispatch(toggleBrand(value));
      } else if (section === 'Rating') {
        dispatch(setRating(checked ? parseInt(value) : null));
      }
    },
    [dispatch]
  );

  const handlePriceChange = useCallback(
    (min: number, max: number) => {
      dispatch(setPriceRange([min, max]));
    },
    [dispatch]
  );

  const handleClearFilters = useCallback(() => {
    dispatch(clearFilters());
  }, [dispatch]);

  const handlePageChange = useCallback(
    (page: number) => {
      dispatch(setPage(page));
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [dispatch]
  );

  const handleSortChange = useCallback(
    (sort: string) => {
      dispatch(setSort(sort));
    },
    [dispatch]
  );

  useState(() => {
    document.body.style.overflow = showFilters ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  });

  return (
    <div className="min-h-screen bg-gray-50">
       <div className="p-4 container-custom">
        <button
                  onClick={() => navigate(-1)}
                  className="flex items-center gap-2 text-[#3B8D90] hover:text-[#E8765E] transition-colors font-medium"
                >
                  <IoArrowBack className="text-xl" />
                  Back 
                </button>
       </div>


      <CategoryHeader
        activeCategory={filterState.activeCategory}
        onCategoryChange={handleCategoryChange}
        isAdmin={isForAdmin}
      />

      <SearchCountResult
        totalResults={numOfResults}
        searchQuery={filterState.keyword}
        showFilters={showFilters}
        onToggleFilters={handleToggleFilters}
        sort={filterState.sort}
        onSortChange={handleSortChange}
        isAdmin={isForAdmin}
        hasActiveFilters={hasActiveFilters} 
      />

      <div className="container-custom px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <AnimatePresence>
            {showFilters && (
              <>
                <motion.div
                  className="fixed inset-0 bg-black/30 z-40"
                  onClick={() => setShowFilters(false)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
                <motion.div
                  className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-40"
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                >
                  <SideFilter
                    categoriesData={categoriesData}
                    brandsData={brandsData}
                    onFilterChange={handleFilterChange}
                    onPriceChange={handlePriceChange}
                    onClearFilters={handleClearFilters}
                    isVisible={showFilters}
                    onClose={() => setShowFilters(false)}
                    selectedCategories={filterState.selectedCategories}
                    selectedBrands={filterState.selectedBrands}
                    selectedRating={filterState.selectedRating}
                    priceRange={filterState.priceRange}
                  />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          <div className="flex-1 min-w-0">
            {isLoading ? (
              <div className="flex justify-center py-30">
                <Quantum size="45" speed="1.75" color="#E8765E" />
              </div>
            ) : isError ? (
              <motion.div
                className="text-center py-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <NoProductsFound isError />
              </motion.div>
            ) : products.length > 0 ? (
              <>
                <motion.div
                  className={`${
                    isForAdmin
                      ? "grid md:!gap-6 gap-8 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
                      : "grid md:!gap-6 gap-8 grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5"
                  }`}
                  layout
                >
                  <AnimatePresence mode="popLayout">
                    {products.map((product, index) => (
                      <motion.div
                        key={product._id}
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{
                          duration: 0.3,
                          delay: index * 0.01,
                        }}
                      >
                        <ProductCard
                          {...product}
                          index={index}
                          disableInitialAnimation={true}
                          
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>

                {pagination && pagination.numberOfPages > 1 && (
                  <Pagination
                    currentPage={filterState.page}
                    totalPages={pagination.numberOfPages}
                    onPageChange={handlePageChange}
                    siblingCount={1}
                    boundaryCount={1}
                    showFirstLast
                    showPageInfo
                  />
                )}
              </>
            ) : (
              <motion.div
                className="text-center py-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <NoProductsFound title="Products" onToggleFilters={handleToggleFilters} />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ShowProductsPage);