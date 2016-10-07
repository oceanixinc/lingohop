

import React from 'react';
import * as Colors from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import SvgIcon from 'material-ui/SvgIcon';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import { Link } from 'react-router'

import Login from './Login';
import CustomTheme from './CustomTheme';


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
    cursor: 'pointer',
    fontSize: '0.6em',
    verticalAlign: 'middle',

  },
   link: {
    textDecoration: 'none',
    color: 'black',

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


class Main extends React.Component {
  render() {

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <AppBar title={<Link to="/" style={titleStyles.link} ><span style={titleStyles.title}>Lingohop</span></Link>} titleStyle={titleStyles}
        iconStyleLeft = {{marginLeft:0}}
        iconElementLeft={<Link to="/" ><Avatar src="assets/img/logo.svg" style={{ width: '33', height: '33', backgroundColor: 'rgba(0, 0, 0, 0)', marginTop:8}} /> </Link>}
        >
      <div>
      <Login/>
      </div>

        </AppBar>
      </MuiThemeProvider>
    );
  }
}

export default Main;
