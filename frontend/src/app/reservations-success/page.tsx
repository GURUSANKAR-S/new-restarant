"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function ReservationSuccess() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center py-12">
      <div className="max-w-md w-full text-center p-12 bg-white rounded-3xl shadow-2xl">
        <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
          <svg
            className="w-12 h-12 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
          Table Reserved!
        </h1>
        <p className="text-xl text-gray-600 mb-12 leading-relaxed">
          Your reservation has been confirmed. We'll see you soon!
        </p>
        <Button
          asChild
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-xl h-14 shadow-xl"
        >
          <Link href="/reservations">Book Another</Link>
        </Button>
        <div className="mt-8 pt-8 border-t border-gray-200">
          <Link
            href="/menu"
            className="text-orange-500 hover:text-orange-600 font-semibold"
          >
            Order Online →
          </Link>
        </div>
      </div>
    </div>
  );
}
