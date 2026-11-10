import { useCallback, useEffect, useRef, useState } from "react";
import {
  PlayIcon,
  PauseIcon,
  PrevIcon,
  NextIcon,
  ShuffleIcon,
  RepeatIcon,
  RepeatOneIcon,
  VolumeIcon,
  MuteIcon,
} from "./AudioControls";

const formatTime = (seconds) => {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
};

const REPEAT_MODES = ["off", "all", "one"];

export default function AudioPlayer({ tracks }) {
  const audioRef = useRef(null);
  const [trackIndex, setTrackIndex] = useState(() => {
    const saved = Number(localStorage.getItem("minami-player:track"));
    return Number.isInteger(saved) && saved >= 0 && saved < tracks.length ? saved : 0;
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(() => {
    const saved = Number(localStorage.getItem("minami-player:volume"));
    return saved > 0 && saved <= 1 ? saved : 0.8;
  });
  const [muted, setMuted] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState("off");
  const shouldAutoplayRef = useRef(false);

  const track = tracks[trackIndex];

  const pickRandomIndex = useCallback(() => {
    if (tracks.length < 2) return 0;
    let next = trackIndex;
    while (next === trackIndex) {
      next = Math.floor(Math.random() * tracks.length);
    }
    return next;
  }, [trackIndex, tracks.length]);

  const goToTrack = useCallback(
    (index, autoplay = true) => {
      shouldAutoplayRef.current = autoplay;
      setTrackIndex(((index % tracks.length) + tracks.length) % tracks.length);
    },
    [tracks.length]
  );

  const toNextTrack = useCallback(
    (autoplay = true) => {
      if (shuffle) {
        goToTrack(pickRandomIndex(), autoplay);
      } else {
        goToTrack(trackIndex + 1, autoplay);
      }
    },
    [shuffle, goToTrack, pickRandomIndex, trackIndex]
  );

  const toPrevTrack = useCallback(() => {
    // Past the first few seconds, "previous" means restart the song —
    // the behaviour every modern player has.
    if (audioRef.current && audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0;
      return;
    }
    goToTrack(trackIndex - 1);
  }, [goToTrack, trackIndex]);

  // Load the selected track. Duration and progress come from the audio
  // element's own events (loadedmetadata / timeupdate) — the 2022 version
  // polled currentTime on a 1s interval and its progress bar max was a bug
  // (it passed the audio object instead of its duration).
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.load();
    setCurrentTime(0);
    setDuration(0);
    localStorage.setItem("minami-player:track", String(trackIndex));
    if (shouldAutoplayRef.current) {
      audio.play().catch(() => setIsPlaying(false));
    }
  }, [trackIndex, track.audioSrc]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.volume = muted ? 0 : volume;
    localStorage.setItem("minami-player:volume", String(volume));
  }, [volume, muted]);

  // OS-level media controls (lock screen, headset buttons, media keys).
  useEffect(() => {
    if (!("mediaSession" in navigator)) return;
    navigator.mediaSession.metadata = new window.MediaMetadata({
      title: track.title,
      artist: track.artist,
      artwork: [{ src: track.image, sizes: "512x512", type: "image/jpeg" }],
    });
    navigator.mediaSession.setActionHandler("play", () => audioRef.current?.play());
    navigator.mediaSession.setActionHandler("pause", () => audioRef.current?.pause());
    navigator.mediaSession.setActionHandler("previoustrack", toPrevTrack);
    navigator.mediaSession.setActionHandler("nexttrack", () => toNextTrack());
  }, [track, toNextTrack, toPrevTrack]);

  // Spacebar toggles playback (unless the user is interacting with a control).
  useEffect(() => {
    const onKey = (e) => {
      const tag = document.activeElement?.tagName;
      if (e.code === "Space" && tag !== "BUTTON" && tag !== "INPUT") {
        e.preventDefault();
        const audio = audioRef.current;
        if (!audio) return;
        if (audio.paused) audio.play().catch(() => {});
        else audio.pause();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleEnded = () => {
    if (repeat === "one") {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => setIsPlaying(false));
      return;
    }
    const isLast = trackIndex === tracks.length - 1;
    if (isLast && repeat === "off" && !shuffle) {
      setIsPlaying(false);
      return;
    }
    toNextTrack();
  };

  const handleSeek = (e) => {
    const value = Number(e.target.value);
    setCurrentTime(value);
    if (audioRef.current) audioRef.current.currentTime = value;
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) audio.play().catch(() => setIsPlaying(false));
    else audio.pause();
  };

  const cycleRepeat = () => {
    const next = REPEAT_MODES[(REPEAT_MODES.indexOf(repeat) + 1) % REPEAT_MODES.length];
    setRepeat(next);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="player-layout">
      <section className="player-card">
        <div className={`artwork-wrap ${isPlaying ? "spinning" : ""}`}>
          <img className="artwork" src={track.image} alt={`Album artwork for ${track.title} by ${track.artist}`} />
        </div>
        <div className="now-playing">
          <h2 className="title">{track.title}</h2>
          <p className="artist">{track.artist}</p>
        </div>

        <div className="seek">
          <span className="time">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            step="0.1"
            value={currentTime}
            onChange={handleSeek}
            aria-label="Seek"
            style={{ "--fill": `${progress}%` }}
          />
          <span className="time">{formatTime(duration)}</span>
        </div>

        <div className="controls">
          <button
            type="button"
            className={`icon-btn toggle ${shuffle ? "active" : ""}`}
            aria-label="Shuffle"
            aria-pressed={shuffle}
            onClick={() => setShuffle((s) => !s)}
          >
            <ShuffleIcon size={20} />
          </button>
          <button type="button" className="icon-btn" aria-label="Previous track" onClick={toPrevTrack}>
            <PrevIcon size={26} />
          </button>
          <button type="button" className="icon-btn play-btn" aria-label={isPlaying ? "Pause" : "Play"} onClick={togglePlay}>
            {isPlaying ? <PauseIcon size={30} /> : <PlayIcon size={30} />}
          </button>
          <button type="button" className="icon-btn" aria-label="Next track" onClick={() => toNextTrack()}>
            <NextIcon size={26} />
          </button>
          <button
            type="button"
            className={`icon-btn toggle ${repeat !== "off" ? "active" : ""}`}
            aria-label={`Repeat: ${repeat}`}
            aria-pressed={repeat !== "off"}
            onClick={cycleRepeat}
          >
            {repeat === "one" ? <RepeatOneIcon size={20} /> : <RepeatIcon size={20} />}
          </button>
        </div>

        <div className="volume-row">
          <button
            type="button"
            className="icon-btn small"
            aria-label={muted ? "Unmute" : "Mute"}
            onClick={() => setMuted((m) => !m)}
          >
            {muted || volume === 0 ? <MuteIcon size={19} /> : <VolumeIcon size={19} />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={muted ? 0 : volume}
            onChange={(e) => {
              setVolume(Number(e.target.value));
              setMuted(false);
            }}
            aria-label="Volume"
            style={{ "--fill": `${(muted ? 0 : volume) * 100}%` }}
          />
        </div>

        <audio
          ref={audioRef}
          src={track.audioSrc}
          preload="metadata"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          onEnded={handleEnded}
        />
      </section>

      <section className="playlist" aria-label="Track list">
        <h3 className="playlist-heading">
          Tracklist <span className="playlist-count">{tracks.length} songs</span>
        </h3>
        <ol className="track-list">
          {tracks.map((t, i) => {
            const active = i === trackIndex;
            return (
              <li key={t.title}>
                <button
                  type="button"
                  className={`track-row ${active ? "active" : ""}`}
                  onClick={() => (active ? togglePlay() : goToTrack(i))}
                  aria-current={active ? "true" : undefined}
                >
                  <span className="track-number">
                    {active && isPlaying ? (
                      <span className="eq" aria-hidden="true">
                        <span />
                        <span />
                        <span />
                      </span>
                    ) : (
                      String(i + 1).padStart(2, "0")
                    )}
                  </span>
                  <span className="track-meta">
                    <span className="track-title">{t.title}</span>
                    <span className="track-artist">{t.artist}</span>
                  </span>
                  {active && <span className="now-tag">{isPlaying ? "Playing" : "Paused"}</span>}
                </button>
              </li>
            );
          })}
        </ol>
        <p className="hint">Spacebar plays and pauses. Your last track and volume are remembered on this device.</p>
      </section>
    </div>
  );
}
