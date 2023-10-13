import { createSlice } from '@reduxjs/toolkit'

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: []
  },
  reducers: {
    addToCart: (state, action) => {
      const itemsPresents = state.cart.find(
        item => item.id === action.payload.id
      )
      if (itemsPresents) {
        itemsPresents.quantity += 1
      } else {
        state.cart.push({ ...action.payload, quantity: 1 })
      }
    },
    removeFromCart: (state, action) => {
      const removeItem = state.cart.filter(
        (item, ind) => item.id !== action.payload.id
      )
      state.cart = removeItem
    },
    incrementQuantity: (state, action) => {
      const itemsPresents = state.cart.find(
        item => item.id === action.payload.id
      )
      itemsPresents.quantity += 1
    },
    decrementQuantity: (state, action) => {
      const itemsPresents = state.cart.find(
        item => item.id === action.payload.id
      )
      if (itemsPresents.quantity === 1) {
        itemsPresents.quantity = 0
        const removeItem = state.cart.filter(
          (item, ind) => item.id !== action.payload.id
        )
        state.cart = removeItem
      } else {
        itemsPresents.quantity -= 1
      }
    },
    clearCart: state => {
      state.cart = []
    }
  }
})

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart
} = CartSlice.actions

export default CartSlice.reducer;