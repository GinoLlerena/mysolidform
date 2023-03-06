import {ELEMENT_TYPE} from '../../misc/constants'
import keys from 'lodash/keys'
import upperFirst from 'lodash/upperFirst'
import {
  SortableProvider
} from "@thisbeyond/solid-dnd";
import { Sortable } from '../commons/Sortable'
import FormBuilderItemOption from './FormBuilderItemOption'

function FormEditElementComponent(props) {
    let textInput = null;
  
    const handleKeyPress =(e) =>{
        if (e.key === 'Enter') {
          props.onAddOption(textInput.value);
          textInput.value = '';
        }
      }

    return(
        <div class="row">
          <div class="col-md-8">
            <form>
              <div class="mb-3">
                <label htmlFor="inputName">Name</label>
                <input type="text" class="form-control" id="inputName" placeholder="Enter name" value={props.element.displayName} onInput={(e)=> props.onChangeDisplayName(e.target.value)} />
              </div>
              <div class="mb-3">
                <label htmlFor="inputType">Type</label>
                <select class="form-control" id="inputType" value={props.element.type} onChange={(e)=> props.onChangeType(e.target.value)} >
                  <For each={keys(ELEMENT_TYPE)}>
                    {(key) => <option value={ELEMENT_TYPE[key]} >{upperFirst(key.toLowerCase())} </option>}
                  </For>
                </select>
              </div>
              {props.element.type === ELEMENT_TYPE.SIMPLE_SELECT || props.element.type === ELEMENT_TYPE.RADIO ?
              <>
                <div class="mb-3">
                  <SortableProvider ids={props.element.formElementValues.map(item => `${props.index}:${item.elementvalueId}`)}>
                    <For each={props.element.formElementValues}>
                      {(item) => (<Sortable id={`${props.index}:${item.elementvalueId}`}><FormBuilderItemOption item={item} onRemOption={()=> props.onRemOption(item.elementvalueId) } /> </Sortable>)}
                    </For>
                  </SortableProvider>
                </div>
                <div class="mb-3">
                  <input type="text" ref={textInput} class="form-control" id="inputName" placeholder="Enter name" onKeyPress={handleKeyPress}   />
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

export default FormEditElementComponent