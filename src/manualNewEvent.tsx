import * as React from 'react'
import { connect } from 'react-redux'
import { ADD_NEW_EVENT, DB_METHODS, InvestmentOption,State } from './store'
import { AutocompleteSuite } from './autocompletesuite'

interface ManualNewEventDispatcher{
  addNewEvent : Function
}

interface NewEvent{
  name : string /* should be used as id, eventually */
  date : Date
  eventName : string
  price : number
  volume : number
}

interface ManualNewEventInterface{
  investments : InvestmentOption[]
}

const dispatcher = (dispatch:any) : ManualNewEventDispatcher=>{
  return({
    addNewEvent : function(newEvent:NewEvent){
      dispatch({
        type : ADD_NEW_EVENT,
        payload : newEvent
      })
    }
  })
}

const mapStateToProp = (state : State):ManualNewEventInterface=>{
  return ({ investments : state.investments })
}

class ManualNewEvent extends React.Component<ManualNewEventInterface&ManualNewEventDispatcher>{
  
  checkInput(input:HTMLInputElement,test:(element:HTMLInputElement)=>boolean):boolean{
    if(!test(input)){
      const newWarning = document.createElement('span')
      input.classList.add('is-invalid')
      newWarning.innerHTML = test === this.isNoneEmpty ? `This field has to be none-empty.` : test === this.isNumber ? `This field has to be a number.` : `Error.`
      input.parentElement.querySelector('.form-control-feedback').appendChild(newWarning)
      input.parentElement.querySelector('.form-control-feedback').classList.add('invalid-feedback')
      // input.classList.add('form-control-danger')
    }
    return test(input)
  }

  isNoneEmpty(element:HTMLInputElement):boolean{
    return element.value != ''
  }

  isNumber(element:HTMLInputElement):boolean{
    return !isNaN( element.value as any )
  }
  
  handleChange = (event:any)=>{
    // const input = event.target as HTMLInputElement
    // input.classList.remove('is-invalid')
    // input.classList.remove('is-valid')
    // const allErrorMessages = input.parentElement.querySelector('.form-control-feedback').querySelectorAll('span')
    // allErrorMessages.forEach(m=>m.parentElement.removeChild(m))
  }

  handleSubmit = (event:any)=>{
    event.preventDefault()

    const form = event.target as HTMLFormElement
    
    const name = form.querySelector('#investmentName') as HTMLInputElement
    const method = form.querySelector('#methodId') as HTMLInputElement
    const price = form.querySelector('#eventPrice') as HTMLInputElement
    const volume = form.querySelector('#eventVolume') as HTMLInputElement

    const validate = 
      true
      // [this.checkInput(name,this.isNoneEmpty),
      // this.checkInput(method,this.isNoneEmpty),
      // this.checkInput(price,this.isNoneEmpty),
      // this.checkInput(price,this.isNumber),
      // this.checkInput(volume,this.isNumber)]
      //   .every(bool=>bool)

    if(validate){
      console.log('validated')
      this.props.addNewEvent({
        name : this.autosuggestInvestment.state.value,
        date : Date.now(),
        eventName : this.autosuggestMethod.state.value,
        price : price.value, /* invariably will be string, but need to be parsed to number */
        volume : volume.value
      })
    }else{
      console.log('error')
    }
  }

  autosuggestInvestment : AutocompleteSuite
  autosuggestMethod : AutocompleteSuite

  nextInput(){
    
  }

  render(){
    return <form onChange={this.handleChange} onSubmit={this.handleSubmit}>

      <div className = "form-group">
        <label htmlFor = "investmentName">Investment</label>
        <AutocompleteSuite
          ref={ac=>this.autosuggestInvestment=ac}
          placeholder = "e.g. S&P500, ishare ..."
          id = "investmentName"
          addnew = {false}
          nextEntryCallback = {(this.nextInput).bind(this)}
          fullSuggestions = {this.props.investments.map(inv=>({name:inv.name.split(',')[0],desc:inv.name}))}
        />
        <div className="form-control-feedback"></div>
      </div>
      <div className = "form-group">
        <label htmlFor = "methodId">Event Name</label>
        <AutocompleteSuite 
          ref={ac=>this.autosuggestMethod=ac}
          placeholder = "BUY, SELL, LOG, SPLIT"
          id = "eventName"
          addnew = {false}
          nextEntryCallback = {(this.nextInput).bind(this)}
          fullSuggestions = {Object.keys(DB_METHODS).map(name=>({name:name}))}
        />
        {/* <input type = "text" className = "form-control" id = "methodId" /> */}
        <div className="form-control-feedback"></div>
      </div>
      <div className = "form-group">
        <label htmlFor = "eventPrice">Unit Price</label>
        <input type = "text" className = "form-control" id = "eventPrice" />
        <div className="form-control-feedback"></div>
      </div>
      <div className = "form-group">
        <label htmlFor = "eventVolume">Volume</label>
        <input type = "text" className = "form-control" id = "eventVolume" />
        <div className="form-control-feedback"></div>
      </div>
      <button className = "btn btn-primary" type = "submit">
        Add New Event
      </button>

    </form>
  }
}

export default connect(mapStateToProp,dispatcher)(ManualNewEvent)