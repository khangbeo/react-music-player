import "./App.css";
import AudioPlayer from "./components/AudioPlayer";
import tracks, { artist, albumCover } from "./tracks";

export default function App() {
  return (
    <main className="app">
      <header className="album-header">
        <img className="header-cover" src={albumCover} alt="" width="56" height="56" />
        <div>
          <h1>{artist}</h1>
          <p>One album. Seven tracks. Press play.</p>
        </div>
      </header>
      <AudioPlayer tracks={tracks} />
      <footer className="app-footer">
        <p>
          Modernized 2026 rebuild of the 2022 Create React App original: now Vite + React 19,
          same album files, same cover.
        </p>
      </footer>
    </main>
  );
}
