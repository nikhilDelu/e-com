export interface Product {
  category: string;
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  variants: variant[];
}
export interface variant {
  color: string;
  size: string;
}

export interface CartItem {
  itemId: string;
  quantity: number;
  variant: variant;
}

export interface Cart {
  userId: string;
  items: CartItem[];
}

// orders
export interface Order {
  userId: string;
  userDetails?: UserDetails;
  items: OrderItem[];
  total: number;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface OrderItem {
  itemId: string;
  quantity: number;
  variant: variant;
  price: number;
}

export interface UserDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}
