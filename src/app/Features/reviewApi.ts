import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { IParams,IReview, IReviewsResponse} from '../../Interfaces'
import { buildQueryString } from '../../Compenets/lib/utils';
import type { RootState } from '../store';

export const reviewApi = createApi({
  reducerPath: 'reviewApi',
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
  tagTypes: ["ProductsReview"],
  
  endpoints: (build) => ({
    getAllProductsReviews: build.query<IReviewsResponse, IParams>({
      query: (params) => {
        const queryString = buildQueryString(params);
        return `/api/v1/reviews${queryString ? `?${queryString}` : ""}`;
      },
      providesTags: (result) =>
        result
          ? [
            ...result.data.map(({ _id }) => ({ type: "ProductsReview" as const, id: _id })),
            { type: "ProductsReview", id: "LIST" },
          ]
          : [{ type: "ProductsReview", id: "LIST" }],
    }),
    getOneProductReview: build.query<IReviewsResponse, {id:string,params:IParams}>({
      query: ({id,params}) => {
        const queryString = buildQueryString(params);
        return `/api/v1/products/${id}/reviews${queryString ? `?${queryString}` : ""}`;
      },
      providesTags: (result) =>
        result
          ? [
            ...result.data.map(({ _id }) => ({ type: "ProductsReview" as const, id: _id })),
            { type: "ProductsReview", id: "LIST" },
          ]
          : [{ type: "ProductsReview", id: "LIST" }],
    }),
    getReviewById: build.query<IReview, string>({
          query: (id) => `/api/v1/reviews/${id}`,
          providesTags: (result) =>
            result
              ? [{ type: "ProductsReview", id: result?._id }]
              : [{ type: "ProductsReview", id: "LIST" }],
        }),
    getReviewOnProductById: build.query<IReview,{productId:string,reviewId:string}>({
          query: ({productId,reviewId}) =>
             `/api/v1/products/${productId}/reviews/${reviewId}`,
          providesTags: (result) =>
            result
              ? [{ type: "ProductsReview", id: result?._id }]
              : [{ type: "ProductsReview", id: "LIST" }],
        }),    


    createReview: build.mutation<void, Partial<IReview>>({
      query: (body) => ({
        url: "/api/v1/reviews",
        method: "POST",
        body,
      }),
      invalidatesTags: ["ProductsReview"],
    }),
    createReviewOnProduct: build.mutation<void, {id:string,data:Partial<IReview>}>({
      query: ({id,data}) => ({
        url: `/api/v1/products/${id}/reviews`,
        method: "POST",
        body:data,
      }),
      invalidatesTags: ["ProductsReview"],
    }),
   updatReview: build.mutation<void, { id: string; data:Partial<IReview> }>({
         query: ({ id, data }) => ({
           url: `/api/v1/reviews/${id}`,
           method: "PUT",
           body: data,
         }),
         invalidatesTags: (_, __, { id }) => [
           { type: "ProductsReview", id },
           { type: "ProductsReview", id: "LIST" },
         ],
       }),
    
    deletProductReview: build.mutation<void, string>({
      query: (id) => ({
        url: `/api/v1/reviews/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ProductsReview"],
    }),



  })
});

export const {useGetAllProductsReviewsQuery,useGetReviewByIdQuery,useCreateReviewMutation,useUpdatReviewMutation,useDeletProductReviewMutation,useCreateReviewOnProductMutation,useGetOneProductReviewQuery,useGetReviewOnProductByIdQuery} = reviewApi;