import styled from 'styled-components';
import Task from './Task.jsx';
import { Droppable } from '@hello-pangea/dnd';

const Container = styled.div`
margin: 8px;
border: 1px solid lightgrey;
  border-radius: 2px;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
    padding: 8px;
`;

const Column = ({column, tasks}) => {

  return (
    <Container>
      <Title>{column.title}</Title>
      <Droppable droppableId={column.id}>
        {
          (provided) => (
            <TaskList
              {...provided.droppableProps }
              ref={provided.innerRef}

            >{provided.placeholder}
              {tasks.map( (t,i) => <Task key={t.id} task={t} index={i}/>)}</TaskList>
          )
        }
      </Droppable>
    </Container>
  );
}

export default Column;