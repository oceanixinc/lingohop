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
      marginRight: 20

    }
};


const hoverColor = 'green';

class Login extends React.Component {

 constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.loadUserData = this.loadUserData.bind(this);
    this.logoutHandler = this.logoutHandler.bind(this);
    this.state = {
      username: '',
      password: '',
      userlogin: false,
      user:[],
    };
  };

  componentDidMount() {
    console.log('mount');
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
    };


    componentWillReceiveProps(nextProps) {
      console.log('props');
  // this.setState({
  //   likesIncreasing: nextProps.likeCount > this.props.likeCount
  // });
    };


    loadUserData() {
      console.log('userdaat');
      console.log(localStorage.token);
         // $.ajax({
         //    url: "/rest-auth/user/",
         //    beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Token '+localStorage.token);},
         //    type: "GET",
         //    success: function(data) {
         //      this.setState({user: res});
         //    }
         //  });
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




submitForm(e) {
  e.preventDefault();
   console.log(this.state.username.trim());
   console.log(this.state.password.trim());

   var username = this.state.username.trim();
   var pass = this.state.password.trim();

    auth.login(username, pass, (loggedIn) => {
      console.log(loggedIn);
        if (loggedIn) {
            this.setState({
          userlogin: loggedIn
        });
        this.loadUserData()
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
        <UserSettingPanel />
        </div>

      );
    }
    return (
   

     <form className="loginForm" onSubmit={this.submitForm}>
    <TextField
      value={this.state.username}
      onChange={e => this.setState({ username: e.target.value })}
      hintText = "username" style={textfieldStyles.margin}
      
    />
    <TextField
      value={this.state.password}
      onChange={e => this.setState({ password: e.target.value })}
      hintText = "password" type="password"
     
    />
         <IconButton iconStyle={{iconHoverColor: '#55ff55'}}
     tooltip="Sing In" key='signin-button' 
     // onTouchTap={this.handleTouchTap}
     onClick={this.submitForm}
     >
    <ArrowIcon color={Colors.cyan500} style={{marginTop: 30}} hoverColor={hoverColor} />
    </IconButton>
  </form>
    );
    
  }
}

export default Login;


// onClick={this.onFormSubmit}