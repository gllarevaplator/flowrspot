import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Post {
    userId: number;
    id: number;
    title: string; 
    body: string;
};

export const postsApi = createApi({
    reducerPath: 'postsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com'}),
    endpoints: (builder) => ({
        getAllPosts: builder.query<Post[], string>({
            query: (endpoint) => `${endpoint}`,
        }),
        getPostById: builder.query<Post, number>({
            query: (id) => `/posts/${id}`,
        })
    })
});

export const { useGetAllPostsQuery, useGetPostByIdQuery } = postsApi;


// export const pokemonApi = createApi({
//     reducerPath: 'pokemonApi',
//     baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
//     endpoints: (builder) => ({
//       getPokemonByName: builder.query<Pokemon, string>({
//         query: (name) => `pokemon/${name}`,
//       }),
//     }),
//   })
  
//   // Export hooks for usage in functional components, which are
//   // auto-generated based on the defined endpoints
//   export const { useGetPokemonByNameQuery } = pokemonApi






// export const {useGet}


// interface Posts {
//     userId: number;
//     id: number;
//     title: string;
//     body: string;
// }

// // Define an API Slice 
// // export const postsApi = createApi({
// //     reducerPath: 'postsApi',
// //     baseQuery: fetchBaseQuery({
// //         baseUrl: 'https://jsonplaceholder.typicode.com/',
// //         // prepareHeaders((headers) => {
// //         //     headers.set('x.api-key', API_KEY)
// //         //     return Headers;
// //         // }) 
// //     }),
// //     endpoints: (builder) => {
// //         return {
// //             fetchPosts: builder.query<Posts[], number|void> ({ 
// //                 query(() => '/posts')
// //              })
// //         }
// //     }
// // });