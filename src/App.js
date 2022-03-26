import React, {useState} from 'react';
import './App.css';
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import _ from "lodash";
import {v4} from 'uuid';

function App(){

  const [state, setState]=useState({
    "todo": {
      title: "Todo",
      items: []
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
      items: []
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

  const handleDragEnd = ({destination, source}) => {
    if (!destination) {
      return
    }

    if (destination.index === source.index && destination.droppableId === source.droppableId) {
      return
    }

    const itemCopy = {...state[source.droppableId].items[source.index]}

    setState(prev => {
      prev = {...prev}
      prev[source.droppableId].items.splice(source.index, 1)
      prev[destination.droppableId].items.splice(destination.index, 0, itemCopy)
      return prev
    })
  }


  return(
    <div>
      <div >
      title:
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
      note:
      <input type="text" value={note} onChange={(e) => setNote(e.target.value)}/>
      deadline:
      <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)}/>
  
      <button type="button" onClick={() => addNew(title, note, deadline)}>
      Add
      </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridGap: 20, backgroundColor:'#FF0000'}} >
      
      <DragDropContext onDragEnd={handleDragEnd}>
        {_.map(state, (s, key) => {
          return(
            <div key={key}>

              <h3>{s.title}</h3>

              <Droppable droppableId={key}>
                {(provided) => {
                  return(
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {s.items.map((item, index) => {
                        return(
                          <Draggable key={item.id} index={index} draggableId={item.id}>
                            {(provided) => {
                              return(
                                <div ref={provided.innerRef} {...provided.draggableProps}{...provided.dragHandleProps}>
                                  {item.title},
                                  {item.note},
                                  {item.deadline}
                                </div>
                              )
                            }}
                          </Draggable>
                        )
                      })}
                      {provided.placeholder}
                    </div>
                  )
                }}
              </Droppable>

            </div>
          )
        })}
      </DragDropContext>

      </div>
      
    </div>
      
    );
  
}

export default App;


