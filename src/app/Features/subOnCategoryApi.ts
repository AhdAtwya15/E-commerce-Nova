import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type {  ISubOnCategory,  ISubOnCategoryReq } from '../../Interfaces'
import type { RootState } from '../store';

export const subOnCategoryApi = createApi({
  reducerPath: 'subOnCategoryApi',
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
  tagTypes: ["SubOnCategory"],
  endpoints: (build) => ({
    getAllSubOnById: build.query<ISubOnCategory, string>({
      query: (id) => `/api/v1/categories/${id}/subcategories`,
     providesTags: (result) =>
  result
    ? [
        ...result.data.map(({ _id }) => ({ type: "SubOnCategory" as const, id: _id })),
        { type: "SubOnCategory", id: "LIST" },
      ]
    : [{ type: "SubOnCategory", id: "LIST" }],

    }),
    createSubOnCategory: build.mutation<ISubOnCategoryReq,{ id: string; data: FormData }>({
      query: ({id,data}) => ({
        url: `/api/v1/categories/${id}/subcategories`,
        method: "POST",
        body:data,
      }),
      invalidatesTags: ["SubOnCategory"],
    }),
    


  })
});

export const {useGetAllSubOnByIdQuery,useCreateSubOnCategoryMutation } = subOnCategoryApi;