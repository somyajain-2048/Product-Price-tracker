export default function CardSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm animate-pulse">
          <div className="h-44 bg-gray-100" />
          <div className="p-4 space-y-2.5">
            <div className="h-3 bg-gray-100 rounded-full w-1/3" />
            <div className="h-3.5 bg-gray-100 rounded-full w-full" />
            <div className="h-3.5 bg-gray-100 rounded-full w-3/4" />
            <div className="h-px bg-gray-50 my-3" />
            <div className="flex justify-between">
              <div className="h-5 bg-gray-100 rounded-full w-1/4" />
              <div className="h-4 bg-gray-100 rounded-full w-1/5" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
