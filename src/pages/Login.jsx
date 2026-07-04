import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      await login(form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex items-center justify-center px-6 py-10">

      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-28 -left-24 h-80 w-80 rounded-full bg-indigo-600/30 blur-[130px] animate-pulse"></div>

        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-[150px] animate-pulse"></div>

        <div className="absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 blur-[120px]"></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">

        <div className="rounded-[32px] border border-white/10 bg-white/10 backdrop-blur-3xl shadow-[0_25px_80px_rgba(0,0,0,0.45)] p-8 transition-all duration-500 hover:scale-[1.01]">

          

          {/* Heading */}
          <div className="text-center">

            <h1 className="text-4xl font-extrabold text-white tracking-tight">
              Welcome Back
            </h1>

            <p className=" text-slate-300 leading-relaxed">
              Sign in to continue to your
              <br />
              AI Support Dashboard
            </p>

          </div>

          {/* Error */}
          {error && (
            <div className="mt-2 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300 animate-pulse">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={submitHandler} className="mt-8 space-y-6">

            <div>

              <label className="mb-2 block text-sm font-medium text-slate-300">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-600 bg-white/5 px-5 py-4 text-white placeholder:text-slate-400 outline-none transition-all duration-300 focus:border-indigo-500 focus:bg-white/10 focus:ring-4 focus:ring-indigo-500/20"
              />

            </div>

            <div>

              <label className="mb-2 block text-sm font-medium text-slate-300">
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-600 bg-white/5 px-5 py-4 text-white placeholder:text-slate-400 outline-none transition-all duration-300 focus:border-indigo-500 focus:bg-white/10 focus:ring-4 focus:ring-indigo-500/20"
              />

            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 py-4 font-semibold text-white shadow-lg shadow-indigo-700/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/30 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></span>

              <span className="relative">
                {loading ? "Logging in..." : "Login to Dashboard"}
              </span>
            </button>

          </form>

          {/* Divider */}
          <div className="my-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-600"></div>
            <span className="text-sm text-slate-400">
              Secure Login
            </span>
            <div className="h-px flex-1 bg-slate-600"></div>
          </div>

          {/* Register */}
          <p className="text-center text-slate-300">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-cyan-400 transition hover:text-cyan-300 hover:underline"
            >
              Create Account
            </Link>
          </p>

        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-slate-500">
          © 2026 AI Support System • Secure Enterprise Ticket Management
        </p>

      </div>

    </div>
  );
}