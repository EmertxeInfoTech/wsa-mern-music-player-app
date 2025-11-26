import React, { useState } from "react";
import { GiPlayButton, GiPauseButton } from "react-icons/gi";
import { FaCirclePlay } from "react-icons/fa6";
import {
  TbPlayerTrackNextFilled,
  TbPlayerTrackPrevFilled,
} from "react-icons/tb";
import { CiHeart } from "react-icons/ci";
const ControlArea = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <div
      style={{
        display: "flex",
        width: "36%",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
        }}
      >
        <button
          type="button"
          aria-label={isPlaying ? "pause" : "play"}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          <TbPlayerTrackPrevFilled color="rgb(0, 255, 255)" size={24} />
        </button>
        <button
          type="button"
          aria-label="next"
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
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
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          <TbPlayerTrackNextFilled color="rgb(0, 255, 255)" size={24} />
        </button>
      </div>

      <div style={{ width: "100px", padding: "0px 8px" }}>
        <progress
          value={0}
          max={100}
          style={{ width: "100px", height: 8, appearance: "none" }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 14,
            color: "#9ca3af",
            marginTop: 6,
          }}
        >
          <span>0.00</span>
          <span>0.00</span>
        </div>
      </div>
    </div>
  );
};

export default ControlArea;
