"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  MenuItem,
  getMenuItems,
  deleteMenuItem,
  getCategories,
} from "@/lib/api";
import { getCurrentUser } from "@/lib/auth";

const AdminMenuPage = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState([]);
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
        const [items, cats] = await Promise.all([
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

  const getCategoryName = (categoryId) => {
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300">
            <div className="text-4xl font-bold text-emerald-600 mb-2">
              {menuItems.length}
            </div>
            <div className="text-lg font-semibold text-gray-700 uppercase tracking-wide">
              Total Items
            </div>
          </div>
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300">
            <div className="text-4xl font-bold text-teal-600 mb-2">
              {menuItems.filter((i) => i.availability).length}
            </div>
            <div className="text-lg font-semibold text-gray-700 uppercase tracking-wide">
              Available
            </div>
          </div>
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300">
            <div className="text-4xl font-bold text-orange-600 mb-2">
              {menuItems.filter((i) => !i.availability).length}
            </div>
            <div className="text-lg font-semibold text-gray-700 uppercase tracking-wide">
              Unavailable
            </div>
          </div>
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300">
            <div className="text-4xl font-bold text-purple-600 mb-2">
              {categories.length}
            </div>
            <div className="text-lg font-semibold text-gray-700 uppercase tracking-wide">
              Categories
            </div>
          </div>
        </div>

        {/* Menu Table */}
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Dish
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredItems.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-6 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-14 h-14 bg-gray-300 rounded-lg flex-shrink-0 mr-4 overflow-hidden">
                          <img
                            src={item.image || "/images/default-dish.jpg"}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="text-lg font-semibold text-gray-900">
                            {item.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {item.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6 whitespace-nowrap text-right">
                      <div className="text-2xl font-bold text-emerald-600">
                        ₹{item.price.toFixed(0)}
                      </div>
                    </td>
                    <td className="px-6 py-6 whitespace-nowrap">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                          item.categoryId === 1
                            ? "bg-emerald-100 text-emerald-800"
                            : item.categoryId === 2
                              ? "bg-orange-100 text-orange-800"
                              : item.categoryId === 3
                                ? "bg-purple-100 text-purple-800"
                                : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {getCategoryName(item.categoryId)}
                      </span>
                    </td>
                    <td className="px-6 py-6 whitespace-nowrap">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                          item.availability
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {item.availability ? "Available" : "Unavailable"}
                      </span>
                    </td>
                    <td className="px-6 py-6 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <button
                        onClick={() =>
                          router.push(`/admin/menu/edit/${item.id}`)
                        }
                        className="text-emerald-600 hover:text-emerald-900 font-bold px-4 py-2 rounded-lg hover:bg-emerald-50 transition-all duration-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:text-red-900 font-bold px-4 py-2 rounded-lg hover:bg-red-50 transition-all duration-200"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                No Menu Items
              </h3>
              <p className="text-gray-500">
                No items match your search. Try adjusting your filters.
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <div className="bg-white/90 backdrop-blur-xl rounded-xl p-3 shadow-lg border border-gray-200 flex space-x-2">
            <button className="px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-colors">
              Previous
            </button>
            <span className="px-6 py-2 bg-emerald-500 text-white font-bold rounded-lg">
              1
            </span>
            <button className="px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMenuPage;
