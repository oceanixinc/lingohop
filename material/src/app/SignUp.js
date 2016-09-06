 /**
  * Theme.js
  * In the home page, we have to render the page Appbar and integrate login component
  */
import React from 'react';
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as Colors from 'material-ui/styles/colors';
import FontIcon from 'material-ui/FontIcon';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import SocialPerson from 'material-ui/svg-icons/social/person';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import { browserHistory, Router, Route,  IndexRoute, IndexLink, Link } from 'react-router'


const language_items = [
  <MenuItem key={1} value={1} primaryText="Spanish - Spain" />,
  <MenuItem key={2} value={2} primaryText="German - Germany" />,
  
];

const trip_items = [
  <MenuItem key={1} value={1} primaryText="Conference" />,
  <MenuItem key={2} value={2} primaryText="Vacation" />,
];


// This replaces the textColor value on the palette
// and then update the keys for each component that depends on it.
// More on Colors: http://www.material-ui.com/#/customization/colors

const style = {
  height:'auto',
  width: 'auto',
  'minWidth': '470px',
  padding: 22,
  // margin: 20,
  textAlign: 'center',
  display: 'inline-block',
  overflow:'hidden',
};

const buttonStyle = {
  margin: 12,
  marginTop: 60,
  marginLeft : 140,

  // backgroundColor: Colors.cyan500,
  // background: Colors.cyan500,
};

const mediaTitleStyles = {

  title:{
    fontSize: 20,
    // fontWeight: 'bold',
    lineHeight: '20px',
  },
  subtitle:{
    fontSize: 21,
    // marginTop: 20,
    // fontWeight: 'bold',
  },

};

const styleImage = {
  height: 65,
  width: 65,
  marginLeft: 200,
  textAlign: 'center',
  // display: 'inline-block',
  // display: 'table-cell',
  overflow:'hidden',
  backgroundColor: '#294860',
  // verticalAlign: 'middle',
};

const iconStyles = {
  // marginRight: 24,
  color: '#ffffff',
  verticalAlign: 'middle',
  marginTop: 17,
};

const textfieldStyles = {
    style: {
     // position: 'relative',
     // display : '',
     width: 290,
     // height: 65,

    },
    selectstyle: {
     // position: 'relative',
     // display : '',
      width: 290,
     height: 65,
     textAlign: 'left'



    },
      datestyle: {
     // position: 'relative',
     // display : '',
      width: 295,
     height: 65,
     marginLeft: 47,
     marginTop: 15,



    }
};
const formheaderStyles = {
  firststyle:{
    fontSize: "16px",
    // fontWeight: 'bold',
    color: 'rgb(126, 117, 117)',

    },
    secondstyle: {
    fontSize: "16px",  
    fontWeight: 'bold',  
    color: '#294860',


    }
};

class SignUp extends React.Component {

  // mixins: [Router.Navigation],

  constructor(props) {
    super(props);
    this.openFileDialog = this.openFileDialog.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLanguageChange = this.handleLanguageChange.bind(this);
    this.signupForm = this.signupForm.bind(this);

    this.state = {
      profile_picture: '',
      password: '',
      confirm_password: '',
      email: '',
      first_name: '',
      last_name: '',
      language_country: null,
      trip: null,
      subscription_type: null,
      departure_date: null,
    };
    
  };

  signupForm(e) {
  e.preventDefault();
   console.log('new staetes', this.state);

    $.ajax({
            contentType: 'application/json',
            dataType: 'json',
            type: 'POST',
            // enctype: 'multipart/form-data',
            url: '/api/profiles/',
            data: JSON.stringify({
                // username: username,
                profile_picture: this.state.profile_picture,
                password: this.state.password,
                email: this.state.email,
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                language_country: [parseInt(this.state.language_country)],
                trip: parseInt(this.state.trip),
                departure_date: null,
            }),
            success: function(res){
                console.log('signup');
                console.log(res);
                window.location = "/";
              // this.actions.addUserSuccess(data.message);

            },
             error: function(xhr, status, err) {
        console.log("error",err)
      }

        })


  };

