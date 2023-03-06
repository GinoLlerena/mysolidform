import get from 'lodash/get'

function FormBuilderItemOption(props){
  
    return(
      <div class="mb-3">
        <div class="d-flex bd-highlight">
          <div class="p-2 bd-highlight align-self-center">
            <span class="mx-auto px-2" onClick={()=>{}}><i class="fas fa-grip-vertical" style={{cursor:'move'}}></i></span>
          </div>
          <div class="p-2 flex-grow-1 bd-highlight">
            <label htmlFor={props.item.elementvalueId}>Name</label>
            <input type="text" 
              class="form-control"
              autoComplete="off"
              name={props.item.elementvalueId}
              id={props.item.elementvalueId}
              onChange={()=>{}}
              value={get(props.item, 'displayName')}
              required=""/>
          </div>
          <div class="p-2 bd-highlight align-self-center">
            <span class="mx-auto px-2" onClick={()=>{}}><i class="fas fa-trash" style={{cursor:'pointer'}}></i></span>
          </div> 
         </div>
      </div>
    )
  }

  export default FormBuilderItemOption