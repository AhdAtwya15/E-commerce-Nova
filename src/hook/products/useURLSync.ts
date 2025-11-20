import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { debounce } from 'lodash';
import { setFiltersFromURL } from '../../app/Features/Slices/filterSlice';
import type { FilterState } from '../../Interfaces';

interface UseURLSyncProps {
  categoriesData: Array<{ _id: string; name: string }>;
  brandsData: Array<{ _id: string; name: string }>;
  filterState: FilterState;
}

export const useURLSync = ({ categoriesData, brandsData, filterState }: UseURLSyncProps) => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const isInitialMount = useRef(true);
  const isUpdatingFromState = useRef(false);

  useEffect(() => {
    if (categoriesData.length === 0 || brandsData.length === 0 || isUpdatingFromState.current) {
      return;
    }

    const categoryParams = searchParams.getAll('category');
    const brandParams = searchParams.getAll('brand');
    const ratingParam = searchParams.get('rating');
    const minPriceParam = searchParams.get('minPrice');
    const maxPriceParam = searchParams.get('maxPrice');
    const sortParam = searchParams.get('sort');
    const pageParam = searchParams.get('page');
    const keywordParam = searchParams.get('keyword') || '';

    const selectedCatIds = categoryParams
      .map((name) => categoriesData.find((c) => c.name === name)?._id)
      .filter(Boolean) as string[];

    const selectedBrandIds = brandParams
      .map((name) => brandsData.find((b) => b.name === name)?._id)
      .filter(Boolean) as string[];

    let activeCategory = 'All';
    if (selectedCatIds.length === 1) {
      const catName = categoriesData.find((c) => c._id === selectedCatIds[0])?.name;
      if (catName) activeCategory = catName;
    }

    dispatch(
      setFiltersFromURL({
        selectedCategories: selectedCatIds,
        selectedBrands: selectedBrandIds,
        selectedRating: ratingParam ? parseInt(ratingParam, 10) : null,
        priceRange: [
          minPriceParam ? parseFloat(minPriceParam) : 0,
          maxPriceParam ? parseFloat(maxPriceParam) : 500,
        ],
        sort: sortParam || 'most_selling',
        activeCategory,
        page: pageParam ? Math.max(1, parseInt(pageParam, 10)) : 1,
        keyword: keywordParam,
      })
    );

    isInitialMount.current = false;
  }, [categoriesData, brandsData, searchParams, dispatch]);

  useEffect(() => {
    if (isInitialMount.current || categoriesData.length === 0 || brandsData.length === 0) {
      return;
    }

    const updateURL = debounce(() => {
      isUpdatingFromState.current = true;
      
      const newParams = new URLSearchParams();

      if (filterState.keyword) {
        newParams.set('keyword', filterState.keyword);
      }

      filterState.selectedCategories.forEach((id: string) => {
        const name = categoriesData.find((c) => c._id === id)?.name;
        if (name) newParams.append('category', name);
      });

      filterState.selectedBrands.forEach((id: string) => {
        const name = brandsData.find((b) => b._id === id)?.name;
        if (name) newParams.append('brand', name);
      });

      if (filterState.selectedRating) {
        newParams.set('rating', filterState.selectedRating.toString());
      }
      if (filterState.priceRange[0] > 0) {
        newParams.set('minPrice', filterState.priceRange[0].toString());
      }
      if (filterState.priceRange[1] < 500) {
        newParams.set('maxPrice', filterState.priceRange[1].toString());
      }
      if (filterState.sort !== 'most_selling') {
        newParams.set('sort', filterState.sort);
      }
      if (filterState.page > 1) {
        newParams.set('page', filterState.page.toString());
      }

      const currentURL = searchParams.toString();
      const newURL = newParams.toString();

      if (currentURL !== newURL) {
        setSearchParams(newParams, { replace: true });
      }
      
     
      setTimeout(() => {
        isUpdatingFromState.current = false;
      }, 50);
    }, 400);

    updateURL();
    return () => updateURL.cancel();
  }, [filterState, categoriesData, brandsData, searchParams, setSearchParams]);
};