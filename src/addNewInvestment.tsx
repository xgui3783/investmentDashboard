import * as React from 'react'
import { connect } from 'react-redux'

import { ADD_NEW_INVESTMENT, InvestmentOption } from './store'

const mapPropToDispatcher = (dispatch:any):AddNewInvestmentDispatcherInterface =>{
  return({
    addNewInvestment : (i:Partial<InvestmentOption>)=>{
      dispatch({
        type : ADD_NEW_INVESTMENT,
        payload : i
      })
    }
  })
}

interface AddNewInvestmentState{
  value : string
}

interface AddNewInvestmentDispatcherInterface{
  addNewInvestment : Function
}

class AddNewInvestment extends React.Component<AddNewInvestmentDispatcherInterface,AddNewInvestmentState>{

  constructor(prop:AddNewInvestmentDispatcherInterface){
    super(prop)
    this.state = {
      value : ``
    }
  }

  handleSubmit = (event:any) =>{
    event.preventDefault()

    const form = event.target as HTMLFormElement
    const input = form.querySelector('#addnew_inv') as HTMLInputElement
    if(input.value==``){
      console.log('needs a valu')
    }else{
      this.props.addNewInvestment({name:input.value})
    }

    input.value = ``
  }

  render(){
    return <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor = "addnew_inv">Name</label>
          <input autoComplete = "off" type = "text" className = "form-control" id = "addnew_inv" />
          <small className="text-muted">Delineated by commas. First entry will be treated as the title. Others will be used as tags for search.</small>
          <div className="form-control-feedback"></div>
        </div>
        <button type="submit" className="btn btn-primary" >
          Add
        </button>
      </form>
  }
}

export default connect(null,mapPropToDispatcher)(AddNewInvestment)
