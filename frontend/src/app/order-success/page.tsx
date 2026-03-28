"use client";

import { useEffect, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function OrderSuccess() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const router = useRouter();

  useEffect(() => {
    // Redirect if no orderId
    if (!orderId) {
      router.push("/menu");
    }
  }, [orderId, router]);

  if (!orderId) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg shadow-2xl border-emerald-200 text-center">
        <CardHeader className="space-y-4">
          <div className="w-24 h-24 mx-auto bg-gradient-to-r from-emerald-500 to-green-600 rounded-3xl flex items-center justify-center shadow-2xl">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <CardTitle className="text-4xl font-display bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
            Order Confirmed!
          </CardTitle>
          <CardDescription className="text-xl text-gray-600">
            Your order has been placed successfully.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-0">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-500">Order ID</p>
            <p className="text-2xl font-bold text-gray-900 tracking-tight">
              #{orderId.slice(-6).toUpperCase()}
            </p>
          </div>
          <div className="text-sm space-y-1">
            <p className="text-gray-600">
              We&apos;ve sent confirmation to your email. Expected delivery
              within 45 minutes.
            </p>
            <p className="text-xs text-gray-500">
              Track your order anytime from your account.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Link href="/menu">
              <Button className="w-full h-12 font-display bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                Order More
              </Button>
            </Link>
            <Button variant="outline" className="w-full h-12 border-orange-200">
              My Orders
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
