import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Flowers } from "../../../models/flowers";
import { baseUrl } from "../../../services/apiService";

interface FlowersApiResponse {
    flowers: Flowers[], 
    meta: {
        pagination: {
            current_page: number,
            prev_page: number | null,
            next_page: number | null,
            total_pages: number,
        }
    }
}

export const flowersApi = createApi({
    reducerPath: 'flowersApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder => ({
        getAllFlowers: builder.query<FlowersApiResponse, string>({
            query: (endpoint) => `${endpoint}`,
        }),
        getFlower: builder.query<Flowers, number>({
            query: (id) => `flowers/${id}`,
        }),
        getSearchedFlowers: builder.query<Flowers[] | Flowers, string>({
            query: (searchQuery) => `/flowers/search?query=${searchQuery}`,
        })
    }))
});

export const { useGetAllFlowersQuery, useGetSearchedFlowersQuery } = flowersApi;

