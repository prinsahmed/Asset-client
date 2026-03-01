const StatusBadge = ({ status }) => {
  const styles = {
    pending: "bg-amber-50 text-amber-700 border-amber-100",
    approved: "bg-green-50 text-green-700 border-green-100",
    rejected: "bg-red-50 text-red-700 border-red-100",
  };
  return (
    <span
      className={`badge border ${styles[status] || "badge-ghost"} font-bold capitalize px-3 py-3`}
    >
      {status}
    </span>
  );
};

export default StatusBadge