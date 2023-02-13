import EventsElement from './EventsElement'
import getOr from 'lodash/fp/getOr'
import { useDragDropContext } from "@thisbeyond/solid-dnd";
import { For, createSignal } from "solid-js"
import {
  DragDropProvider,
  DragDropSensors,
  DragOverlay,
  SortableProvider,
  createSortable,
  closestCenter,
} from "@thisbeyond/solid-dnd";
import { getIds, getInternalFormItems, getIndex } from '../../misc/util';

export const RadioOption = (props) => {
  return (
    <div class="form-check">
      <input class="form-check-input" type="radio" id={props.item.elementvalueId} disabled={props.readOnly}
             value={props.item.elementvalueId} checked={props.item.elementvalueId === props.currentValue} onChange={props.handleChange}/>
      <label class="form-check-label" htmlFor={props.item.elementvalueId}>
        {props.item.displayName}
      </label>
    </div>
  )
}

export const SimpleSelectElement = (props) => {

  return(
    <div class="mb-3">
      <label class="form-label" htmlFor={props.element.elementId}>{props.element.displayName}</label>
      <select class="form-control" id={props.element.elementId} value={getOr('',props.element.elementId)(props.valueMap)} disabled={props.element.readOnly} onChange={props.handleChange}>
        <For each={props.element.formElementValues}>
            {(item) => <option  value={item.elementvalueId}>{item.displayName}</option>}
        </For>
      </select>
    </div>
  )
}

export const PasswordElement = (props) => {
  return(
    <div class="mb-3">
      <label class="form-label" htmlFor={props.element.elementId}>{props.element.displayName}</label>
      <input type="password" class="form-control" id={props.element.elementId} defaultValue={getOr('',props.element.elementId)(props.valueMap)} placeholder="Password" onChange={props.handleChange} disabled={props.element.readOnly} />
    </div>
  )
}

export const CheckBoxElement = (props) => {

    return (
      <div class="form-check">
        <input type="checkbox" defaultChecked={getOr(false, props.element.elementId)(props.valueMap)} onChange={props.handleChange} disabled={props.element.readOnly} class="form-check-input"/>
        <label class="form-check-label">  
          {props.element.displayName}
        </label>
      </div>
  )
}

export const PrintElement = (props) => {
  return(
    <div class="mb-3">
      <label htmlFor="formControlRange">{props.element.displayName}</label>
    </div>
  )
}

export const TextElement = (props) => {

  
  return(
    <div class="mb-3">
      <label class="form-label" htmlFor={props.element.elementId}>{props.element.displayName}</label>
      <input type="text"
             class="form-control"
             autoComplete="off"
             name={props.element.elementId}
             id={props.element.elementId}
             onInput={props.handleChange}
             value={getOr('',props.element.elementId)(props.valueMap)}
             disabled={props.element.readOnly}
             required=""/>
      <div class="invalid-feedback">Please enter your username or email</div>
    </div>
  )
}

export const TextAreaElement = (props) => {

  return(
    <div class="mb-3">
      <label class="form-label" htmlFor={props.element.elementId}>{props.element.displayName}</label>
      <textarea class="form-control"
                id={props.element.elementId}
                value={getOr('',props.element.elementId)(props.valueMap)}
                disabled={props.element.readOnly}
                onInput={props.handleChange}
                rows="3" />
    </div>
  )
}

export const RadioElement = (props) => {
  return(
    <fieldset class="mb-3">
      <div class="row">
        <legend class="col-form-label col-sm-2 pt-0">{props.element.displayName}</legend>
        <div class="col-sm-10">
          <For each={props.element.formElementValues}>
            {(item) => <RadioOption item={item}  currentValue={getOr(false, props.element.elementId)(props.valueMap)} handleChange={props.handleChange} readOnly={props.element.readOnly} />}
          </For>
        </div>
      </div>
    </fieldset>
  )
}

const Sortable = (props) => {
  const sortable = createSortable(props.item.id);
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

const ListElementItem = (props) => {

  const onRemElement = (id, index) => props.setValueMap(id, (t) => t.filter((object, i) => i !== index))


  return(
    <div class="d-flex flex-row bd-highlight" >
      <div class="p-2 align-self-center">
        <i class="fas fa-bars" />
      </div>
      <For each={getInternalFormItems(props.element.internalForm)}>
        { (innerElement) => {
          return (<div class="p-2 flex-fill bd-highlight" >
                        <EventsElement
                            index={props.index}
                            parentElementId={props.element.elementId}
                            setValueMap={props.setValueMap}
                            element={innerElement}
                            valueMap={props.valueMap[props.element.elementId][props.index]}
                            setStore={props.setStore}
                        />
              </div>)}
        }      
      </For>
      <div class="p-2 flex-fill align-self-center">
        <i class="fas fa-trash" onClick={()=>onRemElement(props.element.elementId, props.index)} />
      </div>
  </div>
  )
}

export const ListElement = (props) => {
  const [activeItem, setActiveItem] = createSignal(null);
  const onDragStart = ({ draggable }) => setActiveItem(draggable.id);

  const onAddElement = (_id) =>{ 
    const id = (new Date().getTime()).toString().trim();
    props.setValueMap(`${_id}`, props.valueMap[_id].length, {id} )
  }

  const onDragEnd = ({ draggable, droppable }) => {
    if (draggable && droppable) {
      const currentItems = getIds(props.valueMap, props.element.elementId, 'id')
      const fromIndex = currentItems.indexOf(draggable.id);
      const toIndex = currentItems.indexOf(droppable.id);
      if (fromIndex !== toIndex) {
        const updatedItems = props.valueMap[props.element.elementId].slice();
        updatedItems.splice(toIndex, 0, ...updatedItems.splice(fromIndex, 1));
        props.setValueMap(props.element.elementId, updatedItems)
      }
    }
  };

  return(
    <DragDropProvider
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      collisionDetector={closestCenter}>
      <DragDropSensors />
      <fieldset class="form-group">
        <div class="row" style={{"padding-top":'2em'}}>
          <legend class="col-form-label col-3 pt-0">
            <h5>{props.element.displayName}</h5>
          </legend>
        
            <div class="col-12">
              <SortableProvider ids={getIds(props.valueMap, props.element.elementId, 'id')}>
                <For each={props.valueMap[props.element.elementId]}>
                  {
                    (item, index)=> <Sortable item={item}><ListElementItem index={index()} id={item.id} {...props} /></Sortable>
                  }
                </For>
            </SortableProvider>
            </div>
        </div>
        { props.element.hiddenAdd ? null :
        <div class="row mt-2" >
          <div class="col text-left">
            <button type="button" class="btn btn-success" onClick={()=>onAddElement(props.element.elementId)}>Add</button>
          </div>
        </div>}
      </fieldset>
      <DragOverlay>
        <div class="sortable"><ListElementItem index={getIndex(props.valueMap[props.element.elementId], activeItem())} id={activeItem()} {...props} /></div>
      </DragOverlay>
    </DragDropProvider>
  )

}

