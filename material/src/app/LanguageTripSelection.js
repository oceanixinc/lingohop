 /**
  * LanguageTripSelection.js
  * In the home page, we have a div to render language - trip selection
  */


import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import * as Colors from 'material-ui/styles/colors';
import SvgIcon from 'material-ui/SvgIcon';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';

import SubmitIcon from './SubmitButton'
import { browserHistory} from 'react-router'


var intermediate = require('./intermediate')

const ArrowIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M9 3L7.94 4.06l4.19 4.19H3v1.5h9.13l-4.19 4.19L9 15l6-6z" />
  </SvgIcon>
);


const language_items = [
  <MenuItem key={1} value={1} primaryText="Spanish - Spain" />,
  <MenuItem key={2} value={2} primaryText="German - Germany" />,
  
];

const trip_items = [
  <MenuItem key={1} value={1} primaryText="Conference" />,
  <MenuItem key={2} value={2} primaryText="Vacation" />,
];

const hoverColor = 'green';
export default class SelectLangaugeCountry extends React.Component {

  constructor(props) {
    super(props);
    this.submitData = this.submitData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.isDisabled = this.isDisabled.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.state = {
      email: null,
      language: null,
      trip: null,
      invalidData: true,
      email_error_text: null,
    };
  }

  submitData(e) {
    e.preventDefault();
  console.log(this.state) ;
  var int =  new intermediate('sijan', 'raj');
  
  console.log(int.return1());
  
  browserHistory.push('/signup');
  // this.context.router.transitionTo('/signup');

  };

  componentWillUpdate(nextProps, nextState) {
    nextState.invalidData = !(nextState.email && nextState.language && nextState.trip);
  };

  handleChange(name, event, index, value) { 
     var change = {};
    change[name] = value;
    console.log(change);
      this.setState(change);

    };

     validateEmail(value) {
    // regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(value);
  };


    isDisabled() {

        if (this.state.email === "") {
            this.setState({
                email_error_text: null
            });
        } else {
            if (this.validateEmail(this.state.email)) {
                // emailIsValid = true
                this.setState({
                    email_error_text: null
                });
            } else {
                this.setState({
                    email_error_text: "Sorry, this is not a valid email"
                });
            }
        }

       
    };



  render() {
    return (
      <div style={{ marginLeft : 100, marginRight: 100, marginBottom: 20, display: 'inline-block'}}>

        <TextField
        value={this.state.email}
        style={{width:320, verticalAlign: 'bottom'}}
        onChange={e => this.setState({ email: e.target.value })}
      
       floatingLabelText="Email"
       errorText={this.state.email_error_text}
        onBlur={this.isDisabled}
      
    />
    <div style={{display: 'inline'}}>

        <SelectField style={{marginLeft: 50, width:320, verticalAlign: 'bottom'}}
          value={this.state.language}
          onChange={this.handleChange.bind(this, 'language')}
          floatingLabelText="Language-Country"
        >
          {language_items}
        </SelectField >
        </div>
        <div style={{display: 'inline'}}>
         <SelectField style={{ marginLeft : 50, width:320, verticalAlign: 'bottom'}}
          value={this.state.trip}
          onChange={this.handleChange.bind(this, 'trip')}
          floatingLabelText="Trip Type"
        >
          {trip_items}
        </SelectField>
          </div>
          <div style={{display: 'inline'}}>

        <IconButton iconStyle={{iconHoverColor: '#55ff55'}}
     tooltip="Request" key='request-button' 
     onClick={this.submitData}
     disabled={this.state.invalidData}
     >
    <ArrowIcon color={Colors.cyan500} style={{marginTop: 30}} hoverColor={hoverColor}  />
    </IconButton>
    </div>

        </div>
    
    );
  }
}

