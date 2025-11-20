import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type {  IBrandData, IBrandResponse, IEditRequest, IRequest } from '../../Interfaces'
import type { RootState } from '../store';

export const brandsApi = createApi({
  reducerPath: 'brandsApi',
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
  tagTypes: ["Brands"],
  endpoints: (build) => ({
    getBrands: build.query<IBrandData, void>({
      query: () => '/api/v1/brands',
      providesTags: (result) =>
        result
          ? [
            ...result.data.map(({ _id }) => ({ type: "Brands" as const, id: _id })),
            { type: "Brands", id: "LIST" },
          ]
          : [{ type: "Brands", id: "LIST" }],
    }),
    getBrandById: build.query<IBrandResponse, string>({
      query: (id) => `/api/v1/brands/${id}`,
      providesTags: (result) =>
        result
          ? [{ type: "Brands", id: result?.data?._id }]
          : [{ type: "Brands", id: "LIST" }],
    }),
    createBrand: build.mutation<IRequest, FormData>({
      query: (body) => ({
        url: "/api/v1/brands",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Brands"],
    }),
    updateBrand: build.mutation<IEditRequest, { id: string; data: FormData }>({
      query: ({ id, data }) => ({
        url: `/api/v1/brands/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_, __, { id }) => [
        { type: "Brands", id },
        { type: "Brands", id: "LIST" },
      ],
    }),
    deleteBrand: build.mutation<void, string>({
      query: (id) => ({
        url: `/api/v1/brands/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Brands"],
    }),



  })
});

export const {useGetBrandsQuery,useGetBrandByIdQuery,useCreateBrandMutation,useDeleteBrandMutation,useUpdateBrandMutation} = brandsApi;