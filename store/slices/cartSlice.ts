import { CartProduct } from "@/types/product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  items: CartProduct[];
}

const initialState: InitialState = {
  items: [],
};

interface CartItemKey {
  id: string;
  size: string;
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartProduct>) => {
      const product = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === product.id && item.size === product.size,
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.unshift({ ...product, quantity: 1 });
      }
    },

    removeFromCart: (state, action: PayloadAction<CartItemKey>) => {
      const { id, size } = action.payload;
      state.items = state.items.filter(
        (item) => !(item.id === id && item.size === size),
      );
    },

    decreaseQuantity: (state, action: PayloadAction<CartItemKey>) => {
      const { id, size } = action.payload;
      const item = state.items.find(
        (item) => item.id === id && item.size === size,
      );

      if (!item) {
        console.log("No");
        return;
      }

      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.items = state.items.filter(
          (item) => !(item.id === id && item.size === size),
        );
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
