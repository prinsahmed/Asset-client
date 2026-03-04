import { AlertCircle } from "lucide-react";

const ErrorMsg = ({ message }) => (
  <div className="flex items-center gap-1 mt-1 text-red-500 animate-in fade-in slide-in-from-top-1">
    <AlertCircle size={14} />
    <span className="text-[11px] font-medium leading-none">{message}</span>
  </div>
);
export default ErrorMsg;
