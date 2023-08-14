import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface OrderState {
  loading: boolean;
  error: string | null;
  currentOrder: any;
}

const initialState: OrderState = {
  loading: true,
  error: null,
  currentOrder: null,
};

export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async (params: { jwt: string; orderId: string }, thunkAPI) => {
    const { data } = await axios.post(
      `http://123.56.149.216:8080/api/orders/${params.orderId}/placeOrder`,
      null,
      {
        headers: {
          Authorization: `bearer ${params.jwt}`,
        },
      }
    );
    return data;
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: {
    [placeOrder.pending.type]: (state) => {
      state.loading = true;
    },
    [placeOrder.fulfilled.type]: (state, action) => {
      state.currentOrder = action.payload;
      state.error = null;
      state.loading = false;
    },
    [placeOrder.rejected.type]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});
