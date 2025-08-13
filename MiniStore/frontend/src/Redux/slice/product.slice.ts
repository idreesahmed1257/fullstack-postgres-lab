import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../utils/interfaces";

interface CartItemState {
  qty: number;
  id: string | number;
  thumbnail: string;
  title: string;
  price: number;
  description: string;
}

interface CartState {
  cartItems: CartItemState[];
}

const initialState: CartState = {
  cartItems: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetCart(state: CartState) {
      state.cartItems = [];
    },
    addItem(state: CartState, action: PayloadAction<{ product: Product }>) {
      const existingIndex = state.cartItems.findIndex((item) => item.id === action.payload.product.id);

      if (existingIndex !== -1) {
        state.cartItems = state.cartItems.filter((item) => item.id !== action.payload.product.id);
      } else {
        state.cartItems.push({
          qty: 1,
          ...action.payload.product,
        });
      }
    },

    increaseQty(state: CartState, action: PayloadAction<{ productId: number }>) {
      const item = state.cartItems.find((item) => item.id === action.payload.productId);
      if (item) {
        item.qty += 1;
      }
    },
    decreaseQty(state: CartState, action: PayloadAction<{ productId: number }>) {
      const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.productId);

      if (itemIndex !== -1) {
        if (state.cartItems[itemIndex].qty > 1) {
          state.cartItems[itemIndex].qty -= 1;
        } else {
          state.cartItems.splice(itemIndex, 1); // remove from cart
        }
      }
    },
  },
});

export const { resetCart, addItem, increaseQty, decreaseQty } = productSlice.actions;

export default productSlice.reducer;
