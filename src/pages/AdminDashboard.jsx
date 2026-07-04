const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 p-6 md:p-10 animate-[fadeIn_0.5s_ease-in-out]">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 p-8 shadow-2xl">
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl"></div>

        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Admin Control Center
            </p>

            <h1 className="mt-3 text-4xl font-black tracking-tight text-white">
              Admin Dashboard
            </h1>

            <p className="mt-4 max-w-2xl leading-7 text-slate-300">
              Welcome to the administration workspace. Manage users, monitor
              tickets, review analytics, assign agents, and oversee the entire
              AI-powered support platform.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl shadow-xl">
            <div className="text-6xl">🛡️</div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="group rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-cyan-500 text-2xl text-white shadow-lg">
            👥
          </div>

          <h2 className="text-lg font-black text-slate-900">
            User Management
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Manage customers, agents, and administrator accounts.
          </p>
        </div>

        <div className="group rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 text-2xl text-white shadow-lg">
            📊
          </div>

          <h2 className="text-lg font-black text-slate-900">
            Analytics
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Monitor ticket trends, performance, and system activity.
          </p>
        </div>

        <div className="group rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-2xl text-white shadow-lg">
            🎫
          </div>

          <h2 className="text-lg font-black text-slate-900">
            Ticket Control
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Assign agents, update priorities, and monitor support requests.
          </p>
        </div>

        <div className="group rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 to-pink-500 text-2xl text-white shadow-lg">
            🤖
          </div>

          <h2 className="text-lg font-black text-slate-900">
            AI Operations
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Oversee AI-assisted ticket categorization and automated workflows.
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-xl backdrop-blur-xl">
        <h3 className="text-2xl font-black text-slate-900">
          Administrator Access
        </h3>

        <p className="mt-3 leading-7 text-slate-600">
          Only administrators can access this dashboard. As additional modules
          are implemented, this page will display live analytics, system health,
          user statistics, AI insights, and platform management tools.
        </p>
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
  );
};

export default AdminDashboard;