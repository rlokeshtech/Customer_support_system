import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 p-4">
      <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-red-500/20 blur-3xl"></div>
      <div className="absolute -right-24 bottom-20 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl"></div>

      <div className="w-full max-w-md animate-[fadeIn_0.5s_ease-in-out] rounded-3xl border border-white/10 bg-white/10 p-8 text-center shadow-2xl backdrop-blur-xl">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-red-500/15 text-4xl shadow-lg">
          🚫
        </div>

        <h1 className="mt-6 text-5xl font-black tracking-tight text-red-400">
          403
        </h1>

        <h2 className="mt-3 text-2xl font-black text-white">
          Unauthorized Access
        </h2>

        <p className="mt-3 text-sm leading-6 text-slate-300">
          You do not have permission to access this page.
        </p>

        <Link
          to="/dashboard"
          className="mt-6 inline-block rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-6 py-3 text-sm font-black text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/30"
        >
          Back to Dashboard
        </Link>
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
}