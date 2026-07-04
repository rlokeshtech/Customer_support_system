import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import {
  Ticket,
  PlusCircle,
  Bell,
  BarChart3,
  Users,
} from "lucide-react";

export default function Dashboard() {
  const { userInfo } = useAuth();
  const role = userInfo?.user?.role;

  return (
    <Layout>
      <div className="min-h-screen animate-[fadeIn_0.5s_ease-in-out]">
        <div className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 p-6 shadow-2xl shadow-indigo-950/20 md:p-8">
          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl"></div>
          <div className="absolute -bottom-24 left-20 h-56 w-56 rounded-full bg-indigo-500/20 blur-3xl"></div>

          <div className="relative z-10">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
              AI Support Workspace
            </p>

            <h1 className="text-3xl font-black tracking-tight text-white md:text-4xl">
              Dashboard
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 md:text-base">
              Welcome,{" "}
              <span className="font-bold text-white">
                {userInfo?.user?.name}
              </span>
              . You are logged in as{" "}
              <span className="rounded-full bg-cyan-400/15 px-3 py-1 text-xs font-black uppercase tracking-wide text-cyan-300">
                {role}
              </span>
              .
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {role === "customer" && (
            <>
              <DashboardCard
                to="/create-ticket"
                title="Create Ticket"
                description="Raise a new support request."
                icon={<PlusCircle size={32} />}
                gradient="from-blue-600 to-cyan-500"
                hoverBorder="hover:border-blue-200"
                hoverShadow="hover:shadow-blue-100"
                hoverTitle="group-hover:text-blue-700"
              />

              <DashboardCard
                to="/my-tickets"
                title="My Tickets"
                description="View your submitted tickets."
                icon={<Ticket size={32} />}
                gradient="from-green-600 to-emerald-400"
                hoverBorder="hover:border-green-200"
                hoverShadow="hover:shadow-green-100"
                hoverTitle="group-hover:text-green-700"
              />

              <DashboardCard
                to="/notifications"
                title="Notifications"
                description="Check your ticket updates."
                icon={<Bell size={32} />}
                gradient="from-red-600 to-rose-400"
                hoverBorder="hover:border-red-200"
                hoverShadow="hover:shadow-red-100"
                hoverTitle="group-hover:text-red-700"
              />
            </>
          )}

          {role === "agent" && (
            <>
              <DashboardCard
                to="/assigned-tickets"
                title="Assigned Tickets"
                description="Resolve tickets assigned to you."
                icon={<Ticket size={32} />}
                gradient="from-orange-500 to-amber-400"
                hoverBorder="hover:border-orange-200"
                hoverShadow="hover:shadow-orange-100"
                hoverTitle="group-hover:text-orange-700"
              />

              <DashboardCard
                to="/notifications"
                title="Notifications"
                description="View ticket assignments and updates."
                icon={<Bell size={32} />}
                gradient="from-red-600 to-rose-400"
                hoverBorder="hover:border-red-200"
                hoverShadow="hover:shadow-red-100"
                hoverTitle="group-hover:text-red-700"
              />
            </>
          )}

          {role === "admin" && (
            <>
              <DashboardCard
                to="/admin/tickets"
                title="All Tickets"
                description="Monitor all customer support tickets."
                icon={<Ticket size={32} />}
                gradient="from-blue-600 to-cyan-500"
                hoverBorder="hover:border-blue-200"
                hoverShadow="hover:shadow-blue-100"
                hoverTitle="group-hover:text-blue-700"
              />

              <DashboardCard
                to="/admin/analytics"
                title="Analytics"
                description="Track ticket performance and trends."
                icon={<BarChart3 size={32} />}
                gradient="from-purple-600 to-indigo-500"
                hoverBorder="hover:border-purple-200"
                hoverShadow="hover:shadow-purple-100"
                hoverTitle="group-hover:text-purple-700"
              />

              <DashboardCard
                to="/admin/users"
                title="User Details"
                description="Manage customers and support agents."
                icon={<Users size={32} />}
                gradient="from-green-600 to-emerald-400"
                hoverBorder="hover:border-green-200"
                hoverShadow="hover:shadow-green-100"
                hoverTitle="group-hover:text-green-700"
              />

              <DashboardCard
                to="/notifications"
                title="Notifications"
                description="View latest system updates."
                icon={<Bell size={32} />}
                gradient="from-red-600 to-rose-400"
                hoverBorder="hover:border-red-200"
                hoverShadow="hover:shadow-red-100"
                hoverTitle="group-hover:text-red-700"
              />
            </>
          )}
        </div>

        <style>
          {`
            @keyframes fadeIn {
              from {
                opacity: 0;
                transform: translateY(12px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}
        </style>
      </div>
    </Layout>
  );
}

function DashboardCard({
  to,
  title,
  description,
  icon,
  gradient,
  hoverBorder,
  hoverShadow,
  hoverTitle,
}) {
  return (
    <Link
      to={to}
      className={`group rounded-3xl border border-slate-200/80 bg-white/85 p-6 shadow-lg shadow-slate-200/60 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 ${hoverBorder} hover:shadow-2xl ${hoverShadow}`}
    >
      <div
        className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-lg transition-all duration-300 group-hover:scale-110`}
      >
        {icon}
      </div>

      <h2
        className={`mt-5 text-xl font-black text-slate-900 transition-colors duration-300 ${hoverTitle}`}
      >
        {title}
      </h2>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {description}
      </p>
    </Link>
  );
}