import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { Toaster } from "sonner";
import { AuthProvider } from "@/contexts/auth-context";
import { AuthModalsProvider } from "@/providers/auth-modal-provider";
import { CartProvider } from "@/contexts/cart-context";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Amart",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lora.variable} antialiased`}>
        <AuthProvider>
          <CartProvider>
            <Toaster />
            <AuthModalsProvider />
            <Header />
            {children}
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
