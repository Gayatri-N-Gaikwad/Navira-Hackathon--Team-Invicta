import React,{useState} from "react";
import {analyzeMessage} from "../../api/api";
import "./Analyzer.css";

export default function Analyzer(){

const [text,setText] = useState("");
const [result,setResult] = useState(null);
const [loading,setLoading] = useState(false);
const [characterCount,setCharacterCount] = useState(0);

const analyze = async()=>{
if (!text.trim()) {
  alert("Please enter a message to analyze");
  return;
}

setLoading(true);
try {
const res = await analyzeMessage({
message:text
})
setResult(res.data);
} catch (error) {
console.error("Error analyzing message:", error);
alert("Failed to analyze message. Please try again.");
} finally {
setLoading(false);
}
}

const handleTextChange = (e) => {
  const newText = e.target.value;
  setText(newText);
  setCharacterCount(newText.length);
}

const clearText = () => {
  setText("");
  setResult(null);
  setCharacterCount(0);
}

const loadSampleMessage = (sample) => {
  setText(sample);
  setCharacterCount(sample.length);
  setResult(null);
}

const getCharacterCountClass = () => {
  if (characterCount > 500) return "danger";
  if (characterCount > 300) return "warning";
  return "";
}

const getResultClass = () => {
  if (!result) return "";
  if (result.riskLevel === "high") return "danger";
  if (result.riskLevel === "medium") return "warning";
  return "safe";
}

const getResultTitle = () => {
  if (!result) return "";
  if (result.riskLevel === "high") return "Dangerous Message";
  if (result.riskLevel === "medium") return "Suspicious Message";
  return "Safe Message";
}

const getResultIcon = () => {
  if (!result) return "";
  if (result.riskLevel === "high") return "danger";
  if (result.riskLevel === "medium") return "warning";
  return "safe";
}

return(

<div className="analyzer-page">

  {/* Page Header */}
  <div className="page-header">
    <div className="header-icon">
      <span>Search</span>
    </div>
    <div className="header-content">
      <h1>Message Analyzer</h1>
      <p>Analyze suspicious messages for potential scams and get detailed risk assessments with safety recommendations</p>
    </div>
  </div>

  {/* Analyzer Container */}
  <div className="analyzer-container">

    {/* Input Section */}
    <div className="input-section">
      <div className="input-label">
        <span>Message to Analyze</span>
      </div>
      
      <textarea
        className="message-textarea"
        value={text}
        placeholder="Paste the suspicious message here for analysis..."
        onChange={handleTextChange}
        disabled={loading}
      />
      
      <div className={`character-counter ${getCharacterCountClass()}`}>
        {characterCount} characters
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <div className="tooltip-wrapper">
          <button 
            className="action-button"
            onClick={analyze}
            disabled={loading || !text.trim()}
          >
            <span>{loading ? 'Analyzing...' : 'Analyze Message'}</span>
            <span className="tooltip">Check if this message is suspicious</span>
          </button>
        </div>
        
        <div className="tooltip-wrapper">
          <button 
            className="action-button secondary"
            onClick={clearText}
            disabled={loading}
          >
            <span>Clear</span>
            <span className="tooltip">Clear the message input</span>
          </button>
        </div>
      </div>
    </div>

    {/* Sample Messages */}
    <div className="sample-messages">
      <h3>
        <span>Try these examples:</span>
      </h3>
      <div 
        className="sample-message"
        onClick={() => loadSampleMessage("Congratulations! You have won $1,000,000 in the lottery. Click here to claim your prize now!")}
      >
        Congratulations! You have won $1,000,000 in the lottery. Click here to claim your prize now!
      </div>
      <div 
        className="sample-message"
        onClick={() => loadSampleMessage("Your account has been suspended. Please verify your identity by clicking this link immediately.")}
      >
        Your account has been suspended. Please verify your identity by clicking this link immediately.
      </div>
      <div 
        className="sample-message"
        onClick={() => loadSampleMessage("Hi Mom, I lost my phone and need you to send me $500 urgently. Here's my new number.")}
      >
        Hi Mom, I lost my phone and need you to send me $500 urgently. Here's my new number.
      </div>
    </div>

    {/* Result Section */}
    {result && (
      <div className={`result-section ${getResultClass()}`}>
        <div className="result-header">
          <div className="result-icon">
            {getResultIcon() === 'safe' && 'shield'}
            {getResultIcon() === 'warning' && 'alert'}
            {getResultIcon() === 'danger' && 'danger'}
          </div>
          <h2 className={`result-title ${getResultClass()}`}>
            {getResultTitle()}
          </h2>
        </div>

        <div className="result-explanation">
          {result.explanation}
        </div>

        {result.indicators && result.indicators.length > 0 && (
          <div className="risk-indicators">
            <h3>
              <span>Risk Indicators Found:</span>
            </h3>
            <ul className="indicators-list">
              {result.indicators.map((indicator,idx)=>(
                <li key={idx} className={`indicator-item ${getResultClass()}`}>
                  {indicator}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="action-buttons">
          <div className="tooltip-wrapper">
            <button 
              className="action-button"
              onClick={clearText}
            >
              <span>Analyze Another Message</span>
              <span className="tooltip">Clear and start a new analysis</span>
            </button>
          </div>
          <div className="tooltip-wrapper">
            <button 
              className="action-button secondary"
              onClick={() => window.history.back()}
            >
              <span>Back to Menu</span>
              <span className="tooltip">Return to main menu</span>
            </button>
          </div>
        </div>
      </div>
    )}

  </div>

</div>

)

}