import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NAV_LINKS } from "../../constants/landing";
import ProfileDropdown from "../ProfileDropdown";

const Logo = () => (
  <Link to="/" className="flex items-center gap-2 group">
    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform">
      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
      </svg>
    </div>
    <span className="font-display text-lg font-normal tracking-tight bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
      PriceTrack
    </span>
  </Link>
);

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(() => !!localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorage = () => setIsAuth(!!localStorage.getItem("token"));
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-light text-gray-500 hover:text-indigo-600 transition-colors tracking-wide"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            {isAuth ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 px-5 py-2.5 rounded-xl shadow-md shadow-indigo-200 hover:shadow-indigo-300 transition-all"
                >
                  Go to Dashboard
                </Link>
                <ProfileDropdown />
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-light text-gray-600 hover:text-indigo-600 transition-colors px-4 py-2"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 px-5 py-2.5 rounded-xl shadow-md shadow-indigo-200 hover:shadow-indigo-300 transition-all"
                >
                  Create account
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 space-y-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block px-2 py-2.5 text-sm font-light text-gray-500 hover:text-indigo-600 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 flex flex-col gap-2">
              {isAuth ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="text-center text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl py-2.5"
                  >
                    Go to Dashboard
                  </Link>
                  <button
                    onClick={() => { setMenuOpen(false); handleLogout(); }}
                    className="text-center text-sm font-medium text-red-600 border border-red-200 bg-red-50 hover:bg-red-100 rounded-xl py-2.5 transition-colors"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="text-center text-sm font-light text-gray-600 border border-gray-200 rounded-xl py-2.5 hover:border-indigo-300 transition-colors"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMenuOpen(false)}
                    className="text-center text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl py-2.5"
                  >
                    Create account
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

