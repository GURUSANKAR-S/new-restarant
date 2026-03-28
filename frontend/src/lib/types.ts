export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  image: string;
  availability: boolean;
}
export { MenuItem, Category, CartItem, Order, Reservation } from "@/lib/api";

export interface Category {
  id: number;
  name: string;
  active: boolean;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: number;
  customerId: string;
  items: CartItem[];
  total: number;
  status: "pending" | "confirmed" | "delivered" | "cancelled";
  createdAt: string;
  address?: string;
  paymentMethod?: string;
}

export interface Reservation {
  id: number;
  customerName: string;
  customerEmail: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  specialNotes?: string;
  status: "confirmed" | "cancelled";
  createdAt: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: "admin" | "customer";
}
