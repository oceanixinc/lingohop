 /**
  * Login.js
  * This file is responsible handling user login login
  * The login is embed in our Appbar
  * 
  */

import React from 'react';
import * as Colors from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import SvgIcon from 'material-ui/SvgIcon';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import UserSettingPanel from './UserSettings';

var auth = require('./auth')

// This replaces the textColor value on the palette
// and then update the keys for each component that depends on it.
// More on Colors: http://www.material-ui.com/#/customization/colors
const ArrowIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M9 3L7.94 4.06l4.19 4.19H3v1.5h9.13l-4.19 4.19L9 15l6-6z" />
  </SvgIcon>
);


const muiTheme = getMuiTheme({
  fontFamily: 'Roboto, sans-serif',
  palette: {
    textColor: Colors.darkBlack,
    primary1Color: Colors.white,
    primary2Color: Colors.indigo700,
    accent1Color: Colors.redA200,
    pickerHeaderColor: Colors.darkBlack,
  },
  appBar: {
    height: 60,
  },
});

const formError = {

  error:{

    position: 'relative',
    
    fontSize: 12,
    
    color: 'rgb(244, 67, 54)',
    transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',

  }
}

const titleStyles = {
  title: {
    cursor: 'pointer'
    
  },
  color:{
    color: Colors.darkBlack
  },
  align:{

  verticalAlign:'middle'
  }
};

const textfieldStyles = {
    margin: {
      marginRight: 20,
      verticalAlign: 'bottom',

    }
};


const styles = {
  errorStyle: {
    color: Colors.orange500,
  },
  underlineStyle: {
    borderColor:Colors.cyan500,
  },
  floatingLabelStyle: {
    color: Colors.cyan500,
  },
  floatingLabelFocusStyle: {
    color: Colors.blue500,
  },
};


const hoverColor = 'green';

class Login extends React.Component {

 constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.loadUserData = this.loadUserData.bind(this);
    this.logoutHandler = this.logoutHandler.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.isDisabled = this.isDisabled.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.state = {
      username: '',
      password: '',
      userlogin: false,
      user:[],
      email_error_text: null,
      password_error_text: null,
      disabled: true,
      form_error: false,
      invalidData: true,
    };
  };

    componentDidMount() {
         if (auth.loggedIn()) {
            this.setState({
            userlogin: true
          });

          this.loadUserData()
      }
      else{
         this.setState({
            userlogin: false
          });
      }
       this.setState({
            form_error: false
          });
      };

      componentWillUnmount() {
        console.log('login unmount');
        this.setState({
            form_error: false
          });
    
  };

    componentWillUpdate(nextProps, nextState) {
    nextState.invalidData = !(nextState.username && nextState.password);
  };

    componentDidUnmount() {
   };


    componentWillReceiveProps(nextProps) {
  
    };


    loadUserData() {
     
        $.ajax({
            method: 'GET',
            url: '/rest-auth/user/',
            datatype: 'json',
            headers: {
                'Authorization': 'Token ' + localStorage.token
            },
            success: function(res) {
                this.setState({user: res});
            }.bind(this)
        })
    };

    validateEmail(value) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(value);
  };


    isDisabled() {

        let usernameIsValid = false;
        let passwordIsValid = false;

        if (this.state.username === "") {
            this.setState({
                email_error_text: null
            });
        } else {
            if (this.validateEmail(this.state.username)) {
                usernameIsValid = true
                this.setState({
                    email_error_text: null
                });
            } else {
                this.setState({
                    email_error_text: "Sorry, this is not a valid email"
                });
            }
        }

        if (this.state.password === "" || !this.state.password) {
            this.setState({
                password_error_text: null
            });
        } else {
            if (this.state.password.length >= 6) {
                passwordIsValid = true;
                this.setState({
                    password_error_text: null
                });
            } else {
                this.setState({
                    password_error_text: "Password needs at least 6 characters"
                });
            }
        }

        if (usernameIsValid && passwordIsValid) {
            this.setState({
                disabled: false
            });
        }
    }




submitForm(e) {
  e.preventDefault();

   var username = this.state.username.trim();
   var pass = this.state.password.trim();

    auth.login(username, pass, (loggedIn) => {
      console.log('loggedIn');
      console.log(loggedIn);
        if (loggedIn) {
            this.setState({
          userlogin: loggedIn
        });
        this.loadUserData()
        }
        else{
            this.setState({
          form_error: true
        });
        }
    })


  };

   logoutHandler() {
        auth.logout()
         this.setState({
          userlogin: false
        });
    };

  render() {
    if (this.state.userlogin){
      return(
        // <div>
        //   <p>
        //     Hi, You're logged in as <strong>{ this.state.user.username }</strong>
        //     <FlatButton onClick={this.logoutHandler} style={{color: Colors.cyanA700}} label="Logout" primary={true} />
        //   </p>
        // </div>
        <div>
        <UserSettingPanel handleLogout={this.handleLogout} />
        </div>

      );
    }

    return (
    <span>
      { this.state.form_error &&
        <div id="form-error" style={formError.error}>Unable to log in with provided credentials. </div>
      }
   
        <form className="loginForm" onSubmit={this.submitForm}>

    
    <TextField
      value={this.state.username}
      onChange={e => this.setState({ username: e.target.value })}
      style={textfieldStyles.margin}
      underlineFocusStyle={styles.underlineStyle}
      floatingLabelText="Email"
      // floatingLabelStyle={styles.floatingLabelStyle}
      floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
      errorText={this.state.email_error_text}
      onBlur={this.isDisabled} 
      floatingLabelStyle={{
        marginTop: -10
  }}
  errorStyle ={{marginTop: -44}}
      // required={true}
     
      
    />
    <TextField
      value={this.state.password}
      onChange={e => this.setState({ password: e.target.value })}
      type="password"
      underlineFocusStyle={styles.underlineStyle}
      floatingLabelText="Password"
      // floatingLabelStyle={styles.floatingLabelStyle}
      floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
      errorText={this.state.password_error_text}
      onBlur={this.isDisabled} 
      floatingLabelStyle={{
        marginTop: -10
  }}
  errorStyle ={{marginTop: -44}}
      // required={true}
     
    />
         <IconButton iconStyle={{iconHoverColor: '#55ff55'}}
     tooltip="Sing In" key='signin-button' 
     // onTouchTap={this.handleTouchTap}
     // disabled={!this.state.username && !this.state.password}
     disabled={this.state.invalidData}
     onClick={this.submitForm}
     >
    <ArrowIcon color={Colors.cyan500} style={{marginTop: 30}} hoverColor={hoverColor} />
    </IconButton>
  </form>
</span>
    
    );
    
  };

   handleLogout(e){
         this.setState({
          userlogin: false
        });
          auth.logout();
          this.setState({
          form_error: false
        });
        // window.location = "/";
    };
}

export default Login;


// onClick={this.onFormSubmit}