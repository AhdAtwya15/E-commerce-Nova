import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { ILoggedUserResponse, IUpdatePassword, IUpdateProfileData} from '../../Interfaces'

import type { RootState } from '../store';

export const loggedUserApi = createApi({
  reducerPath: 'loggedUserApi',
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
  tagTypes: ["LoggedUser"],
  
  endpoints: (build) => ({
    getUserData: build.query<ILoggedUserResponse,string>({
      query: (_token) => {
       
        void _token;
        return `/api/v1/users/getMe`;
      },
   providesTags: ["LoggedUser"],
    }),
    updateUserPassword: build.mutation<void, IUpdatePassword>({
      query: (body) => ({
        url: "/api/v1/users/changeMyPassword",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["LoggedUser"],
    }),
    updateUserData: build.mutation<void, IUpdateProfileData>({
      query: (body) => ({
        url: "/api/v1/users/updateMe",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["LoggedUser"],
    }),
    
    deletUserAccount: build.mutation<void, void>({
      query: () => ({
        url: `/api/v1/users/deleteMe`,
        method: "DELETE",
      }),
      invalidatesTags: ["LoggedUser"],
    }),



  })
});

export const {useGetUserDataQuery,useUpdateUserDataMutation,useUpdateUserPasswordMutation,useDeletUserAccountMutation } = loggedUserApi;