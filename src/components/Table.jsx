import React from 'react'
import { Button } from 'semantic-ui-react';
import './style.css'
export default function Table({data,deletetask}) {
  

  const TableRows =
    data.map((info,index) => (
  
 <tr key={index} id={info._id}>
          <td>{info.task}</td>
          <td>{info.desc}</td>
          <td>{info.username}</td>
          <td>{info.time}</td>
          <td>{info.status}</td>
<td><Button className="deletebtn" onClick={() => deletetask(info._id)}>Delete</Button></td>
        </tr>

    

    ));



  return (
    <div class="table-wrapper" style={{margin:"1rem"}}>
  <table class="ui celled table unstackable ">
    <thead style={{fontSize: "large"}}>
      <tr class="">
        <th>Task</th>
        <th>Description</th>
        <th>Assignee</th>
        <th>Time</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody class="">
      {TableRows}
    </tbody>
  </table>
</div>

  )
}
