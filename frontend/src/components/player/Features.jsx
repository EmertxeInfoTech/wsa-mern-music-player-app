import React from "react";
import { IoVolumeHighOutline, IoVolumeMuteOutline } from "react-icons/io5";
import { TbArrowsShuffle } from "react-icons/tb";
import { RiLoopRightLine } from "react-icons/ri";
import "../../css/footer/Feature.css";
const Features = ({
  isMuted,
  onToggleMute,
  loopEnabled,
  onToggleLoop,
  shuffleEnabled,
  onToggleShuffle,
  playbackSpeed,
  onChangeSpeed,
  volume,
  onChangeVolume,
}) => {
  const handleSpeedChange = (e) => {
    const value = Number(e.target.value);
    onChangeSpeed && onChangeSpeed(value);
  };

  const handleVolumeChange = (e) => {
    const value = Number(e.target.value);
    const normalized = value / 100;
    onChangeVolume && onChangeVolume(normalized);
  };
  return (
    <>
      <div className="features-root">
        <div className="features-row">
          <button
            className="features-btn"
            type="button"
            aria-label={isMuted ? "unmute" : "mute"}
            onClick={onToggleMute}
          >
            {isMuted ? (
              <IoVolumeMuteOutline color="rgb(0, 255, 255)" size={30} />
            ) : (
              <IoVolumeHighOutline color="rgb(0, 255, 255)" size={30} />
            )}
          </button>
          <button
            type="button"
            aria-label={shuffleEnabled ? "disable shuffle" : "enable shuffle"}
            className={
              shuffleEnabled
                ? "features-btn features-btn-active"
                : "features-btn"
            }
            onClick={onToggleShuffle}
          >
            <TbArrowsShuffle
              color={shuffleEnabled ? "rgb(0, 255, 255)" : "rgb(180, 180, 180)"}
              size={30}
            />
          </button>
          <button
            type="button"
            aria-label="loop"
            className={
              loopEnabled ? "features-btn features-btn-active" : "features-btn"
            }
            onClick={onToggleLoop}
          >
            <RiLoopRightLine
              color={loopEnabled ? "rgb(0, 255, 255)" : "rgb(180, 180, 180)"}
              size={30}
            />
          </button>
          <label htmlFor="playbackSpeed" className="features-speed-label">
            <select
              name="playbackSpeed"
              id="playbackSpeed"
              aria-label="playbackSpeed"
              className="features-speed-select"
              value={playbackSpeed}
              onChange={handleSpeedChange}
            >
              <option className="bg-black" value={0.75}>
                0.75x
              </option>
              <option className="bg-black" value={1}>
                1x
              </option>
              <option className="bg-black" value={1.25}>
                1.25x
              </option>
              <option className="bg-black" value={1.5}>
                1.5x
              </option>
              <option className="bg-black" value={2}>
                2x
              </option>
            </select>
          </label>
        </div>
        <div className="features-volume-wrapper">
          <input
            type="range"
            min={0}
            max={100}
            value={Math.round((volume || 0) * 100)}
            onChange={handleVolumeChange}
            className="features-volume-range"
          />
        </div>
      </div>
    </>
  );
};

export default Features;
