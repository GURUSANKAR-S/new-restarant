"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { createOrder } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

export default function Checkout() {
  const { cart, getTotal, clearCart } = useCart();
  const router = useRouter();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "cash" | "upi">(
    "card",
  );
  const [loading, setLoading] = useState(false);
  const [dummyPayment, setDummyPayment] = useState(false);

  useEffect(() => {
    if (cart.items.length === 0) {
      router.push("/menu");
    }
  }, [cart.items.length, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setDummyPayment(true);
    setTimeout(async () => {
      try {
        const orderId = Date.now(); // Dummy payment success
        await createOrder({
          customerId: "customer_1", // From auth later
          items: cart.items,
          total: getTotal(),
          address: `${address}, ${city}`,
          paymentMethod,
        });
        clearCart();
        router.push(`/order-success?orderId=${orderId}`);
      } catch (error) {
        console.error("Order failed", error);
      } finally {
        setLoading(false);
        setDummyPayment(false);
      }
    }, 2000);
  };

  if (cart.items.length === 0) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl space-y-8">
        <h1 className="text-4xl font-display font-bold bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent text-center">
          Checkout
        </h1>

        {/* Summary Card */}
        <Card className="border-orange-200">
          <CardHeader>
            <CardTitle className="text-2xl font-display">
              Order Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pb-0">
            {cart.items.map((item) => (
              <div key={item.id} className="flex justify-between py-2">
                <span>
                  {item.name} (x{item.quantity})
                </span>
                <span>₹{(item.price * item.quantity).toFixed(0)}</span>
              </div>
            ))}
            <div className="border-t pt-4">
              <div className="flex justify-between text-2xl font-bold text-orange-600">
                <span>Total</span>
                <span>₹{getTotal().toFixed(0)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Delivery Form */}
        <Card className="border-orange-200">
          <CardHeader>
            <CardTitle className="text-2xl font-display">
              Delivery Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Full Address</Label>
                <Input
                  placeholder="House no, street, landmark"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="h-12"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>City</Label>
                <Input
                  placeholder="City name"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="h-12"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input
                type="tel"
                placeholder="Your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-12"
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Payment Method</Label>
              <Select
                value={paymentMethod}
                onValueChange={(v) => setPaymentMethod(v as any)}
              >
                <SelectTrigger className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="card">
                    Credit/Debit Card (Dummy)
                  </SelectItem>
                  <SelectItem value="cash">Cash on Delivery</SelectItem>
                  <SelectItem value="upi">UPI</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Button
          onClick={handleSubmit}
          className="w-full h-16 text-2xl font-display bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-2xl"
          disabled={loading}
          size="lg"
        >
          {loading
            ? "Processing Payment..."
            : "Place Order & Pay ₹" + getTotal().toFixed(0)}
        </Button>
      </div>
    </div>
  );
}
