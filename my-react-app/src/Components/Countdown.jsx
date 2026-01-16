import { useEffect, useState } from "react";

export default function Countdown({
  time,
  isRunning,
  customMinutes,
  setCustomMinutes,
  onToggle,
  onSetTime,
}) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const m = minutes < 10 ? "0" + minutes : minutes;
  const s = seconds < 10 ? "0" + seconds : seconds;
  const [flip, setFlip] = useState(false);
  useEffect(() => {
    setFlip(true);
    const timer = setTimeout(() => {
      setFlip(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [seconds]);
  return (
    <div className="countdown-box">
      <div className="time-control">
        <label>Focus:</label>
        <input
          className="time-input"
          type="number"
          min={1}
          max={60}
          value={customMinutes}
          onChange={(e) => setCustomMinutes(Number(e.target.value))}
        />
        <button onClick={onSetTime}>Set</button>
      </div>

      <div className="flip-clock">
        <div className="flip-wrapper">
          <div className="flip-card">
            <div className="flip-front">{m}</div>
            <div className="flip-back">{m}</div>
          </div>
        </div>
        <div style={{ fontSize: "30px", marginTop: "20px" }}>:</div>
        <div className="flip-wrapper">
          <div className={`flip-card ${flip ? "flip" : ""}`}>
            <div className="flip-front">{s}</div>
            <div className="flip-back">{s}</div>
          </div>
        </div>
      </div>

      <button
        className={isRunning ? "pause-btn" : "start-btn"}
        onClick={onToggle}
      >
        {isRunning ? "Pause " : "Start "}
      </button>
    </div>
  );
}
