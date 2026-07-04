export default function StatusBadge({ status }) {
  const colors = {
    OPEN: "bg-blue-100 text-blue-700",
    IN_PROGRESS: "bg-yellow-100 text-yellow-700",
    WAITING_CUSTOMER: "bg-purple-100 text-purple-700",
    RESOLVED: "bg-green-100 text-green-700",
    CLOSED: "bg-slate-200 text-slate-700",
  };

  return (
    <span className={`badge ${colors[status] || "bg-slate-100 text-slate-700"}`}>
      {status}
    </span>
  );
}