type EndpointType = {
  // Cart Endpoints
  removeAllCartItems: string;
  getCartItems: string;
  removeCartItem: string;
  addToCart: string;

  // Add other endpoints as neede
};

type AuthToken = string;

type AnyType = unknown;

type Product = {
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

type ProductItemProps = {
  product: Product;
  onQuickView?: () => void;
  isFeatured?: boolean;
};

type ProductDetailsProps = {
  product: Product;
  quantity: number;
  loading: boolean;
  handleAddToCart: (product: Product) => void;
  incrementQuantity: (product: Product) => void;
  decrementQuantity: (product: Product) => void;
};

// Define a Category type inline for mapping
type Category = {
  id?: string | number;
  slug?: string;
  name?: string;
};
