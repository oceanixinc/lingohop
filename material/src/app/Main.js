 /**
  * Main.js
  * This file is responsible for rendering our components in order
  * We have component named App which will maintain default layout
  * And in render() we have given the other components
  */

import Main from './Theme'; // Our custom react component

import FooterPanel from './FooterPanel'; // Our custom react component



import React from 'react';
import * as Colors from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';
import SvgIcon from 'material-ui/SvgIcon';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';

import FrontVideoComponent from './Frontheader'; // Our custom react component
import DiscoverPanel from './DiscoverPanel'; // Our custom react component
import ExperiencePanel from './ExperiencePanel'; // Our custom react component



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

class App extends React.Component {

  // contextTypes: {
  //   router: React.PropTypes.object.isRequired,
  // };
  render() {
   
    return (
      // <MuiThemeProvider muiTheme={muiTheme}>
      
        <div>
          <Main />
          { this.props.children }
          <FooterPanel />
        </div>



      // </MuiThemeProvider>
    );
  }
}

export default App;




