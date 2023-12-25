import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tracksApi = createApi({
    reducerPath: "tracksReducer",
    baseQuery: fetchBaseQuery({
      baseUrl: "https://skypro-music-api.skyeng.tech/catalog/",
    }),
    endpoints: (builder) => ({
      getAllTracks: builder.query({
        query: () => "tracksReducer"
      }),
    }),
  });
  
  export const { useGetAllTracksQuery } = tracksReducer;