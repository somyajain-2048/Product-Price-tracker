import React from "react";

export default function ExtensionSection() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-4xl mx-auto mt-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center">
          <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Browser Extension</h2>
          <p className="text-gray-500">Track products directly from e-commerce stores</p>
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <div className="flex items-center justify-between mb-4 border-b pb-2">
            <h3 className="text-lg font-semibold text-gray-800">1. Installation</h3>
            <a
              href="/PriceTrack-Extension.zip"
              download
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm shadow-indigo-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Extension ZIP
            </a>
          </div>
          <ol className="list-decimal list-inside space-y-3 text-gray-600 ml-2">
            <li>Download the extension ZIP file using the button above and extract/unzip it to a folder on your computer.</li>
            <li>Open Google Chrome and go to <code className="bg-gray-100 px-2 py-1 rounded text-sm text-pink-600">chrome://extensions/</code></li>
            <li>Enable <strong className="text-gray-800">Developer mode</strong> (toggle in the top right corner).</li>
            <li>Click <strong className="text-gray-800">Load unpacked</strong> in the top left.</li>
            <li>Select the folder that you just extracted.</li>
            <li>The extension is now installed! You should see the PriceTrack icon in your browser toolbar.</li>
          </ol>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">2. Syncing Your Account</h3>
          <p className="text-gray-600 mb-3 ml-2">
            To use the extension, it needs to be linked to your dashboard account.
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
            <li>Simply log in to this dashboard.</li>
            <li>The extension automatically detects your login and syncs your authorization token.</li>
            <li>You only need to do this once, unless you log out.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">3. Tracking Products</h3>
          <p className="text-gray-600 mb-3 ml-2">
            Currently supported stores: <strong className="text-gray-800">Amazon, Flipkart, Myntra</strong>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
              <h4 className="font-semibold text-indigo-700 mb-2 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>
                Method 1: One-Click Button
              </h4>
              <p className="text-sm text-gray-600">
                When viewing a product page, the extension automatically injects a "Track this Product" button directly into the page. Click it to start tracking instantly.
              </p>
            </div>

            <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
              <h4 className="font-semibold text-violet-700 mb-2 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                Method 2: Extension Popup
              </h4>
              <p className="text-sm text-gray-600">
                While on any supported product page, click the PriceTrack extension icon in your Chrome toolbar. A popup will appear allowing you to track the item.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
