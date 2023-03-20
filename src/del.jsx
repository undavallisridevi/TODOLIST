import React, { useState } from 'react'

export default function Del() {
    const [options,setOptions]=useState(["a","b","c"])
const [deleteo,setDel]=useState([])
const [pc,setpc]=useState(options.length)
const [dc,setdc]=useState(0)
function add(e)
{
    const s=e.target.value  
    
    setpc(prev=>prev+1);
    setdc(prev=>prev-1);
    setOptions([...options,s]);
    setDel(deleteo.filter(prev=>prev!==s))
}
function del(ele)
{
  console.log(ele);
  console.log("l");
//      const s=e.target.value;
//     const a=options.filter(prev=>prev!==s)
//     setpc(prev=>prev-1)
// setdc(prev=>prev+1)
//     setOptions(a);
//     setDel([...deleteo,s])
}
function erase(this)
{
  console.log(this);
}
function delp(e)
{
    const s=e.target.value
    setdc(prev=>prev-1)
    setDel(deleteo.filter(prev=>prev!==s))
}
  return (
    <div>
      <p>hai<button onClick={()=>erase(this)}>del</button></p>
<p>present:{pc}</p>
<p>deleted:{dc}</p>
      <div style={{backgroundColor:"blue"}}>
{options.map((ele,index) =>

{
   return <p id={index}>{ele} <span><button value={ele} onClick={() => del({ele})}>del</button></span></p>
})}
      </div>
      <div style={{backgroundColor:"red"}}>
      {deleteo.map((ele,index) =>
{
   return <p id={index}>{ele} <span><button onClick={delp} value={ele}>del</button> <button value={ele} onClick={add}>add </button></span></p>
})}
      </div>
    </div>
  )
}


