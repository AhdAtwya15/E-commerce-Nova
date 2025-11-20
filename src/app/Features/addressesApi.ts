import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IAddOrUpdateAddressPayload, IAddress, IAddressResponse } from "../../Interfaces";
import type { RootState } from "../store";


export const addressesApi = createApi({
  reducerPath: "addressesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth.token || localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Addresses"],
  endpoints: (builder) => ({
    getAddresses: builder.query<IAddressResponse, void>({
      query: () => "/api/v1/addresses",
      providesTags: ["Addresses"],
    }),
     getAddresseById: builder.query<IAddress, {id:string}>({
      query: ({id}) => `/api/v1/addresses/${id}`,
      providesTags: ["Addresses"],
    }),

    addAddress: builder.mutation<IAddress, IAddOrUpdateAddressPayload>({
      query: (newAddress) => ({
        url: "/api/v1/addresses",
        method: "POST",
        body: newAddress,
      }),
      invalidatesTags: ["Addresses"],
    }),

    updateAddress: builder.mutation<IAddress, { id: string; data:IAddOrUpdateAddressPayload}>({
      query: ({ id ,data }) => ({
        url: `/api/v1/addresses/${id}`,
        method: "PUT",
        body:data,
      }),
      invalidatesTags: ["Addresses"],
    }),

    deleteAddress: builder.mutation<{ status: string; message: string }, string>({
      query: (id) => ({
        url: `/api/v1/addresses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Addresses"],
    }),
  }),
});

export const {
  useGetAddressesQuery,
  useGetAddresseByIdQuery,
  useAddAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
} = addressesApi;
