import React, {useState} from 'react';
import './App.css';
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import _ from "lodash";
import {v4} from 'uuid';

function App(){

  const [state, setState]=useState({
    "todo": {
      title: "Todo",
      items: ["f"]
    },
    "inprogress": {
      title: "In Progress",
      items: []
    },
    "done": {
      title: "Completed",
      items: []
    },
    "blocked":{
      title: "Blocked",
      items: ["ff"]
    },
  })

  
  const [title, setTitle] = React.useState('');
  const [note, setNote] = React.useState('');
  const [deadline, setDeadline] = React.useState('');
  

  function addNew(t, n, d){
    setState(prev => {
      return {
        ...prev,
        todo: {
          title: "Todo",
          items: [{
            id:v4(),
            title:t,
            note:n,
            deadline:d
          },
            ...prev.todo.items
          ]
        }
      }
    })

     
  setDeadline("")
  setNote("")
  setTitle("")
  }


  return(
    <div>
      title:
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
      note:
      <input type="text" value={note} onChange={(e) => setNote(e.target.value)}/>
      deadline:
      <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)}/>
  
      <button type="button" onClick={() => addNew(title, note, deadline)}>
      Add
      </button>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridGap: 20 }}>
        <div className='coloumn'>
          {state.todo.title}
          {state.todo.items.map(item =>
          <div>
            {item.title}, {item.note},{item.deadline}
          </div>)
          }
        </div>

        <div className='coloumn'>
          {state.inprogress.title}
          {state.inprogress.items.map(item =>
          <div>
            {item.title}, {item.note},{item.deadline}
          </div>)
          }
        </div>

        <div className='coloumn'>
          {state.done.title}
          {state.done.items.map(item =>
          <div>
            {item.title}, {item.note},{item.deadline}
          </div>)
          }
        </div>

        <div className='coloumn'>
          {state.blocked.title}
          {state.blocked.items.map(item =>
          <div>
            {item.title}, {item.note},{item.deadline}
          </div>)
          }
        </div>
        </div>
      
    </div>
      
    );
  
}

export default App;


