import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseUrl from "./baseUrl";
import { Sightings } from "../../models/sightings";

interface SightingsApiResponse {
  sightings: Sightings[];
  meta: {
    pagination: {
      current_page: number;
      prev_page: number | null;
      next_page: number | null;
      total_pages: number;
    };
  };
}

export const sightingsApi = createApi({
  reducerPath: "sightingsApi",
  tagTypes: ["Sightings"],
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
    getSightings: builder.query<SightingsApiResponse, number>({
      query: (pageNumber: number) => `/sightings?page=${pageNumber}`,
      providesTags: [{ type: "Sightings", id: "LIST" }],
    }),
    createSighting: builder.mutation<Sightings[], FormData>({
      query(body: FormData) {
        return {
          url: "/sightings",
          method: "POST",
          body,
        };
      },
      invalidatesTags: [{ type: "Sightings", id: "LIST" }],
    }),
  }),
});

export const { useGetSightingsQuery, useCreateSightingMutation } = sightingsApi;
