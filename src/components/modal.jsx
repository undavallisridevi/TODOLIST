import React, { useEffect, useState } from 'react'
import { Button, Modal, Header, Icon } from 'semantic-ui-react'
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css'
import Todo from './Todo';
import './style.css'

function ModalDisplay() {

  const [data, setdata] = useState({
    task: '',
    time: '',desc:''
  })
  const [flag,setflag] = useState(false)
  const [tasks, setTasks] = useState([])
  function gettasks() {
    fetch("http://localhost:3020/getupdateddata")
      .then(response => response.json())
      .then(data => {
        setTasks(data);
// setflag(!flag)
      })
  }
  useEffect(() => {
    gettasks()
  }, [])
  useEffect(() => { }, [tasks,flag])
  const pending = (tasks.filter(task => task.status === "pending"))
  const inProgressTasks = (tasks.filter(task => task.status === "inprogress"))
  const CompletedTasks = (tasks.filter(task => task.status === "completed"))
  const deletedTasks = (tasks.filter(task => task.status === "deleted"))
  const todoTasks = (tasks.filter(task => task.status === "no_status"))


  const min = [];

  for (var i = 0; i <= 59; i++) {
    if (i < 10) {
      i = "0" + i;
    }
    min.push(i);
  }
  const hr = [];

  for (let i = 1; i <= 12; i++) {
    if (i < 10) {
      i = "0" + i;
    }
    hr.push(i);
  }



  function addtotime() {





    var hr = document.getElementById('dropdownhr').value;


    var min = document.getElementById('dropdownmin').value;
    var am_pm = document.getElementById('am');
    var text = am_pm.options[am_pm.selectedIndex].text;

    var time12hrs = hr + ":" + min + ":" + " " + text;
    console.log(time12hrs);
    setdata((prev) => {
      console.log(prev);
      return { ...prev, time: time12hrs }
    })
  };
  function display() {

    if (document.getElementById('hrs_24').checked) {


      document.getElementById('time').setAttribute("placeholder", "HH:MM")

      document.getElementById('clock_24').style.visibility = 'visible';
      document.getElementById('clock_12').style.visibility = 'hidden';
    }
    else {


      document.getElementById('time').setAttribute("placeholder", "HH:MM:AM/PM")

      document.getElementById('clock_12').style.visibility = 'visible';
      document.getElementById('clock_24').style.visibility = 'hidden';
    }

  }

  function handletask(e) {


    let name = e.target.name;
    let value = e.target.value;

    console.log(data.time);

    setdata({ ...data, [name]: value });

  }

  const close = () => {
    setOpen(false)
    
    let arr = {}

    arr["task"] = data.task;
    arr["status"] = "no_status";
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();
    
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    
    const formattedToday = yyyy + '-' + mm + '-' + dd;
    arr["date"]=formattedToday
    arr["time"] = data.time;
    arr["username"] = "User 1";
    arr["assigned"] = "false";
   arr["desc"]=data.desc;




    axios.post("http://localhost:3020/postdata", arr, {
      headers: { "Content-Type": "application/json" }
    }).then(gettasks);
  }

  const [open, setOpen] = React.useState(false)

  return (
    <div className='container'>
      <Modal
        closeIcon
        open={open}
        trigger={<Button className='addtaskbtn'>Add Task</Button>}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        <Header icon='pencil alternate' content='Add Task' />
        <Modal.Content>

          <>


            <form>
              <label htmlFor='task'>Task</label>
              <input type="text" name="task" id='task' value={data.task} onChange={handletask} required />
              <label htmlFor='task'>Add Description</label>
              <input type="text" name="desc" id='desc' value={data.desc} onChange={handletask}  />
              <label>Enter Time</label>

              <input type="text" name="time" id="time" value={data.time} required onChange={handletask} />
              {/* <input id="username" type="text" name="username"  value="<%- username %> "  style="display:none"/> */}

            </form>
            <label>24hrs </label><input type="radio" onClick={display} name="24hrs" id="hrs_24" />
            <label>12hrs </label> <input type="radio" onClick={display} name="24hrs" id="hrs_12" />


            <div id="clock_24" style={{ visibility: "hidden" }} >
              <input type="time" name="time" id='time24' onChange={handletask} />
            </div>
            <div id="clock_12" style={{ visibility: "hidden" }}>
              <label >Select a time:</label>
              <select id="dropdownhr" name="dropdown" >
                <option value="0" >Hour</option>
                {hr.map((option) => (
                  
                  <option key={option} value={option}
                  >
                    {option}

                  </option>
                ))}
              </select>
              <select id="dropdownmin" name="dropdown">
                <option value="0">Minute</option>
                {min.map((option) => (
                  <option key={option} value={option}
                  >
                    {option}

                  </option>
                ))}


              </select>
              <select name="am-pm" id="am" onMouseOut={addtotime}>
                <option value="am" >AM</option>
                <option value="pm">PM</option>
              </select>
            </div>



          </>
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' onClick={close}>
            Add
          </Button>

        </Modal.Actions>
      </Modal>
     
      <Todo pending={pending} inProgressTasks={inProgressTasks} todoTasks={todoTasks} CompletedTasks={CompletedTasks} deletedTasks={deletedTasks} getalltasks={gettasks}  flag={flag} setFlag = {setflag}/>
    
    </div>
  )

}

export default ModalDisplay

