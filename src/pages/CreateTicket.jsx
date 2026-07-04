import { useState } from "react";
import Layout from "../components/Layout";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function CreateTicket() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    department: "Support",
    priority: "MEDIUM",
  });

  const [attachments, setAttachments] = useState([]);
  const [message, setMessage] = useState("");
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

      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });

      for (let file of attachments) {
        formData.append("attachments", file);
      }

      await API.post("/tickets", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("Ticket created successfully");
      setTimeout(() => navigate("/my-tickets"), 800);
    } catch (err) {
      setError(err.response?.data?.message || "Ticket creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen animate-[fadeIn_0.5s_ease-in-out]">
        <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
          <div>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 p-6 shadow-2xl shadow-indigo-950/20 md:p-8">
              <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl"></div>
              <div className="absolute -bottom-24 left-20 h-56 w-56 rounded-full bg-indigo-500/20 blur-3xl"></div>

              <div className="relative z-10">
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
                  Customer Support
                </p>
                <h1 className="text-3xl font-black tracking-tight text-white md:text-4xl">
                  Create Ticket
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 md:text-base">
                  Describe your issue clearly. AI will help detect category and
                  priority for faster resolution.
                </p>
              </div>
            </div>

            {message && (
              <div className="mt-5 rounded-2xl border border-green-200 bg-green-50/90 p-4 text-sm font-bold text-green-700 shadow-lg shadow-green-100">
                {message}
              </div>
            )}

            {error && (
              <div className="mt-5 rounded-2xl border border-red-200 bg-red-50/90 p-4 text-sm font-bold text-red-700 shadow-lg shadow-red-100">
                {error}
              </div>
            )}

            <form
              onSubmit={submitHandler}
              className="mt-6 space-y-5 rounded-3xl border border-slate-200/80 bg-white/85 p-5 shadow-xl shadow-slate-200/60 backdrop-blur-xl md:p-6"
            >
              <div>
                <label className="mb-2 block text-sm font-black text-slate-700">
                  Ticket Title
                </label>
                <input
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                  name="title"
                  placeholder="Ticket title"
                  value={form.title}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-black text-slate-700">
                  Issue Description
                </label>
                <textarea
                  className="min-h-40 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium leading-6 text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                  name="description"
                  placeholder="Explain your issue"
                  value={form.description}
                  onChange={handleChange}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className="mb-2 block text-sm font-black text-slate-700">
                    Priority
                  </label>
                  <select
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-800 outline-none transition-all duration-300 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                    name="priority"
                    value={form.priority}
                    onChange={handleChange}
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-black text-slate-700">
                    Category
                  </label>
                  <input
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                    name="category"
                    placeholder="Category optional"
                    value={form.category}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-black text-slate-700">
                    Department
                  </label>
                  <input
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                    name="department"
                    placeholder="Department"
                    value={form.department}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="rounded-3xl border border-dashed border-indigo-200 bg-indigo-50/50 p-5 transition-all duration-300 hover:border-indigo-400 hover:bg-indigo-50">
                <label className="mb-2 block text-sm font-black text-slate-700">
                  Attachments
                </label>
                <p className="mb-3 text-sm text-slate-500">
                  Upload screenshots, images, or PDF documents related to your
                  issue.
                </p>
                <input
                  className="w-full cursor-pointer rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 file:mr-4 file:rounded-xl file:border-0 file:bg-gradient-to-r file:from-indigo-600 file:to-cyan-500 file:px-4 file:py-2 file:text-sm file:font-bold file:text-white hover:file:opacity-90"
                  type="file"
                  multiple
                  accept="image/*,application/pdf"
                  onChange={(e) => setAttachments(e.target.files)}
                />
              </div>

              <button
                className="w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-5 py-3.5 text-sm font-black text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/30 disabled:cursor-not-allowed disabled:opacity-70 md:w-auto"
                disabled={loading}
              >
                {loading ? "Creating..." : "Submit Ticket"}
              </button>
            </form>
          </div>

          <div className="space-y-5">
            <div className="rounded-3xl border border-slate-200/80 bg-white/85 p-6 shadow-xl shadow-slate-200/60 backdrop-blur-xl">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-cyan-500 text-2xl text-white shadow-lg shadow-indigo-500/20">
                🤖
              </div>
              <h2 className="mt-4 text-xl font-black text-slate-900">
                AI Assisted Routing
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Your ticket details can help the system understand category,
                priority, and the right support workflow.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200/80 bg-white/85 p-6 shadow-xl shadow-slate-200/60 backdrop-blur-xl">
              <h3 className="text-lg font-black text-slate-900">
                Tips for better support
              </h3>

              <div className="mt-4 space-y-3">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm font-bold text-slate-800">
                    Explain the exact problem
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Add what happened, where it happened, and when it started.
                  </p>
                </div>

                <div className="rounded-2xl bg-indigo-50 p-4">
                  <p className="text-sm font-bold text-slate-800">
                    Attach proof if available
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Screenshots or PDFs help agents resolve your issue faster.
                  </p>
                </div>

                <div className="rounded-2xl bg-cyan-50 p-4">
                  <p className="text-sm font-bold text-slate-800">
                    Choose priority carefully
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Use High only for urgent issues affecting work.
                  </p>
                </div>
              </div>
            </div>
          </div>
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