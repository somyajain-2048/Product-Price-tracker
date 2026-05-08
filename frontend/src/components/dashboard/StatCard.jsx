const ACCENTS = {
  indigo:  "from-indigo-50 to-indigo-100/60 border-indigo-100 text-indigo-600",
  violet:  "from-violet-50 to-violet-100/60 border-violet-100 text-violet-600",
  emerald: "from-emerald-50 to-emerald-100/60 border-emerald-100 text-emerald-600",
  amber:   "from-amber-50 to-amber-100/60 border-amber-100 text-amber-600",
};

export default function StatCard({ icon, label, value, sub, accent }) {
  return (
    <div className={`bg-gradient-to-br ${ACCENTS[accent]} border rounded-2xl p-5 flex items-start gap-4`}>
      <div className="w-10 h-10 rounded-xl bg-white/80 flex items-center justify-center text-xl shadow-sm flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-2xl font-semibold text-gray-900 leading-none">{value}</p>
        <p className="text-xs font-medium text-gray-500 mt-1 uppercase tracking-wider">{label}</p>
        {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}
