<div align="center">
  <img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

<h1 align="center">AICrypto Pay</h1>

<p align="center">
  <strong>The Next-Generation AI-Driven Cryptocurrency Payment Gateway</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.0-blue?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite" alt="Vite" />
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=nodedotjs" alt="Node" />
  <img src="https://img.shields.io/badge/Socket.io-Realtime-010101?style=for-the-badge&logo=socketdotio" alt="Socket.io" />
  <img src="https://img.shields.io/badge/TailwindCSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Google-Gemini_AI-4285F4?style=for-the-badge&logo=google" alt="Gemini" />
</p>

---

## 🚀 Overview

**AICrypto Pay** is an interactive, real-time web application built to simulate and explore a futuristic AI-driven cryptocurrency payment ecosystem. The application integrates modern frontend design paradigms with real-time web socket data to emulate live blockchain transactions, smart contract validations, and automated job/milestone tracking.

By leveraging **Google's Gemini AI**, the application powers intelligent interactions to automate smart-contract driven payouts and crypto escrow features.

---

## 🏗 Architecture & Stack

This application is built with a **Full-Stack SPA** architecture, decoupling modern frontend components from a robust Node.js express backend server that handles real-time synchronization.

### 🎨 Frontend
* **Core:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
* **Build Tool:** [Vite](https://vitejs.dev/) - Lightning fast HMR and optimized production bundling.
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) - Utility-first styling for a sleek, responsive, and modern glassmorphic interface.
* **Animations:** [Framer Motion](https://www.framer.com/motion/) - Smooth, dynamic micro-animations that make the UI feel alive.
* **Icons:** [Lucide React](https://lucide.dev/)

### ⚙️ Backend & Real-Time Sync
* **Server:** [Express.js](https://expressjs.com/) built on Node.js running `server.ts` directly via `tsx`.
* **WebSockets:** [Socket.IO](https://socket.io/) - Used to broadcast live simulated blockchain transactions (`live_blockchain_activity`), new job posts, and milestone updates globally across all connected clients.
* **AI Engine:** Google Gemini AI (`@google/genai`) for generating and validating complex AI-driven actions.

---

## ✨ Features

* **Live Global Dashboard:** Real-time stream of simulated Web3 events (e.g. *Safe Treasury locks*, *Oracle validators*, *Cold storage audits*) synchronized across all browser instances.
* **Crypto Job Board & Escrow:** AI-generated crypto-funded jobs and milestones with seamless state management.
* **Dynamic Animations:** A premium, "wow-factor" visual aesthetic featuring deep dark modes, glowing gradients, and fluid layout transitions.
* **Responsive Design:** Completely optimized for both desktop and mobile layouts.

---

## 🛠 How to Run Locally

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18+ recommended) installed on your system.

### 1. Clone & Install
```bash
# Install NPM dependencies
npm install
```

### 2. Configure Environment
You need a Google Gemini API key to run the AI features.
```bash
# Copy the example env file
cp .env.example .env.local
```
Open `.env.local` and add your Gemini API Key:
```env
GEMINI_API_KEY="your_api_key_here"
```

### 3. Start the Development Server
The `dev` script concurrently starts both the Vite frontend server and the Express WebSocket backend.
```bash
npm run dev
```
> Your app will now be running live at **http://localhost:5173** (or the port specified in your console).

---

## 📦 Building for Production

To create an optimized production build:

1. **Build the bundle:**
   ```bash
   npm run build
   ```
   *This compiles the React frontend into static files and uses `esbuild` to compile the Express server into a standalone `server.cjs` script.*

2. **Start the production server:**
   ```bash
   npm run start
   ```

---

<p align="center">
  <i>Built with ❤️ for the future of Web3 & AI.</i>
</p>
