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
  sizeId: number;
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartProduct>) => {
      const product = action.payload;
      const existingItem = state.items.find(
        (item) =>
          item.id === product.id && item.sizes[0].id === product.sizes[0].id,
      );

      if (existingItem) {
        if (existingItem.quantity < existingItem.sizes[0].stock) {
          existingItem.quantity += 1;
        }
      } else {
        state.items.unshift({ ...product, quantity: 1 });
      }
    },

    setCart: (state, action: PayloadAction<CartProduct[]>) => {
      state.items = action.payload;
    },

    removeFromCart: (state, action: PayloadAction<CartItemKey>) => {
      const { id, sizeId } = action.payload;
      state.items = state.items.filter(
        (item) => !(item.id === id && item.sizes[0].id === sizeId),
      );
    },

    decreaseQuantity: (state, action: PayloadAction<CartItemKey>) => {
      const { id, sizeId } = action.payload;
      const item = state.items.find(
        (item) => item.id === id && item.sizes[0].id === sizeId,
      );

      if (!item) {
        console.log("No");
        return;
      }

      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.items = state.items.filter(
          (item) => !(item.id === id && item.sizes[0].id === sizeId),
        );
      }
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  setCart,
  removeFromCart,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
