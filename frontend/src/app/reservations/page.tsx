"use client";

import { useState } from "react";
import { createReservation } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useRouter } from "next/navigation";

export default function Reservations() {
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("18:00");
  const [guests, setGuests] = useState(2);
  const [specialNotes, setSpecialNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createReservation({
        customerName,
        customerEmail,
        phone,
        date,
        time,
        guests,
        specialNotes,
      });
      router.push("/reservations-success");
    } catch (error) {
      console.error("Reservation failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-500 via-red-500 to-orange-600 min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 text-center text-white relative z-10">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 drop-shadow-2xl animate-fade-in-up">
            Reserve Your Table
          </h1>
          <p className="text-2xl md:text-3xl mb-12 max-w-3xl mx-auto opacity-95 leading-relaxed drop-shadow-lg">
            Experience farm-to-table dining at its finest. Limited seats
            available daily.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-2xl mx-auto">
            <Button
              size="lg"
              className="text-xl px-12 py-6 bg-white text-orange-600 font-black rounded-2xl shadow-2xl hover:shadow-orange-500/50 hover:scale-105 transition-all duration-300 h-auto"
            >
              Book Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-xl px-12 py-6 border-2 border-white font-black rounded-2xl backdrop-blur-sm bg-white/20 hover:bg-white/30 hover:scale-105 transition-all duration-300 h-auto"
            >
              View Menu
            </Button>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-24 px-4 -mt-20 relative">
        <div className="container mx-auto max-w-2xl">
          <Card className="shadow-2xl border-0 bg-gradient-to-br from-white via-white/90 to-white/50 backdrop-blur-xl border-orange-200/50 rounded-3xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-12 pb-8">
              <CardTitle className="text-4xl font-black text-center mb-4">
                🍽️ Booking Form
              </CardTitle>
              <p className="text-xl text-center opacity-95">
                Complete your reservation in 30 seconds
              </p>
            </CardHeader>
            <CardContent className="p-12">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <Label className="text-xl font-bold text-gray-800 mb-3 block">
                      👤 Full Name
                    </Label>
                    <Input
                      className="h-16 text-xl rounded-2xl border-2 border-orange-200 focus:border-orange-400 shadow-lg hover:shadow-xl transition-all duration-300 px-6"
                      placeholder="John Doe"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label className="text-xl font-bold text-gray-800 mb-3 block">
                      📧 Email
                    </Label>
                    <Input
                      type="email"
                      className="h-16 text-xl rounded-2xl border-2 border-orange-200 focus:border-orange-400 shadow-lg hover:shadow-xl transition-all duration-300 px-6"
                      placeholder="john@example.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <Label className="text-xl font-bold text-gray-800 mb-3 block">
                      📞 Phone
                    </Label>
                    <Input
                      type="tel"
                      className="h-16 text-xl rounded-2xl border-2 border-orange-200 focus:border-orange-400 shadow-lg hover:shadow-xl transition-all duration-300 px-6"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label className="text-xl font-bold text-gray-800 mb-3 block">
                      🗓️ Date
                    </Label>
                    <Input
                      type="date"
                      className="h-16 text-xl rounded-2xl border-2 border-orange-200 focus:border-orange-400 shadow-lg hover:shadow-xl transition-all duration-300 px-6"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <Label className="text-xl font-bold text-gray-800 mb-3 block">
                      🕒 Time
                    </Label>
                    <Input
                      type="time"
                      className="h-16 text-xl rounded-2xl border-2 border-orange-200 focus:border-orange-400 shadow-lg hover:shadow-xl transition-all duration-300 px-6 font-semibold"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      min="17:00"
                      max="22:00"
                      required
                    />
                  </div>
                  <div>
                    <Label className="text-xl font-bold text-gray-800 mb-3 block">
                      👥 Guests
                    </Label>
                    <Input
                      type="number"
                      min="1"
                      max="12"
                      value={guests}
                      onChange={(e) =>
                        setGuests(Math.max(1, parseInt(e.target.value || "1")))
                      }
                      className="h-16 text-2xl font-bold text-center rounded-2xl border-4 border-orange-300 focus:border-orange-500 shadow-2xl hover:shadow-orange-400/50 transition-all duration-300 text-orange-600"
                      placeholder="2"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-xl font-bold text-gray-800 mb-3 block">
                    💬 Special Requests
                  </Label>
                  <Input
                    className="h-20 text-xl rounded-2xl border-2 border-orange-200 focus:border-orange-400 shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-4 resize-none"
                    placeholder="Dietary restrictions, birthday celebration, window table, etc..."
                    value={specialNotes}
                    onChange={(e) => setSpecialNotes(e.target.value)}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-20 text-2xl font-black bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 hover:from-orange-600 hover:via-red-600 hover:to-orange-700 shadow-2xl hover:shadow-orange-500/50 transform hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 rounded-3xl border-4 border-orange-400 backdrop-blur-sm text-white"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin mr-4" />
                      Booking your table...
                    </>
                  ) : (
                    "🎉 Reserve My Table"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
