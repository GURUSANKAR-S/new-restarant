"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { getMenuItems } from "@/lib/api";
import type { MenuItem } from "@/lib/types";
import MenuItemCard from "@/components/MenuItemCard";
import { useCart } from "@/contexts/CartContext";
import Link from "next/link";

export default function Home() {
  const [featuredItems, setFeaturedItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const items = await getMenuItems();
        const featured = items.filter((item) => item.availability).slice(0, 6);
        setFeaturedItems(featured);
      } catch (error) {
        console.error("Failed to fetch featured items:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-red-500 to-amber-600" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="container mx-auto px-6 text-center relative z-10 text-white animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-black mb-6 bg-white bg-clip-text text-transparent drop-shadow-2xl">
            GRAZE & GRAIN
          </h1>
          <p className="text-xl md:text-3xl mb-12 max-w-3xl mx-auto opacity-95 leading-relaxed font-light">
            Exquisite farm-to-table dining with unforgettable flavors
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/menu">
              <Button
                size="lg"
                className="text-xl px-12 py-8 font-bold shadow-2xl hover:shadow-orange-500/50 bg-white text-orange-600 hover:bg-orange-50 border-4 border-white/30"
              >
                Explore Menu
              </Button>
            </Link>
            <Link href="/reservations">
              <Button
                size="lg"
                variant="outline"
                className="text-xl px-12 py-8 font-bold shadow-2xl hover:shadow-white/50 border-4 border-white/50 bg-transparent/50 backdrop-blur-xl"
              >
                Reserve Table
              </Button>
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent" />
      </section>

      {/* Featured Items */}
      <section className="py-32 -mt-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Featured Dishes
            </h2>
            <p className="text-2xl text-gray-600 max-w-2xl mx-auto">
              Our chef's recommendations
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-80 bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl" />
                </div>
              ))}
            </div>
          ) : featuredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
              {featuredItems.map((item, index) => (
                <MenuItemCard key={item.id} item={item} onAddToCart={addItem} />
              ))}
            </div>
          ) : (
            <p className="text-center text-2xl text-gray-500 py-20">
              No featured items available
            </p>
          )}

          <div className="text-center">
            <Link href="/menu">
              <Button
                size="lg"
                className="text-xl px-16 py-8 font-bold shadow-2xl bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              >
                View Full Menu
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-red-500/10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-black text-orange-600 mb-4">
                250+
              </div>
              <div className="text-xl font-semibold text-gray-700">
                Menu Items
              </div>
            </div>
            <div>
              <div className="text-5xl font-black text-red-600 mb-4">500+</div>
              <div className="text-xl font-semibold text-gray-700">
                Happy Customers
              </div>
            </div>
            <div>
              <div className="text-5xl font-black text-amber-600 mb-4">50+</div>
              <div className="text-xl font-semibold text-gray-700">
                Daily Orders
              </div>
            </div>
            <div>
              <div className="text-5xl font-black text-emerald-600 mb-4">
                4.9
              </div>
              <div className="text-xl font-semibold text-gray-700">
                ★ Rating
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-b from-gray-900 to-black text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-7xl font-black mb-8 bg-gradient-to-r from-white via-orange-200 to-red-200 bg-clip-text text-transparent drop-shadow-2xl">
            Ready to Indulge?
          </h2>
          <p className="text-2xl mb-12 max-w-3xl mx-auto opacity-90 leading-relaxed">
            Join hundreds of satisfied customers experiencing the best
            farm-to-table dining
          </p>
          <div className="flex flex-col lg:flex-row gap-8 justify-center max-w-2xl mx-auto">
            <Link href="/menu" className="group">
              <Button
                size="lg"
                className="text-xl px-16 py-8 shadow-2xl bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 font-bold border-4 border-white/20"
              >
                Order Now
              </Button>
            </Link>
            <Link href="/reservations" className="group">
              <Button
                variant="outline"
                size="lg"
                className="text-xl px-16 py-8 shadow-2xl border-4 border-white/50 font-bold bg-black/30 backdrop-blur-xl"
              >
                Book Table
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
