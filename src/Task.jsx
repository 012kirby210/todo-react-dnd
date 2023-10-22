import styled from "styled-components";
import { Draggable } from '@hello-pangea/dnd';
import {useRef} from "react";

const Container = styled.div`
  border: 1px solid lightgrey;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 2px;
  background-color: white;
`;

const Task = ({task,index}) => {

return (
    <Draggable draggableId={task.id} index={index}>{
      (provided) => {
        return (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            {task.content}
          </Container>)
      }
    }
    </Draggable>
  );
}

export default Task;