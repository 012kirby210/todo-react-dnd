import styled from "styled-components";
import { Draggable } from '@hello-pangea/dnd';
import {useRef} from "react";

const Handle = styled.div`
  width: 20px;
  height: 20px;
  background-color: orange;
  border-radius: 4px;
  margin-right: 8px;
`;

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
            ref={provided.innerRef}
            isdragging={snapshot.isDragging}
          >
            <Handle {...provided.dragHandleProps} />
            {task.content}
          </Container>)
      }
    }
    </Draggable>
  );
}

export default Task;