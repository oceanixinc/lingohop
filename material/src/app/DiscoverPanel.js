 /**
  * DiscoverPanel.js
  * In the home page, we have a panel
  */

import React from 'react';
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as Colors from 'material-ui/styles/colors';
import { hashHistory, browserHistory, Router, Route,  IndexRoute, IndexLink, Link } from 'react-router'

const style = {
  height: 270,
  width: 423,
  // margin: 20,
  textAlign: 'left',
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
    fontSize: 12,
    marginTop: 20,
    // fontWeight: 'bold',
  },

};

const DiscoverPanel = () => (
   // <MuiThemeProvider>
  <div style={{textAlign: 'center', marginTop: 30}}>
    <Paper style={style} zDepth={1} >
      <img src='static/photos/paris.png' style={{width:'100%', height:'auto'}} />
    </Paper>
    <Paper style={style} zDepth={2} > 
      <CardTitle 
      titleStyle = {mediaTitleStyles.title}
      subtitleStyle={mediaTitleStyles.subtitle} 
      title="Discover what learning a new language can do for you" subtitle="Open your trip to a new world of possibilities with lingohop" />
      <RaisedButton containerElement={<Link to="/signup" />} label="GET STARTED" backgroundColor="#00BCD4" labelColor="#ffffff" style={buttonStyle} />
    </Paper>
  </div>
  // </MuiThemeProvider>
);

export default DiscoverPanel;