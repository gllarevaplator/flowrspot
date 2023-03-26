import baseUrl from "./baseUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export interface Favorite {
  id: number;
  user_id: number;
  flower: {
    id: number;
    name: string;
    latin_name: string;
    sightings: number;
    profile_picture: string;
    favorite: boolean;
  };
}

interface FavoriteFlower {
  id: number;
  name: string;
  latin_name: string;
  sightings: number;
  profile_picture: string;
  favorite: boolean;
}

interface FavoritesApiResponse {
  fav_flowers: Favorite[];
  meta: {
    pagination: {
      current_page: number;
      prev_page: number | null;
      next_page: number | null;
      total_pages: number;
    };
  };
}

export const favoritesApi = createApi({
  reducerPath: "favoritesApi",
  tagTypes: ["Favorites"],
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers): Headers => {
      const token = localStorage.getItem("user-token");
      if (token) {
        headers.set("Authorization", token);
        headers.set("Content-Type", "application/json");
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getFavorites: builder.query<FavoritesApiResponse, number>({
      query: (page: number) => `/flowers/favorites?page=${page}`,
      providesTags: [{ type: "Favorites", id: "LIST" }],
    }),
    markFavoriteFlower: builder.mutation<
      FavoriteFlower,
      { flower_id: number; flower: FavoriteFlower }
    >({
      query({ flower_id, flower }) {
        return {
          url: `/flowers/${flower_id}/favorites`,
          method: "POST",
          body: flower,
        };
      },
      invalidatesTags: (result, error, { flower_id }) => [
        { type: "Favorites", flower_id },
      ],
    }),
    deleteFavoriteFlower: builder.mutation<
      Favorite,
      { flower_id: number; id: number }
    >({
      query({ flower_id, id }: { flower_id: number; id: number }) {
        return {
          url: `/flowers/${flower_id}/favorites/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [{ type: "Favorites", id: "LIST" }],
    }),
  }),
});

export const {
  useLazyGetFavoritesQuery,
  useMarkFavoriteFlowerMutation,
  useDeleteFavoriteFlowerMutation,
} = favoritesApi;
