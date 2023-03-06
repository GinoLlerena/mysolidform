import { For, createSignal } from 'solid-js';
import { createStore } from 'solid-js/store'
import map from 'lodash/fp/map'
import reduce from 'lodash/fp/reduce'
import split from 'lodash/fp/split'
import { data } from '../../data/data'
import FormBuilderItem from './FormBuilderItem';
import { ELEMENT_TYPE } from '../../misc/constants';
import { createElement, createOption  } from '../../misc/util'
import {
  DragDropProvider,
  DragDropSensors,
  DragOverlay,
  SortableProvider,
  closestCenter,
} from "@thisbeyond/solid-dnd";
import FormBuilderItemOption from './FormBuilderItemOption';
import FormBuilderItemOverlay from './overlays/FormBuilderItemOverlay';

function init() {
    const getElement = element => ({...element, readOnly:true, hiddenAdd: true})
    const getEditMode = (result, element)=>{result[element.elementId] = false; return result;}
    return {
      items: map(getElement)(data.formElements),
      editMode: reduce(getEditMode, {})(data.formElements)
    };
  }

function FormBuilder() {

    const [store, setStore] = createStore(init());
    const [activeItem, setActiveItem] = createSignal(null);
    const onDragStart = ({ draggable }) => {
      setActiveItem(draggable.id);
    }
  
    const onAddElement = (elementType) => setStore('items', store.items.length, createElement(store.items.length, elementType))
    const onRemElement = (elementId)=> setStore('items', (t) => t.filter((object) => object.elementId !== elementId))
    const onChangeValue = (index) => (key) => (value) => setStore('items', index(), key, value  )
  
  
    const onDragEnd = ({ draggable, droppable }) => {
      const [draggableType, draggableId] = split(':')(draggable.id)
      const [droppableType, droppableId] = split(':')(droppable.id)

      if (draggable && droppable) {
        
        if(draggableType === 'elementId') {
          const currentItems = map(item => item.elementId)(store.items)
          const fromIndex = currentItems.indexOf(draggableId);
          const toIndex = currentItems.indexOf(droppableId);
          if (fromIndex !== toIndex) {
            const updatedItems = store.items.slice();
            updatedItems.splice(toIndex, 0, ...updatedItems.splice(fromIndex, 1));
            setStore('items', updatedItems)
          }
        } else {
        
          const currentItems = map(item => item.elementvalueId)(store.items[droppableType].formElementValues)
          const fromIndex = currentItems.indexOf(draggableId);
          const toIndex = currentItems.indexOf(droppableId);
          if (fromIndex !== toIndex) {
            const updatedItems = store.items[droppableType].formElementValues.slice();
            updatedItems.splice(toIndex, 0, ...updatedItems.splice(fromIndex, 1));
            setStore('items', droppableType, 'formElementValues',  updatedItems)
          }
        }
      }
    };
  
    const onToggle = (elementId) => setStore('editMode', t => ({ ...t, [elementId]: !store.editMode[elementId]}))
    const onAddOption = (index) => (value) => setStore('items', index(), 'formElementValues', (t) => ([ ...t, createOption(t.length, value)]))
    const onRemOption = (index) => elementvalueId => setStore('items', index(), 'formElementValues', (t) =>(t.filter((item) => (item.elementvalueId !== elementvalueId)))) 
  
    return(
      <div class="container">
        <div class="row">
          <div class="col-8">
            <DragDropProvider
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              collisionDetector={closestCenter}>
              <DragDropSensors />
              <SortableProvider ids={map(item => `elementId:${item.elementId}`)(store.items)}>
                <For each={store.items}>
                  {(item, index) => 
                  (
                      <FormBuilderItem 
                                id={`elementId:${item.elementId}`}
                                element={item}
                                index={index()} 
                                onRemElement={() => onRemElement(item.elementId)}
                                onChange={onChangeValue(index)} 
                                editMode={store.editMode} 
                                onToggle={() => onToggle(item.elementId)} 
                                onAddOption={onAddOption(index)}
                                onRemOption={onRemOption(index)}
                                />
                                )}      
                </For>
              </SortableProvider>
             
              <DragOverlay>
                {(draggable) => {
                    if(!activeItem()) return (<div class="sortable"></div>)  
                    const [type, id ] = split(':')(activeItem())
                    const [draggableType, _] = split(':')(draggable.id)
                    const isSortElement =  (draggableType === type && type === 'elementId') 
                    const item = isSortElement? store.items.find(item => item.elementId === id) : store.items[type].formElementValues.find(item =>item.elementvalueId === id)
                    return (isSortElement 
                    ? <FormBuilderItemOverlay element={item} editMode={store.editMode}  />
                    : <div class="sortable"><FormBuilderItemOption item={item} /></div>  
                  )
                }}
              </DragOverlay>
            </DragDropProvider>      
            <div class="container text-center">
              <ul class="list-group list-group-horizontal mt-5">
                <li class="list-group-item text-center" style={{flex: '1 1 0'}} onClick={()=> onAddElement(ELEMENT_TYPE.PRINT)}><i class="fas fa-print fa-2x"></i><div class="small">Print</div></li>
                <li class="list-group-item text-center" style={{flex: '1 1 0'}} onClick={()=> onAddElement(ELEMENT_TYPE.TEXT)}><i class="fas fa-font fa-2x"></i><div class="small">Text</div></li>
                <li class="list-group-item text-center" style={{flex: '1 1 0'}} onClick={()=> onAddElement(ELEMENT_TYPE.TEXTAREA)}><i class="fas fa-paragraph fa-2x"></i><div class="small">Text Area</div></li>
                <li class="list-group-item text-center" style={{flex: '1 1 0'}} onClick={()=> onAddElement(ELEMENT_TYPE.PASSWORD)}><i class="fas fa-key fa-2x"></i><div class="small">Password</div></li>
                <li class="list-group-item text-center" style={{flex: '1 1 0'}} onClick={()=> onAddElement(ELEMENT_TYPE.CHECKBOX)}><i class="fas fa-check-square fa-2x"></i><div class="small">Checkbox</div></li>
                <li class="list-group-item text-center" style={{flex: '1 1 0'}} onClick={()=> onAddElement(ELEMENT_TYPE.RADIO)}><i class="fas fa-check-circle fa-2x"></i><div class="small">Radio</div></li>
                <li class="list-group-item text-center" style={{flex: '1 1 0'}} onClick={()=> onAddElement(ELEMENT_TYPE.SIMPLE_SELECT)}><i class="far fa-caret-square-down fa-2x"></i><div class="small">Select</div></li>
              </ul>
            </div>
          </div>
          <div class="col-4">
            <div><pre>{JSON.stringify(store.items, null, 2) }</pre></div>
          </div>
        </div>
      </div>
    )
  }
  
  export default FormBuilder;