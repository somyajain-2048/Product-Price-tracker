import {
  AreaChart, Area, XAxis, YAxis,
  Tooltip, CartesianGrid,
  ResponsiveContainer, ReferenceLine,
} from "recharts";

/* ── Custom tooltip ─────────────────────────────────────── */
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-indigo-100 rounded-2xl shadow-xl px-4 py-3 min-w-[120px]">
      <p className="text-[10px] text-gray-400 font-light uppercase tracking-widest mb-1">{label}</p>
      <p className="font-display text-lg font-light text-indigo-700">
        ₹{payload[0].value?.toLocaleString("en-IN")}
      </p>
    </div>
  );
}

/* ── Reference line label ───────────────────────────────── */
function RefLabel({ viewBox, label, color }) {
  return (
    <text
      x={viewBox.width + viewBox.x - 4}
      y={viewBox.y - 6}
      textAnchor="end"
      fontSize={10}
      fill={color}
      fontFamily="Plus Jakarta Sans"
    >
      {label}
    </text>
  );
}

/* ── Main chart ─────────────────────────────────────────── */
export default function PriceChart({ history, currentPrice, lowestPrice }) {
  if (!history?.length) return null;

  const data = history.map((item) => ({
    date: new Date(item.date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    }),
    price: item.price,
  }));

  const prices = data.map((d) => d.price);
  const minVal = Math.min(...prices);
  const maxVal = Math.max(...prices);
  const pad = (maxVal - minVal) * 0.12 || 500;

  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data} margin={{ top: 20, right: 16, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity={0.18} />
            <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />

        <XAxis
          dataKey="date"
          tick={{ fontSize: 11, fill: "#94a3b8", fontFamily: "Plus Jakarta Sans" }}
          tickLine={false}
          axisLine={false}
          interval="preserveStartEnd"
        />

        <YAxis
          domain={[minVal - pad, maxVal + pad]}
          tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
          tick={{ fontSize: 11, fill: "#94a3b8", fontFamily: "Plus Jakarta Sans" }}
          tickLine={false}
          axisLine={false}
          width={52}
        />

        <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#e0e7ff", strokeWidth: 1.5 }} />

        {/* Lowest price reference line */}
        {lowestPrice && (
          <ReferenceLine
            y={lowestPrice}
            stroke="#10b981"
            strokeDasharray="5 4"
            strokeWidth={1.5}
            label={(props) => <RefLabel {...props} label="Lowest" color="#10b981" />}
          />
        )}

        {/* Current price reference line */}
        {currentPrice && currentPrice !== lowestPrice && (
          <ReferenceLine
            y={currentPrice}
            stroke="#6366f1"
            strokeDasharray="5 4"
            strokeWidth={1.5}
            label={(props) => <RefLabel {...props} label="Current" color="#6366f1" />}
          />
        )}

        <Area
          type="monotone"
          dataKey="price"
          stroke="#6366f1"
          strokeWidth={2.5}
          fill="url(#areaGrad)"
          dot={false}
          activeDot={{ r: 5, fill: "#6366f1", stroke: "#fff", strokeWidth: 2.5 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
