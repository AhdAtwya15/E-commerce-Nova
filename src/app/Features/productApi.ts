import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { IParams, IProduct, IProductData, IProductResponse} from '../../Interfaces'
import { buildQueryString } from '../../Compenets/lib/utils';
import type { RootState } from '../store';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
          const state = getState() as RootState;
          const token = state.auth.token || localStorage.getItem("token");
          
          if (token) {
            headers.set("Authorization", `Bearer ${token}`);
          }
          
          return headers;
        },
   }),
  tagTypes: ["Products"],
  endpoints: (build) => ({
    getProducts: build.query<IProductData, IParams>({
      query: (params) => {
        const queryString = buildQueryString(params);
        return `/api/v1/products${queryString ? `?${queryString}` : ""}`;
      },
     providesTags: ["Products"],
    }),
    getProductsMayLike: build.query<IProductData, string>({
      query: (id) => `/api/v1/products?category=${id}`,
     providesTags: ["Products"],
    }),
    getProductById: build.query<IProductResponse, string>({
      query: (id) => `/api/v1/products/${id}`,
      providesTags: ["Products"],
    }),
    createProduct: build.mutation<IProduct, FormData>({
      query: (body) => ({
        url: "/api/v1/products",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Products"],
    }),
    updatProduct: build.mutation<IProduct, { id: string; data:FormData }>({
      query: ({ id, data }) => ({
        url: `/api/v1/products/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
    deletProduct: build.mutation<void, string>({
      query: (id) => ({
        url: `/api/v1/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),



  })
});

export const { useGetProductsQuery, useGetProductByIdQuery,useGetProductsMayLikeQuery, useCreateProductMutation,useDeletProductMutation,useUpdatProductMutation} = productApi;