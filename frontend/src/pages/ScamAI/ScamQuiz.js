import React,{useEffect,useState} from "react";
import {getQuizMessage,checkAnswer} from "../../api/api";

export default function ScamQuiz(){

const [message,setMessage] = useState(null);
const [result,setResult] = useState(null);

useEffect(()=>{
load();
},[])

const load = async()=>{
const res = await getQuizMessage();
setMessage(res.data);
setResult(null);
}

const answer = async(choice)=>{

const res = await checkAnswer({
message:message.message,
userChoice:choice
})

setResult(res.data);
}

if(!message) return <p>Loading...</p>

return(

<div className="quiz">

<h2>📩 Scam Quiz</h2>

<div className="sms">

<b>{message.sender}</b>
<p>{message.message}</p>

</div>

{message.options.map((o,i)=>(
<button key={i} onClick={()=>answer(o)}>
{o}
</button>
))}

{result && (

<div className="result">

<h3>{result.correct ? "✅ Correct" : "❌ Wrong"}</h3>

<p>{result.explanation}</p>

<ul>
{result.indicators.map((i,idx)=>(
<li key={idx}>{i}</li>
))}
</ul>

<button onClick={load}>Next</button>

</div>

)}

</div>

)

}