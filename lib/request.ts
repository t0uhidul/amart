"use server";

import { AnyType } from "./types";

export async function handleSuccess(response: AnyType) {
  return {
    success: true,
    message: response?.data?.message,
    data: response?.data?.data || response?.data || response,
    code: response?.data?.code,
    status: response?.status,
    statusText: response?.statusText,
    errors: null,
  };
}

export async function handleError(error: AnyType) {
  return {
    success: false,
    message:
      error?.response?.data?.message ||
      "Something went wrong. Please try again.",
    data: error?.response?.data,
    code: error?.response?.data?.code,
    status: error?.response?.status,
    statusText: error?.response?.statusText,
    errors: error?.response?.data?.errors,
  };
}
