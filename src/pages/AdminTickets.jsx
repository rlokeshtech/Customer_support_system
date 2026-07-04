import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import API from "../api/axios";
import StatusBadge from "../components/StatusBadge";
import PriorityBadge from "../components/PriorityBadge";

export default function AdminTickets() {
  const [tickets, setTickets] = useState([]);
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    search: "",
  });

  const fetchTickets = async () => {
    const { data } = await API.get("/tickets", {
      params: filters,
    });

    setTickets(data.tickets);
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const applyFilters = (e) => {
    e.preventDefault();
    fetchTickets();
  };

  return (
    <Layout>
      <div className="min-h-screen animate-[fadeIn_0.5s_ease-in-out]">
        <div className="relative overflow-hidden rounded-3xl border border-white/70 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 p-6 shadow-2xl shadow-indigo-950/20 md:p-8">
          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl"></div>
          <div className="absolute -bottom-24 left-20 h-56 w-56 rounded-full bg-indigo-500/20 blur-3xl"></div>

          <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
                Admin Control Center
              </p>
              <h1 className="text-3xl font-black tracking-tight text-white md:text-4xl">
                All Tickets
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 md:text-base">
                Manage customer issues, monitor ticket priority, and review agent
                assignments from one clean dashboard.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-white shadow-xl backdrop-blur-xl">
              <p className="text-sm text-slate-300">Total Tickets</p>
              <p className="mt-1 text-3xl font-black">{tickets.length}</p>
            </div>
          </div>
        </div>

        <form
          onSubmit={applyFilters}
          className="mt-1 grid gap-4 rounded-3xl border border-slate-200/80 bg-white/80 p-4 shadow-xl shadow-slate-200/60 backdrop-blur-xl transition-all duration-300 hover:shadow-2xl md:grid-cols-4 md:p-5"
        >
          <div className="relative">
            <input
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
              placeholder="Search title"
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
            />
          </div>

          <select
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 outline-none transition-all duration-300 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            value={filters.status}
            onChange={(e) =>
              setFilters({ ...filters, status: e.target.value })
            }
          >
            <option value="">All Status</option>
            <option value="OPEN">Open</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="WAITING_CUSTOMER">Waiting Customer</option>
            <option value="RESOLVED">Resolved</option>
            <option value="CLOSED">Closed</option>
          </select>

          <select
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 outline-none transition-all duration-300 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            value={filters.priority}
            onChange={(e) =>
              setFilters({ ...filters, priority: e.target.value })
            }
          >
            <option value="">All Priority</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>

          <button className="rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/30 active:translate-y-0">
            Apply Filters
          </button>
        </form>

        <div className="mt-3 space-y-4">
          {tickets.map((ticket, index) => (
            <Link
              key={ticket._id}
              to={`/ticket/${ticket._id}`}
              className="group block rounded-3xl border border-slate-200/80 bg-white/85 p-5 shadow-lg shadow-slate-200/60 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-100 md:p-6"
              style={{
                animation: `slideUp 0.45s ease-out ${index * 0.05}s both`,
              }}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-cyan-500 text-sm font-black text-white shadow-lg shadow-indigo-500/20">
                      #{index + 1}
                    </span>

                    <h2 className="line-clamp-1 text-xl font-black tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-indigo-700">
                      {ticket.title}
                    </h2>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <StatusBadge status={ticket.status} />
                  <PriorityBadge priority={ticket.priority} />
                </div>
              </div>

              <p className=" line-clamp-2 text-sm leading-6 text-slate-500">
                {ticket.description}
              </p>

              <div className=" grid gap-3 border-t border-slate-100 pt-4 text-sm md:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 px-4 py-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                    Customer
                  </p>
                  <p className="mt-1 font-bold text-slate-800">
                    {ticket.createdBy?.name || "Unknown"}
                  </p>
                </div>

                <div className="rounded-2xl bg-indigo-50/70 px-4 py-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-indigo-400">
                    Assigned Agent
                  </p>
                  <p className="mt-1 font-bold text-slate-800">
                    {ticket.assignedTo?.name || "Not assigned"}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {tickets.length === 0 && (
          <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-white/80 p-10 text-center shadow-lg shadow-slate-200/50 backdrop-blur-xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-indigo-50 text-3xl">
              🎫
            </div>
            <h2 className="mt-4 text-xl font-black text-slate-900">
              No tickets found
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Try changing the search, status, or priority filters.
            </p>
          </div>
        )}

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