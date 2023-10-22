import styled from 'styled-components';
import Task from './Task.jsx';
import { Droppable } from '@hello-pangea/dnd';

const Container = styled.div`
margin: 8px;
border: 1px solid lightgrey;
  border-radius: 2px;
  width: 220px;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
    padding: 8px;
    background-color: ${ (props) => (props.isdraggingover ? 'skyblue' : 'white') };
    transition: background-color 250ms ease-in-out;
  flex-grow: 1;
  // min drappable area
  min-height: 100px;
`;

const Column = ({column, tasks}) => {

  return (
    <Container>
      <Title>{column.title}</Title>
      <Droppable droppableId={column.id}>
        {
          (provided, snapshot) => {
            /**
             * droppable snapshot : { isDraggingOver, draggingOverWith }
             */
            return (
              <TaskList
                {...provided.droppableProps}
                ref={provided.innerRef}
                isdraggingover={snapshot.isDraggingOver}

              >{tasks.map((t, i) => <Task key={t.id} task={t} index={i}/>)}
                {provided.placeholder}</TaskList>
            );
          }
        }
      </Droppable>
    </Container>
  );
}

export default Column;