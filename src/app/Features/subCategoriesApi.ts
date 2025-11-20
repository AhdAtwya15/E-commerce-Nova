import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { ISubCategoryData, IEditSubCategory, ISubCategoryRequest, ISubCategoryResponse } from '../../Interfaces'
import type { RootState } from '../store';

export const subCategoriesApi = createApi({
  reducerPath: 'subCategoriesApi',
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
  tagTypes: ["subCategories"],
  endpoints: (build) => ({
    getSubCategories: build.query<ISubCategoryData, void>({
      query: () => '/api/v1/subcategories',
      providesTags: (result) =>
        result
          ? [
            ...result.data.map(({ _id }) => ({ type: "subCategories" as const, id: _id })),
            { type: "subCategories", id: "LIST" },
          ]
          : [{ type: "subCategories", id: "LIST" }],
    }),
    getSubCategoryById: build.query<ISubCategoryResponse, string>({
      query: (id) => `/api/v1/subcategories/${id}`,
      providesTags: (result) =>
        result
          ? [{ type: "subCategories", id: result?.data?._id }]
          : [{ type: "subCategories", id: "LIST" }],
    }),
    createSubCategory: build.mutation<ISubCategoryRequest, Partial<ISubCategoryRequest>>({
      query: (body) => ({
        url: "/api/v1/subcategories",
        method: "POST",
        body,
      }),
      invalidatesTags: ["subCategories"],
    }),
    updateSubCategory: build.mutation<IEditSubCategory, { id: string; data: Partial<IEditSubCategory> }>({
      query: ({ id, data }) => ({
        url: `/api/v1/subcategories/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_, __, { id }) => [
        { type: "subCategories", id },
        { type: "subCategories", id: "LIST" },
      ],
    }),
    deleteSubCategory: build.mutation<void, string>({
      query: (id) => ({
        url: `/api/v1/subcategories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["subCategories"],
    }),



  })
});

export const { useGetSubCategoriesQuery,useGetSubCategoryByIdQuery,useCreateSubCategoryMutation,useDeleteSubCategoryMutation,useUpdateSubCategoryMutation} = subCategoriesApi;