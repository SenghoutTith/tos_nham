import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const server_url = import.meta.env.VITE_SERVER_URL

const baseQuery = fetchBaseQuery({ baseUrl: `${server_url}` })

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: baseQuery,
    tagTypes: [],
    endpoints: (builder) => ({})
})