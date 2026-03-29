"use client";

import { useState, useEffect } from "react";
import { getMenuItems, getCategories } from "@/lib/api";
import { getStoryblokApi } from "@/lib/storyblok";
import type { MenuItem, Category } from "@/lib/types";
import MenuItemCard from "@/components/MenuItemCard";
import { useCart } from "@/contexts/CartContext";
import Image from "next/image";

export default function Menu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const { addItem } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [itemsRes, catsRes] = await Promise.all([
          getMenuItems(),
          getCategories(),
        ]);
        setMenuItems(itemsRes);
        setCategories(catsRes);
      } catch (error) {
        console.error("Failed to fetch menu data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory
      ? item.categoryId === selectedCategory
      : true;

    return matchesSearch && matchesCategory && item.availability;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-emerald-900 flex items-center justify-center p-8">
        <div className="text-2xl md:text-4xl text-white/80 animate-pulse">
          Loading Menu...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-amber-50 to-yellow-50/50">
      {/* Hero Header */}
      <section className="relative bg-gradient-to-r from-orange-600/90 to-red-600/90 py-32 px-4 md:px-8 text-white">
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 bg-gradient-to-r from-white to-orange-100 bg-clip-text text-transparent drop-shadow-4xl animate-pulse">
            Our Menu
          </h1>
          <p className="text-2xl md:text-3xl text-orange-100/90 max-w-4xl mx-auto leading-relaxed backdrop-blur-xl">
            Discover our chef&apos;s finest creations made with fresh,
            farm-to-table ingredients
          </p>
        </div>
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
      </section>

      {/* Filters */}
      <section className="py-24 px-4 md:px-8 -mt-20 relative">
        <div className="max-w-7xl mx-auto">
          {/* Search */}
          <div className="mb-16 text-center">
            <div className="inline-block relative">
              <input
                type="text"
                placeholder="🔍 Search our menu..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-96 max-w-full px-12 py-6 text-xl rounded-3xl bg-white/80 backdrop-blur-2xl border-4 border-orange-200/50 hover:border-orange-300/70 shadow-2xl focus:ring-8 focus:ring-orange-400/30 focus:outline-none transition-all duration-500 text-gray-900 placeholder-gray-500 font-semibold"
              />
            </div>
          </div>

          {/* Category Buttons */}
          <div className="flex flex-wrap gap-4 justify-center mb-20">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-10 py-6 rounded-3xl font-bold text-xl shadow-2xl transition-all duration-500 transform hover:scale-105 ${
                selectedCategory === null
                  ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-orange-500/50 ring-4 ring-orange-400/30"
                  : "bg-white/80 hover:bg-white border-4 border-orange-200/50 text-gray-900 hover:text-orange-600 backdrop-blur-xl hover:shadow-orange-300/25"
              }`}
            >
              All Dishes
            </button>

            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-10 py-6 rounded-3xl font-bold text-xl shadow-2xl transition-all duration-500 transform hover:scale-105 ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-orange-500/50 ring-4 ring-orange-400/30"
                    : "bg-white/80 hover:bg-white border-4 border-orange-200/50 text-gray-900 hover:text-orange-600 backdrop-blur-xl hover:shadow-orange-300/25"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Menu Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {filteredItems.length === 0 ? (
              <div className="col-span-full text-center py-32">
                <div className="w-48 h-48 mx-auto mb-12 bg-gradient-to-br from-orange-400/30 to-red-400/20 rounded-3xl backdrop-blur-xl border-4 border-orange-300/30 shadow-2xl animate-pulse"></div>
                <h2 className="text-5xl font-black text-gray-700 mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  No Dishes Found
                </h2>
                <p className="text-2xl text-gray-500 backdrop-blur-xl">
                  Try adjusting your search or filter
                </p>
              </div>
            ) : (
              filteredItems.map((item) => (
                <div key={item.id} className="h-[580px] lg:h-[620px]">
                  <MenuItemCard item={item} onAddToCart={addItem} />
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
