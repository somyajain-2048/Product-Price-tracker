export const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Categories", href: "#categories" },
  { label: "FAQ", href: "#faq" },
];

export const STATS = [
  { value: "50K+", label: "Products Tracked" },
  { value: "₹2M+", label: "Savings Generated" },
  { value: "15K+", label: "Happy Users" },
  { value: "2", label: "Platforms Supported" },
];

export const MOCK_PRODUCTS = [
  { name: "Sony WH-1000XM5", emoji: "🎧", site: "amazon", current: "₹24,990", original: "₹34,990", drop: "29%", trend: "down" },
  { name: "Samsung Galaxy S24", emoji: "📱", site: "flipkart", current: "₹61,999", original: "₹79,999", drop: "22%", trend: "down" },
  { name: "Apple iPad 10th Gen", emoji: "📟", site: "amazon", current: "₹44,900", original: "₹44,900", drop: "0%", trend: "stable" },
];

export const FEATURES = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Real-time Price Tracking",
    desc: "Monitor prices across Amazon and Flipkart simultaneously. Pricing data refreshed every hour.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
    title: "Instant Price Alerts",
    desc: "Set your target price and we'll email you the moment it drops. Never miss a deal you love.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
      </svg>
    ),
    title: "Price History Charts",
    desc: "Visualize price trends over time. Know if you're buying at the lowest point or waiting pays off.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
    title: "Competitor Comparison",
    desc: "Compare the same product across platforms side by side. Always find the best price instantly.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "AI Price Predictions",
    desc: "Our AI analyzes historical patterns to predict price movements — buy at the perfect moment.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: "Smart Wishlist",
    desc: "Save products to your personal wishlist. Organize, track, and share your favourite deals.",
  },
];

export const CATEGORIES = [
  {
    emoji: "💻",
    name: "Electronics",
    count: "12,400+ products",
    color: "from-blue-500 to-indigo-600",
    badge: "Up to 40% off",
    example: "MacBook Air M2",
    drop: "↓ 18%",
  },
  {
    emoji: "👗",
    name: "Fashion",
    count: "8,700+ products",
    color: "from-pink-500 to-rose-500",
    badge: "Seasonal deals",
    example: "Nike Air Max 270",
    drop: "↓ 25%",
  },
  {
    emoji: "🏠",
    name: "Home & Kitchen",
    count: "6,200+ products",
    color: "from-amber-500 to-orange-500",
    badge: "Festival offers",
    example: "Dyson V15 Vacuum",
    drop: "↓ 22%",
  },
  {
    emoji: "📚",
    name: "Books",
    count: "20,000+ products",
    color: "from-emerald-500 to-teal-600",
    badge: "Best value",
    example: "Atomic Habits",
    drop: "↓ 35%",
  },
  {
    emoji: "🎮",
    name: "Gaming",
    count: "3,500+ products",
    color: "from-violet-500 to-purple-600",
    badge: "Launch deals",
    example: "PS5 Controller",
    drop: "↓ 12%",
  },
  {
    emoji: "🏋️",
    name: "Sports & Fitness",
    count: "5,100+ products",
    color: "from-cyan-500 to-sky-600",
    badge: "New arrivals",
    example: "Garmin Forerunner",
    drop: "↓ 20%",
  },
];

export const FAQS = [
  {
    q: "How does PriceTrack work?",
    a: "Simply paste any product URL from Amazon or Flipkart into PriceTrack. We automatically scrape and monitor the price every hour, store the history, and alert you when it reaches your target.",
  },
  {
    q: "Which e-commerce platforms are supported?",
    a: "Currently we support Amazon India and Flipkart. We're actively working to add Myntra, Snapdeal, Meesho, and more major Indian platforms in the coming months.",
  },
  {
    q: "How will I be notified about price drops?",
    a: "We send email notifications to your registered address as soon as a price drop is detected. You can set a custom target price for each product you're tracking.",
  },
  {
    q: "Is PriceTrack free to use?",
    a: "Yes! PriceTrack is completely free. Track unlimited products, view full price history, and receive email alerts — all at no cost.",
  },
  {
    q: "How accurate are the AI price predictions?",
    a: "Our AI model analyzes 90-day price history and seasonal patterns. While no prediction is perfect, our model achieves over 80% accuracy in identifying the right buy window.",
  },
  {
    q: "Do you have a browser extension?",
    a: "Yes! Install our Chrome extension to track any product directly from the product page with a single click. It also shows price history without leaving the store.",
  },
];

export const FOOTER_LINKS = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Categories", href: "#categories" },
    { label: "Chrome Extension", href: "#" },
    { label: "Pricing", href: "#" },
    { label: "Changelog", href: "#" },
  ],
  Company: [
    { label: "About Us", href: "#about" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
  ],
  Support: [
    { label: "FAQ", href: "#faq" },
    { label: "Contact Us", href: "mailto:support@pricetrack.in" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
};

export const SOCIALS = [
  {
    label: "Twitter",
    href: "#",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];
