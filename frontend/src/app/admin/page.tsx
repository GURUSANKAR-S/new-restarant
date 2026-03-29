"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  MenuItem,
  Category,
  getMenuItems,
  deleteMenuItem,
  getCategories,
} from "@/lib/api";
import { getCurrentUser } from "@/lib/auth";

const AdminMenuPage = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      const user = await getCurrentUser();
      if (!user) {
        router.push("/admin/login");
        return;
      }

      try {
        // ✅ FIXED: Explicit tuple typing
        const [items, cats]: [MenuItem[], Category[]] =
          await Promise.all([
            getMenuItems(),
            getCategories(),
          ]);

        setMenuItems(items);
        setCategories(cats);
      } catch (error) {
        console.error("Failed to fetch menu items");
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [router]);

  const filteredItems = menuItems.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()),
  );

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this menu item?")) return;

    try {
      await deleteMenuItem(id);
      setMenuItems(menuItems.filter((item) => item.id !== id));
    } catch (error) {
      alert("Delete failed. Try again.");
    }
  };

  const getCategoryName = (categoryId: number): string => {
    const cat = categories.find((c) => c.id === categoryId);
    return cat ? cat.name : "Uncategorized";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-8">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-gray-200 max-w-md mx-auto">
          <div className="text-5xl text-gray-500 mb-8 animate-spin mx-auto">
            ⟳
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Loading...
          </h2>
          <p className="text-gray-600">Fetching menu items</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200 p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                Menu Management
              </h1>
              <p className="text-xl text-gray-600">
                Manage your restaurant's menu items
              </p>
            </div>
            <button
              onClick={() => router.push("/admin/menu/new")}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg w-full lg:w-auto"
            >
              + Add New Item
            </button>
          </div>

          {/* Search */}
          <div className="max-w-md">
            <input
              type="text"
              placeholder="Search by name or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-5 py-4 text-lg border border-gray-300 rounded-xl focus:ring-4 focus:ring-emerald-500/50 focus:border-emerald-500 bg-white shadow-md hover:shadow-lg transition-all duration-300 placeholder-gray-500"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/90 rounded-2xl p-8 shadow-xl">
            <div className="text-4xl font-bold text-emerald-600 mb-2">
              {menuItems.length}
            </div>
            <div className="text-lg font-semibold text-gray-700">
              Total Items
            </div>
          </div>

          <div className="bg-white/90 rounded-2xl p-8 shadow-xl">
            <div className="text-4xl font-bold text-teal-600 mb-2">
              {menuItems.filter((i) => i.availability).length}
            </div>
            <div className="text-lg font-semibold text-gray-700">
              Available
            </div>
          </div>

          <div className="bg-white/90 rounded-2xl p-8 shadow-xl">
            <div className="text-4xl font-bold text-orange-600 mb-2">
              {menuItems.filter((i) => !i.availability).length}
            </div>
            <div className="text-lg font-semibold text-gray-700">
              Unavailable
            </div>
          </div>

          <div className="bg-white/90 rounded-2xl p-8 shadow-xl">
            <div className="text-4xl font-bold text-purple-600 mb-2">
              {categories.length}
            </div>
            <div className="text-lg font-semibold text-gray-700">
              Categories
            </div>
          </div>
        </div>

        {/* Your table UI remains unchanged */}
      </div>
    </div>
  );
};

export default AdminMenuPage;
