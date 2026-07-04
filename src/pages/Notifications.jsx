import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../api/axios";
import socket from "../socket/socket";
import { useAuth } from "../context/AuthContext";

export default function Notifications() {
  const { userInfo } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      setLoading(true);

      const { data } = await API.get("/notifications");

      console.log("Notifications API Response:", data);

      setNotifications(data.notifications || []);
    } catch (error) {
      console.log(
        "Notification fetch error:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();

    const userId = userInfo?.user?._id || userInfo?.user?.id;

    if (userId) {
      socket.connect();
      socket.emit("joinUserRoom", userId);

      socket.on("notification", (notification) => {
        setNotifications((prev) => [notification, ...prev]);
      });
    }

    return () => {
      socket.off("notification");
    };
  }, [userInfo]);

  const markAsRead = async (id) => {
    try {
      await API.put(`/notifications/${id}/read`);
      fetchNotifications();
    } catch (error) {
      console.log(
        "Mark as read error:",
        error.response?.data || error.message
      );
    }
  };

  const markAllAsRead = async () => {
    try {
      await API.put("/notifications/read-all");
      fetchNotifications();
    } catch (error) {
      console.log(
        "Mark all as read error:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <Layout>
      <div className="min-h-screen animate-[fadeIn_0.5s_ease-in-out]">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 p-6 shadow-2xl shadow-indigo-950/20 md:p-8">
          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl"></div>
          <div className="absolute -bottom-24 left-20 h-56 w-56 rounded-full bg-indigo-500/20 blur-3xl"></div>

          <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
                Realtime Updates
              </p>
              <h1 className="text-3xl font-black tracking-tight text-white md:text-4xl">
                Notifications
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 md:text-base">
                Track realtime ticket activity, user actions, and important
                support workflow updates.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-white shadow-xl backdrop-blur-xl">
                <p className="text-sm text-slate-300">Total Updates</p>
                <p className="mt-1 text-3xl font-black">
                  {notifications.length}
                </p>
              </div>

              <button
                onClick={markAllAsRead}
                className="rounded-2xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-black text-white shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20"
              >
                Mark all as read
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="rounded-3xl border border-slate-200/80 bg-white/85 p-5 shadow-lg shadow-slate-200/60 backdrop-blur-xl md:p-6"
                >
                  <div className="animate-pulse">
                    <div className="flex justify-between gap-4">
                      <div className="w-full">
                        <div className="h-5 w-3/4 rounded-full bg-slate-200"></div>
                        <div className="mt-3 h-4 w-32 rounded-full bg-slate-200"></div>
                        <div className="mt-2 h-4 w-56 rounded-full bg-slate-200"></div>
                      </div>
                      <div className="h-10 w-28 rounded-2xl bg-slate-200"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : notifications.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white/80 p-10 text-center shadow-lg shadow-slate-200/50 backdrop-blur-xl">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-indigo-50 text-3xl">
                🔔
              </div>
              <h2 className="mt-4 text-xl font-black text-slate-900">
                No notifications found
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Realtime ticket updates will appear here.
              </p>
            </div>
          ) : (
            notifications.map((item, index) => (
              <div
                key={item._id}
                className={`group rounded-3xl border p-5 shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl md:p-6 ${
                  item.isRead
                    ? "border-slate-200/80 bg-white/75 opacity-75 shadow-slate-200/60"
                    : "border-indigo-200 bg-white/90 shadow-indigo-100"
                }`}
                style={{
                  animation: `slideUp 0.45s ease-out ${index * 0.05}s both`,
                }}
              >
                <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
                  <div className="flex gap-4">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-xl shadow-lg ${
                        item.isRead
                          ? "bg-slate-100 text-slate-500"
                          : "bg-gradient-to-br from-indigo-600 to-cyan-500 text-white shadow-indigo-500/20"
                      }`}
                    >
                      🔔
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        {!item.isRead && (
                          <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-black uppercase tracking-wide text-indigo-700">
                            New
                          </span>
                        )}

                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black uppercase tracking-wide text-slate-500">
                          {item.type}
                        </span>
                      </div>

                      <p className="mt-3 font-bold leading-6 text-slate-900">
                        {item.message}
                      </p>

                      <div className="mt-4 grid gap-3 text-sm md:grid-cols-2">
                        {item.user && (
                          <div className="rounded-2xl bg-slate-50 px-4 py-3">
                            <p className="text-xs font-black uppercase tracking-wide text-slate-400">
                              User
                            </p>
                            <p className="mt-1 font-bold text-slate-800">
                              {item.user.name} ({item.user.role})
                            </p>
                          </div>
                        )}

                        {item.ticket && (
                          <div className="rounded-2xl bg-indigo-50/70 px-4 py-3">
                            <p className="text-xs font-black uppercase tracking-wide text-indigo-400">
                              Ticket
                            </p>
                            <p className="mt-1 font-bold text-slate-800">
                              {item.ticket.title}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {!item.isRead && (
                    <button
                      onClick={() => markAsRead(item._id)}
                      className="rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/30"
                    >
                      Mark as read
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        <style>
          {`
            @keyframes slideUp {
              from {
                opacity: 0;
                transform: translateY(18px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            @keyframes fadeIn {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }
          `}
        </style>
      </div>
    </Layout>
  );
}