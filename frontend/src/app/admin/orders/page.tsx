"use client";

import { useState, useEffect } from "react";
import { getOrders } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { DataTable } from "@/components/ui/DataTable";
import { ColumnDef } from "@tanstack/react-table";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (error) {
      console.error("Failed to fetch orders", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center min-h-[400px] flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mb-4"></div>
        <p className="text-xl font-semibold text-orange-700">Loading orders...</p>
        <p className="text-orange-500 mt-2">Fetching latest data</p>
      </div>
    );
  }

  const columns: ColumnDef[] = [
    {
      accessorKey: "id",
      header: "Order ID",
      cell: ({ row }) => (
        <div className="font-mono text-lg font-bold text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
          #{row.original.id.toString().slice(-6).padStart(6, '0').toUpperCase()}
        </div>
      ),
    },
    {
      accessorKey: "customerId",
      header: "Customer",
      cell: ({ row }) => (
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">C{row.original.customerId}</span>
          </div>
          <span className="font-semibold text-gray-800">Cust #{row.original.customerId}</span>
        </div>
      ),
    },
    {
      accessorKey: "total",
      header: "Total Amount",
      cell: ({ row }) => (
        <div className="text-3xl font-black bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
          ₹{row.original.total.toFixed(0)}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        let variant = "default";
        let colorClass = "bg-gray-200 text-gray-800";
        
        if (status === "confirmed") {
          variant = "default";
          colorClass = "bg-emerald-500 text-white shadow-lg shadow-emerald-500/50 hover:shadow-emerald-600/70";
        } else if (status === "pending") {
          variant = "secondary";
          colorClass = "bg-orange-500 text-white shadow-lg shadow-orange-500/50 hover:shadow-orange-600/70 animate-pulse";
        } else if (status === "cancelled") {
          variant = "destructive";
          colorClass = "bg-red-500 text-white shadow-lg shadow-red-500/50";
        }

        return (
          <Badge
            variant={variant}
            className={`px-4 py-2 text-lg font-bold rounded-full shadow-lg transition-all duration-300 ${colorClass}`}
          >
            {status.toUpperCase()}
          </Badge>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Date & Time",
      cell: ({ row }) => (
        <div className="text-sm font-semibold">
          <div>{new Date(row.original.createdAt).toLocaleDateString('en-IN')}</div>
          <div className="text-orange-600 font-bold">{new Date(row.original.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-orange-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-orange-600 via-red-600 to-orange-700 bg-clip-text text-transparent mb-4 drop-shadow-lg">
              Orders Dashboard
            </h1>
            <p className="text-2xl text-gray-600 font-light">Manage all customer orders with real-time updates</p>
          </div>
          <Button
            onClick={fetchOrders}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-xl px-8 py-4 rounded-2xl shadow-2xl hover:shadow-orange-500/50 transform hover:-translate-y-1 transition-all duration-300 font-bold"
          >
            🔄 Refresh Data
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-red-50 border-2 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <CardHeader className="pb-4">
              <CardTitle className="text-4xl font-black text-orange-600">24</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-gray-600 font-semibold">Total Orders</p>
            </CardContent>
          </Card>
          <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-red-50 border-2 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <CardHeader className="pb-4">
              <CardTitle className="text-4xl font-black text-emerald-600">18</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-gray-600 font-semibold">Confirmed</p>
            </CardContent>
          </Card>
          <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-red-50 border-2 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <CardHeader className="pb-4">
              <CardTitle className="text-4xl font-black text-orange-600">6</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-gray-600 font-semibold">Pending</p>
            </CardContent>
          </Card>
        </div>

        {/* Orders Table */}
        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-8">
            <div className="flex items-center justify-between">
              <CardTitle className="text-3xl font-black">📦 Recent Orders</CardTitle>
              <div className="flex items-center space-x-4">
                <span className="text-xl font-bold">Live Data</span>
                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <DataTable columns={columns} data={orders} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

