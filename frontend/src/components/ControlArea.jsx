import React, { useState } from "react";
import { GiPlayButton, GiPauseButton } from "react-icons/gi";
import { FaCirclePlay } from "react-icons/fa6";
import {
  TbPlayerTrackNextFilled,
  TbPlayerTrackPrevFilled,
} from "react-icons/tb";
import "../css/ControlArea.css";
import { CiHeart } from "react-icons/ci";
const ControlArea = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <div className="control-area">
      <div className="control-row">
        <button
          type="button"
          aria-label={isPlaying ? "pause" : "play"}
          className="control-btn"
        >
          <TbPlayerTrackPrevFilled color="rgb(0, 255, 255)" size={24} />
        </button>
        <button type="button" aria-label="next" className="control-btn">
          {isPlaying ? (
            <GiPauseButton color="rgb(0, 255, 255)" size={48} />
          ) : (
            <FaCirclePlay color="rgb(0, 255, 255)" size={48} />
          )}
        </button>
        <button type="button" aria-label="next" className="control-btn">
          <TbPlayerTrackNextFilled color="rgb(0, 255, 255)" size={24} />
        </button>
      </div>

      <div className="control-progress-wrapper">
        <progress value={0} max={100} />
        <div className="control-times">
          <span>0.00</span>
          <span>0.00</span>
        </div>
      </div>
    </div>
  );
};

export default ControlArea;
