import './App.css'
import initialData from './initial-data.js';
import Column from './Column.jsx';
import { DragDropContext } from '@hello-pangea/dnd';
import {useState} from "react";

function App() {

  const [state, setState] = useState(initialData)

  const handleDragEnd = (result) => {
    /**
     * result = { draggableId, type, reason, source : {droppableid, index }, destination: { droppable, index } }
     */
    const { destination, source, draggableId } = result;

    if (!destination){
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ){
      return ;
    }

    const column = state.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskids);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
      taskids: newTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newColumn.id]: newColumn,
      }
    };

    setState(newState);

  }

  return (
    <DragDropContext
      onDragEnd={handleDragEnd}
    >
    <div>
    {
      state.columnOrder.map( columnId => {
        const column = state.columns[columnId];
        const tasks = column.taskids.map( taskId => state.tasks[taskId] );

        return <Column key={column.id} column={column} tasks={tasks} />;
      })
    }

  </div>
    </DragDropContext>
      );
}

export default App
