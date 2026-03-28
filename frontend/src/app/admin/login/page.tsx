"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAdmin } from "@/lib/auth";
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

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await loginAdmin(email, password);
      localStorage.setItem("token", data.token);
      router.push("/admin");
    } catch (err: any) {
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-orange-200">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-display bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent">
            Admin Login
          </CardTitle>
          <CardDescription className="text-lg text-gray-600">
            Sign in to manage your restaurant
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 rounded-2xl border-2 border-red-500/30 bg-red-50 text-red-700 text-center font-bold">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                placeholder="admin@grazeandgrain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 text-lg font-semibold"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 text-lg font-semibold"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-14 text-xl font-display bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-xl text-white font-bold"
            >
              {loading ? "Signing In..." : "Enter Admin Portal"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
