import React from "react";
import { Link } from "react-router-dom";

export default function ScamHome() {

  return (

    <div className="home">

      <h1>🛡 🤖 Scam Awareness Trainer</h1>

      <Link to="/scam-ai/chat">
        <button>Start Scam Chat</button>
      </Link>

      <Link to="/scam-ai/quiz">
        <button>Scam Quiz</button>
      </Link>

      <Link to="/scam-ai/analyze">
        <button>Analyze Message</button>
      </Link>

    </div>

  );

}