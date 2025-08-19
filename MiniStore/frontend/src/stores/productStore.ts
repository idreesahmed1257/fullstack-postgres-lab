import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../utils/interfaces';

interface CartItem {
  qty: number;
  id: string | number;
  thumbnail: string;
  title: string;
  price: number;
  description: string;
}

interface ProductState {
  cartItems: CartItem[];
}

interface ProductActions {
  resetCart: () => void;
  addItem: (product: Product) => void;
  increaseQty: (productId: number) => void;
  decreaseQty: (productId: number) => void;
}

type ProductStore = ProductState & ProductActions;

export const useProductStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      // Initial state
      cartItems: [],

      // Actions
      resetCart: () => {
        set({ cartItems: [] });
      },

      addItem: (product: Product) => {
        const { cartItems } = get();
        const existingIndex = cartItems.findIndex((item) => item.id === product.id);

        if (existingIndex !== -1) {
          // Remove item if it already exists (toggle behavior)
          set({
            cartItems: cartItems.filter((item) => item.id !== product.id),
          });
        } else {
          // Add new item
          set({
            cartItems: [
              ...cartItems,
              {
                qty: 1,
                ...product,
              },
            ],
          });
        }
      },

      increaseQty: (productId: number) => {
        const { cartItems } = get();
        const updatedItems = cartItems.map((item) =>
          item.id === productId ? { ...item, qty: item.qty + 1 } : item
        );
        set({ cartItems: updatedItems });
      },

      decreaseQty: (productId: number) => {
        const { cartItems } = get();
        const itemIndex = cartItems.findIndex((item) => item.id === productId);

        if (itemIndex !== -1) {
          if (cartItems[itemIndex].qty > 1) {
            // Decrease quantity
            const updatedItems = [...cartItems];
            updatedItems[itemIndex] = { ...updatedItems[itemIndex], qty: updatedItems[itemIndex].qty - 1 };
            set({ cartItems: updatedItems });
          } else {
            // Remove item if quantity is 1
            set({
              cartItems: cartItems.filter((item) => item.id !== productId),
            });
          }
        }
      },
    }),
    {
      name: 'product-storage',
      partialize: (state) => ({
        cartItems: state.cartItems,
      }),
    }
  )
);
