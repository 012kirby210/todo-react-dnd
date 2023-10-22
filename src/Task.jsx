import styled from "styled-components";
import { Draggable } from '@hello-pangea/dnd';
import {useRef} from "react";

const Container = styled.div`
  border: 1px solid lightgrey;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 2px;
  background-color: ${ props => (props.isdragging ? 'lightgreen' : 'white')};
`;

const Task = ({task,index}) => {

return (
    <Draggable draggableId={task.id} index={index}>{
      (provided, snapshot) => {
        /**
         * draggable snapshot : { isDragging, draggingOver }
         */
        return (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isdragging={snapshot.isDragging}
          >
            {task.content}
          </Container>)
      }
    }
    </Draggable>
  );
}

export default Task;