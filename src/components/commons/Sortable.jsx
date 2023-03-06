import { useDragDropContext } from "@thisbeyond/solid-dnd";
import {
    createSortable,
  } from "@thisbeyond/solid-dnd";

export const Sortable = (props) => {
    const sortable = createSortable(props.id);
    const [state] = useDragDropContext();
  
    return(
      <div
        use:sortable
        class="sortable"
        classList={{
          "opacity-25": sortable.isActiveDraggable,
          "transition-transform": !!state.active.draggable,
        }}>
          {props.children}
        </div>)
    
}