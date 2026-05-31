import express from "express";
import path from "path";
import { createServer as createHttpServer } from "http";
import { Server as SocketServer } from "socket.io";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const server = createHttpServer(app);
  const io = new SocketServer(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  const PORT = 3000;

  // Real-time server-side state for tracking simulated global transactions
  let currentSolvencyTotal = 39084.57;
  let transactionCounter = 1;

  // Helper random generator for Web3 actions
  const web3Events = [
    { text: "Secured payment lock initiated by Safe Treasury.", coin: "USDT", amount: "5000", val: "$5,000", address: "0xFa24...d71B" },
    { text: "Oracle agreement validator consensus signature confirmed.", coin: "SOL", amount: "12.50", val: "$1,875", address: "0x8CA2...9c3b" },
    { text: "Consensual payout released for Milestone 2 on Arbitrum.", coin: "ETH", amount: "1.45", val: "$4,640", address: "0x7E1A...0Ff" },
    { text: "Cold storage vault reserves locked and audited.", coin: "BTC", amount: "0.22", val: "$14,080", address: "0x3Fd9...1aF" },
    { text: "Safe multi-sig contract v1.4 compliance verification passed.", coin: "USDT", amount: "12000", val: "$12,000", address: "0x98f...d2a" }
  ];

  // Socket.io handlers
  io.on("connection", (socket) => {
    console.log(`[Websocket Client Connected] ID: ${socket.id}`);
    
    // Send initial bootstrap sync packet
    socket.emit("sync_state", {
      solvencyTotal: currentSolvencyTotal,
      time: new Date().toISOString()
    });

    // Handle incoming client chat or actions to broadcast across all tabs
    socket.on("client_action", (data) => {
      console.log(`[Websocket Client Action] received:`, data);
      io.emit("broadcast_action", data);
    });

    // Client posts a new job
    socket.on("new_job_posted", (jobData) => {
      io.emit("job_added_broadcast", jobData);
    });

    // Client triggers a milestone update
    socket.on("milestone_update", (updatedData) => {
      io.emit("milestone_update_broadcast", updatedData);
    });

    socket.on("disconnect", () => {
      console.log(`[Websocket Client Disconnected] ID: ${socket.id}`);
    });
  });

  // Periodically generate simulated live blockchain activity on server and broadcast to all tabs
  setInterval(() => {
    const randomEvent = web3Events[Math.floor(Math.random() * web3Events.length)];
    const dollarValue = parseFloat(randomEvent.amount) * (randomEvent.coin === 'BTC' ? 64000 : randomEvent.coin === 'ETH' ? 3200 : randomEvent.coin === 'SOL' ? 150 : 1);
    currentSolvencyTotal += dollarValue * 0.01; // tick up slightly

    // Create unique TX
    const txId = `tx-live-${Date.now()}-${transactionCounter++}`;
    const newTx = {
      id: txId,
      coin: randomEvent.coin,
      amount: randomEvent.amount,
      status: Math.random() > 0.15 ? "Success" : "Processing",
      val: randomEvent.val,
      address: randomEvent.address,
      text: randomEvent.text,
      time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
    };

    io.emit("live_blockchain_activity", {
      event: newTx,
      currentSolvencyTotal
    });
  }, 10000); // Send update every 10 seconds to keep dashboard live

  // Express API Health route
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", solvency: currentSolvencyTotal, clients: io.engine.clientsCount });
  });

  // Vite integration middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production static asset serving
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  server.listen(PORT, "0.0.0.0", () => {
    console.log(`[AICRYPTO PAY Server] Running on http://0.0.0.0:${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start AICRYPTO PAY full-stack server:", error);
});
