
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { createSelector } from '@reduxjs/toolkit';

interface FilterState {
  selectedCategories: string[];
  selectedBrands: string[];
  selectedRating: number | null;
  priceRange: [number, number];
  sort: string;
  activeCategory: string;
  page: number;
  keyword: string; 
}

const initialState: FilterState = {
  selectedCategories: [],
  selectedBrands: [],
  selectedRating: null,
  priceRange: [0, 500],
  sort: 'most_selling',
  activeCategory: 'All',
  page: 1,
  keyword: '', 
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFiltersFromURL: (state, action: PayloadAction<Partial<FilterState>>) => {
      return { ...state, ...action.payload };
    },

    toggleCategory: (state, action: PayloadAction<string>) => {
      const categoryId = action.payload;
      const index = state.selectedCategories.indexOf(categoryId);
      if (index > -1) {
        state.selectedCategories.splice(index, 1);
      } else {
        state.selectedCategories.push(categoryId);
      }
      state.page = 1;
    },

    setActiveCategory: (state, action: PayloadAction<{ name: string; id: string | null }>) => {
      state.activeCategory = action.payload.name;
      if (action.payload.name === 'All') {
        state.selectedCategories = [];
      } else if (action.payload.id) {
        state.selectedCategories = [action.payload.id];
      }
      state.page = 1;
    },

    toggleBrand: (state, action: PayloadAction<string>) => {
      const brandId = action.payload;
      const index = state.selectedBrands.indexOf(brandId);
      if (index > -1) {
        state.selectedBrands.splice(index, 1);
      } else {
        state.selectedBrands.push(brandId);
      }
      state.page = 1;
    },

    setRating: (state, action: PayloadAction<number | null>) => {
      state.selectedRating = action.payload;
      state.page = 1;
    },

    setPriceRange: (state, action: PayloadAction<[number, number]>) => {
      state.priceRange = action.payload;
      state.page = 1;
    },

    setSort: (state, action: PayloadAction<string>) => {
      state.sort = action.payload;
      state.page = 1;
    },

    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },

    setKeyword: (state, action: PayloadAction<string>) => {
      state.keyword = action.payload.trim();
      state.page = 1;
    },

    clearKeyword: (state) => {
      state.keyword = '';
      state.page = 1;
    },

    clearFilters: (state) => {
      state.selectedCategories = [];
      state.selectedBrands = [];
      state.selectedRating = null;
      state.priceRange = [0, 500];
      state.sort = 'most_selling';
      state.activeCategory = 'All';
      state.page = 1;
      state.keyword = ''; 
    },
  },
});

export const {
  setFiltersFromURL,
  toggleCategory,
  setActiveCategory,
  toggleBrand,
  setRating,
  setPriceRange,
  setSort,
  setPage,
  clearFilters,
  setKeyword,      
  clearKeyword,
} = filterSlice.actions;

export default filterSlice.reducer;

export const selectFilterState = (state: { filters: FilterState }) => state.filters;


export const selectApiParams = createSelector(
  (state: { filters: FilterState }) => state.filters,
  (filters) => ({
    limit: 12,
    page: filters.page,
    ...(filters.keyword && { keyword: filters.keyword }),
    ...(filters.selectedCategories.length > 0 && { 'category[in][]': filters.selectedCategories }),
    ...(filters.selectedBrands.length > 0 && { 'brand[in][]': filters.selectedBrands }),
    ...(filters.selectedRating && { 'ratingsQuantity[gte]': filters.selectedRating }),
    ...(filters.priceRange[0] > 0 && { 'price[gte]': filters.priceRange[0] }),
    ...(filters.priceRange[1] < 500 && { 'price[lte]': filters.priceRange[1] }),
    sort:
      filters.sort === 'price_asc'
        ? 'price'
        : filters.sort === 'price_desc'
        ? '-price'
        : filters.sort === 'top_rated'
        ? '-ratingsQuantity'
        : '-price',
  })
);
