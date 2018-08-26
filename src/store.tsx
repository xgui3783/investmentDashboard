import { createStore, Store, Reducer, AnyAction } from 'redux'

export const ADD_NEW_EVENT = `ADD_NEW_EVENT`
export const ADD_NEW_INVESTMENT = `ADD_NEW_INVESTMENT`

export const ASYNC_UPDATED = `ASYNC_UPDATED`
export const INIT_FETCH = `INIT_FETCH`

export const DB_METHODS = {
  BUY : 'BUY',
  SELL : 'SELL',
  SPLIT : 'SPLIT',
  LOG : 'LOG'
}

export interface State {
  investments : InvestmentOption[]
}

export interface InvestmentOption{
  id : string
  name : string

  events : InvestmentEvent[]
}

interface InvestmentEvent{
  date : Date
  method : string
  price : number
  volume : number
}

interface InvestAction extends AnyAction{
  type : string
  payload : Partial<InvestmentOption> | string
}

const dispatchAsync = (json:any) => store.dispatch({
  type : ASYNC_UPDATED,
  payload : JSON.stringify(json)
})

const reducer : Reducer<State> = (prevState:State,action:AnyAction)=>{
  switch(action.type){
    case INIT_FETCH:
      fetch('/initGetData')
        .then(res=>res.json())
        .then(rows=>(console.log(rows),rows.map((row:any)=>row.doc).forEach(dispatchAsync)))
        .catch(console.error)
      return prevState
    case ASYNC_UPDATED:
      const parsedPayload = JSON.parse(action.payload)
      const idx = prevState.investments.findIndex(inv=>inv.name==parsedPayload.name) 
      if(idx>=0){
        /* investname already exist, concating the event to events */
        const investments = prevState.investments.map((iv,i)=>
          i == idx ?
            Object.assign({},iv,{events:iv.events.concat({
              date : parsedPayload.date,
              method : parsedPayload.method,
              price : parsedPayload.price,
              volume : parsedPayload.volume
            })}) :
            iv)
        const newState =  Object.assign({},prevState,{ investments : investments })
        return newState
      }else{
        /* investname does not yet exist, create a new entry */
        return Object.assign({},prevState,{
          investments : prevState.investments.concat({
            name : parsedPayload.name,
            id : parsedPayload.id ? parsedPayload.id : parsedPayload.name ,
            events : parsedPayload.events ? parsedPayload.events : []
          })
        })
      }
    case ADD_NEW_INVESTMENT:
      const payload = {
        method : 'START',
        payload : action.payload
      }
      fetch('/newDataPoint',{
        method: 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify(payload)
      })
        .then(res=>res.json())
        .then(dispatchAsync)
        .catch((e:any)=>{
          console.log('error',e)
        })    
      return prevState
    case ADD_NEW_EVENT:
      const { eventName, ...postPayload } = action.payload
      const payloadNewEvent = {
        method : eventName,
        payload : postPayload
      }

      fetch('/newDataPoint',{
        method: 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify(payloadNewEvent)
      })
        .then(res=>res.json())
        .then(dispatchAsync)
        .catch((e:any)=>{
          console.log('error',e)
        }) 
      return prevState   
    default:
      return prevState
  }
}

const initialState : State = {
  investments : []
}

export const store : Store<State> = createStore(reducer,initialState)