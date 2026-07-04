const AgentDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50 p-6 md:p-10 animate-[fadeIn_0.5s_ease-in-out]">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 p-8 shadow-2xl">
        <div className="absolute -top-16 -right-16 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-indigo-500/20 blur-3xl"></div>

        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300 font-semibold">
              Support Workspace
            </p>

            <h1 className="mt-2 text-4xl font-black tracking-tight text-white">
              Agent Dashboard
            </h1>

            <p className="mt-4 max-w-2xl text-slate-300 leading-7">
              Welcome to your AI-powered support dashboard. Manage assigned
              tickets, respond faster, and keep customer satisfaction high with
              a clean, modern workspace.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/10 px-6 py-5 backdrop-blur-xl shadow-xl">
            <div className="text-5xl">🎧</div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="group rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 text-2xl text-white shadow-lg">
            🎫
          </div>

          <h2 className="text-lg font-bold text-slate-900">
            Assigned Tickets
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            View and resolve all tickets assigned to you with AI-assisted
            workflow.
          </p>
        </div>

        <div className="group rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 text-2xl text-white shadow-lg">
            ⚡
          </div>

          <h2 className="text-lg font-bold text-slate-900">
            Faster Resolution
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Use AI suggestions to resolve customer issues quickly and improve
            productivity.
          </p>
        </div>

        <div className="group rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-2xl text-white shadow-lg">
            🔒
          </div>

          <h2 className="text-lg font-bold text-slate-900">
            Secure Access
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Only agents can access this dashboard and perform ticket management
            operations.
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-3xl border border-indigo-100 bg-white/80 p-8 shadow-xl backdrop-blur-xl">
        <h3 className="text-2xl font-black text-slate-900">
          Welcome, Support Agent 👋
        </h3>

        <p className="mt-3 text-slate-600 leading-7">
          This dashboard is reserved exclusively for support agents. Your
          assigned tickets, analytics, AI reply suggestions, customer details,
          and performance metrics will be displayed here as you continue
          building the application.
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

export default AgentDashboard;