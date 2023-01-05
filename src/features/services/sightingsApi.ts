import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseUrl from "./baseUrl";
import {Sightings} from '../../models/sightings';

interface SightingsApiResponse {
    sightings: Sightings[], 
    meta: {
        pagination: {
            current_page: number,
            prev_page: number | null,
            next_page: number | null,
            total_pages: number,
        }
    }
}

export const sightingsApi = createApi({
    reducerPath: 'sightingsApi',
    tagTypes: ['Sightings'],
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder => ({
        getSightings: builder.query<SightingsApiResponse, string>({
            query: (endpoint: string) => `${endpoint}`,
            providesTags: [{ type: 'Sightings', id: 'LIST'}]
        }),
        createSighting: builder.mutation({
            query(body) {
                return {
                    url: '/sightings',
                    headers: {
                        Authorization: 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo4Mzg4LCJleHAiOjE2NzI1NzkyMjV9.pRGPPMLq0RIBzp2oJKIxpg8-uLqm_tRopGfjbAP2dP8',
                        'Content-Type': `multipart/form-data`,
                    },  
                    method: 'POST', 
                    body,
                }
            },
            invalidatesTags: [{ type: 'Sightings', id: 'LIST' }],
        })
    }))
});

export const { useGetSightingsQuery, useCreateSightingMutation } = sightingsApi;
