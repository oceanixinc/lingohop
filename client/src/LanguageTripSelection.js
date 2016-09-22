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


const language_items = [];

const trip_items = [];

const hoverColor = 'green';
export default class SelectLangaugeCountry extends React.Component {

  constructor(props) {
    super(props);
    this.submitData = this.submitData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.isDisabled = this.isDisabled.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.loadTripData = this.loadTripData.bind(this);
    this.loadLanguageData = this.loadLanguageData.bind(this);
    this.state = {
      email: null,
      language: null,
      trip: null,
      trip_data: [],
      language_data: [],
      invalidData: true,
      email_error_text: null,
    };
  }

  submitData(e) {
  e.preventDefault();
  console.log(this.state.language, this.state.trip);
  localStorage.setItem('front_email', JSON.stringify(this.state.email));
  localStorage.setItem('language', JSON.stringify(this.state.language));
  localStorage.setItem('trip', JSON.stringify(this.state.trip));
  browserHistory.push('/signup');
  // this.context.router.transitionTo('/signup');

  };

  componentWillUpdate(nextProps, nextState) {
    nextState.invalidData = !(nextState.email && nextState.language && nextState.trip);
  };

   componentDidMount() {
      

        this.loadTripData()
        this.loadLanguageData()
   
    };

    _createTripMenuItems() {
        let menuItems = [];
        for (let province of provinces) {
            let itemIndex = provinces.indexOf(province);
            let item = (
                <MenuItem
                    value={itemIndex}
                    key={`key-${province}`}
                    primaryText={province} />
            );
            menuItems.push(item);
        }

        return menuItems;
    }   

  loadTripData() {
     
        $.ajax({
            method: 'GET',
            url: '/api/trips/',
            datatype: 'json',
            // headers: {
            //     'Authorization': 'Token ' + localStorage.token
            // },
            success: function(res) {
                this.setState({trip_data: res});
                 for (let trip of res) {
                    let itemIndex = res.indexOf(trip);
                    let key = trip.id +'-'+trip.name
                    let item = (
                        <MenuItem
                            value={trip.id}
                            key={key}
                            primaryText={trip.name} />
                    );
                    trip_items.push(item);
                }

            }.bind(this)
        })
    };
    loadLanguageData() {
     
        $.ajax({
            method: 'GET',
            url: '/api/language-country/',
            datatype: 'json',
            // headers: {
            //     'Authorization': 'Token ' + localStorage.token
            // },
            success: function(res) {
                // this.setState({user: res});

                 for (let language of res) {
                    let itemIndex = res.indexOf(language);
                    let value = language.language + '-' + language.country;
                    let key = language.id +'-'+language.language + '-' + language.country;
                    let item = (
                        <MenuItem
                            value={language.id}
                            key={key}
                            primaryText={value} />
                    );
                    language_items.push(item);
                }
            }.bind(this)
        })
    };


  handleChange(name, event, index, value) { 
     var change = {};
    change[name] = value;
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

