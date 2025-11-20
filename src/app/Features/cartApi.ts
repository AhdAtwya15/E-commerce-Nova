import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { IParams,  ICartResponse, IAddToCart, IUpdateQuantityCart, IApplyCoupon} from '../../Interfaces'
import { buildQueryString } from '../../Compenets/lib/utils';
import type { RootState } from '../store';

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth.token || localStorage.getItem("token");
      
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      
      return headers;
    },
  }),
  tagTypes: ["CartProducts"],
  
  endpoints: (build) => ({
    getCartProduct: build.query<ICartResponse, IParams>({
      query: (params) => {
        const queryString = buildQueryString(params);
        return `/api/v1/cart${queryString ? `?${queryString}` : ""}`;
      },
      providesTags: ["CartProducts"],
    }),
    
    addProductToCart: build.mutation<void, IAddToCart>({
      query: (body) => ({
        url: "/api/v1/cart",
        method: "POST",
        body,
      }),
      invalidatesTags: ["CartProducts"],
    }),
    
    updateQuantityCart: build.mutation<void, { id: string; data: IUpdateQuantityCart }>({
      query: ({ id, data }) => ({
        url: `/api/v1/cart/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["CartProducts"],
    }),
    
    deletCartProductById: build.mutation<void, string>({
  query: (id) => ({
    url: `/api/v1/cart/${id}`,
    method: "DELETE",
  }),
  invalidatesTags: ["CartProducts"],
 
}),
    
    deletAllCartProduct: build.mutation<void, void>({
  query: () => ({
    url: `/api/v1/cart`,
    method: "DELETE",
  }),
  invalidatesTags: ["CartProducts"],
  
}),

    applyCoupon: build.mutation<void,IApplyCoupon >({
      query: (body) => ({
        url: `/api/v1/cart/applyCoupon`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["CartProducts"],
    }),
  })
});

export const {useAddProductToCartMutation,useGetCartProductQuery,useUpdateQuantityCartMutation,useDeletCartProductByIdMutation,useDeletAllCartProductMutation,useApplyCouponMutation } = cartApi;