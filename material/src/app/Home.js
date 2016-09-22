import React from 'react';
import * as Colors from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';
import SvgIcon from 'material-ui/SvgIcon';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import FrontVideoComponent from './Frontheader'; // Our custom react component
import DiscoverPanel from './DiscoverPanel'; // Our custom react component
import ExperiencePanel from './ExperiencePanel'; // Our custom react component
import CustomTheme from './CustomTheme';


class ExperienceLabel extends React.Component {
  render() {
    // MuiThemeProvider takes the theme as a property and passed it down the hierarchy
    // using React's context feature.
    return (
     <div style={{textAlign: 'center', marginTop: 30}}>
   
      <CardTitle 
     
      title="An experience just for you" subtitle="Learn a language based on your unique needs." />
    
  </div>
    );
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
      marginRight: 20

    }
};


class Home extends React.Component {
  render() {
   
    return (
      <MuiThemeProvider muiTheme={CustomTheme}>
      <div>
      <FrontVideoComponent />
      <DiscoverPanel />
      <ExperienceLabel />
      <ExperiencePanel />
      </div>
      </MuiThemeProvider>
    );
  }
}

export default Home;




