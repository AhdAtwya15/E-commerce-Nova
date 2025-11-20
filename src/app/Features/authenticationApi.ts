import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IAuthResponse, IForgotPass, IForgotPassResponse, ILoginForm, IRegForm, IResetCode, IResetPassForm, IResetPassResponse } from "../../Interfaces";

export const authenticationApi = createApi({
  reducerPath: "authenticationApi",
  baseQuery: fetchBaseQuery({
   baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  endpoints: (builder) => ({
    register: builder.mutation<IAuthResponse,IRegForm>({
      query: (body) => ({
        url: "/api/v1/auth/signup",
        method: "POST",
        body,
      }),
    }),
    login: builder.mutation<IAuthResponse,ILoginForm>({
      query: (body) => ({
        url: "/api/v1/auth/login",
        method: "POST",
        body,
      }),
    }),
    forgotPass: builder.mutation<IForgotPassResponse,IForgotPass>({
      query: (body) => ({
        url: "/api/v1/auth/forgotPasswords",
        method: "POST",
        body,
      }),
    }),
    resetCode: builder.mutation<IForgotPassResponse,IResetCode>({
      query: (body) => ({
        url: "/api/v1/auth/verifyResetCode",
        method: "POST",
        body,
      }),
    }),
    resetPassword: builder.mutation<IResetPassResponse,IResetPassForm>({
      query: (body) => ({
        url: "/api/v1/auth/resetPassword",
        method: "PUT",
        body,
      }),
    }),
    
    
  }),
});

export const {useLoginMutation,useRegisterMutation,useForgotPassMutation,useResetCodeMutation,useResetPasswordMutation} = authenticationApi;
