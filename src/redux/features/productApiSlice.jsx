import { apiSlice } from "./ApiSlice";

const server_url = import.meta.env.VITE_SERVER_URL

const product_api = `${server_url}/api/product`

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProduct: builder.query({
            query: () => `${product_api}`,
            providesTags: ['Product']
        }),

        createProduct: builder.mutation({
            query: (data) => ({
                url: `${product_api}`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ['Product']
        }),

        updateProduct: builder.mutation({
            query: (data) => ({
                url: `${product_api}/update/${data._id}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ['Product']
        }),

        deleteProduct: builder.mutation({
           query: (id) => ({
               url: `${product_api}/delete/${id}`,
               method: "DELETE"
           }),
           invalidatesTags: ['Product']
        }),

        getProductById: builder.query({
            query: (id) => `${product_api}/${id}`,
        }),

    })
})

export const { useGetProductQuery, useCreateProductMutation, useUpdateProductMutation, useDeleteProductMutation ,useGetProductByIdQuery } = productApiSlice