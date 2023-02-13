import { createStore } from 'solid-js/store'
import { data } from '../data/data';


export const [store, setStore] = createStore(data)


export const [valueMap, setValueMap] = createStore({
    firstname: '',
    relatives: [{id: '1', firstName: 'Juan', lastName: 'Lopez'}] 
})
