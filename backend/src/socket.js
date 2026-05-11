import { Server } from "socket.io";
import jwt from "jsonwebtoken";

let io;

export const initSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: "*", // Or specify frontend URL if needed
      methods: ["GET", "POST"],
    },
  });

  // Middleware for authentication
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) {
      return next(new Error("Authentication error: No token provided"));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = decoded;
      next();
    } catch (err) {
      return next(new Error("Authentication error: Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    console.log(`[Socket] User connected: ${socket.user.id} (Socket ID: ${socket.id})`);
    
    // Join a room specifically for this user so we can emit targeted events
    const userRoom = `user_${socket.user.id}`;
    socket.join(userRoom);
    
    console.log(`[Socket] User ${socket.user.id} joined room: ${userRoom}`);

    socket.on("disconnect", () => {
      console.log(`[Socket] User disconnected: ${socket.user.id} (Socket ID: ${socket.id})`);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};
