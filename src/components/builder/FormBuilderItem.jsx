import EventsElement from "../render/EventsElement";
import FormEditElementComponent from './FormEditElementComponent';
import {
  createSortable,
  maybeTransformStyle
} from "@thisbeyond/solid-dnd";

function FormBuilderItem(props) {
  const sortable = createSortable(props.id);
  const { element, onRemElement,  editMode } = props;

  const onChangeDisplayName = props.onChange('displayName')
  const onChangeType = props.onChange('type')
  
  return(
      <div class="card my-2" 
          ref={sortable.ref}
          style={maybeTransformStyle(sortable.transform)}
          classList={{ "opacity-25": sortable.isActiveDraggable }}
          >
        <div class="card-header sortable"{...sortable.dragActivators} style={{cursor: "move"}}>
          Feature {props.index+1}
          <div class="float-end">
            <span class="mx-auto px-2" onClick={()=> props.onToggle()}><i class="far fa-edit" style={{cursor:'pointer'}}></i></span>
            <span class="mx-auto px-2" onClick={onRemElement}><i class="fas fa-trash" style={{cursor:'pointer'}}></i></span>
          </div>
        </div>
        <div class="card-body">
          {!editMode[element.elementId] 
          ? <EventsElement element={props.element} formElementValues={[]} valueMap={{}}  /> 
          : <FormEditElementComponent element={props.element} onChangeDisplayName={onChangeDisplayName} onChangeType={onChangeType} onAddOption={props.onAddOption} onRemOption={props.onRemOption} index={props.index} />}
        </div>
      </div>
     
  )

}

export default FormBuilderItem;
