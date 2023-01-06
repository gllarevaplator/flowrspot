import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Flower from "../../models/flowers";
import baseUrl from "./baseUrl";

interface FlowersApiResponse {
  flowers: Flower[];
  meta: {
    pagination: {
      current_page: number;
      prev_page: number | null;
      next_page: number | null;
      total_pages: number;
    };
  };
}

export const flowersApi = createApi({
  reducerPath: "flowersApi",
  tagTypes: ["Flowers"],
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getFlowers: builder.query<FlowersApiResponse, number>({
      query: (pageNumber: number) => `/flowers?page=${pageNumber}`,
      providesTags: [{ type: "Flowers", id: "LIST" }],
    }),
    getSearchedFlowers: builder.query<FlowersApiResponse, string>({
      query: (searchQuery: string) => `/flowers/search?query=${searchQuery}`,
    }),
  }),
});

export const { useGetFlowersQuery, useGetSearchedFlowersQuery } = flowersApi;
