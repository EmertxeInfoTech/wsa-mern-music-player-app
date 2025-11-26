import React from "react";
import { IoVolumeHighOutline } from "react-icons/io5";
import { TbArrowsShuffle } from "react-icons/tb";
import { RiLoopRightLine } from "react-icons/ri";
const Features = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "28%",
          gap: 8,
          alignItems: "flex-end",
        }}
      >
        <div
          style={{
            padding: "10px",
            display: "flex",
            gap: 12,
            alignItems: "center",
          }}
        >
          <button
            type="button"
            aria-label="volume"
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            <IoVolumeHighOutline color="rgb(0, 255, 255)" size={30} />
          </button>
          <button
            type="button"
            aria-label="shuffle"
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            <TbArrowsShuffle color="rgb(0, 255, 255)" size={30} />
          </button>
          <button
            type="button"
            aria-label="loop"
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            <RiLoopRightLine color="rgb(0, 255, 255)" size={30} />
          </button>
          <label
            htmlFor="playbackSpeed"
            style={{ color: "#9ca3af", fontSize: 12 }}
          >
            <select
              name="playbackSpeed"
              id="playbackSpeed"
              aria-label="playbackSpeed"
              style={{ background: "transparent", color: "#fff" }}
            >
              <option value="1">1x</option>
              <option value="2">2x</option>
              <option value="3">3x</option>
            </select>
          </label>
        </div>
        <div style={{ width: 140 }}>
          <progress value={60} max={100} style={{ width: "100%", height: 8 }} />
        </div>
      </div>
    </>
  );
};

export default Features;
