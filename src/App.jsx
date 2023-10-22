import './App.css'
import initialData from './initial-data.js';
import Column from './Column.jsx';
import { DragDropContext } from '@hello-pangea/dnd';

function App() {

  const state = initialData;

  const handleDragEnd = (result) => {

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
