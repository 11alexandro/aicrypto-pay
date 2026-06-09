# ALCrypto-Pay

**Full-Stack Crypto Escrow Platform for Freelancers & Clients**

ALCrypto-Pay is a full-stack escrow platform inspired by modern Web3 payment systems. The application simulates how clients and freelancers can securely manage project payments using escrow workflows, balance tracking, dispute management, and real-time updates.

The goal of the project is to demonstrate full-stack development skills by combining React, Node.js, MongoDB, and real-time communication into a practical fintech-style application.

---

## Preview

![ALCrypto-Pay Landing Page](./code/alcrypto-pay-preview.JPEG)

---

## Project Overview

Traditional freelance payments often require trust between clients and developers. ALCrypto-Pay introduces an escrow workflow where funds are held securely until project milestones are completed.

The platform allows users to:

* Post and manage jobs
* Fund escrow transactions
* Track pending and withdrawable balances
* Release payments upon completion
* Open and manage disputes
* Monitor activity through a real-time dashboard

---

## Features

### Escrow Workflow

Supports a complete payment lifecycle:

```text
Draft
   ↓
Funded
   ↓
In Progress
   ↓
Released
   ↘
   Disputed
```

### User Dashboard

Track:

* Wallet Balance
* Pending Balance
* Withdrawable Balance
* Active Jobs
* Completed Jobs
* Transaction History

### Job Management

* Create jobs
* Accept jobs
* Monitor project status
* Track escrow activity

### Transaction Tracking

* Escrow transactions
* Payment releases
* Funding history
* Activity logs

### MongoDB Persistence

All critical application data is stored in MongoDB:

* Users
* Jobs
* Escrow Transactions
* Activity Logs

Data remains available after server restarts.

### Real-Time Updates

The platform uses Socket.IO to provide:

* Live activity updates
* Instant dashboard synchronization
* Real-time escrow status changes

### Responsive Design

Built to work across:

* Desktop
* Tablet
* Mobile

---

## Tech Stack

### Frontend

* React
* TypeScript
* Tailwind CSS
* Vite

### Backend

* Node.js
* Express.js
* Socket.IO

### Database

* MongoDB
* Mongoose

### Development Tools

* Git
* GitHub
* ESLint

---

## Architecture

```text
React Frontend
       │
       ▼
Express API
       │
 ┌─────┼───────────────┐
 │     │               │
 ▼     ▼               ▼
MongoDB Escrow Engine Socket.IO
 │
 ├── Users
 ├── Jobs
 ├── Transactions
 └── Activity Logs
```

---

## Escrow Accounting Logic

The project implements a simplified escrow accounting model.

### Fund Job

```text
Client Wallet Balance
          ↓
     Escrow Account
```

### Release Payment

```text
Escrow Account
          ↓
Freelancer Withdrawable Balance
```

### Dispute

```text
Escrow Account
          ↓
Funds Locked Until Resolution
```

This structure demonstrates how payment platforms can separate available funds from pending funds.

---

## API Endpoints

### Jobs

```http
POST   /api/jobs
GET    /api/jobs
GET    /api/jobs/:id
```

### Escrow Actions

```http
POST /api/jobs/:id/fund
POST /api/jobs/:id/start
POST /api/jobs/:id/release
POST /api/jobs/:id/dispute
POST /api/jobs/:id/resolve
```

### Dashboard

```http
GET /api/dashboard
GET /api/transactions
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/your-username/alcrypto-pay.git
cd alcrypto-pay
```

### Install Dependencies

Frontend

```bash
npm install
```

Backend

```bash
cd server
npm install
```

### Environment Variables

Create a `.env` file:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

### Start Application

Backend

```bash
npm run server
```

Frontend

```bash
npm run dev
```

---

## What I Learned

While building ALCrypto-Pay I worked on:

* Escrow state management
* MongoDB data modeling
* REST API development
* Real-time communication with Socket.IO
* Full-stack application architecture
* Fintech-style dashboard design
* Responsive frontend development

---

## Future Improvements

Planned enhancements:

* MetaMask wallet integration
* Blockchain transaction verification
* Binance Pay simulation
* Multi-signature approval workflows
* Advanced dispute resolution system
* Role-based permissions
* Audit logs

---

## Disclaimer

This project is a portfolio and educational project designed to demonstrate full-stack development concepts, escrow workflows, and fintech-style application architecture.

It does not process real cryptocurrency transactions and should not be used as a production payment platform.

---

## Author

**Alex Valmyr**

Frontend & Full-Stack Developer

Specializing in:

* Fintech Applications
* Trading Dashboards
* Web3 Interfaces
* Full-Stack JavaScript Development
