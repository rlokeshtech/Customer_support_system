import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../api/axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function Analytics() {
  const [stats, setStats] = useState(null);
  const [statusData, setStatusData] = useState([]);
  const [priorityData, setPriorityData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);

  const fetchAnalytics = async () => {
    const dashboard = await API.get("/analytics/dashboard");
    const status = await API.get("/analytics/status");
    const priority = await API.get("/analytics/priority");
    const department = await API.get("/analytics/department");

    setStats(dashboard.data.stats);
    setStatusData(status.data.data);
    setPriorityData(priority.data.data);
    setDepartmentData(department.data.data);
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const cards = stats
    ? [
      { title: "Total Tickets", value: stats.totalTickets },
      { title: "Open", value: stats.openTickets },
      { title: "In Progress", value: stats.inProgressTickets },
      { title: "Resolved", value: stats.resolvedTickets },
      { title: "Closed", value: stats.closedTickets },
      { title: "Users", value: stats.totalUsers },
      { title: "Agents", value: stats.totalAgents },
      { title: "Customers", value: stats.totalCustomers },
    ]
    : [];

  return (
    <Layout>
      <div className="min-h-screen animate-[fadeIn_0.5s_ease-in-out]">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 p-6 shadow-2xl shadow-indigo-950/20 md:p-8">
          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl"></div>
          <div className="absolute -bottom-24 left-20 h-56 w-56 rounded-full bg-indigo-500/20 blur-3xl"></div>

          <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
                Intelligence Dashboard
              </p>
              <h1 className="text-3xl font-black tracking-tight text-white md:text-4xl">
                Analytics
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 md:text-base">
                Admin dashboard for ticket performance, customer activity, team
                workload, and support operations.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-white shadow-xl backdrop-blur-xl">
              <p className="text-sm text-slate-300">Total Tickets</p>
              <p className="mt-1 text-3xl font-black">
                {stats ? stats.totalTickets : 0}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
          {cards.map((card, index) => (
            <div
              key={card.title}
              className="group rounded-3xl border border-slate-200/80 bg-white/85 p-5 shadow-lg shadow-slate-200/60 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-100"
              style={{
                animation: `slideUp 0.45s ease-out ${index * 0.05}s both`,
              }}
            >
              <p className="text-xs font-black uppercase tracking-wide text-slate-400">
                {card.title}
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
                {card.value}
              </h2>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-3">
          <div className="rounded-3xl border border-slate-200/80 bg-white/85 p-5 shadow-xl shadow-slate-200/60 backdrop-blur-xl transition-all duration-300 hover:shadow-2xl md:p-6">
            <h2 className="text-xl font-black text-slate-900">
              Tickets by Status
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Current distribution of ticket lifecycle stages.
            </p>

            <div className="mt-6 h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statusData}>
                  <XAxis dataKey="status" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="count"
                    fill="#2563eb"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200/80 bg-white/85 p-5 shadow-xl shadow-slate-200/60 backdrop-blur-xl transition-all duration-300 hover:shadow-2xl md:p-6">
            <h2 className="text-xl font-black text-slate-900">
              Tickets by Priority
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Track low, medium, and high-priority ticket volume.
            </p>

            <div className="mt-6 h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={priorityData}>
                  <XAxis dataKey="priority" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="count"
                    fill="#4f46e5"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200/80 bg-white/85 p-5 shadow-xl shadow-slate-200/60 backdrop-blur-xl transition-all duration-300 hover:shadow-2xl md:p-6">
            <h2 className="text-xl font-black text-slate-900">
              Tickets by Department
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Understand which departments receive the most requests.
            </p>

            <div className="mt-6 h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentData}>
                  <XAxis dataKey="department" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="count"
                    fill="#06b6d4"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {cards.length === 0 && (
          <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-white/80 p-10 text-center shadow-lg shadow-slate-200/50 backdrop-blur-xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-indigo-50 text-3xl">
              📊
            </div>
            <h2 className="mt-4 text-xl font-black text-slate-900">
              Loading analytics
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Dashboard insights will appear here after data is loaded.
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