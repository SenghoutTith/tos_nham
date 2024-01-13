import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const server_url = import.meta.env.VITE_SERVER_URL

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ 
        baseUrl: server_url,
        prepareHeaders(headers) {
            return headers;
        },
        credentials: "include"
    }),
    tagTypes: ["User", "Payment", "Product"],
    endpoints: (builder) => ({})
})