import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type {  ICategoryData, ICategoryResponse, IEditRequest, IRequest, IParams } from '../../Interfaces'
import type { RootState } from '../store';

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
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

  tagTypes: ["Categories"],
  endpoints: (build) => ({
    getCategories: build.query<ICategoryData, IParams | void>({
      query: (params) => {
        if (params) {
          const queryString = new URLSearchParams({
            limit: params.limit?.toString() || '',
            page: params.page?.toString() || '',
          }).toString();
          return `/api/v1/categories?${queryString}`;
        }
        return '/api/v1/categories';
      },
      providesTags: (result) =>
        result
          ? [
            ...result.data.map(({ _id }) => ({ type: "Categories" as const, id: _id })),
            { type: "Categories", id: "LIST" },
          ]
          : [{ type: "Categories", id: "LIST" }],
    }),
    getCategoryById: build.query<ICategoryResponse, string>({
      query: (id) => `/api/v1/categories/${id}`,
      providesTags: (result) =>
        result
          ? [{ type: "Categories", id: result?.data?._id }]
          : [{ type: "Categories", id: "LIST" }],
    }),
    createCategory: build.mutation<IRequest, FormData>({
      query: (body) => ({
        url: "/api/v1/categories",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Categories"],
    }),
    updateCategory: build.mutation<IEditRequest, { id: string; data:FormData }>({
      query: ({ id, data }) => ({
        url: `/api/v1/categories/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_, __, { id }) => [
        { type: "Categories", id },
        { type: "Categories", id: "LIST" },
      ],
    }),
    deleteCategory: build.mutation<void, string>({
      query: (id) => ({
        url: `/api/v1/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
    }),



  })
});

export const { useGetCategoriesQuery, useGetCategoryByIdQuery, useCreateCategoryMutation, useDeleteCategoryMutation, useUpdateCategoryMutation } = categoriesApi;