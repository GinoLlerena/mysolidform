import EventsElement from './EventsElement'
import { createMemo, For } from "solid-js"
import { getSortedElements } from '../../misc/util'

export default function FormRender(props){

  const sortedElements = createMemo(()=> getSortedElements(props.formElements, props.valueMap))
  
  return(
    <div className="container">
      <form>
        <For each={sortedElements()}>
          {(element) => {
              return (
              <EventsElement
                      formElements={sortedElements()}
                      element={element}
                      setValueMap={props.setValueMap}
                      valueMap={props.valueMap}
                      setStore={props.setStore}
              />)}
          }
        </For>
        <div className="form-group" style={{"padding-top":'2em'}}>
          <div className="text-center">
            <button type="button" className="btn btn-success" onClick={()=> console.log('valueMap', props.valueMap)}>Send</button>
          </div>
        </div>
      </form>
    </div>
  )
}


