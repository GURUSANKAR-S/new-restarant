"use client";

import { createContext, useContext, useReducer, useEffect } from "react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | {
      type: "ADD_ITEM";
      payload: { id: number; name: string; price: number; image: string };
    }
  | { type: "REMOVE_ITEM"; payload: { id: number } }
  | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
  | { type: "CLEAR_CART" };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM":
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );
      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }
      return {
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    case "REMOVE_ITEM":
      return {
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    case "UPDATE_QUANTITY":
      return {
        items: state.items
          .map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: action.payload.quantity }
              : item,
          )
          .filter((item) => item.quantity > 0),
      };
    case "CLEAR_CART":
      return { items: [] };
    default:
      return state;
  }
};

interface CartContextType {
  cart: CartState;
  addItem: (item: {
    id: number;
    name: string;
    price: number;
    image: string;
  }) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, dispatch] = useReducer(cartReducer, { items: [] });

  useEffect(() => {
    // Persist cart to localStorage
    if (cart.items.length > 0) {
      localStorage.setItem("graze-cart", JSON.stringify(cart.items));
    }
  }, [cart.items]);

  useEffect(() => {
    // Restore cart from localStorage on mount
    const saved = localStorage.getItem("graze-cart");
    if (saved) {
      try {
        const savedItems: CartItem[] = JSON.parse(saved);
        savedItems.forEach((item) => {
          dispatch({ type: "ADD_ITEM", payload: { 
            id: item.id, 
            name: item.name, 
            price: item.price, 
            image: item.image 
          } });
        });
      } catch (error) {
        console.error("Failed to restore cart:", error);
      }
    }
  }, []);

  const addItem = (item: {
    id: number;
    name: string;
    price: number;
    image: string;
  }) => {
    dispatch({ type: "ADD_ITEM", payload: item });
  };

  const removeItem = (id: number) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id } });
  };

  const updateQuantity = (id: number, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
    localStorage.removeItem("graze-cart");
  };

  const getTotal = () => {
    return cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
  };

  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotal,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};
