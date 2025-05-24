import React, { useContext, useState } from "react";
import "./App.css";
import va from "./assets/copernica.png";
import { datacontext } from "./context/UserContext";

function App() {
  let { recognition, transcript, response } = useContext(datacontext);
  const [isOpen, setIsOpen] = useState(false);

  // Stop Speech Function
  const stopSpeaking = () => {
    window.speechSynthesis.cancel(); // Stops AI speech
    recognition.stop(); // Stops voice recognition
  };

  return (
    <>
      {/* Floating Assistant Button */}
      <button className="floating-assistant" onClick={() => setIsOpen(!isOpen)}>
        💬
      </button>

      {/* Chatbox */}
      <div className={`chatbox ${isOpen ? "open" : ""}`}>
        <div className="card">
          <h2>
            Hello, I'm <span className="highlight">Copernica</span>, Your Personal GIS Guide!
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
            <button className="stop-button" onClick={stopSpeaking}>
              Stop
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
