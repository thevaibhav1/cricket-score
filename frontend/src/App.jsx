import { useEffect, useState } from "react";
import { socket } from "./socket";
import StartMatch from "./pages/StartMatch";
import LiveMatch from "./pages/LiveMatch";

export default function App() {
  const [match, setMatch] = useState(null);
  const [commentary, setCommentary] = useState([]);

  useEffect(() => {
    socket.on("matchStarted", (data) => {
      setMatch(data);
      setCommentary([]);
    });

    socket.on("updateBall", (ball) => {
      setCommentary((prev) => [...prev, ball]);
    });

    return () => {
      socket.off("matchStarted");
      socket.off("updateBall");
    };
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1> Real-Time Cricket Scoreboard</h1>
      <StartMatch setMatch={setMatch} />

      <hr />
      {match ? <LiveMatch match={match} commentary={commentary} /> : null}
    </div>
  );
}
