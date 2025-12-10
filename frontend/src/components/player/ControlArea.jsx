import React from "react";
import { GiPauseButton } from "react-icons/gi";
import { FaCirclePlay } from "react-icons/fa6";
import {
  TbPlayerTrackNextFilled,
  TbPlayerTrackPrevFilled,
} from "react-icons/tb";
import "../../css/footer/ControlArea.css";
const formatTime = (sec) => {
  if (!sec || isNaN(sec)) return "0:00";
  const minutes = Math.floor(sec / 60);
  const seconds = Math.floor(sec % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
};

const ControlArea = ({
  isPlaying,
  currentTime,
  duration,
  onTogglePlay,
  onNext,
  onPrev,
  onSeek,
}) => {
  const handleSeekChange = (e) => {
    const newTime = Number(e.target.value);
    onSeek && onSeek(newTime);
  };
  return (
    <div className="control-root">
      <div className="control-buttons">
        <button
          type="button"
          aria-label="previous"
          className="control-icon-btn"
          onClick={onPrev}
        >
          <TbPlayerTrackPrevFilled color="rgb(0, 255, 255)" size={24} />
        </button>
        <button
          type="button"
          aria-label="next"
          className="control-play-btn"
          onClick={onTogglePlay}
        >
          {isPlaying ? (
            <GiPauseButton color="rgb(0, 255, 255)" size={48} />
          ) : (
            <FaCirclePlay color="rgb(0, 255, 255)" size={48} />
          )}
        </button>
        <button
          type="button"
          aria-label="next"
          className="control-icon-btn"
          onClick={onNext}
        >
          <TbPlayerTrackNextFilled color="rgb(0, 255, 255)" size={24} />
        </button>
      </div>

      <div className="control-progress-wrapper">
        <input
          type="range"
          min={0}
          max={duration || 0}
          value={currentTime}
          onChange={handleSeekChange}
          className="control-progress"
        />
        <div className="control-times">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
};

export default ControlArea;
