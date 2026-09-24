import React, { useState, useMemo } from "react";
import { 
  LayoutDashboard, Calendar as CalendarIcon, Users, Scissors, Star, 
  Search, Plus, Trash2, Edit3, CheckCircle2, Clock, XCircle, AlertCircle, 
  TrendingUp, IndianRupee, ShieldAlert, ArrowUpRight, Check 
} from "lucide-react";
import { useAppStore, BookingRecord } from "@/store/useBookingStore";
import { formatCurrency, formatDuration } from "@/lib/utils";
import { stylists } from "@/data/stylists";
import { salonReviews } from "@/data/reviews";
import { ServiceCategory } from "@/data/services";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

interface AdminPageProps {
  onNavigate: (route: string) => void;
}

export function AdminPage({ onNavigate }: AdminPageProps) {
  const [activeTab, setActiveTab] = useState<"dashboard" | "calendar" | "appointments" | "services" | "clients" | "reviews">("dashboard");
  const [searchFilter, setSearchFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const { bookings, updateBookingStatus, deleteBooking, customServices, addCustomService, deleteCustomService } = useAppStore();

  // Add new service modal state
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false);
  const [newServiceName, setNewServiceName] = useState("");
  const [newServiceCat, setNewServiceCat] = useState<ServiceCategory>("Cuts & Styling");
  const [newServicePrice, setNewServicePrice] = useState("3200");
  const [newServiceDuration, setNewServiceDuration] = useState("45");
  const [newServiceDesc, setNewServiceDesc] = useState("");

  // Key metrics
  const totalRevenue = useMemo(() => {
    return bookings.reduce((sum, b) => (b.status !== "cancelled" ? sum + b.totalAmount : sum), 0);
  }, [bookings]);

  const confirmedCount = bookings.filter((b) => b.status === "confirmed").length;
  const completedCount = bookings.filter((b) => b.status === "completed").length;
  const pendingCount = bookings.filter((b) => b.status === "pending").length;

  // Chart data for revenue trend
  const chartData = [
    { day: "Mon", revenue: 14500 },
    { day: "Tue", revenue: 28000 },
    { day: "Wed", revenue: 34500 },
    { day: "Thu", revenue: 42000 },
    { day: "Fri", revenue: 68000 },
    { day: "Sat", revenue: 94000 },
    { day: "Sun", revenue: 86500 },
  ];

  // Filtered bookings
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const matchSearch =
        b.clientName.toLowerCase().includes(searchFilter.toLowerCase()) ||
        b.bookingRef.toLowerCase().includes(searchFilter.toLowerCase()) ||
        b.stylistName.toLowerCase().includes(searchFilter.toLowerCase());
      const matchStatus = statusFilter === "all" || b.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [bookings, searchFilter, statusFilter]);

  const handleCreateService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceName) return;
    addCustomService({
      id: `srv-custom-${Date.now()}`,
      name: newServiceName,
      category: newServiceCat,
      duration: Number(newServiceDuration) || 45,
      price: Number(newServicePrice) || 3000,
      description: newServiceDesc || "Custom treatment formulated by Aura Studio Director.",
      signature: false,
    });
    setNewServiceName("");
    setNewServiceDesc("");
    setIsAddServiceOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F6F1EA] dark:bg-[#120E0C] text-[#1B1512] dark:text-[#F6F1EA]">
      {/* Demo Notice Banner */}
      <div className="bg-[#1B1512] text-white px-4 py-2.5 text-xs flex flex-col sm:flex-row items-center justify-between gap-2 border-b border-[#B8935A]/40">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-[#B8935A] shrink-0" />
          <span>
            <strong>Client Pitch Demo Mode:</strong> This console is wired directly to the live booking engine. Any booking made on the public site appears here in real-time.
          </span>
        </div>
        <button
          onClick={() => onNavigate("/book")}
          className="text-xs text-[#B8935A] hover:underline font-semibold flex items-center gap-1 shrink-0"
        >
          <span>Test Live Public Booking</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Admin Sidebar Navigation */}
          <div className="lg:col-span-3 bg-white dark:bg-[#1A1412] p-4 rounded-3xl border border-[#B8935A]/25 shadow-sm space-y-2">
            <div className="px-3 py-2 border-b border-[#B8935A]/15 mb-2">
              <span className="text-[10px] uppercase tracking-widest text-[#B8935A] font-bold block">
                Management Atelier
              </span>
              <h2 className="font-serif text-lg font-bold text-[#1B1512] dark:text-[#F6F1EA]">
                Aura & Co. Console
              </h2>
            </div>

            <button
              onClick={() => setActiveTab("dashboard")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold transition-all ${
                activeTab === "dashboard"
                  ? "bg-[#B8935A] text-white shadow"
                  : "text-stone-600 dark:text-stone-300 hover:bg-[#B8935A]/10"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard Overview</span>
            </button>

            <button
              onClick={() => setActiveTab("appointments")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-semibold transition-all ${
                activeTab === "appointments"
                  ? "bg-[#B8935A] text-white shadow"
                  : "text-stone-600 dark:text-stone-300 hover:bg-[#B8935A]/10"
              }`}
            >
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4" />
                <span>Appointments</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-white/20 font-bold">
                {bookings.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("calendar")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold transition-all ${
                activeTab === "calendar"
                  ? "bg-[#B8935A] text-white shadow"
                  : "text-stone-600 dark:text-stone-300 hover:bg-[#B8935A]/10"
              }`}
            >
              <CalendarIcon className="w-4 h-4" />
              <span>Stylist Schedule</span>
            </button>

            <button
              onClick={() => setActiveTab("services")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-semibold transition-all ${
                activeTab === "services"
                  ? "bg-[#B8935A] text-white shadow"
                  : "text-stone-600 dark:text-stone-300 hover:bg-[#B8935A]/10"
              }`}
            >
              <div className="flex items-center gap-3">
                <Scissors className="w-4 h-4" />
                <span>Services Catalog</span>
              </div>
              {customServices.length > 0 && (
                <span className="text-[10px] text-[#B8935A] font-bold">+{customServices.length} custom</span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("clients")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold transition-all ${
                activeTab === "clients"
                  ? "bg-[#B8935A] text-white shadow"
                  : "text-stone-600 dark:text-stone-300 hover:bg-[#B8935A]/10"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Patron Directory</span>
            </button>

            <button
              onClick={() => setActiveTab("reviews")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold transition-all ${
                activeTab === "reviews"
                  ? "bg-[#B8935A] text-white shadow"
                  : "text-stone-600 dark:text-stone-300 hover:bg-[#B8935A]/10"
              }`}
            >
              <Star className="w-4 h-4" />
              <span>Google Feedback</span>
            </button>
          </div>

          {/* Main Admin View Content */}
          <div className="lg:col-span-9 space-y-6">
            {/* TAB 1: DASHBOARD OVERVIEW */}
            {activeTab === "dashboard" && (
              <div className="space-y-6">
                {/* 4 Stat KPI Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-white dark:bg-[#1A1412] p-5 rounded-2xl border border-[#B8935A]/20 shadow-sm">
                    <span className="text-[11px] text-stone-500 font-semibold uppercase tracking-wider block">
                      Confirmed Bookings
                    </span>
                    <div className="font-serif text-3xl font-bold text-[#1B1512] dark:text-[#F6F1EA] mt-1">
                      {confirmedCount}
                    </div>
                    <span className="text-[10px] text-emerald-600 font-medium">● Ready for chair</span>
                  </div>

                  <div className="bg-white dark:bg-[#1A1412] p-5 rounded-2xl border border-[#B8935A]/20 shadow-sm">
                    <span className="text-[11px] text-stone-500 font-semibold uppercase tracking-wider block">
                      Pending Approvals
                    </span>
                    <div className="font-serif text-3xl font-bold text-amber-500 mt-1">
                      {pendingCount}
                    </div>
                    <span className="text-[10px] text-stone-400">Needs coordinator call</span>
                  </div>

                  <div className="bg-white dark:bg-[#1A1412] p-5 rounded-2xl border border-[#B8935A]/20 shadow-sm">
                    <span className="text-[11px] text-stone-500 font-semibold uppercase tracking-wider block">
                      Fulfilled Rituals
                    </span>
                    <div className="font-serif text-3xl font-bold text-stone-700 dark:text-stone-200 mt-1">
                      {completedCount}
                    </div>
                    <span className="text-[10px] text-emerald-600 font-medium">+14% vs last week</span>
                  </div>

                  <div className="bg-white dark:bg-[#1A1412] p-5 rounded-2xl border border-[#B8935A]/20 shadow-sm">
                    <span className="text-[11px] text-stone-500 font-semibold uppercase tracking-wider block">
                      Pipeline Volume
                    </span>
                    <div className="font-serif text-2xl font-bold text-[#B8935A] mt-1">
                      {formatCurrency(totalRevenue)}
                    </div>
                    <span className="text-[10px] text-stone-400">Active reservation pool</span>
                  </div>
                </div>

                {/* Recharts Chart: Revenue / Booking Trend */}
                <div className="bg-white dark:bg-[#1A1412] p-6 rounded-3xl border border-[#B8935A]/20 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-[#1B1512] dark:text-[#F6F1EA]">
                        Weekly Revenue Trajectory
                      </h3>
                      <p className="text-xs text-stone-500">Gross salon revenue across chairs (₹ INR)</p>
                    </div>
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 text-xs font-semibold rounded-full flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" /> +22.8% YoY
                    </span>
                  </div>

                  <div className="h-64 w-full pt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#B8935A" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#B8935A" stopOpacity={0.0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                        <XAxis dataKey="day" stroke="#888888" fontSize={11} tickLine={false} />
                        <YAxis stroke="#888888" fontSize={11} tickLine={false} tickFormatter={(v) => `₹${v / 1000}k`} />
                        <Tooltip
                          formatter={(value: any) => [`₹${Number(value).toLocaleString("en-IN")}`, "Gross Revenue"]}
                          contentStyle={{ backgroundColor: "#1B1512", borderColor: "#B8935A", borderRadius: "12px", color: "#fff", fontSize: "12px" }}
                        />
                        <Area type="monotone" dataKey="revenue" stroke="#B8935A" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRev)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Quick Next Appointments Table Preview */}
                <div className="bg-white dark:bg-[#1A1412] p-6 rounded-3xl border border-[#B8935A]/20 shadow-sm space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-serif text-xl font-bold">Upcoming Chair Reservations</h3>
                    <button
                      onClick={() => setActiveTab("appointments")}
                      className="text-xs text-[#B8935A] hover:underline font-semibold"
                    >
                      Manage All ({bookings.length}) →
                    </button>
                  </div>

                  <div className="divide-y divide-stone-100 dark:divide-white/5 text-xs">
                    {bookings.slice(0, 3).map((b) => (
                      <div key={b.id} className="py-3 flex items-center justify-between gap-4">
                        <div>
                          <div className="font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                            <span>{b.clientName}</span>
                            <span className="font-mono text-[10px] text-stone-400">({b.bookingRef})</span>
                          </div>
                          <div className="text-stone-500 text-[11px]">
                            {b.date} at {b.timeSlot} · {b.stylistName}
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="font-serif font-bold text-[#B8935A]">
                            {formatCurrency(b.totalAmount)}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                              b.status === "confirmed"
                                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                                : b.status === "completed"
                                ? "bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300"
                                : "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                            }`}
                          >
                            {b.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: APPOINTMENTS FULL TABLE & ACTIONS */}
            {activeTab === "appointments" && (
              <div className="bg-white dark:bg-[#1A1412] p-6 sm:p-8 rounded-3xl border border-[#B8935A]/20 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="font-serif text-2xl font-bold">Appointment Central</h3>
                    <p className="text-xs text-stone-500">Live synchronized bookings across online & front-desk</p>
                  </div>

                  {/* Filters */}
                  <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-48">
                      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
                      <input
                        type="text"
                        placeholder="Search ref, patron..."
                        value={searchFilter}
                        onChange={(e) => setSearchFilter(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 text-xs bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl"
                      />
                    </div>

                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-3 py-1.5 text-xs bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl"
                    >
                      <option value="all">All Statuses</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-stone-200 dark:border-stone-800 text-stone-400 font-semibold uppercase tracking-wider text-[10px]">
                        <th className="pb-3">Ref & Guest</th>
                        <th className="pb-3">Date & Slot</th>
                        <th className="pb-3">Stylist</th>
                        <th className="pb-3">Services</th>
                        <th className="pb-3">Total</th>
                        <th className="pb-3">Status</th>
                        <th className="pb-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 dark:divide-stone-900">
                      {filteredBookings.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="py-8 text-center text-stone-400">
                            No appointments found matching filter.
                          </td>
                        </tr>
                      ) : (
                        filteredBookings.map((b) => (
                          <tr key={b.id} className="hover:bg-stone-50/50 dark:hover:bg-white/5 transition-colors">
                            <td className="py-3.5 pr-2">
                              <div className="font-semibold text-stone-900 dark:text-stone-100">{b.clientName}</div>
                              <div className="text-[10px] text-stone-400 font-mono">{b.bookingRef} · {b.clientPhone}</div>
                            </td>
                            <td className="py-3.5 pr-2 whitespace-nowrap">
                              <div className="font-medium">{b.date}</div>
                              <div className="text-[11px] text-stone-500">{b.timeSlot}</div>
                            </td>
                            <td className="py-3.5 pr-2 whitespace-nowrap">
                              <span className="font-medium text-[#B8935A]">{b.stylistName}</span>
                            </td>
                            <td className="py-3.5 pr-2">
                              <div className="max-w-[180px] truncate text-stone-700 dark:text-stone-300">
                                {b.services.map((s) => s.name).join(", ")}
                              </div>
                            </td>
                            <td className="py-3.5 pr-2 font-serif font-bold text-[#B8935A] whitespace-nowrap">
                              {formatCurrency(b.totalAmount)}
                            </td>
                            <td className="py-3.5 pr-2">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                                  b.status === "confirmed"
                                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                                    : b.status === "completed"
                                    ? "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300"
                                    : b.status === "cancelled"
                                    ? "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300"
                                    : "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                                }`}
                              >
                                {b.status}
                              </span>
                            </td>
                            <td className="py-3.5 text-right whitespace-nowrap">
                              <div className="inline-flex items-center gap-1.5">
                                {b.status !== "confirmed" && (
                                  <button
                                    onClick={() => updateBookingStatus(b.id, "confirmed")}
                                    className="p-1 text-emerald-600 hover:bg-emerald-50 rounded"
                                    title="Mark Confirmed"
                                  >
                                    <Check className="w-3.5 h-3.5" />
                                  </button>
                                )}
                                {b.status !== "completed" && (
                                  <button
                                    onClick={() => updateBookingStatus(b.id, "completed")}
                                    className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                                    title="Mark Completed"
                                  >
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                  </button>
                                )}
                                {b.status !== "cancelled" && (
                                  <button
                                    onClick={() => updateBookingStatus(b.id, "cancelled")}
                                    className="p-1 text-rose-600 hover:bg-rose-50 rounded"
                                    title="Cancel"
                                  >
                                    <XCircle className="w-3.5 h-3.5" />
                                  </button>
                                )}
                                <button
                                  onClick={() => deleteBooking(b.id)}
                                  className="p-1 text-stone-400 hover:text-red-500 rounded"
                                  title="Delete record"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 3: CALENDAR BY STYLIST */}
            {activeTab === "calendar" && (
              <div className="bg-white dark:bg-[#1A1412] p-6 sm:p-8 rounded-3xl border border-[#B8935A]/20 shadow-sm space-y-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold">Stylist Weekly Chair Roster</h3>
                  <p className="text-xs text-stone-500">Live chair assignments and active bookings for this week</p>
                </div>

                <div className="space-y-6">
                  {stylists.map((st) => {
                    const stylistBookings = bookings.filter((b) => b.stylistId === st.id && b.status !== "cancelled");
                    return (
                      <div key={st.id} className="p-5 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <img src={st.image} alt={st.name} className="w-10 h-10 rounded-full object-cover border" />
                            <div>
                              <h4 className="font-serif text-base font-bold">{st.name}</h4>
                              <p className="text-[11px] text-[#B8935A]">{st.role}</p>
                            </div>
                          </div>
                          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#B8935A]/10 text-[#B8935A]">
                            {stylistBookings.length} Active Chair Sessions
                          </span>
                        </div>

                        {stylistBookings.length === 0 ? (
                          <p className="text-xs text-stone-400 italic">No appointments booked for this master yet.</p>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                            {stylistBookings.map((sb) => (
                              <div key={sb.id} className="p-3 bg-stone-50 dark:bg-white/5 rounded-xl text-xs space-y-1">
                                <div className="flex justify-between font-semibold">
                                  <span>{sb.clientName}</span>
                                  <span className="text-[#B8935A]">{sb.timeSlot}</span>
                                </div>
                                <div className="text-[11px] text-stone-500">
                                  {sb.date} · {sb.services.map((s) => s.name).join(", ")}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 4: SERVICES CATALOG MANAGER */}
            {activeTab === "services" && (
              <div className="bg-white dark:bg-[#1A1412] p-6 sm:p-8 rounded-3xl border border-[#B8935A]/20 shadow-sm space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-serif text-2xl font-bold">Services & Rituals Manager</h3>
                    <p className="text-xs text-stone-500">Create, adjust pricing, or remove salon services dynamically</p>
                  </div>
                  <button
                    onClick={() => setIsAddServiceOpen(true)}
                    className="px-4 py-2 bg-[#B8935A] hover:bg-[#9E7B45] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New Service</span>
                  </button>
                </div>

                {/* Add Service Modal */}
                {isAddServiceOpen && (
                  <form onSubmit={handleCreateService} className="p-5 rounded-2xl bg-[#B8935A]/10 border border-[#B8935A]/30 space-y-4">
                    <h4 className="font-serif text-lg font-bold">Add New Service to Catalog</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-stone-600 dark:text-stone-300 mb-1">Service Name</label>
                        <input
                          type="text"
                          required
                          value={newServiceName}
                          onChange={(e) => setNewServiceName(e.target.value)}
                          placeholder="e.g. 24K Gold Scalp Detox"
                          className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-stone-900 border"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-stone-600 dark:text-stone-300 mb-1">Category</label>
                        <select
                          value={newServiceCat}
                          onChange={(e) => setNewServiceCat(e.target.value as ServiceCategory)}
                          className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-stone-900 border"
                        >
                          <option>Cuts & Styling</option>
                          <option>Color & Balayage</option>
                          <option>Smoothening & Keratin</option>
                          <option>Treatments & Spa</option>
                          <option>Bridal & Occasion</option>
                          <option>Men's Grooming</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-stone-600 dark:text-stone-300 mb-1">Price (₹)</label>
                        <input
                          type="number"
                          value={newServicePrice}
                          onChange={(e) => setNewServicePrice(e.target.value)}
                          className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-stone-900 border"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-stone-600 dark:text-stone-300 mb-1">Duration (Minutes)</label>
                        <input
                          type="number"
                          value={newServiceDuration}
                          onChange={(e) => setNewServiceDuration(e.target.value)}
                          className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-stone-900 border"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-600 dark:text-stone-300 mb-1">Description</label>
                      <input
                        type="text"
                        value={newServiceDesc}
                        onChange={(e) => setNewServiceDesc(e.target.value)}
                        placeholder="Brief summary of ritual ingredients and outcomes..."
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-stone-900 border"
                      />
                    </div>

                    <div className="flex gap-2">
                      <button type="submit" className="px-5 py-2 bg-[#B8935A] text-white text-xs font-semibold rounded-xl">
                        Save to Catalog
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsAddServiceOpen(false)}
                        className="px-4 py-2 border rounded-xl text-xs"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                {/* Custom Services List */}
                {customServices.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-[#B8935A] uppercase tracking-wider block">
                      Custom Dynamically Added Services ({customServices.length})
                    </span>
                    {customServices.map((cs) => (
                      <div key={cs.id} className="p-3.5 rounded-xl border border-[#B8935A]/30 flex items-center justify-between text-xs">
                        <div>
                          <div className="font-semibold">{cs.name}</div>
                          <div className="text-stone-500">{cs.category} · {cs.duration} mins</div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-serif font-bold text-[#B8935A]">{formatCurrency(cs.price)}</span>
                          <button onClick={() => deleteCustomService(cs.id)} className="text-red-500 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 5: PATRON DIRECTORY */}
            {activeTab === "clients" && (
              <div className="bg-white dark:bg-[#1A1412] p-6 sm:p-8 rounded-3xl border border-[#B8935A]/20 shadow-sm space-y-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold">Patron Log & VIP Dossiers</h3>
                  <p className="text-xs text-stone-500">Profiles generated from confirmed appointments</p>
                </div>

                <div className="divide-y divide-stone-100 dark:divide-white/5 text-xs">
                  {bookings.map((b) => (
                    <div key={b.id} className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <div className="space-y-0.5">
                        <div className="font-semibold text-sm text-stone-900 dark:text-stone-100">
                          {b.clientName}
                        </div>
                        <div className="text-stone-500">
                          WhatsApp: {b.clientPhone} · Email: {b.clientEmail}
                        </div>
                        {b.notes && <div className="text-[11px] text-[#B8935A] italic">Note: "{b.notes}"</div>}
                      </div>

                      <div className="text-right">
                        <div className="font-serif font-bold text-stone-900 dark:text-stone-100">
                          Last Visited: {b.date}
                        </div>
                        <div className="text-[11px] text-stone-400">Total: {formatCurrency(b.totalAmount)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 6: GOOGLE REVIEWS LOG */}
            {activeTab === "reviews" && (
              <div className="bg-white dark:bg-[#1A1412] p-6 sm:p-8 rounded-3xl border border-[#B8935A]/20 shadow-sm space-y-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold">Public Feedback & Google Reviews</h3>
                  <p className="text-xs text-stone-500">Recent ratings left on Google Business profile (Pune)</p>
                </div>

                <div className="space-y-4">
                  {salonReviews.map((rev) => (
                    <div key={rev.id} className="p-4 rounded-2xl border border-stone-200 dark:border-stone-800 text-xs space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                          <span>{rev.author}</span>
                          <span className="text-stone-400 text-[11px]">({rev.location})</span>
                        </div>
                        <div className="flex text-amber-500">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-stone-600 dark:text-stone-300 italic">"{rev.comment}"</p>
                      <div className="text-[11px] text-[#B8935A]">Service by: {rev.stylist}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
