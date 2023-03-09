import React, { useState, useEffect } from 'react'
import './style.css'
import Table from "./Table.jsx";
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css'
import { Dropdown } from 'semantic-ui-react';
import background from '../images/adminpagebg.jpg'
export default function Form() {
  const [options, setoptions] = useState([]);
  const [admintasks, setadmintasks] = useState([]);
  const [toggletable, settoggle] = useState(true);
  const [task, setTask] = useState("")
  const [desc, setDesc] = useState("")

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [errorMessage, setErrorMessage] = useState("Fill this field");
  const [taskerr,settaskerr]=useState(false)
  

  const handleChange = (event, { value }) => {
    setSelectedOptions(value);
  };
  useEffect(() => {
    fetch("http://localhost:3020/usersinfo")
      .then(response => response.json())
      .then(data => {
        let users = [];
        let temp = {
          key: "",
          text: "",
          value: ""
        }
        data["users"].forEach(element => {
          temp.key = element.name;
          temp.text = element.name;
          temp.value = element.name;

          users.push({ ...temp });

        });

        setoptions(users);
      })
  }, [])

  function getdata() {
    fetch("http://localhost:3020/alltasks")
      .then(response => response.json())
      .then(data => {
        setadmintasks(data);
      })

  }
  useEffect(() => {
    getdata();
  }, [toggletable])


  const handleDescChange = (event) => {

    setDesc(event.target.value)
  };




  const handleInputChange = (event) => {

    setTask(event.target.value)
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    // if (task === "") {
    //   return;
    // }
    if(data["task"]==="")
    {
settaskerr(!taskerr);

    }
    console.log(taskerr);
    let tasks = []
    let data = {}
    selectedOptions.map((key, index) => {

      data["task"] = task;
      data["status"] = "no_status";
      const today = new Date();
      const yyyy = today.getFullYear();
      let mm = today.getMonth() + 1;   // Months start at 0!
      let dd = today.getDate();

      if (dd < 10) dd = '0' + dd;
      if (mm < 10) mm = '0' + mm;

      const formattedToday = yyyy + '-' + mm + '-' + dd;
      data["date"] = formattedToday;
      data["time"] = new Date().getHours() + ":" + new Date().getMinutes();
      data["username"] = key
      data["desc"]=desc;
      data["assigned"] = "true";
      tasks.push({ ...data });

    })


    let res = await axios.post("http://localhost:3020/postdata", tasks, {
      headers: { "Content-Type": "application/json" }
    }).then(settoggle(prev => !prev))
      .then(setTask(" "))
.then(setDesc(""))
.then(setSelectedOptions([]))

  };

  const [show, setdisplay] = useState(true);

  const toggle = () => {
    setdisplay(prev => !prev)

  }
  return (
    <div style={{ background: `linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.2)), url(${background})`,    backgroundRepeat: "no-repeat",
    backgroundSize: "cover" }}>
      <center >

        <div  style={{ width: "40%", opacity: "1" }} >

          <h1>Task Assignment</h1>



          <form class="ui form">
            <div class="field">
            {taskerr && (
              
  <p> {errorMessage} </p>
 
)}
              <label className='adminlabel'>Task</label>

              <input type="text" id="task" placeholder='Assign a task' name="task" value={task} onChange={handleInputChange} required />
            </div>
            <div class="field">
              <label  className='adminlabel'>Description</label>
              <input type="text" placeholder='description' name='desc' value={desc} onChange={handleDescChange}/>
            </div>
            <div class="field">
              <Dropdown
                placeholder={<div class="ui left icon input">
                  Search Assignee.....    <i class="users icon"></i>
                </div>}
                fluid
                multiple
                search
                selection
                options={options}
                value={selectedOptions}
                onChange={handleChange}
              />
            </div>
            <button class="ui button" type="submit" id="addtask" onClick={handleSubmit}>Add Task</button>
          </form>
        </div>
        {'\n'}
        <center>
          <div><button class="ui positive button" onClick={toggle}> {show ? "Hide" : "Show"}</button></div>
          

          {'\n'}

        </center>

        {show && <Table data={admintasks} />}

      </center>
    </div>
  )
}
