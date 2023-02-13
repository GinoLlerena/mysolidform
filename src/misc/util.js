import flow from 'lodash/fp/flow'
import cond from 'lodash/fp/cond'
import get from 'lodash/fp/get'
import getOr from 'lodash/fp/getOr'
import some from 'lodash/fp/some'
import map from 'lodash/fp/map'
import isBoolean from 'lodash/fp/isBoolean'
import isArray from 'lodash/fp/isArray'
import isFunction from 'lodash/fp/isFunction'
import stubTrue from 'lodash/fp/stubTrue'
import orderBy from 'lodash/fp/orderBy'
import {ELEMENT_TYPE} from '../misc/constants'
import { filter, first } from 'lodash/fp'
import { findIndex } from 'lodash/fp'


export function createElement(index, type){

    const elementId = (new Date().getTime()).toString();
  
    return(
      {
        "displayName": "",
        "displayOrder": index,
        "required": false,
        "elementId": elementId,
        "type": type,
        "readOnly": false,
        "isHidden": () => (false),
        "formElementValues": []
      }
    )
  }

  export const getElement = (key, value, elementId, item) =>{
    if(item.elementId === elementId){
      item[key] = value;
    }
    return item;
  }

  export function shouldBeHidden(formElements, element, valueMap){

    const getItem = item => !!(get(item)(valueMap))
  
    return cond([
      [flow(get('isHidden'),isBoolean), ()=> element.isHidden],
      [flow(get('isHidden'),isArray), ()=> !some(getItem)(element.isHidden)],
      [flow(get('isHidden'),isFunction), ()=> element.isHidden(formElements, valueMap)],
      [stubTrue, ()=> false]
    ])(element)
  }
  
  export const getCurrentValue = (event, element) =>{

    switch (element.type) {
      case ELEMENT_TYPE.RADIO:
        return event.target.value;
      case ELEMENT_TYPE.CHECKBOX:
        return event.target.checked;
      default:
        return event.target.value;
    }
  }

  
export function removeIndex(array, index) {
  return [...array.slice(0, index), ...array.slice(index + 1)];
}

export function getIds(array, elementId, propertyId) {
  return flow(
    getOr([], elementId),
    map(item => item[propertyId])
  )(array)
}

export function getInternalFormItems(internalForm){
  return orderBy('displayOrder','asc')(internalForm)
}

export function getFormElement(form, elementId) {
  return flow(
    filter(item => item.elementId === elementId),
    first
  )(form)
}

export function getIndex(array, id) {
  const index = findIndex(item => item.id === id)(array)
  return index
}

export function getSortedElements(array, valueMap){

  const filterBy = item => !shouldBeHidden(array, item, valueMap)

  return flow(
    orderBy('displayOrder','asc'),
    filter(filterBy)
  )(array)
}