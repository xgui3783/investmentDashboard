import * as React from 'react'
import {connect} from 'react-redux'
import { Modal } from 'react-bootstrap'

import ManualNewEvent from './manualNewEvent'
import AddNewInvestment from './addNewInvestment'

interface EventEntryState{
  showModal : boolean
}

class EventEntry extends React.Component<{},EventEntryState>{

  constructor(props:any){
    super(props)

    this.state = {
      showModal : false
    }

    console.log(this.state)
  }

  handleClick = () => {
    this.setState({
      showModal : true
    })
  }

  handleHide = ()=>{
    this.setState({
      showModal : false
    })
  }

  render(){
    return<div className="container-fluid">
        <div className="row">
          <div className="col-sm-10 col-md-10 col-lg-10">
            <ManualNewEvent />
          </div>
          <div className="col-sm-2 col-md-2 col-lg-2">
            <button onClick={this.handleClick} className="btn btn-success">
              Add New Investment
            </button>
          </div>
        </div>
        <Modal
          show={this.state.showModal}
          onHide={this.handleHide}>

          <Modal.Header>
            <Modal.Title>Add New Investment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddNewInvestment />
          </Modal.Body>

        </Modal>
      </div>
  }
}

export default connect(null,null)(EventEntry)