import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Flowers } from "../../models/flowers";
import { baseUrl } from "../../services/apiService";

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
        getSearchedFlowers: builder.query<FlowersApiResponse, string>({
            query: (searchQuery: string) => `/flowers/search?query=${searchQuery}`,
        })
    }))
});

export const { useGetSearchedFlowersQuery } = flowersApi;