import React from 'react'

export default function Table(props) {

  const TableRows =
    props.data.map((info) => {
      return (



        <tr>

          <td>{info.task}</td>
          <td>{info.username}</td>
          <td>{info.time}</td>
          <td>{info.status}</td>

        </tr>

      );

    });



  return (

    
    <table class="ui celled table">
      <thead class="">
        <tr class="">
        <th>Task</th>
          <th>Assignee</th>

            <th>Time</th>

          <th>Status</th>

        </tr>
        </thead>
        <tbody class="">
        {TableRows}
           </tbody>
           </table>

  )
}