   handleLanguageChange(name, event, index, value) { 
     var change = {};
    change[name] = value;
    console.log(change);
      this.setState(change);

    };


  handleChange(e){
  e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];
    console.log('file is', file);

    reader.onloadend = () => {
      this.setState({
        profile_picture: reader.result,
        imagePreviewUrl: reader.result
      });

      console.log(this.state);
    }

    reader.readAsDataURL(file)

    console.log('states are', this.state);

};
openFileDialog(){
  console.log('called');
  console.log(this.refs.fileUpload);
  // var fileUploadDom = React.findDOMNode(this.refs.fileUpload);
  // console.log(fileUploadDom);
  var file_input = this.refs.fileUpload;
  console.log('test');
  file_input.click();
};


  render() {
    
    return (
<MuiThemeProvider>

    <div style={{textAlign: 'center', marginTop: 30}}>

    <form className="loginForm" onSubmit={this.signupForm}>
   
    <Paper style={style} zDepth={2} > 
    <div>
        <span style={formheaderStyles.firststyle}>Finish your Account.</span><span style={formheaderStyles.secondstyle}> Start your journey.</span>

        </div>
<div style={{marginTop: 20}}>
     
         <FloatingActionButton backgroundColor='#294860'
         label="Upload file"
      onClick={this.openFileDialog}
          >
  <SocialPerson />
    </FloatingActionButton>

    <input
      ref="fileUpload"
      type="file" 
      style={{"display" : "none"}}
      onChange={this.handleChange}/>

      <img ref="image"  src={this.state.imagePreviewUrl} />
      </div>

<div>
       <TextField
      value={this.state.first_name}
      onChange={e => this.setState({ first_name: e.target.value })}
      style={textfieldStyles.style}

       floatingLabelText="First Name"
      
    />
    </div>
    <div>

      <TextField
      value={this.state.last_name}
      onChange={e => this.setState({ last_name: e.target.value })}
      style={textfieldStyles.style}

       floatingLabelText="Last Name"
      
    />
    </div>

    <div>

     <TextField
      value={this.state.email}
      onChange={e => this.setState({ email: e.target.value })}
      style={textfieldStyles.style}

       floatingLabelText="Email"
      
    />
    </div>
    <div>

     <SelectField 
          iconStyle={{top:30}}
          style={textfieldStyles.selectstyle}
          // autoWidth={true}
          // floatingLabelStyle = {{}}
          value={this.state.language_country}
          onChange={this.handleLanguageChange.bind(this, 'language_country')}
          // floatingLabelText="Language-Country"
           hintText="Language-Country"
        >
          {language_items}
        </SelectField >
      </div>

      <div>
         <SelectField 
         iconStyle={{top:30}}
         style={textfieldStyles.selectstyle}
          value={this.state.trip}
          onChange={this.handleLanguageChange.bind(this, 'trip')}
          // floatingLabelText="Trip Type"
          hintText = "Trip Type"
        >
          {trip_items}
        </SelectField>


     
      </div>

        <div>

         <TextField
      value={this.state.password}
      onChange={e => this.setState({ password: e.target.value })}
      style={textfieldStyles.style}
      type="password"

       floatingLabelText="password"
      
    />

        </div>
        <div>

         <TextField
      value={this.state.confirm_password}
      onChange={e => this.setState({ confirm_password: e.target.value })}
      style={textfieldStyles.style}
      type="password"
       floatingLabelText="confirm password"/>

        </div>
       
      <div style={{marginTop: 20}}

      value={this.state.departure_date}
      onChange={e => this.setState({ departure_date: e.target.value })}

      >
     
     <RaisedButton   onClick={this.signupForm} label="START" labelColor="#ffffff" backgroundColor='#294860' />
     </div>
    </Paper>

    </form>
  </div>

   </MuiThemeProvider>
      
    );
  }
}

export default SignUp;


 // <div>
        // <DatePicker textFieldStyle={{width: '100%', marginLeft:'20px'}} hintText="Landscape Dialog" mode="landscape" style={textfieldStyles.datestyle} />
        // </div>