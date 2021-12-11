import { configureStore } from '@reduxjs/toolkit';
import sneakersReducer from '../features/sneakers/sneakersSlice'
import cartReducer from '../features/cart/cartSlice'

export const store = configureStore({
  reducer: {
    sneakers: sneakersReducer,
    cart : cartReducer

  },
});
