import React, { useState } from "react";

export default function LiveMatch({ match, commentary }) {
  const [ball, setBall] = useState({
    over: "",
    ball: "",
    event: "",
    runs: "",
    batsman: "",
    bowler: "",
    description: "",
  });

  const handleAddBall = async () => {
    if (!match) return;
    await fetch(
      `https://cricket-score-backend.onrender.com/matches/${match.matchId}/commentary`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ball),
      }
    );
    setBall({
      over: "",
      ball: "",
      event: "",
      runs: "",
      batsman: "",
      bowler: "",
      description: "",
    });
  };

  if (!match) return null;

  return (
    <div>
      <h2>Live Commentary</h2>
      <input
        placeholder="Over"
        value={ball.over}
        onChange={(e) => setBall({ ...ball, over: e.target.value })}
      />
      <input
        placeholder="Ball"
        value={ball.ball}
        onChange={(e) => setBall({ ...ball, ball: e.target.value })}
      />
      <input
        placeholder="Event (run/wicket/wide)"
        value={ball.event}
        onChange={(e) => setBall({ ...ball, event: e.target.value })}
      />
      <input
        placeholder="Runs"
        value={ball.runs}
        onChange={(e) => setBall({ ...ball, runs: e.target.value })}
      />
      <input
        placeholder="Batsman"
        value={ball.batsman}
        onChange={(e) => setBall({ ...ball, batsman: e.target.value })}
      />
      <input
        placeholder="Bowler"
        value={ball.bowler}
        onChange={(e) => setBall({ ...ball, bowler: e.target.value })}
      />
      <input
        placeholder="Description"
        value={ball.description}
        onChange={(e) => setBall({ ...ball, description: e.target.value })}
      />
      <button onClick={handleAddBall}>Add Ball</button>

      <ul>
        {commentary.map((c, i) => (
          <li key={i}>
            Over {c.over}.{c.ball} - {c.batsman} vs {c.bowler} → {c.event} (
            {c.runs}): {c.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
