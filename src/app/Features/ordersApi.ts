import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { RootState } from "../store";
import type { ICheckoutSession, IOrderBody, IOrdersResponse, IParams, IResOrder } from "../../Interfaces";
import { buildQueryString } from "../../Compenets/lib/utils";


export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth.token || localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["orders"],
  endpoints: (builder) => ({
    getAllOrders: builder.query<IOrdersResponse, IParams>({

      query: (params) => {
              const queryString = buildQueryString(params);
              return `/api/v1/orders${queryString ? `?${queryString}` : ""}`;
            },
      
      providesTags: ["orders"],
    }),


    getOrderById: builder.query<IResOrder, string>({
      query: (id) => `/api/v1/orders/${id}`,
      providesTags: ["orders"],
    }),

     createCheckoutSession: builder.mutation<ICheckoutSession,{ id: string; data:IOrderBody}>({

      query: ({id,data}) => ({
              
              url: `/api/v1/orders/checkout-session/${id}`,
              method: "POST",
              body:data
            }),
      
      invalidatesTags: ["orders"],
    }),



    createCashOrder: builder.mutation<void, { id: string; data:IOrderBody}>({
      query: ({ id ,data }) => ({
        url: `/api/v1/orders/${id}`,
        method: "POST",
        body:data,
      }),
      invalidatesTags: ["orders"],
    }),

    updateOrderToPaid: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/v1/orders/${id}/pay`,
        method: "PUT",
        
      }),
      invalidatesTags: ["orders"],
    }),
    updateOrderToDeliver: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/v1/orders/${id}/deliver`,
        method: "PUT",
      
      }),
      invalidatesTags: ["orders"],
    }),

  }),
});

export const {
  useCreateCashOrderMutation,
  useGetAllOrdersQuery,
  useGetOrderByIdQuery,
  useUpdateOrderToDeliverMutation,
  useUpdateOrderToPaidMutation,
  useCreateCheckoutSessionMutation
 
} = ordersApi;
