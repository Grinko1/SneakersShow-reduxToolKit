import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSneakers = createAsyncThunk(
  'sneakers/fetchSneakers',
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch('https://61235446d446280017054b06.mockapi.io/items');
      if (!response.ok) {
        throw new Error('Не удалось загрузить товары');
      }
      const data = await response.json();
      console.log(data, 'sneakers');
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
//-------add to cart
export const addToCartFetch = createAsyncThunk(
  'sneakers/addToCartFetch',

  async function (item, { rejectWithValue, dispatch }) {
    try {
      await axios.post('https://61235446d446280017054b06.mockapi.io/cart', item);
      dispatch(addToCart(item));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
//------------remove from cart
export const fetchRemoveFromCart = createAsyncThunk(
    'sneakers/fetchRemoveFromCart',
    async function (id, { rejectWithValue, dispatch }) {
      try {
        const response = await fetch(`https://61235446d446280017054b06.mockapi.io/cart/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Не удалось удалить из корзины ');
        }
        dispatch(removeCart({ id }));
      } catch (error) {
        return rejectWithValue(error.message);
      }
    },
  );
  //-----------load cart
export const fetchSneakersInCart = createAsyncThunk(
  'sneakers/fetchSneakersInCart',
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch('https://61235446d446280017054b06.mockapi.io/cart');
      if (!response.ok) {
        throw new Error('Не удалось загрузить содержимое корзины');
      }
      const data = await response.json();
      console.log(data, 'cart');
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
// ----------------add to favorite
export const addToFavoriteFetch = createAsyncThunk(
    'sneakers/addToFavoriteFetch',
  
    async function (item, { rejectWithValue, dispatch }) {
      try {
        await axios.post('https://61235446d446280017054b06.mockapi.io/favorite', item);
        dispatch(addToFavorite(item));
        
      } catch (error) {
        return rejectWithValue(error.message);
      }
    },
  );
  //-----------removeFavorite
  export const fetchRemoveFromFavorite = createAsyncThunk(
      'sneakers/fetchRemoveFromFavorite',
      async function (id, { rejectWithValue, dispatch }) {
        try {
          const response = await fetch(`https://61235446d446280017054b06.mockapi.io/favorite/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (!response.ok) {
            throw new Error('Не удалoсь удалить из избранного ');
          }
          dispatch(removeFavorite({ id }));
        } catch (error) {
          return rejectWithValue(error.message);
        }
      },
    );
    //------------load favorite
  export const fetchSneakersInFavorite = createAsyncThunk(
    'sneakers/fetchSneakersInFavorite',
    async function (_, { rejectWithValue }) {
      try {
        const response = await fetch('https://61235446d446280017054b06.mockapi.io/favorite');
        if (!response.ok) {
          throw new Error('Не удалось загрузить избранное');
        }
        const data = await response.json();
        console.log(data, 'favorite');
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    },
  );

  // ----------------add order
export const addOrder= createAsyncThunk(
  'sneakers/addOrder',

  async function (cartItem, { rejectWithValue, dispatch }) {
    try {
      await axios.post('https://61235446d446280017054b06.mockapi.io/orders', cartItem);
      dispatch(completeOrder(cartItem))
      
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
//-----------remove order
export const removeOrder = createAsyncThunk(
    'sneakers/removeOrder',
    async function (id, { rejectWithValue, dispatch }) {
      try {
        const response = await fetch(`https://61235446d446280017054b06.mockapi.io/orders/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Не удалoсь удалить заказ ');
        }
        dispatch(deleteOrder({ id }));
      } catch (error) {
        return rejectWithValue(error.message);
      }
    },
  );
  //------------load orders
export const loadOrders = createAsyncThunk(
  'sneakers/loadOrders',
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch('https://61235446d446280017054b06.mockapi.io/orders');
      if (!response.ok) {
        throw new Error('Не удалось загрузить заказы');
      }
      const data = await response.json();
      console.log(data, 'orders');
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  sneakers: [],
  cartItem: [],
  favorite: [],
  orders:[],
  status: null,
  error: null,
  cartStatus: null,
  cartError: null,
  fetchCartStatus: null,
  fetchCartError: null,
  removeCartStatus: null,
  removeCartError: null,
  fetchFavoriteStatus:null,
  fetchFAvoriteError: null,
  orderStatus:null,
  orderError: null
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      state.cartItem.push(action.payload);
    },
    addToFavorite(state, action) {
      state.favorite.push(action.payload);
    },
    removeCart(state, action) {
      state.cartItem = state.cartItem.filter((item) => item.id !== action.payload.id);
    },
    removeFavorite(state, action) {
      state.favorite = state.favorite.filter((item) => item.id !== action.payload.id);
    },
    completeOrder (state,action) {
      state.cartItem = []
      state.orders.push(action.payload)
    },
   deleteOrder(state, action) {
      state.orders = state.orders.filter((item) => item.id !== action.payload.id);
    },
  },
  extraReducers: {
      //-----load sneakers
    [fetchSneakers.pending]: (state, action) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchSneakers.fulfilled]: (state, action) => {
      state.status = 'success';
      state.sneakers = action.payload;
    },
    [fetchSneakers.rejected]: (state, action) => {
      state.status = 'error';
      state.error = action.payload;
    },
    //----add to cart
    [addToCartFetch.pending]: (state, action) => {
      state.cartStatus = 'loading';
      state.cartError = null;
    },
    [addToCartFetch.fulfilled]: (state, action) => {
      state.cartStatus = 'success';
    },
    [addToCartFetch.rejected]: (state, action) => {
      state.cartStatus = 'error';
      state.cartError = action.payload;
    },
    //-----load cart 
    [fetchSneakersInCart.pending]: (state, action) => {
      state.fetchCartStatus = 'loading';
      state.fetchCartError = null;
    },
    [fetchSneakersInCart.fulfilled]: (state, action) => {
      state.fetchCartStatus = 'success';
      state.cartItem = action.payload;
    },
    [fetchSneakersInCart.rejected]: (state, action) => {
      state.fetchCartStatus = 'error';
      state.fetchCartError = action.payload;
    },
    //------remove from cart
    [fetchRemoveFromCart.pending]: (state, action) => {
      state.removeCartStatus = 'loading';
      state.removeCartError = null;
    },
    [fetchRemoveFromCart.fulfilled]: (state, action) => {
      state.removeCartStatus = 'success';
    },
    [fetchRemoveFromCart.rejected]: (state, action) => {
      state.removeCartStatus = 'error';
      state.removeCartError = action.payload;
    },
    //-------favorite
    //-----add to favorite
    [addToFavoriteFetch.pending]: (state, action) => {
        state.fetchFavoriteStatus = 'loading';
        state.fetchFAvoriteError = null;
      },
      [addToFavoriteFetch.fulfilled]: (state, action) => {
        state.fetchFavoriteStatus = 'success';
      },
      [addToFavoriteFetch.rejected]: (state, action) => {
        state.fetchFavoriteStatus = 'error';
        state.fetchFAvoriteError = action.payload;
      },
      //----------load favorite
      [fetchSneakersInFavorite.pending]: (state, action) => {
        state.fetchFavoriteStatus = 'loading';
        state.fetchFAvoriteError = null;
      },
      [fetchSneakersInFavorite.fulfilled]: (state, action) => {
        state.fetchFavoriteStatus = 'success';
        state.favorite = action.payload;
      },
      [fetchSneakersInFavorite.rejected]: (state, action) => {
        state.fetchFavoriteStatus = 'error';
        state.fetchFAvoriteError = action.payload;
      },
      //--------remove favorite
      [fetchRemoveFromFavorite.pending]: (state, action) => {
        state.fetchFavoriteStatus = 'loading';
        state.fetchFAvoriteError = null;
      },
      [fetchRemoveFromFavorite.fulfilled]: (state, action) => {
        state.fetchFavoriteStatus = 'success';
      },
      [fetchRemoveFromFavorite.rejected]: (state, action) => {
        state.fetchFavoriteStatus = 'error';
        state.fetchFAvoriteError = action.payload;
      },
      ///-------orders
         //-----add order
    [addOrder.pending]: (state, action) => {
      state.orderStatus = 'loading';
      state.orderError = null;
    },
    [addOrder.fulfilled]: (state, action) => {
      state.orderStatus = 'success';
    },
    [addOrder.rejected]: (state, action) => {
      state.orderStatus = 'error';
      state.orderError = action.payload;
    },
    //----------load order
    [loadOrders.pending]: (state, action) => {
      state.orderStatus = 'loading';
      state.orderError = null;
    },
    [loadOrders.fulfilled]: (state, action) => {
      state.orderStatus = 'success';
      state.order = action.payload;
    },
    [loadOrders.rejected]: (state, action) => {
      state.orderStatus = 'error';
      state.orderError = action.payload;
    },
    //--------remove favorite
    [removeOrder.pending]: (state, action) => {
      state.orderStatus = 'loading';
      state.orderError = null;
    },
    [removeOrder.fulfilled]: (state, action) => {
      state.orderStatus = 'success';
    },
    [removeOrder.rejected]: (state, action) => {
      state.orderStatus = 'error';
      state.orderError = action.payload;
    },

  },
});

export default cartSlice.reducer;

export const { addToCart, addToFavorite, removeCart, removeFavorite,completeOrder ,deleteOrder} = cartSlice.actions;
