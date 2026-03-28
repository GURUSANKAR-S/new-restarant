"use client";

import { useState, useEffect } from "react";
import { getReservations, updateReservationStatus } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { DataTable } from "@/components/ui/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Reservation } from "@/lib/types";

export default function AdminReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const data = await getReservations();
      setReservations(data);
    } catch (error) {
      console.error("Failed to fetch reservations", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (
    id: number,
    status: "confirmed" | "cancelled",
  ) => {
    setUpdatingId(id);
    try {
      await updateReservationStatus(id, status);
      await fetchReservations();
    } catch (error) {
      console.error("Status update failed", error);
    } finally {
      setUpdatingId(null);
    }
  };

  const total = reservations.length;
  const pending = reservations.filter((r) => r.status === "pending").length;
  const confirmed = reservations.filter((r) => r.status === "confirmed").length;

  const columns: ColumnDef<Reservation>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => (
        <div className="font-mono text-lg font-bold text-orange-600">
          #{row.original.id}
        </div>
      ),
    },
    {
      accessorKey: "customerName",
      header: "Customer",
      cell: ({ row }) => row.original.customerName,
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => row.original.date,
    },
    {
      accessorKey: "time",
      header: "Time",
      cell: ({ row }) => row.original.time,
    },
    {
      accessorKey: "guests",
      header: "Guests",
      cell: ({ row }) => row.original.guests,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        const className =
          status === "confirmed"
            ? "bg-emerald-500"
            : status === "pending"
              ? "bg-orange-500 animate-pulse"
              : "bg-red-500";
        return <Badge className={className}>{status.toUpperCase()}</Badge>;
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          {row.original.status === "pending" && (
            <>
              <Button
                size="sm"
                onClick={() => handleStatusUpdate(row.original.id, "confirmed")}
                disabled={updatingId === row.original.id}
              >
                Confirm
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleStatusUpdate(row.original.id, "cancelled")}
                disabled={updatingId === row.original.id}
              >
                Cancel
              </Button>
            </>
          )}
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              // Simple alert for details since no Dialog
              alert(
                `Name: ${row.original.customerName}\nEmail: ${row.original.customerEmail}\nPhone: ${row.original.phone}\nDate: ${row.original.date}\nTime: ${row.original.time}\nGuests: ${row.original.guests}\nNotes: ${row.original.specialNotes || "None"}`,
              );
            }}
          >
            Details
          </Button>
        </div>
      ),
    },
  ];

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent">
          Reservations ({total})
        </h1>
        <Button onClick={fetchReservations}>Refresh</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl text-orange-600 font-bold">
              {total}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl text-orange-500 font-bold animate-pulse">
              {pending}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl text-emerald-600 font-bold">
              {confirmed}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Confirmed</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <DataTable columns={columns} data={reservations} />
        </CardContent>
      </Card>
    </div>
  );
}
