import * as React from 'react'
import { connect } from 'react-redux'
import { INIT_FETCH } from './store'
import { Tabs, Tab } from 'react-bootstrap'
import EventEntry from './eventEntry'
import Dashboard from './dashboard'

interface ParentComponentPropToDispatcher{
  initFetchData : Function
}

const dispatcher = (dispatch:any) : ParentComponentPropToDispatcher =>{
  return({
    initFetchData : function(){
      dispatch({
        type : INIT_FETCH
      })
    }
  })
}

class ParentContainer extends React.Component<ParentComponentPropToDispatcher>{
  componentDidMount(){
    this.props.initFetchData()
  }

  render(){
    return <Tabs 
      animation={false}
      defaultActiveKey={1} 
      id = "mainContainer">
      
      <Tab eventKey={1} title = "Dashboard">
        <Dashboard />
      </Tab>
      <Tab eventKey={2} title = "Event Entry">
        <EventEntry />
      </Tab>
    </Tabs>
  }
}

export default connect(null,dispatcher)(ParentContainer)