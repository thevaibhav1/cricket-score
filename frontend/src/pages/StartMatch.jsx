import React, { useState } from "react";

export default function StartMatch({ setMatch }) {
  const [formData, setFormData] = useState({
    teamA: "",
    teamB: "",
    overs: "",
    toss: "",
  });

  const handleStart = async () => {
    const res = await fetch(
      "https://cricket-score-1.onrender.com/matches/start",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );
    const data = await res.json();
    setMatch(data);
  };

  return (
    <div>
      <h2>Start Match</h2>
      <input
        placeholder="Team A"
        onChange={(e) => setFormData({ ...formData, teamA: e.target.value })}
      />
      <input
        placeholder="Team B"
        onChange={(e) => setFormData({ ...formData, teamB: e.target.value })}
      />
      <input
        placeholder="Overs"
        onChange={(e) => setFormData({ ...formData, overs: e.target.value })}
      />
      <input
        placeholder="Toss"
        onChange={(e) => setFormData({ ...formData, toss: e.target.value })}
      />
      <button onClick={handleStart}>Start Match</button>
    </div>
  );
}
