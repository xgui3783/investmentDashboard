import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Tab, Tabs } from 'react-bootstrap'

import AddNewInvestment from './addNewInvestment'
import EventEntry from './eventEntry'

import { store } from './store'

const container = document.getElementById('testContainer')

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Tabs 
        animation={false}
        defaultActiveKey={1} 
        id = "mainContainer">
        
        <Tab eventKey={1} title = "Dash Board">
          Dash Board
        </Tab>
        <Tab eventKey={2} title = "Event Entry">
          <EventEntry />
        </Tab>
      </Tabs>
    </div>
  </Provider>,
  container
)