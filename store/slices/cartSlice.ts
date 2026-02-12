import { Product } from "@/types/product";
import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  items: Product[];
}

const initialState: InitialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },

    removeFromCart: (state, action) => {
      const product = action.payload;
      state.items = state.items.filter((item) => item.id !== product);
    },

    decreaseQuantity: (state, action) => {
      const product = action.payload;
      const item = state.items.find((item) => item.id === product);

      if (!item) {
        console.log("No");
        return;
      }

      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.items = state.items.filter((item) => item.id !== product);
      }
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, decreaseQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
