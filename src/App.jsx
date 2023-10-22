import './App.css'
import initialData from './initial-data.js';
import Column from './Column.jsx';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import {useState} from "react";

import styled from 'styled-components';

function App() {

  const [state, setState] = useState(initialData)

  const Container = styled.div`
  display: flex;
  
  `;

  const handleDragEnd = (result) => {
    /**ø
     * result = { draggableId, type, reason, source : {droppableid, index }, destination: { droppable, index } }
     */
    document.body.style.color = 'inherit';
    document.body.style.backgroundColor = 'white';

    const { destination, source, draggableId, type } = result;

    if (!destination){
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ){
      return ;
    }

    if ( 'column' === type ){
      const newColumnOrder = Array.from(state.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index,0,draggableId);

      const newState = {
        ...state,
        columnOrder: newColumnOrder,
      };
      setState(newState);
      return;
    }

    const startColumn = state.columns[source.droppableId];
    const endColumn = state.columns[destination.droppableId];

    if ( startColumn === endColumn ){
      const newTaskIds = Array.from(startColumn.taskids);
      newTaskIds.splice(source.index,1);
      newTaskIds.splice(destination.index,0,draggableId);

      const newColumn = {
        ...startColumn,
        taskids: newTaskIds
      };

      const newState = {
        ...state,
        columns:{
          ...state.columns,
          [newColumn.id]: newColumn
        }
      };

      setState(newState);
      return;
    }

    const newTaskIdsEnd = Array.from(endColumn.taskids);
    const newTaskIdsStart = Array.from(startColumn.taskids);
    newTaskIdsStart.splice(source.index, 1);
    newTaskIdsEnd.splice(destination.index, 0, draggableId);

    const newStartColumn = {
      ...startColumn,
      taskids: newTaskIdsStart,
    };

    const newEndColumn = {
      ...endColumn,
      taskids: newTaskIdsEnd,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStartColumn.id]: newStartColumn,
        [newEndColumn.id]: newEndColumn,
      }
    };

    setState(newState);

  }

  const handleDragStart = () => {
    document.body.style.color = 'orange';
    document.body.style.transition = 'background-color: 0.3s ease';
  };

  const handleDragUpdate = update => {
    const { destination } = update;
    const opacity = destination ? destination.index / Object.keys(state.tasks).length : 0;
    document.body.style.backgroundColor = `rgba(153,141,217, ${opacity}`;
  }


  return (
    <DragDropContext
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragUpdate={handleDragUpdate}
    >
      <Droppable droppableId="rootid" direction='horizontal' type="column">
        { (provided, snapshot) => {

          return (
            <Container
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {
                state.columnOrder.map( (columnId, index) => {
                  const column = state.columns[columnId];
                  const tasks = column.taskids.map( taskId => state.tasks[taskId] );

                  return <Column key={column.id} column={column} tasks={tasks} index={index} />;
                })
              }
              {provided.placeholder}
            </Container>
          )
        }}
      </Droppable>

    </DragDropContext>
      );
}

export default App
