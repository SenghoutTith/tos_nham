import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: JSON.parse(localStorage.getItem("cartData")) || [],
        totalPrice: JSON.parse(localStorage.getItem("totalPrice")) || 0,
        totalAmount: JSON.parse(localStorage.getItem("totalAmount")) || 0,
    },
    reducers: {
        addToCart: (state, action) => {
            const productID = action.payload
            console.log(productID);
            const existItem = state.cart.find((item) => item.id === productID.id)
            if (existItem) {
                existItem.amount++
                existItem.total += productID.price
                state.totalAmount++
                state.totalPrice += productID.price
            } else {
                state.cart.push(
                    {
                        id: productID.id,
                        amount: 1,
                        total: productID.price,
                        price: productID.price,
                        name: productID.name,
                        image: productID.image,
                    }
                )
                state.totalAmount++
                state.totalPrice += productID.price
            }
            const saveState = JSON.stringify(state.cart)
            const saveTotal = JSON.stringify(state.totalPrice)
            const saveAmount = JSON.stringify(state.totalAmount)

            localStorage.setItem("cartData", saveState)
            localStorage.setItem("totalPrice", saveTotal)
            localStorage.setItem("totalAmount", saveAmount)
        },
        decreaseAmount: (state, action) => {
            const productID = action.payload
            const existItem = state.cart.find((item) => item.id === productID)
            if (existItem.amount === 1) {
                state.cart = state.cart.filter((item) => item.id !== productID)
                state.totalAmount--
                state.totalPrice -= existItem.price
            } else {
                existItem.amount--
                existItem.total -= existItem.price
                state.totalAmount--
                state.totalPrice -= existItem.price
            }
            const saveState = JSON.stringify(state.cart)
            const saveAmount = JSON.stringify(state.totalAmount)
            const saveTotal = JSON.stringify(state.totalPrice)

            localStorage.setItem("cartData", saveState)
            localStorage.setItem("totalPrice", saveTotal)
            localStorage.setItem("totalAmount", saveAmount)
        },
        increaseAmount: (state, action) => {
            const productID = action.payload
            const existItem = state.cart.find((item) => item.id === productID)
            existItem.amount++
            existItem.total += existItem.price
            state.totalAmount++
            state.totalPrice += existItem.price

            const saveState = JSON.stringify(state.cart)
            const saveTotal = JSON.stringify(state.totalPrice)
            const saveAmount = JSON.stringify(state.totalAmount)

            localStorage.setItem("cartData", saveState)
            localStorage.setItem("totalPrice", saveTotal)
            localStorage.setItem("totalAmount", saveAmount)
        },
        removeFromCart: (state, action) => {
            const productID = action.payload
            const existItem = state.cart.find((item) => item.id === productID)
            state.cart = state.cart.filter((item) => item.id !== productID)
            state.totalAmount -= existItem.amount
            state.totalPrice -= existItem.total
            const saveState = JSON.stringify(state.cart)
            const saveTotal = JSON.stringify(state.totalPrice)
            const saveAmount = JSON.stringify(state.totalAmount)

            localStorage.setItem("cartData", saveState)
            localStorage.setItem("totalPrice", saveTotal)
            localStorage.setItem("totalAmount", saveAmount)
        }
    }
})

export const { addToCart, increaseAmount, decreaseAmount, removeFromCart } = cartSlice.actions

export default cartSlice.reducer