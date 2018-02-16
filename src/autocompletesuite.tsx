import * as React from 'react'
import * as Autosuggest from 'react-autosuggest'


export interface AutocompleteState{
  value : string
  actualSuggestions : AutocompleteItem[]
}

export interface AutocompleteItem{
  name : string
  desc? : string
}

export interface AutocompleteProp{
  id : string
  addnew : boolean
  fullSuggestions : AutocompleteItem[]
  nextEntryCallback : Function
  placeholder : string
}

export class AutocompleteSuite extends React.Component<AutocompleteProp , AutocompleteState>{

  constructor(props:AutocompleteProp){
    super(props)
    this.state = {
      value :'',
      actualSuggestions : []
    }
    console.log(props)
  }

  getSuggestion = (value:string,fullSuggestions:AutocompleteItem[]):AutocompleteItem[] => {
    if(value.trim()==''){
      return fullSuggestions
    }else{
      const newRegex = new RegExp(value.trim(),'gi')
      return fullSuggestions.filter(suggestion=>{
        /* for the time being. in the future, will need to test for suggestion.desc too */
        // console.log((newRegex.test(suggestion.name) || (suggestion.desc ? newRegex.test(suggestion.desc) : false)))
        return newRegex.test(suggestion.name)
      })
    }
  }

  inputOnChange = (event:any, { newValue , method } : {newValue : string, method:string} )=>{
    this.setState({
      value : newValue
    })  
  }

  inputOnKeyPress = (ev:any)=>{
    if(ev.key == 'Enter'){
      ev.stopPropagation()
      ev.preventDefault()
      this.props.nextEntryCallback()
    }
  }

  inputOnBlur = (event:any,{ highlightedSuggestion } : {highlightedSuggestion:AutocompleteItem}) =>{
    // console.log(highlightedSuggestion,this.state.actualSuggestions)
    
    // this.setState({
    //   value : highlightedSuggestion ? highlightedSuggestion.name : ''
    // })
  }

  onSuggestionsFetchRequested = ({value}:{value:string}) =>{
    this.setState({
      actualSuggestions : this.getSuggestion(value,this.props.fullSuggestions)
    })
  }

  onSuggestionsClearRequest = () =>{
    this.setState({
      actualSuggestions : []
    })
  }

  getSuggestionValue = (suggestion:AutocompleteItem):string =>suggestion.name

  renderSuggestion = (suggestion : AutocompleteItem) => (
    <span>
      {suggestion.name}
      <small>{suggestion.desc ? suggestion.desc : ''}</small>
    </span>
  )

  render(){
    const { value ,actualSuggestions }  = this.state
    const inputProp = {
      className : 'form-control',
      value,
      placeholder: this.props.placeholder,
      onChange : this.inputOnChange,
      onBlur : this.inputOnBlur,
      onKeyPress : this.inputOnKeyPress
    }
    return <Autosuggest
      id = {this.props.id}
      suggestions = {actualSuggestions}
      onSuggestionsFetchRequested = {this.onSuggestionsFetchRequested}
      onSuggestionsClearRequested = {this.onSuggestionsClearRequest}
      getSuggestionValue = {this.getSuggestionValue}
      renderSuggestion = {this.renderSuggestion}
      inputProps = {inputProp}
    />
  }
}
