import { For } from "solid-js"
import FormBuilderItemOption from "../FormBuilderItemOption"
import { keys, upperFirst } from 'lodash/fp'
import { ELEMENT_TYPE } from "../../../misc/constants"
import EventsElement from "../../render/EventsElement"

function FormEditElementComponent(props) {
    
    return(
        <div class="row">
          <div class="col-md-8">
            <form>
              <div class="mb-3">
                <label htmlFor="inputName">Name</label>
                <input type="text" class="form-control" id="inputName" placeholder="Enter name" value={props.element.displayName} />
              </div>
              <div class="mb-3">
                <label htmlFor="inputType">Type</label>
                <select class="form-control" id="inputType" value={props.element.type}  >
                  <For each={keys(ELEMENT_TYPE)}>
                    {(key) => <option value={ELEMENT_TYPE[key]} >{upperFirst(key.toLowerCase())} </option>}
                  </For>
                </select>
              </div>
              {props.element.type === ELEMENT_TYPE.SIMPLE_SELECT || props.element.type === ELEMENT_TYPE.RADIO ?
              <>
                <div class="mb-3">
                    <For each={props.element.formElementValues}>
                        {(item) => <FormBuilderItemOption name={item.name} />}
                    </For>
                </div>
                <div class="mb-3">
                  <input type="text" ref={textInput} class="form-control" id="inputName" placeholder="Enter name"  />
                </div>
              </>
                : null}
            </form>
          </div>
          <div class="col-md-4">
          </div>
        </div>
    )
}

function FormBuilderItemOverlay(props){

    return(
        <div class="card my-2" >
        <div class="card-header">
          <div class="float-end">
            <span class="mx-auto px-2"><i class="far fa-edit"></i></span>
            <span class="mx-auto px-2"><i class="fas fa-trash"></i></span>
          </div>
        </div>
        <div class="card-body">
          {!props.editMode[props.element.elementId] 
          ? <EventsElement element={props.element} formElementValues={[]} valueMap={{}} />
          : <FormEditElementComponent element={props.element}  />}
        </div>
      </div>
    )
}

export default FormBuilderItemOverlay