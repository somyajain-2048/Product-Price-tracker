# 🛍️ PriceTrack - E-Commerce Price Tracker

PriceTrack is a comprehensive price tracking application that allows users to monitor the prices of their favorite products across popular e-commerce platforms like **Amazon, Flipkart, and Myntra**. 

With automated price checks, real-time push notifications, email alerts, and a companion browser extension, you'll never miss a price drop again!

---

## ✨ Features

- **📊 Modern Dashboard**: A sleek, responsive dashboard built with React and Tailwind CSS.
- **🔄 Automated Price Checking**: A built-in Node.js cron job automatically scrapes and updates product prices every 2 hours using Puppeteer.
- **⚡ Real-Time Updates**: Integrated Socket.IO pushes instant price drop notifications directly to the frontend without requiring a page refresh.
- **📧 Email Alerts**: Get notified via email the moment a product you're tracking drops in price.
- **🧩 Browser Extension**: A custom Chrome extension that injects a "Track this Product" button directly into Amazon, Flipkart, and Myntra product pages for one-click tracking.
- **❤️ Wishlist Management**: Save and organize your favorite products.

---

## 🏗️ Tech Stack

### Frontend
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Real-Time**: Socket.IO Client
- **Charts**: Recharts

### Backend
- **Framework**: Node.js + Express
- **Database**: MongoDB (Mongoose)
- **Scraping**: Puppeteer
- **Real-Time**: Socket.IO Server
- **Scheduling**: Node-cron
- **Emails**: Nodemailer
- **Authentication**: JWT & bcryptjs

### Extension
- Vanilla JavaScript, HTML, CSS (Manifest V3)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone <repository-url>
cd Product_Price-Tracker
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory with the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
```
Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal window:
```bash
cd frontend
npm install
```
*(The frontend is preconfigured to communicate with the backend at `http://localhost:5000/api`)*

Start the frontend server:
```bash
npm run dev
```

### 4. Extension Setup
1. Open Google Chrome and navigate to `chrome://extensions/`.
2. Toggle **Developer Mode** on (top right corner).
3. Click **Load unpacked** (top left).
4. Select the `extension` folder located inside the `Product_Price-Tracker` project directory.
5. Log in to the frontend dashboard. The extension will automatically sync your session token and allow you to track products!

---

## 📸 Usage

1. **Dashboard**: Navigate to `http://localhost:5173` to view your tracked products, wishlists, and recent price drops.
2. **Adding Products (Manual)**: Paste a supported product URL directly into the dashboard.
3. **Adding Products (Extension)**: Visit an Amazon, Flipkart, or Myntra product page. Click the injected "Track this Product" button or use the extension popup to instantly add it to your dashboard.

---

## 📜 License
This project is licensed under the ISC License.
