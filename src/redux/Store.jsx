import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/UserSlice"
import productReducer from "./features/ProductSlice"
import { productApiSlice } from "./features/productApiSlice";
import { apiSlice } from "./features/ApiSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        product: productReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        [productApiSlice.reducerPath]: productApiSlice.reducer
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productApiSlice.middleware),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

export default store