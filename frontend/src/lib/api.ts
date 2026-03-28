import type { MenuItem, Category, CartItem, Order, Reservation } from "./types";

export * from "./types";

const API_URL = "https://new-restarant.onrender.com/";

function getAuthHeaders(
  tokenType: "admin" | "customer" = "admin",
): HeadersInit {
  const tokenKey = tokenType === "customer" ? "customerToken" : "token";
  const token = localStorage.getItem(tokenKey);
  const headers: HeadersInit = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

export async function getMenuItems(): Promise<MenuItem[]> {
  const res = await fetch(`${API_URL}/menu-items`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) {
    throw new Error("Failed to fetch menu items");
  }
  return res.json();
}

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${API_URL}/categories`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  return res.json();
}

export async function getMenuItem(id: number): Promise<MenuItem> {
  const res = await fetch(`${API_URL}/menu-items/${id}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) {
    throw new Error("Failed to fetch menu item");
  }
  return res.json();
}

export async function createMenuItem(formData: FormData): Promise<MenuItem> {
  const res = await fetch(`${API_URL}/menu-items`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: formData, // FormData - no Content-Type
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to create menu item");
  }
  return res.json();
}

export async function updateMenuItem(
  id: number,
  formData: FormData,
): Promise<MenuItem> {
  const res = await fetch(`${API_URL}/menu-items/${id}`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: formData,
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to update menu item");
  }
  return res.json();
}

export async function deleteMenuItem(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/menu-items/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to delete menu item");
  }
}

export async function createOrder(orderData: {
  customerId: string;
  items: CartItem[];
  total: number;
  address: string;
  paymentMethod: string;
}): Promise<Order> {
  const res = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("customerToken")}`,
    },
    body: JSON.stringify(orderData),
  });
  if (!res.ok) {
    throw new Error("Failed to create order");
  }
  return res.json();
}

export async function getOrders(): Promise<Order[]> {
  const res = await fetch(`${API_URL}/orders`, {
    headers: getAuthHeaders("admin"),
  });
  if (!res.ok) throw new Error("Failed to fetch orders");
  return res.json();
}

export async function createReservation(reservationData: {
  customerName: string;
  customerEmail: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  specialNotes?: string;
}): Promise<Reservation> {
  const res = await fetch(`${API_URL}/reservations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reservationData),
  });
  if (!res.ok) {
    throw new Error("Failed to create reservation");
  }
  return res.json();
}

export async function getReservations(): Promise<Reservation[]> {
  const res = await fetch(`${API_URL}/reservations`, {
    headers: getAuthHeaders("admin"),
  });
  if (!res.ok) throw new Error("Failed to fetch reservations");
  return res.json();
}

export async function updateReservationStatus(
  id: number,
  status: "pending" | "confirmed" | "cancelled",
): Promise<Reservation> {
  const res = await fetch(`${API_URL}/reservations/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders("admin"),
    },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error || "Failed to update reservation");
  }
  return res.json();
}

export async function getReservation(id: number): Promise<Reservation> {
  const res = await fetch(`${API_URL}/reservations/${id}`, {
    headers: getAuthHeaders("admin"),
  });
  if (!res.ok) throw new Error("Failed to fetch reservation");
  return res.json();
}
