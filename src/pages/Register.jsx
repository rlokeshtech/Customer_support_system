import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

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

      await register(form.name, form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 p-4">
      <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl"></div>
      <div className="absolute -right-24 bottom-20 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl"></div>

      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white/10 shadow-2xl backdrop-blur-xl md:grid-cols-2">
        <div className="hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 p-10 md:block">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            AI Support SaaS
          </p>

          <h1 className="mt-5 text-4xl font-black leading-tight text-white">
            Create your support workspace.
          </h1>

          <p className="mt-4 text-sm leading-7 text-slate-300">
            Register your account and start managing AI-powered support tickets
            with a clean, modern dashboard.
          </p>

          <div className="mt-10 space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/10 p-4 text-white backdrop-blur-xl">
              🎫 Smart ticket tracking
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 p-4 text-white backdrop-blur-xl">
              🤖 AI-assisted categorization
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 p-4 text-white backdrop-blur-xl">
              ⚡ Fast role-based workflow
            </div>
          </div>
        </div>

        <div className="bg-white p-6 md:p-10">
          <h1 className="text-3xl font-black text-slate-900">
            Create Account
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Start managing support tickets
          </p>

          {error && (
            <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-3 text-sm font-bold text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={submitHandler} className="mt-6 space-y-4">
            <input
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
              type="text"
              name="name"
              placeholder="Full name"
              value={form.name}
              onChange={handleChange}
            />

            <input
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
              type="email"
              name="email"
              placeholder="Email address"
              value={form.email}
              onChange={handleChange}
            />

            <input
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
              type="password"
              name="password"
              placeholder="Password minimum 6 characters"
              value={form.password}
              onChange={handleChange}
            />

            <button
              className="w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-5 py-3.5 text-sm font-black text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/30 disabled:cursor-not-allowed disabled:opacity-70"
              disabled={loading}
            >
              {loading ? "Creating..." : "Register"}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-black text-indigo-600 transition hover:text-cyan-600"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}