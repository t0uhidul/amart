export type EndpointType = {
  // Cart Endpoints
  removeAllCartItems: string;
  getCartItems: string;
  removeCartItem: string;
  addToCart: string;

  // Add other endpoints as neede
};

export type AuthToken = string;

export type AnyType = any;

export type Product = {
  id: number;
  name: string;
  description: string;
  mrp: string;
  sellingPice: string;
  ItemQuantityType: string;
  image: string | null;
  categories: string[];
  is_featured: boolean;
};
