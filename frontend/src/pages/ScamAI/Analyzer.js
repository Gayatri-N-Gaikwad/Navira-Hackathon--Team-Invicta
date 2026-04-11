import React,{useState} from "react";
import {analyzeMessage} from "../../api/api";

export default function Analyzer(){

const [text,setText] = useState("");
const [result,setResult] = useState(null);

const analyze = async()=>{

const res = await analyzeMessage({
message:text
})

setResult(res.data);
}

return(

<div className="analyzer">

<h2>🔍 Analyze Message</h2>

<textarea
rows="5"
value={text}
placeholder="Paste suspicious message"
onChange={(e)=>setText(e.target.value)}
/>

<button onClick={analyze}>
Analyze
</button>

{result && (

<div className="analysis">

<p>{result.explanation}</p>

<ul>
{result.indicators.map((i,idx)=>(
<li key={idx}>{i}</li>
))}
</ul>

</div>

)}

</div>

)

}