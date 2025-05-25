"use server";

import { EndpointType } from "./types";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const endpoints: EndpointType = {
  // cart
  removeAllCartItems: "/store/user-cart/",
  getCartItems: "/store/user-cart/",
  removeCartItem: "/store/user-cart/",
  addToCart: "/store/user-cart/",
};

export async function getEndpoint(key: keyof EndpointType, pathname?: string) {
  let endpoint = `${baseUrl}${endpoints[key]}`;

  if (pathname) {
    endpoint += pathname;
  }

  return endpoint;
}
