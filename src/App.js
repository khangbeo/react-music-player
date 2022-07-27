import "./App.css";
import AudioPlayer from "./components/AudioPlayer";
import tracks from "./tracks";

function App() {
  return (
    <div className="container">
      <AudioPlayer tracks={tracks} />
    </div>
  );
}

export default App;
