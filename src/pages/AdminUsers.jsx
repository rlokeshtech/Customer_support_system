import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../api/axios";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const { data } = await API.get("/users");
    setUsers(data.users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const changeRole = async (id, role) => {
    await API.put(`/users/${id}/role`, { role });
    fetchUsers();
  };

  const agents = users.filter((user) => user.role === "agent");
  const customers = users.filter((user) => user.role === "customer");
  const admins = users.filter((user) => user.role === "admin");

  const UserTable = ({ title, description, tableUsers, emptyMessage }) => {
    return (
      <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200/80 bg-white/85 shadow-xl shadow-slate-200/60 backdrop-blur-xl">
        <div className="flex flex-col gap-2 border-b border-slate-100 px-5 py-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-black text-slate-900">{title}</h2>
            <p className="text-sm text-slate-500">{description}</p>
          </div>

          <div className="rounded-2xl bg-indigo-50 px-4 py-2 text-sm font-black text-indigo-700">
            Total: {tableUsers.length}
          </div>
        </div>

        {tableUsers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/80 text-xs uppercase tracking-wider text-slate-500">
                  <th className="px-5 py-4 font-black">Name</th>
                  <th className="px-5 py-4 font-black">Email</th>
                  <th className="px-5 py-4 font-black">Role</th>
                  <th className="px-5 py-4 font-black">Change Role</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {tableUsers.map((user, index) => (
                  <tr
                    key={user._id}
                    className="group transition-all duration-300 hover:bg-indigo-50/50"
                    style={{
                      animation: `slideUp 0.45s ease-out ${
                        index * 0.05
                      }s both`,
                    }}
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-cyan-500 text-sm font-black uppercase text-white shadow-lg shadow-indigo-500/20">
                          {user.name?.charAt(0) || "U"}
                        </div>

                        <div>
                          <p className="font-black text-slate-900 transition-colors duration-300 group-hover:text-indigo-700">
                            {user.name}
                          </p>
                          <p className="text-xs font-medium text-slate-400">
                            User ID linked account
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm font-medium text-slate-600">
                      {user.email}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-black uppercase tracking-wide ${
                          user.role === "admin"
                            ? "bg-indigo-100 text-indigo-700"
                            : user.role === "agent"
                            ? "bg-cyan-100 text-cyan-700"
                            : "bg-emerald-100 text-emerald-700"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <select
                        className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-bold text-slate-700 outline-none transition-all duration-300 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                        value={user.role}
                        onChange={(e) => changeRole(user._id, e.target.value)}
                      >
                        <option value="customer">Customer</option>
                        <option value="agent">Agent</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-10 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-indigo-50 text-3xl">
              👥
            </div>
            <h2 className="mt-4 text-xl font-black text-slate-900">
              {emptyMessage}
            </h2>
          </div>
        )}
      </div>
    );
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
                Admin Access Center
              </p>
              <h1 className="text-3xl font-black tracking-tight text-white md:text-4xl">
                Users
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 md:text-base">
                Manage agents, customers, and admin permissions separately.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-white shadow-xl backdrop-blur-xl">
              <p className="text-sm text-slate-300">Total Users</p>
              <p className="mt-1 text-3xl font-black">{users.length}</p>
            </div>
          </div>
        </div>

        <UserTable
          title="Agents"
          description="Users responsible for resolving customer tickets."
          tableUsers={agents}
          emptyMessage="No agents found"
        />

        <UserTable
          title="Customers"
          description="Users who create support tickets."
          tableUsers={customers}
          emptyMessage="No customers found"
        />

        <UserTable
          title="Admins"
          description="Users who manage the whole platform."
          tableUsers={admins}
          emptyMessage="No admins found"
        />

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