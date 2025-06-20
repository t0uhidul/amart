"use server";

import { getEndpoint } from "@/lib/endpoint";
import { handleError, handleSuccess } from "@/lib/request";
import axios from "axios";

// 1. Get all cart items
export async function getCartItems(jwt: string) {
  try {
    const endpoint = await getEndpoint("getCartItems");
    const response = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    // return response;
    return { ...(await handleSuccess(response)), data: response };
  } catch (error) {
    // return error;
    return handleError(error);
  }
}

// 2. Remove one item from cart
export async function removeOneFromCart(jwt: string, itemId: number) {
  try {
    const endpoint = await getEndpoint(`removeCartItem`, itemId);
    const response = await axios.delete(endpoint, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return handleSuccess(response);
  } catch (error) {
    return handleError(error);
  }
}

// 3. Remove all items from cart
export async function removeAllFromCart(jwt: string) {
  try {
    const endpoint = await getEndpoint("removeAllCartItems");
    const response = await axios.delete(endpoint, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return handleSuccess(response);
  } catch (error) {
    return handleError(error);
  }
}

// 4. Add item to cart
export async function addToCart(data: AnyType, jwt: string) {
  try {
    const endpoint = await getEndpoint("addToCart");
    const response = await axios.post(endpoint, data, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return handleSuccess(response);
  } catch (error) {
    return handleError(error);
  }
}

export async function 
