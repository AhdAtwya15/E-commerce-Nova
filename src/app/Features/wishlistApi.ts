import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { IParams,  IProductData, IWishlistAdd} from '../../Interfaces'
import { buildQueryString } from '../../Compenets/lib/utils';
import type { RootState } from '../store';

export const wishlistApi = createApi({
  reducerPath: 'wishlistApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL ,
    prepareHeaders: (headers, { getState }) => {
  const state = getState() as RootState;
  const token = state.auth.token || localStorage.getItem("token");

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return headers;
    },
  }),
  tagTypes: ["WishlistProducts"],
  
  endpoints: (build) => ({
    getWishlistProducts: build.query<IProductData, IParams>({
      query: (params) => {
        const queryString = buildQueryString(params);
        return `/api/v1/wishlist${queryString ? `?${queryString}` : ""}`;
      },
      providesTags: ["WishlistProducts"],
    }),
    addProductToWishlist: build.mutation<void, IWishlistAdd>({
      query: (body) => ({
        url: "/api/v1/wishlist",
        method: "POST",
        body,
      }),
      invalidatesTags: ["WishlistProducts"],
    }),
    
    deletWishlistProduct: build.mutation<void, string>({
      query: (id) => ({
        url: `/api/v1/wishlist/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["WishlistProducts"],
    }),



  })
});

export const {useAddProductToWishlistMutation,useDeletWishlistProductMutation,useGetWishlistProductsQuery } = wishlistApi;