import { FEATURES } from "../../constants/landing";

const HOW_IT_WORKS = [
  {
    title: "Paste a product link",
    desc: "Copy any Amazon or Flipkart URL and paste it into PriceTrack. That's all it takes.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
  },
  {
    title: "We monitor it 24 / 7",
    desc: "Our system checks the price every hour and builds a full history you can browse anytime.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: "Get the alert, buy smart",
    desc: "The instant the price hits your target, we email you. No more manual checking.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
  },
];


function FeatureCard({ feature }) {
  return (
    <div className="group flex items-start gap-5 bg-white border border-gray-100 rounded-2xl p-6 hover:border-indigo-100 hover:shadow-lg hover:shadow-indigo-50/60 hover:-translate-y-0.5 transition-all duration-300">
      <div className="w-11 h-11 rounded-xl bg-indigo-50 border border-indigo-100/80 text-indigo-500 flex items-center justify-center flex-shrink-0 group-hover:bg-gradient-to-br group-hover:from-indigo-500 group-hover:to-violet-600 group-hover:text-white group-hover:border-transparent group-hover:shadow-md group-hover:shadow-indigo-200 transition-all duration-300">
        {feature.icon}
      </div>
      <div className="flex-1 min-w-0 pt-0.5">
        <h3 className="text-sm font-semibold text-gray-800 mb-1.5 group-hover:text-indigo-700 transition-colors tracking-wide">
          {feature.title}
        </h3>
        <p className="text-sm text-gray-400 leading-relaxed font-light">{feature.desc}</p>
      </div>
      <div className="flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300">
        <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </div>
    </div>
  );
}

function StepCard({ step, index, total }) {
  return (
    <div className="relative flex flex-col items-center text-center group">
      {index < total - 1 && (
        <div className="hidden md:block absolute top-11 left-[calc(50%+2.8rem)] right-[calc(-50%+2.8rem)] h-px bg-gradient-to-r from-indigo-200 to-violet-200 z-0" />
      )}
      <div className="relative z-10 w-[3.25rem] h-[3.25rem] rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white flex items-center justify-center mb-5 shadow-lg shadow-indigo-200 group-hover:scale-105 transition-transform duration-300">
        {step.icon}
        <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-white border border-indigo-100 shadow-sm flex items-center justify-center text-[10px] font-semibold text-indigo-600">
          {index + 1}
        </span>
      </div>
      <h3 className="text-sm font-semibold text-gray-800 mb-2 tracking-wide">
        {step.title}
      </h3>
      <p className="text-sm text-gray-400 leading-relaxed max-w-[15rem] mx-auto font-light">
        {step.desc}
      </p>
    </div>
  );
}

export default function FeaturesSection() {
  return (
    <section id="features" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-10">
          <span className="inline-block text-[10px] font-medium text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-full px-4 py-1.5 uppercase tracking-[0.2em] mb-4">
            Features
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-light text-gray-900 tracking-tight mb-4">
            Everything you need to{" "}
            <span className="italic bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              save smart
            </span>
          </h2>
          <p className="text-base text-gray-400 max-w-xl mx-auto font-light leading-relaxed">
            Powerful tools to track, analyse, and act on price changes — all in
            one clean dashboard.
          </p>
        </div>

        {/* How it works */}

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FEATURES.map((f, i) => (
            <FeatureCard key={i} feature={f} />
          ))}
        </div>

        <div className="bg-gradient-to-br from-indigo-50/50 to-violet-50/50 border border-indigo-100/60 rounded-3xl p-8 mt-8">
          <p className="text-center text-[10px] font-medium text-indigo-400 uppercase tracking-[0.2em] mb-8">
            How it works
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map((step, i) => (
              <StepCard
                key={i}
                step={step}
                index={i}
                total={HOW_IT_WORKS.length}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
