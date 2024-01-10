import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/AuthSlice"
import productReducer from "./features/auth/ProductSlice"
import { productApiSlice } from "./features/auth/productApiSlice";
import { apiSlice } from "./features/auth/ApiSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        [productApiSlice.reducerPath]: productApiSlice.reducer
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productApiSlice.middleware),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

export default store