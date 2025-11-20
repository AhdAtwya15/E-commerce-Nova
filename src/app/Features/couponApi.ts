
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ICoupon, ICouponData, ICouponResponse, IParams } from "../../Interfaces";
import { buildQueryString } from "../../Compenets/lib/utils";
import type { RootState } from "../store";

export const couponApi = createApi({
  reducerPath: "couponApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth.token || localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Coupons"],
  endpoints: (build) => ({
    
    getAllCoupons: build.query<ICouponData, IParams>({
      query: (params) => {
        const queryString = buildQueryString(params);
        return `/api/v1/coupons${queryString ? `?${queryString}` : ""}`;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ _id }) => ({ type: "Coupons" as const, id: _id })),
              { type: "Coupons", id: "LIST" },
            ]
          : [{ type: "Coupons", id: "LIST" }],
    }),

   
    getCouponById: build.query<ICouponResponse, string>({
      query: (id) => `/api/v1/coupons/${id}`,
      providesTags: (result) =>
        result
          ? [{ type: "Coupons", id: result.data._id }]
          : [{ type: "Coupons", id: "LIST" }],
    }),

    createCoupon: build.mutation<ICoupon, { name: string; expire: string; discount: number }>({
      query: (body) => ({
        url: "/api/v1/coupons",
        method: "POST",
        body: {
          ...body,
          
          expire: new Date(body.expire).toISOString(),
        },
      }),
      invalidatesTags: [{ type: "Coupons", id: "LIST" }],
    }),

  
    updateCoupon: build.mutation<ICoupon, { id: string; data: { name: string; expire: string; discount: number } }>({
      query: ({ id, data }) => ({
        url: `/api/v1/coupons/${id}`,
        method: "PUT",
        body: {
          ...data,
          expire: new Date(data.expire).toISOString(),
        },
      }),
      invalidatesTags: (_, __, { id }) => [
        { type: "Coupons", id },
        { type: "Coupons", id: "LIST" },
      ],
    }),


    deleteCoupon: build.mutation<void, string>({
      query: (id) => ({
        url: `/api/v1/coupons/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Coupons", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllCouponsQuery,
  useGetCouponByIdQuery,
  useCreateCouponMutation,
  useUpdateCouponMutation,
  useDeleteCouponMutation,
} = couponApi;
