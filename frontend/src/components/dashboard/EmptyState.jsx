export default function EmptyState({ icon, title, desc }) {
  const defaultIcon = (
    <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  );

  return (
    <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-dashed border-gray-200 p-6 text-center">
      <div className="w-12 h-12 rounded-2xl bg-indigo-50/80 border border-indigo-100 flex items-center justify-center mb-3">
        {icon || defaultIcon}
      </div>
      <p className="text-sm font-medium text-gray-800 mb-1">{title}</p>
      <p className="text-xs text-gray-400 font-light max-w-sm">{desc}</p>
    </div>
  );
}

