const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "https://cricket-score-r9r8.vercel.app", // ✅ match frontend
    methods: ["GET", "POST"],
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://cricket-score-r9r8.vercel.app", // ✅ for socket.io
    methods: ["GET", "POST"],
  },
});

let matchCounter = 1;
let matches = {};
let commentary = {};

// Start Match
app.post("/matches/start", (req, res) => {
  const { teamA, teamB, overs, toss } = req.body;
  if (!teamA || !teamB || !overs || !toss) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const matchId = String(matchCounter++).padStart(4, "0");
  const match = { matchId, teamA, teamB, overs, toss };
  matches[matchId] = match;
  commentary[matchId] = [];

  io.emit("matchStarted", match);
  res.json(match);
});

// Add Commentary
app.post("/matches/:id/commentary", (req, res) => {
  const matchId = req.params.id;
  if (!matches[matchId]) {
    return res.status(404).json({ error: "Match not found" });
  }

  const { over, ball, event, runs, batsman, bowler, description } = req.body;

  if (!over || !ball || !event || !batsman || !bowler) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const newComment = {
    matchId,
    over,
    ball,
    event,
    runs: runs || 0,
    batsman,
    bowler,
    description: description || "",
  };

  commentary[matchId].push(newComment);
  io.emit("updateBall", newComment);

  res.json(newComment);
});

io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});
