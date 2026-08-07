# 🛍️ PriceTrack — E-Commerce Price Intelligence & Tracking Platform

PriceTrack is a full-stack e-commerce price monitoring and intelligence platform that enables shoppers to track product prices across major e-commerce platforms including **Amazon India** and **Flipkart**.

Featuring **24/7 automated price monitoring**, **cross-platform competitor price comparisons**, **real-time WebSocket updates**, **Nodemailer email alerts**, and a **Manifest V3 Chrome Extension**, PriceTrack ensures users never miss a price drop.

---

## 📁 Clean Directory Structure

```text
Product_Price-Tracker/
├── backend/                        # Express.js REST API, Socket.IO & Web Scrapers
│   ├── src/
│   │   ├── cron/                   # Automated node-cron price monitoring
│   │   ├── middleware/             # JWT auth & error interceptors
│   │   ├── modules/                # Auth, Products & Search controllers/services
│   │   ├── services/               # Puppeteer, Cheerio & Nodemailer transport
│   │   └── socket.js               # Socket.IO real-time private user rooms
├── extension/                      # Chrome Extension (Manifest V3)
│   ├── inject.js                   # Content script for 1-click DOM tracking
│   ├── background.js               # Background service worker API transport
│   └── popup.html / popup.js       # Popup extension interface
├── frontend/                       # React 18 + Vite + Tailwind CSS SPA
│   ├── src/
│   │   ├── components/             # Dashboard, Landing, Modals & UI Components
│   │   ├── context/                # Auth & SocketContext providers
│   │   ├── pages/                  # Dashboard, Login, Signup & Legal pages
│   │   └── utils/                  # Price intelligence & AI trend analysis
├── PROJECT_REPORT.md               # Technical Architecture & Interview Guide
├── PriceTrack_Project_Report.pdf   # Printable Technical Architecture PDF Report
└── README.md                       # Project Guide & Documentation
```

---

## ✨ Core Features

- **📊 Modern Dashboard**: Sleek, responsive interface built with React 18, Tailwind CSS, and glassmorphism styling.
- **🔄 Automated Price Checking**: Built-in 2-hour node-cron background monitor scrapes prices via Puppeteer & Cheerio.
- **⚡ Real-Time WebSocket Alerts**: Socket.IO broadcasts live price drop notifications to active web clients without page reloads.
- **📧 Email Notifications**: Nodemailer dispatches HTML alert emails when products hit target prices.
- **🧩 Manifest V3 Chrome Extension**: Injects 1-click "Track Price" button directly onto Amazon and Flipkart product pages.
- **⚖️ Competitor Deal Comparison**: Automatically discovers and displays live competitor listings side by side.
- **📈 AI Price Intelligence**: Linear price trend analysis advises users whether to *Buy Now*, *Wait*, or *Good Deal*.

---

## 🏗️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite, Tailwind CSS, React Router v6, Axios, Socket.IO Client |
| **Backend** | Node.js, Express.js, MongoDB, Mongoose, JWT, Socket.IO, Puppeteer, Cheerio, node-cron, Nodemailer |
| **Extension** | Chrome Extension Manifest V3 (JavaScript, Content Scripts, Service Worker) |

---

## 🚀 Quick Setup Guide

### 1. Clone & Install Backend
```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/price-tracker
JWT_SECRET=pricetrack_super_secret_jwt_key_2026
EMAIL_USER=support@pricetrack.in
EMAIL_PASS=your_gmail_app_password
```

Start backend dev server (Port 5000):
```bash
npm run dev
```

### 2. Frontend Setup
In a new terminal:
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

### 3. Chrome Extension Setup
1. Open Chrome and navigate to `chrome://extensions/`.
2. Enable **Developer Mode** (top right toggle).
3. Click **Load unpacked** and select the `extension` folder.

---

## 📄 Technical Reports & Interview Q&A

- 📑 **Markdown Report**: [PROJECT_REPORT.md](file:///c:/Users/91860/Desktop/Projects/Product_price/Product_Price-Tracker/PROJECT_REPORT.md)
- 📄 **PDF Report**: [PriceTrack_Project_Report.pdf](file:///c:/Users/91860/Desktop/Projects/Product_price/Product_Price-Tracker/PriceTrack_Project_Report.pdf)
- 🌐 **Browser PDF View**: [http://localhost:5000/report](http://localhost:5000/report)

---

## 📜 License
This project is licensed under the ISC License.
