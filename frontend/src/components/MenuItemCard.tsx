"use client";

import type { MenuItem } from "@/lib/types";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";

interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart?: (item: {
    id: number;
    name: string;
    price: number;
    image: string;
  }) => void;
}

const MenuItemCard = ({ item, onAddToCart }: MenuItemCardProps) => {
  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image || "/images/default-dish.jpg",
      });
    }
  };

  const getCategoryLabel = () => {
    switch (item.categoryId) {
      case 1:
        return "Appetizer";
      case 2:
        return "Main Course";
      case 3:
        return "Dessert";
      case 4:
        return "Drink";
      default:
        return "Special";
    }
  };

  return (
    <div className="group relative bg-gradient-to-br from-white/90 to-orange-50/90 backdrop-blur-xl rounded-3xl shadow-2xl hover:shadow-orange-400/50 hover:shadow-2xl border border-orange-200/50 h-full overflow-hidden transition-all duration-500 cursor-pointer hover:-translate-y-2">
      {/* Image */}
      <div className="relative h-72 overflow-hidden rounded-t-3xl">
        <Image
          src={item.image || "/images/default-dish.jpg"}
          alt={item.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        {!item.availability && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/40 flex items-center justify-center">
            <span className="text-white text-xl font-bold px-8 py-4 bg-red-500/95 rounded-2xl backdrop-blur-md border-2 border-white/20 shadow-2xl">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        {/* Category Badge */}
        <div>
          <span className="inline-block mb-3 px-3 py-1.5 bg-gradient-to-r from-emerald-400 to-teal-400 text-white text-xs font-bold rounded-full shadow-md uppercase tracking-wide">
            {getCategoryLabel()}
          </span>

          {/* Name */}
          <h3 className="font-black text-xl md:text-2xl text-gray-900 mb-3 leading-snug line-clamp-2 group-hover:text-orange-600 transition-colors">
            {item.name}
          </h3>

          {/* Description */}
          <p className="text-gray-700 text-sm md:text-base mb-6 line-clamp-3 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Price & Button - Fixed linear alignment */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-3xl md:text-4xl font-black bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent drop-shadow-lg tracking-tight flex-shrink-0">
            ₹{item.price.toFixed(0)}
          </span>
          <button
            onClick={handleAddToCart}
            disabled={!item.availability}
            className="group ml-auto px-6 py-3 h-14 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-gray-300 disabled:to-gray-400 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-orange-500/50 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transition-all duration-300 flex items-center justify-center gap-2.5 min-w-[130px] flex-shrink-0"
          >
            {item.availability ? (
              <>
                <svg
                  className="w-5 h-5 group-hover:scale-110 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 1.5M7 13l-1.5-1.5M12 13v8m0 0H8m4 0h4"
                  />
                </svg>
                <span>Add</span>
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5 opacity-70"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18.36 6.64a9 9 0 11-12.73 0m.75 11.973a5.998 5.998 0 01-2.25 12.456"
                  />
                </svg>
                <span>Out</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
