import { useState } from "react";
import { FAQS } from "../../constants/landing";

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div className={`border rounded-2xl overflow-hidden transition-all duration-200 ${isOpen ? "border-indigo-200 shadow-md shadow-indigo-50" : "border-gray-100 hover:border-gray-200"}`}>
      <button
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-white hover:bg-gray-50/60 transition-colors"
        onClick={onToggle}
      >
        <span className={`text-sm font-medium transition-colors leading-relaxed ${isOpen ? "text-indigo-700" : "text-gray-700"}`}>
          {faq.q}
        </span>
        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${isOpen ? "bg-indigo-600 rotate-45" : "bg-gray-100"}`}>
          <svg className={`w-3 h-3 transition-colors ${isOpen ? "text-white" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
        </div>
      </button>
      {isOpen && (
        <div className="px-6 pb-5 bg-white">
          <p className="text-sm text-gray-400 leading-relaxed font-light">{faq.a}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="faq" className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="inline-block text-[10px] font-medium text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-full px-4 py-1.5 uppercase tracking-[0.2em] mb-4">
            FAQ
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-light text-gray-900 tracking-tight mb-4">
            Frequently asked{" "}
            <span className="italic bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              questions
            </span>
          </h2>
          <p className="text-base text-gray-400 font-light">Everything you need to know about PriceTrack.</p>
        </div>

        <div className="space-y-2.5">
          {FAQS.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>

        <div className="mt-8 text-center bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100 rounded-3xl p-7">
          <p className="text-base font-medium text-gray-800 mb-1">Still have questions?</p>
          <p className="text-sm text-gray-400 font-light mb-5">Our support team is here to help.</p>
          <a
            href="mailto:support@pricetrack.in"
            className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 border border-indigo-200 bg-white hover:bg-indigo-600 hover:text-white hover:border-indigo-600 px-6 py-3 rounded-xl transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Contact support
          </a>
        </div>
      </div>
    </section>
  );
}
