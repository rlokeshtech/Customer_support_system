import {
  LayoutDashboard,
  Ticket,
  PlusCircle,
  Users,
  BarChart3,
  Bell,
  LogOut,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { userInfo, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const role = userInfo?.user?.role;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menu = [{ name: "Home", path: "/dashboard", icon: LayoutDashboard }];

  if (role === "customer") {
    menu.push(
      { name: "Create Ticket", path: "/create-ticket", icon: PlusCircle },
      { name: "My Tickets", path: "/my-tickets", icon: Ticket }
    );
  }

  if (role === "agent") {
    menu.push({
      name: "Assigned Tickets",
      path: "/assigned-tickets",
      icon: Ticket,
    });
  }

  if (role === "admin") {
    menu.push(
      { name: "All Tickets", path: "/admin/tickets", icon: Ticket },
      { name: "Users", path: "/admin/users", icon: Users },
      { name: "Analytics", path: "/admin/analytics", icon: BarChart3 }
    );
  }

  menu.push({ name: "Notifications", path: "/notifications", icon: Bell });

  return (
    <aside className="fixed left-0 top-0 z-50 hidden h-screen w-72 flex-col overflow-hidden border-r border-white/10 bg-slate-950 text-white shadow-2xl shadow-slate-950/30 md:flex">
      <div className="shrink-0 border-b border-slate-800/80 p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-cyan-500 text-xl font-black shadow-lg shadow-indigo-500/25">
            AI
          </div>

          <div>
            <h1 className="text-2xl font-black tracking-tight">AI Support</h1>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-cyan-300">
              SaaS Dashboard
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl">
          <p className="text-sm font-bold text-white">
            {userInfo?.user?.name}
          </p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
            {role}
          </p>
        </div>
      </div>

      <nav className="custom-sidebar-scroll flex-1 space-y-2 overflow-y-auto px-4 py-5">
        {menu.map((item) => {
          const Icon = item.icon;
          const active = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition-all duration-300 ${
                active
                  ? "bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-lg shadow-indigo-500/25"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-300 ${
                  active
                    ? "bg-white/20"
                    : "bg-slate-900 group-hover:bg-white/10"
                }`}
              >
                <Icon size={20} />
              </span>
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="shrink-0 border-t border-slate-800/80 p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-2xl bg-red-500/15 px-4 py-3 text-sm font-black text-red-300 transition-all duration-300 hover:bg-red-500 hover:text-white hover:shadow-lg hover:shadow-red-500/25"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>

      <style>
        {`
          .custom-sidebar-scroll::-webkit-scrollbar {
            width: 6px;
          }

          .custom-sidebar-scroll::-webkit-scrollbar-track {
            background: transparent;
          }

          .custom-sidebar-scroll::-webkit-scrollbar-thumb {
            background: rgba(148, 163, 184, 0.35);
            border-radius: 999px;
          }

          .custom-sidebar-scroll::-webkit-scrollbar-thumb:hover {
            background: rgba(148, 163, 184, 0.6);
          }
        `}
      </style>
    </aside>
  );
}