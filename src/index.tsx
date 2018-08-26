import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Tab, Tabs } from 'react-bootstrap'

import ParentContainer from './parentContainer'
import { store } from './store'

const container = document.getElementById('testContainer')

ReactDOM.render(
  <Provider store={store}>
    <ParentContainer />
  </Provider>,
  container
)