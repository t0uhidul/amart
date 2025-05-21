"use client";

import GlobalApi from "@/app/_utils/GlobalApi";
import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

type AuthState = "unauthenticated" | "login" | "verifying" | "authenticated";
type CountryCode = {
  code: string;
  name: string;
  country: string;
};
type Category = {
  id: number;
  name: string;
  slug: string;
  image: string;
  image_alt: string;
};

interface AuthContextType {
  authState: AuthState;
  phoneNumber: string;
  setPhoneNumber: (phone: string) => void;
  showLoginModal: () => void;
  showVerificationModal: () => void;
  hideModals: () => void;
  login: (phone: string) => Promise<void>;
  verifyOtp: (otp: string) => Promise<void>;
  resendOtp: () => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  categoryList: Category[];
  numberOfCartItems: number;
  handleCartItemCountChange: (count: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>("unauthenticated");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country_code, setCountryCode] = useState("+880");
  const [categoryList, setCategoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [numberOfCartItems, setNumberOfCartItems] = useState(0);

  const handleCartItemCountChange = (count: number) => {
    setNumberOfCartItems(count);
  };  

  // Check if user is already authenticated on mount
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setAuthState("authenticated");
    }
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await GlobalApi.getCategoryList();
        setCategoryList(res);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const showLoginModal = () => {
    setAuthState("login");
  };

  const showVerificationModal = () => {
    setAuthState("verifying");
  };

  const hideModals = () => {
    if (authState !== "authenticated") {
      setAuthState("unauthenticated");
    }
  };

  const login = async (phone: string, country_code: CountryCode) => {
    setIsLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/auth/phone-login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          country_code: country_code.code,
          phone_number: phone,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send OTP");
      }

      setPhoneNumber(phone);
      setCountryCode(country_code.code);
      setAuthState("verifying");

      toast("OTP Sent", {
        description: "Please check your phone for the verification code",
      });
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Error", {
        description:
          error instanceof Error ? error.message : "Failed to send OTP",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async (otp: string) => {
    setIsLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000//auth/verify-otp/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          country_code: country_code,
          phone_number: phoneNumber,
          phoneNumber,
          otp: otp,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to verify OTP");
      }

      // Store auth token
      if (data.token) {
        localStorage.setItem("authToken", data.token);
      }

      setAuthState("authenticated");

      toast("Success", {
        description: "Phone number verified successfully",
      });
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Error", {
        description:
          error instanceof Error ? error.message : "Failed to verify OTP",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resendOtp = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to resend OTP");
      }

      toast("OTP Resent", {
        description: "Please check your phone for the new verification code",
      });
    } catch (error) {
      console.error("Error resending OTP:", error);
      toast.error("Error", {
        description:
          error instanceof Error ? error.message : "Failed to resend OTP",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setAuthState("unauthenticated");
    setPhoneNumber("");
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        phoneNumber,
        setPhoneNumber,
        showLoginModal,
        showVerificationModal,
        hideModals,
        login,
        verifyOtp,
        resendOtp,
        logout,
        isLoading,
        categoryList,
        numberOfCartItems,
        handleCartItemCountChange,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
