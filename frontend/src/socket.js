import { io } from "socket.io-client";

export const socket = io("https://cricket-score-1.onrender.com", {
  transports: ["websocket"], // ✅ ensures reliable connection
});
