export type BookstoreCategory = "packages" | "books" | "tabs" | "calculators";

export interface BookstoreProduct {
  id: string;
  name: string;
  category: BookstoreCategory;
  price: number;
  description?: string;
  image?: string;
}

export interface CartItem {
  product: BookstoreProduct;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

export interface ShopifyOrderRequest {
  items: CartItem[];
  customer: {
    email: string;
    firstName?: string;
    lastName?: string;
  };
}

export interface ShopifyOrderResponse {
  success: boolean;
  checkoutUrl?: string;
  error?: string;
}
