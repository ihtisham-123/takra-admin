"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (data.success) {
          setUser(data.data.user);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  // Mock data for registered events
  const registeredEvents = [
    { id: 1, name: "Debate Competition", category: "Speaking", date: "March 15, 2026", status: "confirmed" },
    { id: 2, name: "Quiz Bowl", category: "Academic", date: "March 18, 2026", status: "pending" },
    { id: 3, name: "Photography Contest", category: "Arts", date: "March 20, 2026", status: "confirmed" },
  ];

  // Mock data for upcoming events
  const upcomingEvents = [
    { id: 1, name: "Opening Ceremony", date: "March 14, 2026", time: "10:00 AM", venue: "Main Auditorium" },
    { id: 2, name: "Debate Competition", date: "March 15, 2026", time: "2:00 PM", venue: "Hall A" },
    { id: 3, name: "Quiz Bowl Finals", date: "March 18, 2026", time: "4:00 PM", venue: "Conference Room" },
  ];

  // Mock announcements
  const announcements = [
    { id: 1, title: "Registration Deadline Extended", date: "Feb 10, 2026", type: "important" },
    { id: 2, title: "New Event: AI Challenge Added", date: "Feb 8, 2026", type: "new" },
    { id: 3, title: "Venue Update for Photography Contest", date: "Feb 5, 2026", type: "update" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Top Banner */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-900 via-red-800 to-red-900"></div>
      <div className="absolute top-2 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500"></div>

      {/* Header Section */}
      <header className="relative pt-20 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            {/* User Welcome */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-900 to-red-700 flex items-center justify-center shadow-lg shadow-red-900/20">
                <span className="text-white font-bold text-2xl">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </span>
              </div>
              <div>
                <p className="text-gray-500 text-sm tracking-wide uppercase">Welcome back</p>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{user?.name || "User"}</h1>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
            {[
              { id: "overview", label: "Overview" },
              { id: "events", label: "My Events" },
              { id: "profile", label: "Profile" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all
                  ${activeTab === tab.id
                    ? "bg-red-900 text-white shadow-lg shadow-red-900/20"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-red-200 hover:text-red-800"
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Registered Events", value: "3", icon: "📋" },
                  { label: "Confirmed", value: "2", icon: "✅" },
                  { label: "Pending", value: "1", icon: "⏳" },
                  { label: "Days Until Event", value: "28", icon: "📅" },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-red-100 transition-all"
                  >
                    <span className="text-2xl mb-2 block">{stat.icon}</span>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-gray-500 mt-1 uppercase tracking-wide">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Two Column Layout */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Upcoming Events */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="font-semibold text-gray-900">Upcoming Schedule</h2>
                    <span className="text-xs text-red-800 bg-red-50 px-3 py-1 rounded-full">Next 7 Days</span>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {upcomingEvents.map((event) => (
                      <div key={event.id} className="px-6 py-4 hover:bg-gray-50/50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium text-gray-900">{event.name}</h3>
                            <p className="text-sm text-gray-500 mt-1">{event.venue}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-red-800">{event.date}</p>
                            <p className="text-xs text-gray-400 mt-1">{event.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Announcements */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="font-semibold text-gray-900">Announcements</h2>
                    <span className="text-xs text-amber-700 bg-amber-50 px-3 py-1 rounded-full">3 New</span>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {announcements.map((item) => (
                      <div key={item.id} className="px-6 py-4 hover:bg-gray-50/50 transition-colors">
                        <div className="flex items-start gap-3">
                          <span
                            className={`
                              w-2 h-2 rounded-full mt-2 shrink-0
                              ${item.type === "important" ? "bg-red-500" : ""}
                              ${item.type === "new" ? "bg-green-500" : ""}
                              ${item.type === "update" ? "bg-blue-500" : ""}
                            `}
                          ></span>
                          <div>
                            <h3 className="font-medium text-gray-900">{item.title}</h3>
                            <p className="text-xs text-gray-400 mt-1">{item.date}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Actions Card */}
              <div className="bg-gradient-to-r from-red-900 to-red-800 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="relative z-10">
                  <h2 className="text-xl md:text-2xl font-bold mb-2">Ready to compete?</h2>
                  <p className="text-red-100 mb-6 max-w-md">
                    Browse available events and register for competitions that match your skills.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button className="px-6 py-3 bg-white text-red-900 rounded-full font-medium hover:bg-gray-100 transition-all shadow-lg">
                      Browse Events
                    </button>
                    <button className="px-6 py-3 bg-red-800 text-white rounded-full font-medium border border-red-700 hover:bg-red-700 transition-all">
                      View Schedule
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Events Tab */}
          {activeTab === "events" && (
            <div className="space-y-6">
              {/* Events Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">My Registered Events</h2>
                <button className="px-5 py-2.5 bg-red-900 text-white rounded-full text-sm font-medium hover:bg-red-800 transition-all shadow-lg shadow-red-900/20">
                  + Register New
                </button>
              </div>

              {/* Events List */}
              <div className="space-y-4">
                {registeredEvents.map((event) => (
                  <div
                    key={event.id}
                    className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md hover:border-red-100 transition-all"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-red-800 text-xl">
                          {event.category === "Speaking" && "🎤"}
                          {event.category === "Academic" && "📚"}
                          {event.category === "Arts" && "🎨"}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{event.name}</h3>
                          <p className="text-sm text-gray-500 mt-1">{event.category} • {event.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`
                            px-4 py-1.5 rounded-full text-xs font-medium
                            ${event.status === "confirmed"
                              ? "bg-green-50 text-green-700 border border-green-200"
                              : "bg-amber-50 text-amber-700 border border-amber-200"
                            }
                          `}
                        >
                          {event.status === "confirmed" ? "Confirmed" : "Pending"}
                        </span>
                        <button className="p-2 text-gray-400 hover:text-red-800 transition-colors">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Empty State (hidden when events exist) */}
              {registeredEvents.length === 0 && (
                <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">📋</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No events registered yet</h3>
                  <p className="text-gray-500 mb-6">Start by browsing available events and registering for competitions.</p>
                  <button className="px-6 py-3 bg-red-900 text-white rounded-full font-medium hover:bg-red-800 transition-all">
                    Browse Events
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              {/* Profile Card */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-red-900 to-red-800 h-24 relative">
                  <div className="absolute -bottom-8 left-6">
                    <div className="w-20 h-20 rounded-2xl bg-white border-4 border-white shadow-lg flex items-center justify-center">
                      <span className="text-red-800 font-bold text-3xl">
                        {user?.name?.charAt(0)?.toUpperCase() || "U"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="pt-12 pb-6 px-6">
                  <h2 className="text-xl font-bold text-gray-900">{user?.name || "User"}</h2>
                  <p className="text-gray-500">{user?.email}</p>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full border border-green-200">
                      Active
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                      {user?.role || "Participant"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Profile Form */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-6">Profile Information</h3>
                <div className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-gray-600 text-xs tracking-wider uppercase mb-2 font-medium">
                        Full Name
                      </label>
                      <input
                        type="text"
                        defaultValue={user?.name || ""}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 text-xs tracking-wider uppercase mb-2 font-medium">
                        Email Address
                      </label>
                      <input
                        type="email"
                        defaultValue={user?.email || ""}
                        disabled
                        className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-gray-600 text-xs tracking-wider uppercase mb-2 font-medium">
                        University
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your university"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 text-xs tracking-wider uppercase mb-2 font-medium">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="Enter your phone number"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 transition-all"
                      />
                    </div>
                  </div>
                  <div className="pt-4 flex justify-end">
                    <button className="px-6 py-3 bg-red-900 text-white rounded-full font-medium hover:bg-red-800 transition-all shadow-lg shadow-red-900/20">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>

              {/* Security Section */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-6">Security</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <h4 className="font-medium text-gray-900">Change Password</h4>
                      <p className="text-sm text-gray-500 mt-1">Update your password regularly for security</p>
                    </div>
                    <button className="px-4 py-2 text-red-800 font-medium hover:bg-red-50 rounded-lg transition-colors">
                      Update
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-500 mt-1">Add an extra layer of security</p>
                    </div>
                    <button className="px-4 py-2 text-red-800 font-medium hover:bg-red-50 rounded-lg transition-colors">
                      Enable
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-gray-500">
            © 2026 UCP TAAKRA. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
