import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import API from "../api/axios";
import StatusBadge from "../components/StatusBadge";
import PriorityBadge from "../components/PriorityBadge";

export default function AssignedTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTickets = async () => {
    try {
      const { data } = await API.get("/tickets/assigned");
      setTickets(data.tickets);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <Layout>
      <div className="min-h-screen animate-[fadeIn_0.5s_ease-in-out]">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 p-6 shadow-2xl shadow-indigo-950/20 md:p-8">
          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl"></div>
          <div className="absolute -bottom-24 left-20 h-56 w-56 rounded-full bg-indigo-500/20 blur-3xl"></div>

          <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
                Agent Workspace
              </p>
              <h1 className="text-3xl font-black tracking-tight text-white md:text-4xl">
                Assigned Tickets
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 md:text-base">
                Track customer requests assigned to you and manage support
                conversations efficiently.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-white shadow-xl backdrop-blur-xl">
              <p className="text-sm text-slate-300">My Tickets</p>
              <p className="mt-1 text-3xl font-black">{tickets.length}</p>
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
                    <div className="flex items-center justify-between gap-4">
                      <div className="h-6 w-56 rounded-full bg-slate-200"></div>
                      <div className="flex gap-2">
                        <div className="h-7 w-20 rounded-full bg-slate-200"></div>
                        <div className="h-7 w-20 rounded-full bg-slate-200"></div>
                      </div>
                    </div>
                    <div className="mt-4 h-4 w-full rounded-full bg-slate-200"></div>
                    <div className="mt-2 h-4 w-2/3 rounded-full bg-slate-200"></div>
                    <div className="mt-5 h-4 w-40 rounded-full bg-slate-200"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : tickets.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white/80 p-10 text-center shadow-lg shadow-slate-200/50 backdrop-blur-xl">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-indigo-50 text-3xl">
                🎧
              </div>
              <h2 className="mt-4 text-xl font-black text-slate-900">
                No assigned tickets found
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                New tickets assigned to you will appear here.
              </p>
            </div>
          ) : (
            tickets.map((ticket, index) => (
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

                <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500">
                  {ticket.description}
                </p>

                <div className="mt-5 border-t border-slate-100 pt-4">
                  <div className="inline-flex rounded-2xl bg-slate-50 px-4 py-3 text-sm">
                    <span className="font-bold text-slate-400">
                      Customer:&nbsp;
                    </span>
                    <span className="font-bold text-slate-800">
                      {ticket.createdBy?.name || "Unknown"}
                    </span>
                  </div>
                </div>
              </Link>
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