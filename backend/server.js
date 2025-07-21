// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";

import connectDB from "./utils/db.js";
import userRouter from "./routes/user.router.js";
import messageRouter from "./routes/message.router.js";

dotenv.config();

const app = express();
const server = http.createServer(app); // Create HTTP server

// Setup Socket.IO server
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173","https://my-roommate-zeta.vercel.app" ],// frontend port
    credentials: true,
  },
});

app.set("io", io);

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("register", (userId) => {
    socket.join(userId); // ✅ join room based on user ID
    console.log(`User ${userId} joined room ${userId}`);
  });
});


// Map to track connected users
const users = {}; // { userId: socketId }


 


// Middleware
app.use(cors({ origin: ["http://localhost:5173","https://my-roommate-zeta.vercel.app" ], credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/user", userRouter);
app.use("/api/message", messageRouter);

// Start Server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  connectDB();
  console.log(`🚀 Server running on port ${PORT}`);
});
