import FormRender  from "../render"
import { store, setStore, valueMap, setValueMap } from '../../store/store'

const ShowJSON = (props) => <div><pre>{JSON.stringify(props.valueMap, null, 2)}</pre></div>

const MyFormPage = (props) => {

    return( 
        <div class="container">
            <div class="row">
                <div class="col">
                    <FormRender  
                        formElements={store.formElements}
                        setValueMap={setValueMap}
                        valueMap={valueMap}
                        setStore={setStore}
                     />
                </div>
                <div class="col">
                    <ShowJSON valueMap={valueMap} />
                </div>
            </div>
        </div>
    )
}

export default MyFormPage