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
import CustomTheme from './CustomTheme';
import Avatar from 'material-ui/Avatar';

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
     textAlign: 'left',
     // top: 30,



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


const formError = {

  error:{

    position: 'relative',
    
    fontSize: 12,
    
    color: 'rgb(244, 67, 54)',
    transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',

  }
}
class SignUp extends React.Component {

  // mixins: [Router.Navigation],

  constructor(props) {
    super(props);
    this.openFileDialog = this.openFileDialog.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLanguageChange = this.handleLanguageChange.bind(this);
    this.signupForm = this.signupForm.bind(this);
    this.isDisabled = this.isDisabled.bind(this);
    this.validateEmail = this.validateEmail.bind(this);

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
      first_name_error_text: null,
      last_name_error_text: null,
      email_error_text: null,
      password_error_text: null,
      confirm_password_error_text: null,
      language_country_error_text: null,
      trip_error_text: null,
      disabled: true,
      form_error: false,
      invalidData: true,
      message: null,
      form_error: false,
    };
    
  };

  componentWillReceiveProps(newProps) {
    console.log('receive props');
    console.log(newProps);
  }

  componentWillUpdate(nextProps, nextState) {
    var check_length = ( nextState.password.length >=6 && nextState.confirm_password.length >=6);
    var check_equal =  (nextState.password == nextState.confirm_password);
    var total_check = (check_length && check_equal)
    nextState.invalidData = !( nextState.profile_picture && nextState.first_name && nextState.last_name &&
    this.validateEmail(nextState.email) && nextState.language_country && nextState.trip && total_check);
  };

   validateEmail(value) {
    // regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(value);
  };


    isDisabled(name, event) {
      // console.log(index);

        let emailIsValid = false;
        let passwordIsValid = false;
        let firstNameIsValid = false;
        let lastNameIsValid = false;

        if (name === 'first_name') {
         if (this.state.first_name === "" || !this.state.first_name) {
            this.setState({
                // first_name_error_text: null
                first_name_error_text: "First Name is required"
            });
        }
         else {
            if (this.state.first_name.length > 0) {
                // firstNameIsValid = true;
                this.setState({
                    first_name_error_text: null
                });
            } else {
                this.setState({
                    first_name_error_text: "First Name is required"
                });
            }
        }
        }
        if (name === 'last_name') {
         if (this.state.last_name === "" || !this.state.last_name) {
            this.setState({
                // last_name_error_text: null
                last_name_error_text: "Last Name is required"
            });
        } else {
            if (this.state.last_name.length > 0) {
                // lastNameIsValid = true;
                this.setState({
                    last_name_error_text: null
                });
            } else {
                this.setState({
                    last_name_error_text: "Last Name is required"
                });
            }
        }
      }
      if (name === 'email') {

        if (this.state.email === "") {
            this.setState({
                // email_error_text: null
                email_error_text: 'Email is required'
            });
        } else {
            if (this.validateEmail(this.state.email)) {
                emailIsValid = true
                this.setState({
                    email_error_text: null
                });
            } else {
                this.setState({
                    email_error_text: "Sorry, this is not a valid email"
                });
            }
        }
      }

      if (name === 'password') {

        if (this.state.password === "" || !this.state.password) {
            this.setState({
                // password_error_text: null
                password_error_text: 'Password is required'
            });
        } else {
            if (this.state.password.length >= 6) {
                // passwordIsValid = true;
                this.setState({
                    password_error_text: null
                });
            } else {
                this.setState({
                    password_error_text: "Password needs at least 6 characters"
                });
            }
        }
      }

      if (name === 'confirm_password') {

        if (this.state.confirm_password === "" || !this.state.confirm_password) {
            this.setState({
                confirm_password_error_text: 'Password confirmation is required'
            });
        } else {
            if ( this.state.confirm_password.length >=6){
            if ( this.state.password === this.state.confirm_password) {
                // confirm_passwordIsValid = true;
                this.setState({
                    confirm_password_error_text: null
                });
            } else {
                this.setState({
                    confirm_password_error_text: "Password didn't match!"
                });
            }
            }
            else {
                this.setState({
                    confirm_password_error_text: "Password didn't match!"
                });
            }

        }
      }

      if (name === 'language_country') {

        if (this.state.language_country === "" || !this.state.language_country) {
            this.setState({
                // language_country_error_text: null
                language_country_error_text: "First Name is required"
            });
        } else {
            if (this.state.language_country.length > 0) {
                firstNameIsValid = true;
                this.setState({
                    language_country_error_text: null
                });
            } else {
                this.setState({
                    language_country_error_text: "First Name is required"
                });
            }
        }

      }

      if (name === 'trip') {

          if (this.state.trip === "" || !this.state.trip) {
            this.setState({
                // trip_error_text: null
                trip_error_text: "First Name is required"
            });
        } else {
            if (this.state.trip.length > 0) {
                // firstNameIsValid = true;
                this.setState({
                    trip_error_text: null
                });
            } else {
                this.setState({
                    trip_error_text: "Trip is required"
                });
            }
        }

      }


        if (emailIsValid && passwordIsValid) {
            this.setState({
                disabled: false
            });
        }
    }


  signupForm(e) {
  e.preventDefault();
   console.log('new staetes', this.state);

    let fd = new FormData();  
   // console.log(fp);
   fd.append( 'profile_picture', this.state.profile_picture );
   fd.append( 'password', this.state.password );
   fd.append( 'email', this.state.email );
   fd.append( 'first_name', this.state.first_name );
   fd.append( 'last_name', this.state.last_name );
   fd.append( 'language_country', [parseInt(this.state.language_country)] );
   fd.append( 'trip', [parseInt(this.state.trip)] );

    $.ajax({
            // contentType: 'application/json',
            contentType: false,
            processData: false,
            // dataType: 'json',
            type: 'POST',
            // enctype: 'multipart/form-data',
            data: fd,
            url: '/api/profiles/',
            success: function(res){
                console.log('signup');
                console.log(res);
                // window.location = "/";
                browserHistory.push('/');
              // this.actions.addUserSuccess(data.message);

            },
             error: function(xhr, status, err) {


         this.setState({
                    form_error: true,
                    message: status + ' : ' + xhr.responseText,
                });

           console.log("error",err)
        console.log("error",xhr.responseText.error)
         console.log(this.state.message);
      }.bind(this)

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
        profile_picture: file,
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
<MuiThemeProvider muiTheme={CustomTheme}>

    <div style={{textAlign: 'center', marginTop: 30}}>

    <div className="result" style={formError.error}>
    { this.state.form_error &&
        <div id="form-error">{ this.state.message }</div>
      }
      </div>

    <form className="loginForm" onSubmit={this.signupForm}>
   
    <Paper style={style} zDepth={2} > 
    <div>
        <span style={formheaderStyles.firststyle}>Finish your Account.</span><span style={formheaderStyles.secondstyle}> Start your journey.</span>

        </div>
<div style={{marginTop: 20, display: 'inline-block'}}>
     <div >
         <FloatingActionButton backgroundColor='#294860'
         label="Upload file"
      onClick={this.openFileDialog}
          >
  <SocialPerson />
   
    </FloatingActionButton>

    <input
      ref="fileUpload"
      type="file" 
      accept = "image/*"
      style={{"display" : "none"}}
      onChange={this.handleChange}/>
      </div>
     
     <div >
      <Avatar style={{backgroundColor: 'white'}} size={56} src={this.state.imagePreviewUrl} /> 
     </div>
       </div>

<div>
       <TextField
      value={this.state.first_name}
      onChange={e => this.setState({ first_name: e.target.value })}
      style={textfieldStyles.style}
      // required = {true}
      tabIndex = '1'
       floatingLabelText="First Name"
       onBlur={this.isDisabled.bind(this, 'first_name')} 
        errorText={this.state.first_name_error_text}
       errorStyle = {{float: 'left'}}
      
    />
    </div>
    <div>

      <TextField
      value={this.state.last_name}
      onChange={e => this.setState({ last_name: e.target.value })}
      style={textfieldStyles.style}
      tabIndex = '2'
       floatingLabelText="Last Name"
       onBlur={this.isDisabled.bind(this, 'last_name')} 
        errorText={this.state.last_name_error_text}
       errorStyle = {{float: 'left'}}
      
    />
    </div>

    <div>

     <TextField
      value={this.state.email}
      onChange={e => this.setState({ email: e.target.value })}
      style={textfieldStyles.style}
        errorText={this.state.email_error_text}
       floatingLabelText="Email"
       onBlur={this.isDisabled.bind(this, 'email')} 
       errorStyle = {{float: 'left'}}
       tabIndex = '3'
      
    />
    </div>
    <div>

     <SelectField 
          // iconStyle={{top:30}}
          style={textfieldStyles.selectstyle}
          // autoWidth={true}
          // floatingLabelStyle = {{}}
          floatingLabelStyle = {{top: 30}}
          value={this.state.language_country}
          onChange={this.handleLanguageChange.bind(this, 'language_country')}
          floatingLabelText="Language-Country"
           onBlur={this.isDisabled.bind(this, 'language_country')} 
            errorStyle = {{float: 'left'}}
            errorText={this.state.language_country_error_text}
           // hintText="Language-Country"
           tabIndex = '4'
        >
          {language_items}
        </SelectField >
      </div>

      <div>
         <SelectField 
         // iconStyle={{top:30}}
         style={textfieldStyles.selectstyle}
          value={this.state.trip}
          floatingLabelStyle = {{top: 30}}
          onChange={this.handleLanguageChange.bind(this, 'trip')}
          floatingLabelText="Trip Type"
          // hintText = "Trip Type"
          tabIndex = '5'
          onBlur={this.isDisabled.bind(this, 'trip')} 
            errorStyle = {{float: 'left'}}
            errorText={this.state.trip_error_text}
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
      tabIndex = '6'

       floatingLabelText="password"

        onBlur={this.isDisabled.bind(this, 'password')} 
        errorText={this.state.password_error_text}
       errorStyle = {{float: 'left'}}
      
    />

        </div>
        <div>

         <TextField
      value={this.state.confirm_password}
      onChange={e => this.setState({ confirm_password: e.target.value })}
      style={textfieldStyles.style}
      type="password"
       floatingLabelText="confirm password"
       disabled = {this.state.password.length < 6}
       tabIndex = '7'
        onBlur={this.isDisabled.bind(this, 'confirm_password')} 
        errorText={this.state.confirm_password_error_text}
       errorStyle = {{float: 'left'}}
      
       />

        </div>
       
      <div style={{marginTop: 20}}

      value={this.state.departure_date}
      onChange={e => this.setState({ departure_date: e.target.value })}

      >
     
     <RaisedButton tabIndex = {8} disabled={this.state.invalidData}  onClick={this.signupForm} label="START" labelColor="#ffffff" backgroundColor='#294860' />
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


         // <img ref="image" style={{height: 50, width: 50}} src={this.state.imagePreviewUrl} />
      // <div style = {{backgroundImage: 'url(' + this.state.imagePreviewUrl + ')'}}></div>