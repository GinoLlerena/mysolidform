import {ELEMENT_TYPE} from '../../misc/constants'
import {
  TextElement,
  TextAreaElement,
  PrintElement,
  PasswordElement,
  CheckBoxElement,
  RadioElement,
  SimpleSelectElement,
  ListElement
} from './FormElement.jsx'
import { getCurrentValue } from '../../misc/util'

export const ElementDictionary = {
  [ELEMENT_TYPE.PRINT] :  PrintElement,
  [ELEMENT_TYPE.TEXT] : TextElement,
  [ELEMENT_TYPE.PASSWORD] : PasswordElement,
  [ELEMENT_TYPE.CHECKBOX] :  CheckBoxElement,
  [ELEMENT_TYPE.RADIO]:  RadioElement,
  [ELEMENT_TYPE.TEXTAREA] :  TextAreaElement,
  [ELEMENT_TYPE.SIMPLE_SELECT] :  SimpleSelectElement,
  [ELEMENT_TYPE.LIST_ELEMENT] :  ListElement,
};

const EventsElement = (props) => {
  
  const MySolidElement = ElementDictionary[props.element.type];

  const handleChange = (event) => {
    const value = getCurrentValue(event, props.element);

    if(props.parentElementId){
      props.setValueMap(props.parentElementId, props.index, props.element.elementId, value);
    } else {
      props.setValueMap(props.element.elementId, value);
    }
  }

  return (<MySolidElement handleChange={handleChange} {...props}  />);
}

export default EventsElement;

