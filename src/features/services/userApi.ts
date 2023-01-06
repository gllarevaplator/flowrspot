import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserProps } from "../user/userSlice";
import baseUrl from "./baseUrl";

interface UserLoginProps {
  email: string;
  password: string;
}

interface UserRegisterProps {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  date_of_birth: string | Date;
}

interface AuthResponse {
  auth_token: string;
}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    setUserLoginCredentials: builder.mutation<AuthResponse, UserLoginProps>({
      query: (body: UserLoginProps) => {
        return {
          url: "/users/login",
          method: "post",
          body,
        };
      },
    }),
    setUserRegisterCredentials: builder.mutation<
      AuthResponse,
      UserRegisterProps
    >({
      query: (body: UserRegisterProps) => {
        return {
          url: "/users/register",
          method: "post",
          body,
        };
      },
    }),
    getUserInfo: builder.query<UserProps, number>({
      query: (userId: number) => `/users/${userId}`,
    }),
  }),
});

export const {
  useSetUserLoginCredentialsMutation,
  useSetUserRegisterCredentialsMutation,
  useLazyGetUserInfoQuery,
} = userApi;
