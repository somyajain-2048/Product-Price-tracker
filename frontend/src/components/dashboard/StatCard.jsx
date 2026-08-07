const ACCENTS = {
  indigo:  { bar: "bg-indigo-600", iconColor: "text-indigo-600 bg-indigo-50 border-indigo-100" },
  violet:  { bar: "bg-violet-500", iconColor: "text-violet-500 bg-violet-50 border-violet-100" },
  emerald: { bar: "bg-emerald-500", iconColor: "text-emerald-500 bg-emerald-50 border-emerald-100" },
  amber:   { bar: "bg-amber-500", iconColor: "text-amber-600 bg-amber-50 border-amber-100" },
};

export default function StatCard({ icon, label, value, sub, accent = "indigo", index = 0 }) {
  const style = ACCENTS[accent] || ACCENTS.indigo;
  const numStr = String(index + 1).padStart(2, "0");

  return (
    <div className="relative bg-white border border-gray-100 rounded-2xl p-5 flex flex-col items-center text-center shadow-xs hover:shadow-lg hover:shadow-gray-200/50 hover:-translate-y-1 transition-all duration-300 overflow-hidden group">
      {/* Top accent indicator */}
      <div className={`absolute top-0 right-6 w-10 h-1 rounded-b-md ${style.bar}`} />

      {/* Background watermark number */}
      <span className="absolute top-2.5 left-4 font-display text-4xl font-light text-gray-100 group-hover:text-gray-200 transition-colors select-none pointer-events-none">
        {numStr}
      </span>

      {/* Centered icon */}
      <div className={`relative z-10 w-11 h-11 rounded-xl border flex items-center justify-center mb-3 shadow-2xs group-hover:scale-105 transition-transform duration-300 ${style.iconColor}`}>
        {icon}
      </div>

      {/* Value */}
      <p className="relative z-10 text-2xl font-bold text-gray-900 leading-none tracking-tight mb-1">
        {value}
      </p>

      {/* Label */}
      <p className="relative z-10 text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-0.5">
        {label}
      </p>

      {/* Subtext */}
      {sub && (
        <p className="relative z-10 text-xs text-gray-400 font-light truncate">
          {sub}
        </p>
      )}
    </div>
  );
}



