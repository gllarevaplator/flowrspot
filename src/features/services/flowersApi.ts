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
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers): Headers => {
      const token = localStorage.getItem("user-token");
      if (token) {
        headers.set("Authorization", token);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getFlowers: builder.query<
      FlowersApiResponse,
      { searchQuery: string; page: number }
    >({
      query: ({ searchQuery, page }) =>
        `/flowers/search?query=${searchQuery}&page=${page}`,
      providesTags: [{ type: "Flowers", id: "LIST" }],
    }),
  }),
});

export const { useGetFlowersQuery } = flowersApi;
