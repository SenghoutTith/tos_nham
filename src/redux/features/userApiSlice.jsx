import { apiSlice } from "./ApiSlice";

const server_url = import.meta.env.VITE_SERVER_URL

const user_url = `${server_url}/api/user`

const payment_url = `${server_url}/api/payment`

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: () => ({
                url: `${user_url}`,
                method: "GET",
            }),
        }),
        login: builder.mutation({
            query: (data) => ({
                url: `${user_url}/login`,
                method: "POST",
                credentials: 'include',
                body: data
            }),
            invalidatesTags: ['User']
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${user_url}/logout`,
                method: "GET",
                credentials: 'include'
            })
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${user_url}/register`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ['User']
        }),
        update: builder.mutation({
            query: (data) => ({
                url: `${user_url}/updateuser`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ['User']
        }),
        updatePhoto: builder.mutation({
            query: (data) => ({
                url: `${user_url}/updateuserphoto`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ['User']
        }),
        //get user profile
        getProfile: builder.query({
            query: () => ({
                url: `${user_url}/getuserprofile`,
                method: "GET",
            }),
            providesTags: ['User']
        }),
        addToCart: builder.mutation({
            query: (data) => ({
                url: `${user_url}/add-to-cart`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ['User']
        }),
        increaseCartAmount: builder.mutation({
            query: (data) => ({
                url: `${user_url}/increase-cart-amount`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ['User']
        }),
        decreaseCartAmount: builder.mutation({
            query: (data) => ({
                url: `${user_url}/decrease-cart-amount`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ['User']
        }),
        //delete cart item
        deleteCartItem: builder.mutation({
            query: (productId) => ({
                url: `${user_url}/delete-cart-items/${productId}`,
                method: "DELETE",
            }),
            invalidatesTags: ['User']
        }),

        //payment
        payment: builder.mutation({
            query: (data) => ({
                url: `${user_url}/payment`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ['User']
        }),

        //update payment status
        updatePaymentStatus: builder.mutation({
            query: (data) => ({
                url: `${user_url}/update-payment-status`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ['User']
        }),

        //transfer payment to delivery man
        transferPaymentToDeliveryMan: builder.mutation({
            query: (data) => ({
                url: `${user_url}/transfer-payment-to-deliveryman`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ['User']
        }),

        //update payment status by delivery man
        updatePaymentStatusByDeliveryMan: builder.mutation({
            query: (data) => ({
                url: `${user_url}/update-payment-status-by-deliveryman`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ['User']
        }),

        //update deliveryman working staus
        updateDeliveryManWorkingStatus: builder.mutation({
            query: (data) => ({
                url: `${user_url}/update-working-status`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ['User']
        }),

        //get all payments
        getAllPayments: builder.query({
            query: () => ({
                url: `${payment_url}`,
                method: "GET",
            }),
            providesTags: ['Payment']
        }),

        //super admin update user's role
        updateRole: builder.mutation({
            query: (data) => ({
                url: `${user_url}/update-user-role`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ['User']
        }),

        //super admin update deliveryman's status
        updateDeliveryManStatus: builder.mutation({
            query: (data) => ({
                url: `${user_url}/update-deliveryman-working-status`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ['User']
        }),

        addBrand: builder.mutation({
            query: (data) => ({
                url: `${user_url}/add-brand`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ['User']
        })

    })
})


export const {
    useGetAllUsersQuery,
    useLoginMutation, 
    useLogoutMutation, 
    useRegisterMutation, 
    useUpdateMutation, 
    useUpdatePhotoMutation,
    useGetProfileQuery,
    useAddToCartMutation,
    useIncreaseCartAmountMutation,
    useDecreaseCartAmountMutation,
    useDeleteCartItemMutation,
    usePaymentMutation,
    useUpdatePaymentStatusMutation,
    useTransferPaymentToDeliveryManMutation,
    useUpdatePaymentStatusByDeliveryManMutation,
    useUpdateDeliveryManWorkingStatusMutation,
    useGetAllPaymentsQuery,
    useUpdateRoleMutation,
    useUpdateDeliveryManStatusMutation,
    useAddBrandMutation
} = userApiSlice