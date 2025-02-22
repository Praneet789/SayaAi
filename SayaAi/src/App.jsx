import React, { useContext } from "react";
import "./App.css";
import va from "./assets/aiimg.jpeg";
import { datacontext } from "./context/UserContext";

function App() {
  let { recognition, transcript, response } = useContext(datacontext);

  return (
    <div className="container">
      <div className="card">
        <h2>
          Hello, I'm <span className="highlight">Saya</span>, Your Personal
          Caretaker in the Top of Your Palm!
        </h2>

        <img src={va} alt="Saya" className="saya-img" />

        {/* Listening Indicator */}
        <p className={`listening-text ${transcript === "Listening..." ? "active" : ""}`}>
          {transcript === "Listening..." ? "🎤 Listening..." : ""}
        </p>

        <textarea
          value={response}
          readOnly
          placeholder="Response"
          className="response-box"
        />

        <input
          type="text"
          placeholder="Write your Query Here!"
          className="input-box"
        />

        {/* Buttons for Start and Stop Listening */}
        <div className="button-group">
          <button className="ask-button" onClick={() => recognition.start()}>
            Start Listening
          </button>
          <button className="stop-button" onClick={() => recognition.stop()}>
            Stop
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
