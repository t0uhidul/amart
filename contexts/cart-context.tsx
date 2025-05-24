// contexts/cart-context.tsx
"use client";

import { createContext, useContext, useState } from "react";

const CartContext = createContext<any>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartCount, setCartCount] = useState(0);

//    const removeAllItesmsFromCart = async (authToken) => {
//     setIsLoading(true);
//     try {
//       const response = await fetch("http://127.0.0.1:8000/auth/phone-login/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           country_code: country_code.code,
//           phone_number: phone,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Failed to send OTP");
//       }

//       setPhoneNumber(phone);
//       setCountryCode(country_code.code);
//       setAuthState("verifying");

//       toast("OTP Sent", {
//         description: "Please check your phone for the verification code",
//       });
//     } catch (error) {
//       console.error("Error sending OTP:", error);
//       toast.error("Error", {
//         description:
//           error instanceof Error ? error.message : "Failed to send OTP",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

  return (
    <CartContext.Provider value={{ cartCount, setCartCount, removeAllItesmsFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
