

import Main from './Theme';
import FooterPanel from './FooterPanel';


import React from 'react';
import * as Colors from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';
import SvgIcon from 'material-ui/SvgIcon';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';

import FrontVideoComponent from './Frontheader';
import DiscoverPanel from './DiscoverPanel';
import ExperiencePanel from './ExperiencePanel';



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


  render() {

    return (

        <div>
          <Main />
          { this.props.children }
          <FooterPanel />
        </div>



    );
  }
}

export default App;
