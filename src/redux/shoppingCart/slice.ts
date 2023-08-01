import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface ShoppingCartState {
  loading: boolean;
  error: string | null;
  items: any[];
}

const initialState: ShoppingCartState = {
  loading: true,
  error: null,
  items: [],
};

export const getShoppingCart = createAsyncThunk(
  "shoppingCart/getShoppingCart",
  async (jwt: string, thunkAPI) => {
    const { data } = await axios.get(
      "http://123.56.149.216:8080/api/shoppingCart",
      {
        headers: {
          Authorization: `bear ${jwt}`,
        },
      }
    );
    return data.shoppingCartItems;
  }
);

export const addShoppingCartItem = createAsyncThunk(
  "shoppingCart/addShoppingCartItem",
  async (params: { jwt: string; touristRouteId: string }, thunkAPI) => {
    const { data } = await axios.post(
      `http://123.56.149.216:8080/api/shoppingCart/items`,
      {
        touristRouteId: params.touristRouteId,
      },
      {
        headers: {
          Authorization: `bear ${params.jwt}`,
        },
      }
    );
    return data.shoppingCartItems;
  }
);

export const clearShoppingCartItem = createAsyncThunk(
  "shoppingCart/clearShoppingCartItem",
  async (params: { jwt: string; itemIds: number[] }, thunkAPI) => {
    return await axios.delete(
      `http://123.56.149.216:8080/api/shoppingCart/items/(${params.itemIds.join(
        ","
      )})`,
      {
        headers: {
          Authorization: `bear ${params.jwt}`,
        },
      }
    );
  }
);

export const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {},
  extraReducers: {
    [getShoppingCart.pending.type]: (state) => {
      state.loading = true;
    },
    [getShoppingCart.fulfilled.type]: (state, action) => {
      state.items = action.payload;
      state.error = null;
      state.loading = false;
    },
    [getShoppingCart.rejected.type]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    [addShoppingCartItem.pending.type]: (state) => {
      state.loading = true;
    },
    [addShoppingCartItem.fulfilled.type]: (state, action) => {
      state.items = action.payload;
      state.error = null;
      state.loading = false;
    },
    [addShoppingCartItem.rejected.type]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    [clearShoppingCartItem.pending.type]: (state) => {
      state.loading = true;
    },
    [clearShoppingCartItem.fulfilled.type]: (state) => {
      state.items = [];
      state.error = null;
      state.loading = false;
    },
    [clearShoppingCartItem.rejected.type]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});
