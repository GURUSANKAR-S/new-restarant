"use client";

import { useEffect, useState } from "react";
import { getCategories, getMenuItems } from "@/lib/api";
import { getCurrentUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

interface Category {
  id: number;
  name: string;
  active: boolean;
}

interface MenuItem {
  id: number;
  name: string;
  price: number;
  availability: boolean;
}

export default function Admin() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const user = await getCurrentUser();
      if (!user) {
        router.push("/admin/login");
        return;
      }

      try {
        const [cats, items] = await Promise.all([
          getCategories(),
          getMenuItems(),
        ]);
        setCategories(cats);
        setMenuItems(items);
        setTotalRevenue(items.reduce((sum, item) => sum + item.price * 50, 0));
      } catch (error) {
        console.error("Failed to load admin data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 py-12">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-12 shadow-2xl mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <h1 className="text-5xl font-display font-bold bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent mb-4">
                Admin Dashboard
              </h1>
              <p className="text-2xl text-gray-700 font-light max-w-2xl">
                Manage your restaurant operations with real-time insights
              </p>
            </div>
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-8 rounded-2xl shadow-2xl text-right min-w-[300px]">
              <p className="text-4xl font-bold mb-2">
                ₹{totalRevenue.toLocaleString()}
              </p>
              <p className="text-lg opacity-90 uppercase tracking-wide font-semibold">
                Estimated Monthly Revenue
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <Card className="border-orange-200 hover:shadow-orange-200 hover:shadow-lg transition-all p-8">
            <CardHeader className="pb-4">
              <CardTitle className="text-3xl font-bold text-orange-600 flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center">
                  🍽️
                </div>
                Menu Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-5xl font-display font-bold text-gray-900">
                {menuItems.length}
              </p>
              <p className="text-2xl text-orange-600 font-bold mt-4">
                {menuItems.filter((i) => i.availability).length} Available
              </p>
            </CardContent>
          </Card>

          <Card className="border-orange-200 hover:shadow-orange-200 hover:shadow-lg transition-all p-8">
            <CardHeader className="pb-4">
              <CardTitle className="text-3xl font-bold text-orange-600 flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center">
                  🏷️
                </div>
                Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-5xl font-display font-bold text-gray-900">
                {categories.length}
              </p>
              <p className="text-2xl text-orange-600 font-bold mt-4">
                {categories.filter((c) => c.active).length} Active
              </p>
            </CardContent>
          </Card>

          <Card className="border-orange-200 hover:shadow-orange-200 hover:shadow-lg transition-all p-8">
            <CardHeader className="pb-4">
              <CardTitle className="text-3xl font-bold text-orange-600 flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center">
                  🛒
                </div>
                Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-5xl font-display font-bold text-gray-900">
                127
              </p>
              <p className="text-2xl text-orange-600 font-bold mt-4">
                Live Orders
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <Link href="/admin/menu" className="group">
            <Card className="border-orange-200 hover:shadow-orange-200 hover:shadow-xl transition-all cursor-pointer h-full p-10">
              <div className="text-6xl mb-6 text-center">🍽️</div>
              <CardTitle className="text-3xl font-display mb-4 group-hover:text-orange-600 transition-colors text-center">
                Menu Management
              </CardTitle>
              <CardDescription className="text-xl text-gray-600 text-center leading-relaxed">
                View, edit, add new dishes & categories
              </CardDescription>
            </Card>
          </Link>

          <Link href="/admin/orders" className="group">
            <Card className="border-orange-200 hover:shadow-orange-200 hover:shadow-xl transition-all cursor-pointer h-full p-10">
              <div className="text-6xl mb-6 text-center">🛒</div>
              <CardTitle className="text-3xl font-display mb-4 group-hover:text-orange-600 transition-colors text-center">
                Orders
              </CardTitle>
              <CardDescription className="text-xl text-gray-600 text-center leading-relaxed">
                Manage customer orders & deliveries
              </CardDescription>
            </Card>
          </Link>

          <Link href="/admin/reservations" className="group">
            <Card className="border-orange-200 hover:shadow-orange-200 hover:shadow-xl transition-all cursor-pointer h-full p-10">
              <div className="text-6xl mb-6 text-center">📅</div>
              <CardTitle className="text-3xl font-display mb-4 group-hover:text-orange-600 transition-colors text-center">
                Reservations
              </CardTitle>
              <CardDescription className="text-xl text-gray-600 text-center leading-relaxed">
                View & manage table bookings
              </CardDescription>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
