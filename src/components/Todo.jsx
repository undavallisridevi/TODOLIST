import React, { useEffect, useState } from 'react'
import { Popup, Icon } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import axios from 'axios';
import './style.css'


import Modal from './editmodel';
import DeleteModal from './deletemodal';
// ,flag,setFlag

export default function Todo({pending, inProgressTasks,todoTasks, CompletedTasks,deletedTasks,getalltasks,flag,setFlag}) {
 


  const [itemID, setID] = useState(null)
  const [tasku, setTask] = useState(null)
  const [status, setStatus] = useState(null)
  
  const [pendingbtn,setPendingToggle]=useState(true)
  const [progressbtn,setProgressToggle]=useState(true)
  const [completedbtn,setcompletedToggle]=useState(true)
  const [deletedbtn,setdeletedToggle]=useState(true)


  const [modalVisibility, setVisibility] = useState(false);
  const [modaldelVisibility, setdelVisibility] = useState(false);

  function display() {
    var delete_ele = document.getElementById("deleted");
    var delbutton = document.getElementById("show");

    if (delete_ele.classList.contains('del')) {
      console.log(delete_ele.classList);
      delbutton.textContent = "Hide";

      delete_ele.classList.remove('del');

    }

    else {

      delete_ele.classList.add('del');
      delbutton.textContent = "Show";

    }
  }

  let data = {
    status: "",
    
    id: ""
  }
  

  let draggableTodo = null;
  let delfromstatus;
  function dragStart(event) {


    data.id = event.target.id;
delfromstatus= event.target.parentNode.id
    draggableTodo = event.target; //whole div having task is selected

  
  }
  function dragEnd() {

    draggableTodo = null;
   
    

  }


  function dragOver(event) {

    event.preventDefault();


  }
  useEffect(() => { setVisibility(null); }, [])

  
  function dragDrop(event) {
    event.target.style.border = "none";
   
    
     
   let status = event.target.id;

    data["status"] = event.target.id;
     console.log(data);
    if(status==="deleted")
    {
      setStatus( status=>status=delfromstatus);
      setID(itemID => itemID = data.id);
      
       setdelVisibility(true);
    }

   draggableTodo.style.border="3px solid blue";
   draggableTodo.style.borderRadius="3px";


    axios.post("http://localhost:3020/updatestatus", data, {
      headers: { "Content-Type": "application/json" }
    }).then(getalltasks )
   

  }

function handlependingbtn(event)
{
  const buttonclr = event.target.style.backgroundColor;
  const newColor = buttonclr === "blue" ? "skyblue" : "blue";
  event.target.style.backgroundColor=newColor
  setPendingToggle (!pendingbtn);

}
function handleprogressbtn(event)
{
  const buttonclr = event.target.style.backgroundColor;
  const newColor = buttonclr === "blue" ? "skyblue" : "blue";
  event.target.style.backgroundColor=newColor
 setProgressToggle (!progressbtn)

}
function handlecompletedbtn(event)
{
  const buttonclr = event.target.style.backgroundColor;
  const newColor = buttonclr === "blue" ? "skyblue" : "blue";
  event.target.style.backgroundColor=newColor
  
  setcompletedToggle (!completedbtn)
}
function handledeletedbtn(event)
{
  const buttonclr = event.target.style.backgroundColor;
  const newColor = buttonclr === "blue" ? "skyblue" : "blue";
  event.target.style.backgroundColor=newColor
  setdeletedToggle (!deletedbtn)
}
  const handleAction = (e) => {
    
    
    setID(itemID => itemID = e.target.parentNode.parentNode.id);
    setTask(tasku => tasku = e.target.parentNode.parentNode.parentNode.childNodes[0].childNodes[0].innerHTML)
    setVisibility(true);
  };
  const handleDeleteAction = (e) => {
    
    
     if(e.target.parentNode.parentNode.parentNode.parentNode.id==="deleted")
     {
      let data = {
        id: e.target.parentNode.parentNode.id
      }
      axios.post("http://localhost:3020/delete", data, {
        headers: { "Content-Type": "application/json" }
      }).then( getalltasks )

    
     }
     else{
      setStatus( status=>status=e.target.parentNode.parentNode.parentNode.parentNode.id);
      setID(itemID => itemID = e.target.parentNode.parentNode.id);
    
       setdelVisibility(true);
     }
  };
  useEffect(() => { }, [itemID, modalVisibility])
  useEffect(() => { }, [itemID, modaldelVisibility])
  return (

    <>
   
  <div class="ui buttons" style={{marginLeft:"30%",marginBottom:"6vh"}}>
    <button class="ui button" style={{color:"white",background:"blue"}} onClick={handlependingbtn}>Pending</button>
    <button class="ui button"  style={{color:"white",background:"blue"}} onClick={handleprogressbtn}>Progress</button>
    <button class="ui button" style={{color:"white",background:"blue"}} onClick={handlecompletedbtn}>Completed</button>
    <button class="ui button" style={{color:"white",background:"blue"}} onClick={handledeletedbtn}>Deleted</button>

    </div>
      <div className="wrap" style={{ display: 'flex' ,gap:"0.5rem"}}>
      <div className="status"  onDragOver={dragOver}  onDrop="return false" id="no_status"  >
          <h1 id="Todo" onDrop="return false">Todo</h1>
          {todoTasks.map(task => (
            <div key={task._id} className="todo" id={task._id} draggable="true" onDragStart={event => dragStart(event)} onDragEnd={dragEnd} onDrop="return false" onDragOver="return false" style={{ display: 'flex', justifyContent: 'space-between', gap:' 2rem', alignItems: 'center', margin: '0.3rem 1rem', padding: '0.5rem',border: "3px solid #485ba5", borderRadius: "5px"}}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexDirection: 'column' }}>
           { task.desc!==" "&&task.desc!==""  ? <Popup content={task.desc} trigger={<h4> {task.task}</h4>} /> :<h4> {task.task} </h4>}
                <p> {task.time} </p>

              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', gap: ' 1rem' }} id={task._id}>



                <p onClick={handleAction}><Icon name="edit outline"></Icon> </p>
                <p onClick={handleDeleteAction} ><Icon name="trash"></Icon></p>

              </div>
            </div>
          ))
          }
          </div>
    { pendingbtn &&  <div className="status"  onDragOver={dragOver}  onDrop={dragDrop} id="pending"  >
          <h1 id="pendingtasks" onDrop="return false">Pending</h1>
          {pending.map(task => (
            <div key={task._id} className="todo" id={task._id} draggable="true"  onDrop="return false" onDragOver="return false" onDragStart={event => dragStart(event)} onDragEnd={dragEnd} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',gap:' 2rem',  margin: '0.3rem 1rem', padding: '0.5rem',border: "3px solid #485ba5", borderRadius: "5px"}}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexDirection: 'column' }}>
              { task.desc!==" "&&task.desc!==""  ? <Popup content={task.desc} trigger={<h4> {task.task}</h4>} /> :<h4> {task.task} </h4>}
                <p> {task.time} </p>

              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', gap: ' 1rem' }} id={task._id}>



                <p onClick={handleAction}><Icon name="edit outline"></Icon> </p>
                <p onClick={handleDeleteAction} ><Icon name="trash"></Icon></p>

              </div>
            </div>
          ))
          }

        </div>}
       {progressbtn && <div className="status" id="inprogress"  onDragOver={dragOver}  onDrop={dragDrop} >
          <h1 id="progresstasks" onDrop="return false">Progress</h1>
          {inProgressTasks.map(task => (
            <div key={task._id} className="todo" id={task._id} draggable="true"  onDrop="return false" onDragOver="return false" onDragStart={dragStart} onDragEnd={dragEnd} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap:' 2rem', margin: '0.3rem 1rem', padding: '0.5rem' ,border: "3px solid #485ba5", borderRadius: "5px"}}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexDirection: 'column' }}>
              { task.desc!==" "&&task.desc!==""  ? <Popup content={task.desc} trigger={<h4> {task.task}</h4>} /> :<h4> {task.task} </h4>}
                <p> {task.time} </p>

              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', gap: ' 1rem' }} id={task._id}>



                <p onClick={handleAction}><Icon name="edit outline"></Icon> </p>
                <p onClick={handleDeleteAction}><Icon name="trash"></Icon></p>

              </div>
            </div>
          ))
          }

        </div>}
       {completedbtn && <div className="status" id="completed"  onDragOver={dragOver}  onDrop={dragDrop} >
          <h1 id="completedtasks" onDrop="return false">Completed</h1>
          {CompletedTasks.map(task => (
            <div key={task._id} id={task._id} className="todo" draggable="true"  onDrop="return false" onDragOver="return false" onDragStart={dragStart} onDragEnd={dragEnd} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap:' 2rem', margin: '0.3rem 1rem', padding: '0.5rem',border: "3px solid #485ba5", borderRadius: "5px"}}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexDirection: 'column' }}>
              { task.desc!==" "&&task.desc!==""  ? <Popup content={task.desc} trigger={<h4> {task.task}</h4>} /> :<h4> {task.task} </h4>}
                <p> {task.time} </p>

              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', gap: ' 1rem' }} id={task._id}>



                <p onClick={handleAction}><Icon name="edit outline"></Icon> </p>
                <p onClick={handleDeleteAction} ><Icon name="trash"></Icon></p>

              </div>
            </div>
          ))
          }
        </div>}

      {deletedbtn &&  <div className="status del" id="deleted"  onDragOver={dragOver} onDrop={dragDrop} >
          <h1 id="deletedtasks" onDrop="return false">Deleted</h1>
          &nbsp;&nbsp;<button class="ui primary button" id="show" onClick={display}>show</button>
          {deletedTasks.map(task => (
            <div key={task._id} id={task._id} className="todo" draggable="true"  onDrop="return false" onDragOver="return false"  onDragStart={dragStart} onDragEnd={dragEnd} style={{ display: 'flex', justifyContent: 'space-between',     border: "3px solid #485ba5", borderRadius: "5px",   gap:' 2rem', alignItems: 'center', margin: '0.3rem 1rem', padding: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexDirection: 'column' }}>
               
              { task.desc!==" "&&task.desc!==""  ? <Popup content={task.desc} trigger={<h4> {task.task}</h4>} /> :<h4> {task.task} </h4>}
                <p> {task.time} </p>

              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', gap: ' 1rem' }} id={task._id}>

              <p > <Popup
        
        content={<><div>{`Deletedfrom :${task.FromStatus}`}</div><div>{`desc:${task.deldesc}`}</div><div>{`time:${task.deltime}`}</div></>}
        key={task._id}
       
        trigger={<Icon name="info circle"></Icon>}

      /> </p>


                <p onClick={handleAction}><Icon name="edit outline"></Icon> </p>
                <p onClick={handleDeleteAction} ><Icon name="trash"></Icon></p>

              </div>
            </div>
          ))
          }
          


        </div>}

      </div>
      <div className={modalVisibility ? "overlay active" : "overlay"}>
        {itemID == null ? (
          <></>
        ) : (
          <Modal
            visibility={modalVisibility}
            setVisibility={setVisibility}
            id={itemID}
            task={tasku}
            getalltasks = {getalltasks}
            flag={flag}
            setFlag = {setFlag}
          />
        )}
      </div>
      <div className={modaldelVisibility ? "overlay active" : "overlay"}>
        {itemID == null? (
          <></>
        ) : (
          <DeleteModal
            visibility={modaldelVisibility}
            setdelVisibility={setdelVisibility}
            id={itemID}
            status={status}
            getalltasks = {getalltasks}
            flag={flag}
            setFlag = {setFlag}
          />
        )}
      </div>
    </>
  )
}
