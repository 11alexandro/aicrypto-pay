import { io, Socket } from "socket.io-client";

class SocketService {
  private socket: Socket | null = null;

  public connect(): Socket {
    if (!this.socket) {
      // Connect to the same origin in production, or fallback
      const isProduction = process.env.NODE_ENV === "production";
      const serverUrl = isProduction ? window.location.origin : window.location.origin; // Using window.location.origin fits port-forwarding proxies beautifully
      
      this.socket = io(serverUrl, {
        transports: ["websocket", "polling"],
        reconnectionAttempts: 5,
        reconnectionDelay: 2000
      });

      this.socket.on("connect", () => {
        console.log("[SocketService] Connected to real-time server endpoint safely.");
      });

      this.socket.on("connect_error", (err) => {
        console.warn("[SocketService] Connection warning (using standard polling/websocket fallback):", err.message);
      });
    }
    return this.socket;
  }

  public getSocket(): Socket {
    return this.connect();
  }

  public disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  // Helper broadcasts
  public broadcastClientAction(actionData: any) {
    const socket = this.getSocket();
    socket.emit("client_action", actionData);
  }

  public broadcastNewJob(jobData: any) {
    const socket = this.getSocket();
    socket.emit("new_job_posted", jobData);
  }

  public broadcastMilestoneUpdate(updateData: any) {
    const socket = this.getSocket();
    socket.emit("milestone_update", updateData);
  }
}

export const socketService = new SocketService();
