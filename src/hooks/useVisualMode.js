import { useState } from "react";

export const useVisualMode = (initial) => {
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => setHistory(prev => [...prev.slice(0, -replace || undefined), newMode]);
  const back = () => setHistory(prev => prev.slice(0, -!!prev[1] || undefined));

  const mode = history.slice(-1)[0];

  return { mode, transition, back };
};