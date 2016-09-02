 /**
  * Theme.js
  * In the home page, we have to render the page Appbar and integrate login component
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

import Login from './Login';

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


class Main extends React.Component {
  render() {
    // MuiThemeProvider takes the theme as a property and passed it down the hierarchy
    // using React's context feature.
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <AppBar title={<span style={titleStyles.title}>Lingohop</span>} titleStyle={titleStyles}
        iconStyleLeft = {{marginLeft:0}}
        iconElementLeft={<Avatar src="static/photos/logo.svg" style={{ width: '40', height: '40', backgroundColor: 'rgba(0, 0, 0, 0)', marginTop:8}} />}
        >
      
      <Login/>
    
        </AppBar>
      </MuiThemeProvider>
    );
  }
}

export default Main;



// class Main extends React.Component {
//   render() {
//     // MuiThemeProvider takes the theme as a property and passed it down the hierarchy
//     // using React's context feature.
//     return (
//       <MuiThemeProvider muiTheme={muiTheme}>
//         <AppBar title={<span style={titleStyles.title}>Lingohop</span>} titleStyle={titleStyles}

//         iconElementLeft={<Avatar src="images/uxceo-128.jpg" style={{ width: '40', height: '40'}} />}
//         >
//        <div>
//    < TextField hintText = "username" style={textfieldStyles.margin} />
//     < TextField hintText = "password" type="password"  / >
    

//     </div>
//     <div>
//      <IconButton tooltip="Sing In">
//     <ArrowIcon color={Colors.cyan500} style={{marginTop: 20}} />
//     </IconButton>
//     </div>
    
//         </AppBar>
//       </MuiThemeProvider>
//     );
//   }
// }

// export default Main;
