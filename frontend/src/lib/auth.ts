import type { User } from "./types";

const API_URL = "http://localhost:3001";

export async function loginAdmin(
  email: string,
  password: string,
): Promise<{ token: string }> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error("Admin login failed");
  }

  return res.json();
}

export async function loginCustomer(
  email: string,
  password: string,
): Promise<{ token: string }> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error("Customer login failed");
  }

  return res.json();
}

export async function registerCustomer(user: Omit<User, "id">): Promise<User> {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  if (!res.ok) {
    throw new Error("Registration failed");
  }

  return res.json();
}

export async function getCurrentUser(
  tokenKey?: "token" | "customerToken",
): Promise<User | null> {
  const token = localStorage.getItem(tokenKey || "token");
  if (!token) return null;

  const res = await fetch(`${API_URL}/auth/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) return null;
  return res.json();
}

export function logout(tokenKey?: "token" | "customerToken") {
  localStorage.removeItem(tokenKey || "token");
}

export function isAuthenticated(tokenKey?: "token" | "customerToken"): boolean {
  return !!localStorage.getItem(tokenKey || "token");
}
