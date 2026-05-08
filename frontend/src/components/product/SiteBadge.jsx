const SITE_STYLES = {
  amazon:  "bg-orange-50 text-orange-700 border-orange-200",
  flipkart: "bg-blue-50 text-blue-700 border-blue-200",
  myntra:  "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200",
};

export default function SiteBadge({ site }) {
  const cls = SITE_STYLES[site?.toLowerCase()] ?? "bg-gray-50 text-gray-600 border-gray-200";
  return (
    <span className={`px-2.5 py-1 rounded-full text-[10px] font-medium uppercase tracking-widest border ${cls}`}>
      {site}
    </span>
  );
}
