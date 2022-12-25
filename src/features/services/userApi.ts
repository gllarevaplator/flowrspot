import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { User } from '../user/userSlice';

export const authApi = createApi({
    reducerPath: 'authApi', 
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://flowrspot-api.herokuapp.com/api/v1',
    }),
    endpoints: (builder) => ({
        setUserCredentials: builder.mutation({
            query: (body: {email: string, password: string}) => {
                return {
                    url: '/users/login',
                    method: 'post',
                    body
                }
            }, 
        }),
        getUserInfo: builder.query<User, number>({
            query: (userId: number) => `/users/${userId}`,
        })
    })
});

export const { useSetUserCredentialsMutation, useLazyGetUserInfoQuery } = authApi;