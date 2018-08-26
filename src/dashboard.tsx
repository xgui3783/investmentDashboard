import * as React from 'react'
import { connect } from 'react-redux'
import { Line } from 'react-chartjs-2'

import { InvestmentOption,State as MasterState } from './store'
import { ChartData, ChartOptions } from 'chart.js';

interface DashboardProp{
  allInvestmentOptions : InvestmentOption[]
}

interface DashboardState{
  lowerDate : Date
  upperDate : Date
  selectedInvestments : InvestmentOption[]
}

const chartOptions :ChartOptions = {
  scales : {
    xAxes : [{
      type : 'time',
      time : {
        displayFormats : {
          month : 'MMM YYYY'
        }
      }
    }]
  }
}

const mapMasterStateToProp = (state:MasterState):DashboardProp =>{
  
  return ({allInvestmentOptions : state.investments})
}

class Dashboard extends React.Component<DashboardProp,DashboardState>{
  constructor(props:DashboardProp){
    super(props)
    
    this.state = {
      lowerDate : new Date(0),
      upperDate : new Date(),
      selectedInvestments : props.allInvestmentOptions
    }
  }

  render(){
    console.log(this.props.allInvestmentOptions)
    const datasets = this.props.allInvestmentOptions.map(investment=>({
      label : investment.name ,
      data : investment.events.map(ev=>({
        t : ev.date,
        y : (ev.price * ev.volume)/(investment.events[0].price * investment.events[0].volume)/(ev.date.valueOf() - investment.events[0].date.valueOf()) * 31536000000
        // y : ev.price * ev.volume //(() - (investment.events[0].price * investment.events[0].volume))/((investment.events[0].price * investment.events[0].volume)*(ev.date.valueOf() - investment.events[0].date.valueOf())) * 31536000000
      })),
      backgroundColor:'transparent'
    }))
    const chartDataset : ChartData = {
      datasets : datasets
    }
    return <div>
      <Line
        data = {chartDataset}
        options = {chartOptions}
      />
      </div>
  }
}

export default connect(mapMasterStateToProp)(Dashboard)