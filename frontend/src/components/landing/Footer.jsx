import { Link } from "react-router-dom";
import { FOOTER_LINKS, SOCIALS } from "../../constants/landing";

const CURRENT_YEAR = new Date().getFullYear();

function FooterLogo() {
  return (
    <Link to="/" className="flex items-center gap-2 mb-4 w-fit group">
      <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      </div>
      <span className="font-display text-base font-normal text-white tracking-tight">PriceTrack</span>
    </Link>
  );
}

export default function Footer() {
  return (
    <footer id="about" className="bg-gray-950 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <FooterLogo />
            <p className="text-sm font-light leading-relaxed text-gray-400 max-w-xs mb-6">
              India's smartest price tracker. Monitor Amazon, Flipkart & Myntra prices 24/7
              and get notified the moment a deal appears.
            </p>
            <div className="flex items-center gap-2.5">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-8 h-8 rounded-lg bg-gray-900 hover:bg-indigo-600 text-gray-400 hover:text-white flex items-center justify-center transition-all"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-[10px] font-semibold text-gray-300 uppercase tracking-[0.18em] mb-5">{heading}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.isInternal ? (
                      <Link to={link.href} className="text-sm font-light text-gray-400 hover:text-indigo-400 transition-colors">
                        {link.label}
                      </Link>
                    ) : (
                      <a href={link.href} className="text-sm font-light text-gray-400 hover:text-indigo-400 transition-colors">
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800/60 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-light text-gray-500">
            &copy; {CURRENT_YEAR} PriceTrack. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-xs font-light text-gray-400 hover:text-indigo-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-xs font-light text-gray-400 hover:text-indigo-400 transition-colors">Terms of Service</Link>
            <Link to="/contact" className="text-xs font-light text-gray-400 hover:text-indigo-400 transition-colors">Contact Us</Link>
          </div>

        </div>
      </div>
    </footer>
  );
}

