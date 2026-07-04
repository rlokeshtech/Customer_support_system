import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import API from "../api/axios";
import StatusBadge from "../components/StatusBadge";
import PriorityBadge from "../components/PriorityBadge";
import { useAuth } from "../context/AuthContext";

export default function TicketDetails() {
  const { id } = useParams();
  const { userInfo } = useAuth();

  const [ticket, setTicket] = useState(null);
  const [agents, setAgents] = useState([]);
  const [reply, setReply] = useState("");
  const [aiReply, setAiReply] = useState("");
  const [selectedAgent, setSelectedAgent] = useState("");

  const role = userInfo?.user?.role;

  const fetchTicket = async () => {
    const { data } = await API.get(`/tickets/${id}`);
    setTicket(data.ticket);
  };

  const fetchAgents = async () => {
    if (role === "admin") {
      const { data } = await API.get("/users/agents");
      setAgents(data.agents);
    }
  };

  useEffect(() => {
    fetchTicket();
    fetchAgents();
  }, [id]);

  const updateStatus = async (status) => {
    await API.put(`/tickets/${id}/status`, { status });
    fetchTicket();
  };

  const updatePriority = async (priority) => {
    await API.put(`/tickets/${id}/priority`, { priority });
    fetchTicket();
  };

  const assignAgent = async () => {
    if (!selectedAgent) return;
    await API.put(`/tickets/${id}/assign`, { agentId: selectedAgent });
    fetchTicket();
  };

  const addReply = async (e) => {
    e.preventDefault();
    if (!reply.trim()) return;

    await API.post(`/tickets/${id}/reply`, { message: reply });
    setReply("");
    fetchTicket();
  };

  const generateReply = async () => {
    const { data } = await API.get(`/ai/reply/${id}`);
    setAiReply(data.reply);
    setReply(data.reply);
  };

  if (!ticket) {
    return (
      <Layout>
        <div className="min-h-screen animate-pulse">
          <div className="rounded-3xl border border-slate-200/80 bg-white/85 p-6 shadow-xl shadow-slate-200/60 backdrop-blur-xl">
            <div className="h-7 w-56 rounded-full bg-slate-200"></div>
            <div className="mt-5 h-4 w-full rounded-full bg-slate-200"></div>
            <div className="mt-3 h-4 w-2/3 rounded-full bg-slate-200"></div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen animate-[fadeIn_0.5s_ease-in-out]">
        <div className="grid gap-6 xl:grid-cols-3">
          <div className="space-y-6 xl:col-span-2">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 p-6 shadow-2xl shadow-indigo-950/20 md:p-8">
              <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl"></div>
              <div className="absolute -bottom-24 left-20 h-56 w-56 rounded-full bg-indigo-500/20 blur-3xl"></div>

              <div className="relative z-10">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
                      Ticket Details
                    </p>
                    <h1 className="text-3xl font-black tracking-tight text-white md:text-4xl">
                      {ticket.title}
                    </h1>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <StatusBadge status={ticket.status} />
                    <PriorityBadge priority={ticket.priority} />
                  </div>
                </div>

                <p className="mt-4 text-sm leading-7 text-slate-300 md:text-base">
                  {ticket.description}
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200/80 bg-white/85 p-5 shadow-xl shadow-slate-200/60 backdrop-blur-xl md:p-6">
              <h2 className="text-xl font-black text-slate-900">
                Ticket Information
              </h2>

              <div className="mt-5 grid gap-3 text-sm md:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 px-4 py-3">
                  <p className="text-xs font-black uppercase tracking-wide text-slate-400">
                    Category
                  </p>
                  <p className="mt-1 font-bold text-slate-800">
                    {ticket.category}
                  </p>
                </div>

                <div className="rounded-2xl bg-indigo-50/70 px-4 py-3">
                  <p className="text-xs font-black uppercase tracking-wide text-indigo-400">
                    Department
                  </p>
                  <p className="mt-1 font-bold text-slate-800">
                    {ticket.department}
                  </p>
                </div>

                <div className="rounded-2xl bg-cyan-50/70 px-4 py-3">
                  <p className="text-xs font-black uppercase tracking-wide text-cyan-500">
                    Customer
                  </p>
                  <p className="mt-1 font-bold text-slate-800">
                    {ticket.createdBy?.name}
                  </p>
                </div>

                <div className="rounded-2xl bg-emerald-50/70 px-4 py-3">
                  <p className="text-xs font-black uppercase tracking-wide text-emerald-500">
                    Agent
                  </p>
                  <p className="mt-1 font-bold text-slate-800">
                    {ticket.assignedTo?.name || "Not assigned"}
                  </p>
                </div>
              </div>

              {ticket.attachments?.length > 0 && (
                <div className="mt-6 rounded-3xl border border-dashed border-indigo-200 bg-indigo-50/50 p-5">
                  <h3 className="font-black text-slate-800">Attachments</h3>
                  <div className="mt-3 space-y-2">
                    {ticket.attachments.map((file) => (
                      <a
                        key={file._id}
                        href={file.url}
                        target="_blank"
                        className="block rounded-2xl bg-white px-4 py-3 text-sm font-bold text-indigo-600 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:text-cyan-600 hover:shadow-md"
                      >
                        {file.originalName || "View attachment"}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="rounded-3xl border border-slate-200/80 bg-white/85 p-5 shadow-xl shadow-slate-200/60 backdrop-blur-xl md:p-6">
              <h2 className="text-xl font-black text-slate-900">
                Conversation
              </h2>

              <div className="mt-5 space-y-4">
                {ticket.replies?.length === 0 ? (
                  <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50/80 p-8 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-2xl">
                      💬
                    </div>
                    <p className="mt-3 font-bold text-slate-700">
                      No replies yet.
                    </p>
                  </div>
                ) : (
                  ticket.replies.map((item, index) => (
                    <div
                      key={item._id}
                      className="rounded-3xl border border-slate-100 bg-slate-50/80 p-4 transition-all duration-300 hover:bg-white hover:shadow-lg"
                      style={{
                        animation: `slideUp 0.45s ease-out ${
                          index * 0.05
                        }s both`,
                      }}
                    >
                      <p className="text-sm leading-6 text-slate-800">
                        {item.message}
                      </p>
                      <p className="mt-3 text-xs font-bold uppercase tracking-wide text-slate-400">
                        By {item.sender?.name || "User"} •{" "}
                        {item.sender?.role || "role"}
                      </p>
                    </div>
                  ))
                )}
              </div>

              <form onSubmit={addReply} className="mt-6 space-y-3">
                <textarea
                  className="min-h-32 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium leading-6 text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                  placeholder="Write reply..."
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                />

                <div className="flex flex-wrap gap-3">
                  <button className="rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/30">
                    Send Reply
                  </button>

                  {(role === "agent" || role === "admin") && (
                    <button
                      type="button"
                      onClick={generateReply}
                      className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 hover:shadow-md"
                    >
                      Generate AI Reply
                    </button>
                  )}
                </div>
              </form>

              {aiReply && (
                <div className="mt-4 rounded-2xl border border-blue-200 bg-blue-50 p-4 text-sm font-bold text-blue-700 shadow-lg shadow-blue-100">
                  AI reply generated and added to textbox.
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            {(role === "agent" || role === "admin") && (
              <div className="rounded-3xl border border-slate-200/80 bg-white/85 p-5 shadow-xl shadow-slate-200/60 backdrop-blur-xl md:p-6">
                <h2 className="text-xl font-black text-slate-900">
                  Update Status
                </h2>

                <select
                  className="mt-4 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-800 outline-none transition-all duration-300 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                  value={ticket.status}
                  onChange={(e) => updateStatus(e.target.value)}
                >
                  <option value="OPEN">Open</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="WAITING_CUSTOMER">Waiting Customer</option>
                  <option value="RESOLVED">Resolved</option>
                  <option value="CLOSED">Closed</option>
                </select>
              </div>
            )}

            {role === "admin" && (
              <>
                <div className="rounded-3xl border border-slate-200/80 bg-white/85 p-5 shadow-xl shadow-slate-200/60 backdrop-blur-xl md:p-6">
                  <h2 className="text-xl font-black text-slate-900">
                    Update Priority
                  </h2>

                  <select
                    className="mt-4 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-800 outline-none transition-all duration-300 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                    value={ticket.priority}
                    onChange={(e) => updatePriority(e.target.value)}
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                  </select>
                </div>

                <div className="rounded-3xl border border-slate-200/80 bg-white/85 p-5 shadow-xl shadow-slate-200/60 backdrop-blur-xl md:p-6">
                  <h2 className="text-xl font-black text-slate-900">
                    Assign Agent
                  </h2>

                  <select
                    className="mt-4 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-800 outline-none transition-all duration-300 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                    value={selectedAgent}
                    onChange={(e) => setSelectedAgent(e.target.value)}
                  >
                    <option value="">Select agent</option>
                    {agents.map((agent) => (
                      <option key={agent._id} value={agent._id}>
                        {agent.name}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={assignAgent}
                    className="mt-4 w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/30"
                  >
                    Assign
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

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