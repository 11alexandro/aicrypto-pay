import express from "express";
import path from "path";
import { createServer as createHttpServer } from "http";
import { Server as SocketServer } from "socket.io";
import { createServer as createViteServer } from "vite";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { User, Job, EscrowTransaction, ActivityLog } from "./models";

dotenv.config();

async function startServer() {
  const app = express();
  app.use(express.json());
  
  const server = createHttpServer(app);
  const io = new SocketServer(server, {
    cors: { origin: "*", methods: ["GET", "POST"] }
  });

  const PORT = process.env.PORT || 3000;
  const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/alcrypto-pay";

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("[MongoDB] Connected successfully");
    
    // Seed initial users if none exist
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      await User.create([
        { id: "client-1", name: "Alice", email: "alice@example.com", role: "client", walletBalance: 50000, pendingBalance: 0, withdrawableBalance: 0 },
        { id: "freelancer-1", name: "Bob", email: "bob@example.com", role: "freelancer", walletBalance: 0, pendingBalance: 0, withdrawableBalance: 0 }
      ]);
      console.log("[MongoDB] Seeded initial users");
    }
  } catch (err) {
    console.error("[MongoDB] Connection error:", err);
  }

  // Real-time server-side state for tracking simulated global transactions
  let currentSolvencyTotal = 39084.57;
  let transactionCounter = 1;

  const web3Events = [
    { text: "Secured payment lock initiated by Safe Treasury.", coin: "USDT", amount: "5000", val: "$5,000", address: "0xFa24...d71B" },
    { text: "Oracle agreement validator consensus signature confirmed.", coin: "SOL", amount: "12.50", val: "$1,875", address: "0x8CA2...9c3b" },
    { text: "Consensual payout released for Milestone 2 on Arbitrum.", coin: "ETH", amount: "1.45", val: "$4,640", address: "0x7E1A...0Ff" },
    { text: "Cold storage vault reserves locked and audited.", coin: "BTC", amount: "0.22", val: "$14,080", address: "0x3Fd9...1aF" },
    { text: "Safe multi-sig contract v1.4 compliance verification passed.", coin: "USDT", amount: "12000", val: "$12,000", address: "0x98f...d2a" }
  ];

  io.on("connection", (socket) => {
    socket.emit("sync_state", { solvencyTotal: currentSolvencyTotal, time: new Date().toISOString() });
    socket.on("client_action", (data) => io.emit("broadcast_action", data));
    socket.on("new_job_posted", (jobData) => io.emit("job_added_broadcast", jobData));
    socket.on("milestone_update", (updatedData) => io.emit("milestone_update_broadcast", updatedData));
  });

  setInterval(() => {
    const randomEvent = web3Events[Math.floor(Math.random() * web3Events.length)];
    const dollarValue = parseFloat(randomEvent.amount) * (randomEvent.coin === 'BTC' ? 64000 : randomEvent.coin === 'ETH' ? 3200 : randomEvent.coin === 'SOL' ? 150 : 1);
    currentSolvencyTotal += dollarValue * 0.01;

    const txId = `tx-live-${Date.now()}-${transactionCounter++}`;
    const newTx = {
      id: txId, coin: randomEvent.coin, amount: randomEvent.amount,
      status: Math.random() > 0.15 ? "Success" : "Processing",
      val: randomEvent.val, address: randomEvent.address, text: randomEvent.text,
      time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
    };

    io.emit("live_blockchain_activity", { event: newTx, currentSolvencyTotal });
  }, 10000);

  // REST API Endpoints
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", solvency: currentSolvencyTotal, clients: io.engine.clientsCount });
  });

  app.post("/api/jobs", async (req, res) => {
    try {
      const job = new Job({ ...req.body, id: `job-${Date.now()}` });
      await job.save();
      
      await ActivityLog.create({ id: `log-${Date.now()}`, type: 'JOB_CREATED', message: `Job created: ${job.title}` });
      res.json(job);
    } catch (err: any) { res.status(400).json({ error: err.message }); }
  });

  app.get("/api/jobs", async (req, res) => {
    try {
      const jobs = await Job.find().sort({ createdAt: -1 });
      res.json(jobs);
    } catch (err: any) { res.status(500).json({ error: err.message }); }
  });

  app.get("/api/jobs/:id", async (req, res) => {
    try {
      const job = await Job.findOne({ id: req.params.id });
      if (!job) return res.status(404).json({ error: "Not found" });
      res.json(job);
    } catch (err: any) { res.status(500).json({ error: err.message }); }
  });

  app.post("/api/jobs/:id/fund", async (req, res) => {
    try {
      const job = await Job.findOne({ id: req.params.id });
      if (!job) return res.status(404).json({ error: "Not found" });
      
      const client = await User.findOne({ id: job.clientId });
      if (!client || client.walletBalance < job.budget) return res.status(400).json({ error: "Insufficient funds" });

      client.walletBalance -= job.budget;
      client.pendingBalance += job.budget;
      await client.save();

      job.status = "Funded";
      job.updatedAt = new Date();
      await job.save();

      const tx = await EscrowTransaction.create({ id: `tx-${Date.now()}`, jobId: job.id, amount: job.budget, status: "Locked", txHash: `0x${Math.random().toString(16).slice(2)}` });
      await ActivityLog.create({ id: `log-${Date.now()}`, type: 'FUNDS_LOCKED', message: `Funds locked for job: ${job.title}` });
      
      io.emit("milestone_update_broadcast", { jobId: job.id, status: job.status });
      res.json({ job, tx });
    } catch (err: any) { res.status(500).json({ error: err.message }); }
  });

  app.post("/api/jobs/:id/start", async (req, res) => {
    try {
      const job = await Job.findOne({ id: req.params.id });
      if (!job) return res.status(404).json({ error: "Not found" });

      job.status = "In Progress";
      job.updatedAt = new Date();
      await job.save();
      
      io.emit("milestone_update_broadcast", { jobId: job.id, status: job.status });
      res.json(job);
    } catch (err: any) { res.status(500).json({ error: err.message }); }
  });

  app.post("/api/jobs/:id/release", async (req, res) => {
    try {
      const job = await Job.findOne({ id: req.params.id });
      if (!job) return res.status(404).json({ error: "Not found" });

      const client = await User.findOne({ id: job.clientId });
      const freelancer = await User.findOne({ id: job.freelancerId });

      if (client && freelancer) {
        client.pendingBalance -= job.budget;
        freelancer.withdrawableBalance += job.budget;
        await client.save();
        await freelancer.save();
      }

      job.status = "Released";
      job.updatedAt = new Date();
      await job.save();

      const tx = await EscrowTransaction.create({ id: `tx-${Date.now()}`, jobId: job.id, amount: job.budget, status: "Released", txHash: `0x${Math.random().toString(16).slice(2)}` });
      
      io.emit("milestone_update_broadcast", { jobId: job.id, status: job.status });
      res.json({ job, tx });
    } catch (err: any) { res.status(500).json({ error: err.message }); }
  });

  app.post("/api/jobs/:id/dispute", async (req, res) => {
    try {
      const job = await Job.findOne({ id: req.params.id });
      if (!job) return res.status(404).json({ error: "Not found" });

      job.status = "Disputed";
      job.updatedAt = new Date();
      await job.save();
      
      io.emit("milestone_update_broadcast", { jobId: job.id, status: job.status });
      res.json(job);
    } catch (err: any) { res.status(500).json({ error: err.message }); }
  });

  app.post("/api/jobs/:id/resolve", async (req, res) => {
    try {
      const { resolution } = req.body; // 'release' or 'refund'
      const job = await Job.findOne({ id: req.params.id });
      if (!job) return res.status(404).json({ error: "Not found" });

      const client = await User.findOne({ id: job.clientId });
      const freelancer = await User.findOne({ id: job.freelancerId });

      if (client && freelancer) {
        client.pendingBalance -= job.budget;
        if (resolution === 'release') {
          freelancer.withdrawableBalance += job.budget;
        } else {
          client.walletBalance += job.budget;
        }
        await client.save();
        await freelancer.save();
      }

      job.status = resolution === 'release' ? "Released" : "Draft"; // or another terminal state
      job.updatedAt = new Date();
      await job.save();
      
      io.emit("milestone_update_broadcast", { jobId: job.id, status: job.status });
      res.json(job);
    } catch (err: any) { res.status(500).json({ error: err.message }); }
  });

  app.get("/api/transactions", async (req, res) => {
    try {
      const txs = await EscrowTransaction.find().sort({ createdAt: -1 });
      res.json(txs);
    } catch (err: any) { res.status(500).json({ error: err.message }); }
  });

  app.get("/api/dashboard/:userId", async (req, res) => {
    try {
      const user = await User.findOne({ id: req.params.userId });
      if (!user) return res.status(404).json({ error: "User not found" });

      if (user.role === 'freelancer') {
        const completedJobs = await Job.countDocuments({ freelancerId: user.id, status: "Released" });
        res.json({
          availableBalance: user.withdrawableBalance,
          pendingBalance: user.pendingBalance, // actually escrow funds
          totalEarnings: user.withdrawableBalance,
          escrowFunds: user.pendingBalance,
          completedJobs
        });
      } else {
        const activeJobs = await Job.countDocuments({ clientId: user.id, status: { $in: ["Funded", "In Progress", "Disputed"] } });
        const completedJobs = await Job.countDocuments({ clientId: user.id, status: "Released" });
        const jobs = await Job.find({ clientId: user.id, status: "Released" });
        const totalSpending = jobs.reduce((acc, job) => acc + job.budget, 0);

        res.json({
          totalFundsLocked: user.pendingBalance,
          activeJobs,
          completedJobs,
          totalSpending,
          walletBalance: user.walletBalance
        });
      }
    } catch (err: any) { res.status(500).json({ error: err.message }); }
  });

  // Vite integration middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({ server: { middlewareMode: true }, appType: "spa" });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => res.sendFile(path.join(distPath, "index.html")));
  }

  server.listen(PORT, "0.0.0.0", () => {
    console.log(`[AICRYPTO PAY Server] Running on http://0.0.0.0:${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  });
}

startServer().catch((error) => console.error("Failed to start server:", error));
