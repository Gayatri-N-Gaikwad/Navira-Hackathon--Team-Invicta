import React,{useEffect,useState} from "react";
import {getQuizMessage,checkAnswer} from "../../api/api";
import "./ScamQuiz.css";

export default function ScamQuiz(){

const [message,setMessage] = useState(null);
const [result,setResult] = useState(null);
const [selectedOption,setSelectedOption] = useState(null);
const [loading,setLoading] = useState(false);

useEffect(()=>{
load();
},[])

const load = async()=>{
setLoading(true);
try {
const res = await getQuizMessage();
setMessage(res.data);
setResult(null);
setSelectedOption(null);
} catch (error) {
console.error("Error loading quiz:", error);
} finally {
setLoading(false);
}
}

const answer = async(choice)=>{
setSelectedOption(choice);
setLoading(true);
try {
const res = await checkAnswer({
message:message.message,
userChoice:choice
})
setResult(res.data);
} catch (error) {
console.error("Error checking answer:", error);
} finally {
setLoading(false);
}
}

if(!message) return (
  <div className="scam-quiz-page">
    <div className="loading-state">
      <div className="loading-spinner"></div>
      Loading quiz...
    </div>
  </div>
)

return(

<div className="scam-quiz-page">

  {/* Page Header */}
  <div className="page-header">
    <div className="header-icon">
      �
    </div>
    <div className="header-content">
      <h1>Scam Quiz</h1>
      <p>Test your ability to identify scam messages and learn to recognize suspicious patterns</p>
    </div>
  </div>

  {/* Quiz Container */}
  <div className="quiz-container">

    {/* Message Display */}
    <div className="message-display">
      <div className="sms-simulator">
        <div className="sender-info">
          From: <span className="sender-name">{message.sender}</span>
        </div>
        <div className="message-content">
          {message.message}
        </div>
      </div>
    </div>

    {/* Options Grid */}
    <div className="options-grid">
      {message.options.map((o,i)=>(
        <div key={i} className="tooltip-wrapper">
          <button 
            className={`option-button ${selectedOption === o ? 'selected' : ''}`}
            onClick={()=>answer(o)}
            disabled={loading}
          >
            {o}
            <span className="tooltip">Select this answer to check if it's correct</span>
          </button>
        </div>
      ))}
    </div>

    {/* Result Section */}
    {result && (
      <div className={`result-section ${result.correct ? '' : 'wrong'}`}>
        <div className="result-header">
          <div className="result-icon">
            {result.correct ? '✅' : '❌'}
          </div>
          <h2 className={`result-title ${result.correct ? 'correct' : 'wrong'}`}>
            {result.correct ? 'Correct Answer!' : 'Wrong Answer'}
          </h2>
        </div>

        <div className="result-explanation">
          {result.explanation}
        </div>

        {result.indicators && result.indicators.length > 0 && (
          <div>
            <h3>Key Indicators to Look For:</h3>
            <ul className="indicators-list">
              {result.indicators.map((indicator,idx)=>(
                <li key={idx} className="indicator-item">
                  {indicator}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="action-buttons">
          <div className="tooltip-wrapper">
            <button 
              onClick={load} 
              className="action-button"
              disabled={loading}
            >
              <span>Next Question</span>
              <span className="tooltip">Try another quiz question</span>
            </button>
          </div>
          {result.correct && (
            <div className="tooltip-wrapper">
              <button 
                className="action-button secondary"
                onClick={() => window.history.back()}
              >
                <span>Back to Menu</span>
                <span className="tooltip">Return to main menu</span>
              </button>
            </div>
          )}
        </div>
      </div>
    )}

  </div>

</div>

)

}