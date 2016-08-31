import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import * as Colors from 'material-ui/styles/colors';
import SvgIcon from 'material-ui/SvgIcon';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';

import SubmitIcon from './SubmitButton'


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


export default class SelectLangaugeCountry extends React.Component {

  constructor(props) {
    super(props);
    this.submitData = this.submitData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      language: null,
      trip: null
    };
  }

  submitData(e) {
    e.preventDefault();
  console.log(this.state) ;

  };

  handleChange(name, event, index, value) { 
     var change = {};
    change[name] = value;
    console.log(change);
      this.setState(change);

    };

  render() {
    return (
      <div style={{ marginLeft : 100, marginRight: 100, marginTop:-20}}>

        <TextField
        style={{width:320, height:20}}
      
      hintText = "Email" 
      
    />

        <SelectField style={{marginLeft: 50, width:320}}
          value={this.state.language}
          onChange={this.handleChange.bind(this, 'language')}
          floatingLabelText="Language-Country"
        >
          {language_items}
        </SelectField >
         <SelectField style={{ marginLeft : 50, width:320}}
          value={this.state.trip}
          onChange={this.handleChange.bind(this, 'trip')}
          floatingLabelText="Trip Type"
        >
          {trip_items}
        </SelectField>


        <IconButton iconStyle={{iconHoverColor: '#55ff55'}}
     tooltip="Request" key='request-button' 
     onClick={this.submitData}
     >
    <ArrowIcon color={Colors.cyan500} style={{marginTop: 30}} />
    </IconButton>

        </div>
    
    );
  }
}

