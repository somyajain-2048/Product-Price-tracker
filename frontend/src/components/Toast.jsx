import { useEffect } from "react";

export default function Toast({ message, type, onClose, autoClose = true }) {
  useEffect(() => {
    if (!autoClose || !onClose) return;
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [autoClose, onClose]);

  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-xl text-sm font-medium transition-all ${
      type === "error" ? "bg-red-500 text-white" : "bg-emerald-600 text-white"
    }`}>
      {type === "error" ? (
        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      ) : (
        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      )}
      {message}
    </div>
  );
}
