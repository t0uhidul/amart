"use client";

import { getCartItems } from "@/lib/actions";
import { getEndpoint } from "@/lib/endpoint";
import { handleError, handleSuccess } from "@/lib/request";
import { AnyType, AuthToken } from "@/lib/types";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./auth-context";

type CartContextType = {
  cartCount: number;
  setCartCount: (count: number) => void;
  removeAllItemsFromCart: (authToken: AuthToken) => Promise<unknown>;
  cartItems?: AnyType[];
  setCartItems?: (items: AnyType[]) => void;
};

const CartContext = createContext<CartContextType>({
  cartCount: 0,
  setCartCount: () => {},
  removeAllItemsFromCart: async () => {},
});
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartCount, setCartCount] = useState(0);

  const { authToken } = useAuth();

  useEffect(() => {
    if (authToken) {
      getCartItems(authToken).then((items) => {
        setCartCount(items?.data?.length || 0);
      });
    } else {
      setCartCount(0);
    }
  }, [authToken]);

  const removeAllItemsFromCart = async (authToken: AuthToken) => {
    try {
      const endpoint = await getEndpoint("removeAllCartItems");

      const response = await axios.delete(endpoint, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setCartCount(0);
      return handleSuccess(response);
    } catch (error) {
      return handleError(error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartCount,
        setCartCount,
        removeAllItemsFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
}
