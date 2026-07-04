export default function PriorityBadge({ priority }) {
  const colors = {
    LOW: "bg-green-100 text-green-700",
    MEDIUM: "bg-yellow-100 text-yellow-700",
    HIGH: "bg-red-100 text-red-700",
  };

  return (
    <span className={`badge ${colors[priority] || "bg-slate-100 text-slate-700"}`}>
      {priority}
    </span>
  );
}