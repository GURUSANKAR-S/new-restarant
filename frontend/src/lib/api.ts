import type { MenuItem, Category, CartItem, Order, Reservation } from "./types";

export * from "./types";

const API_URL = "http://localhost:3001";

function getAuthHeaders(
  tokenType: "admin" | "customer" = "admin",
): HeadersInit {
  const tokenKey = tokenType === "customer" ? "customerToken" : "token";
  const token =
    typeof window !== "undefined" ? localStorage.getItem(tokenKey) : null;

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

  const data: MenuItem[] = await res.json();
  return data;
}

export async function getMenuItem(id: number): Promise<MenuItem> {
  const res = await fetch(`${API_URL}/menu-items/${id}`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch menu item");
  }

  const data: MenuItem = await res.json();
  return data;
}

export async function createMenuItem(formData: FormData): Promise<MenuItem> {
  const res = await fetch(`${API_URL}/menu-items`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to create menu item");
  }

  const data: MenuItem = await res.json();
  return data;
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

  const data: MenuItem = await res.json();
  return data;
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

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${API_URL}/categories`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data: Category[] = await res.json();
  return data;
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
      Authorization: `Bearer ${
        typeof window !== "undefined"
          ? localStorage.getItem("customerToken")
          : ""
      }`,
    },
    body: JSON.stringify(orderData),
  });

  if (!res.ok) {
    throw new Error("Failed to create order");
  }

  const data: Order = await res.json();
  return data;
}

export async function getOrders(): Promise<Order[]> {
  const res = await fetch(`${API_URL}/orders`, {
    headers: getAuthHeaders("admin"),
  });

  if (!res.ok) throw new Error("Failed to fetch orders");

  const data: Order[] = await res.json();
  return data;
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

  const data: Reservation = await res.json();
  return data;
}

export async function getReservations(): Promise<Reservation[]> {
  const res = await fetch(`${API_URL}/reservations`, {
    headers: getAuthHeaders("admin"),
  });

  if (!res.ok) throw new Error("Failed to fetch reservations");

  const data: Reservation[] = await res.json();
  return data;
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

  const data: Reservation = await res.json();
  return data;
}

export async function getReservation(id: number): Promise<Reservation> {
  const res = await fetch(`${API_URL}/reservations/${id}`, {
    headers: getAuthHeaders("admin"),
  });

  if (!res.ok) throw new Error("Failed to fetch reservation");

  const data: Reservation = await res.json();
  return data;
}
