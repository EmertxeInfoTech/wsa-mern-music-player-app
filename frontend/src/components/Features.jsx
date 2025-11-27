import React from "react";
import { IoVolumeHighOutline } from "react-icons/io5";
import { TbArrowsShuffle } from "react-icons/tb";
import { RiLoopRightLine } from "react-icons/ri";
import "../css/Feature.css";
const Features = () => {
  return (
    <>
      <div className="features">
        <div className="features-row">
          <button type="button" aria-label="volume" className="features-btn">
            <IoVolumeHighOutline color="rgb(0, 255, 255)" size={30} />
          </button>
          <button type="button" aria-label="shuffle" className="features-btn">
            <TbArrowsShuffle color="rgb(0, 255, 255)" size={30} />
          </button>
          <button type="button" aria-label="loop" className="features-btn">
            <RiLoopRightLine color="rgb(0, 255, 255)" size={30} />
          </button>
          <label htmlFor="playbackSpeed" className="features-speed-label">
            <select
              name="playbackSpeed"
              id="playbackSpeed"
              aria-label="playbackSpeed"
              className="features-speed-select"
            >
              <option value="1">1x</option>
              <option value="2">2x</option>
              <option value="3">3x</option>
            </select>
          </label>
        </div>
        <div className="features-progress">
          <progress value={60} max={100} />
        </div>
      </div>
    </>
  );
};

export default Features;
