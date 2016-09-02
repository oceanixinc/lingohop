 /**
  * App.js
  * This file is responsible for bundling our all jsx / js files
  * The content is bundled up to build/app.js
  */




import React from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import Main from './Main'; // Our custom react component
// import Main from './TestComponentTheme'; // Our custom react component
import Main from './Theme'; // Our custom react component
import AppBarExampleIconMenu from './header'; // Our custom react component
// import ToolbarExamplesSimple from './toolbar'; // Our custom react component
import FrontVideoComponent from './Frontheader'; // Our custom react component
import DiscoverPanel from './DiscoverPanel'; // Our custom react component
import ExperiencePanel from './ExperiencePanel'; // Our custom react component
import FooterPanel from './FooterPanel'; // Our custom react component
import App from './Main'; // Our custom react component
import Home from './Home'; // Our custom react component
import SignUp from './SignUp'; // Our custom react component
import NotFound from './NotFound'; // Our custom react component

import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import { hashHistory, browserHistory, Router, Route,  IndexRoute, IndexLink, Link } from 'react-router'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Render the main app react component into the app div.
// For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render

// const AppHeader = () => (
//   <MuiThemeProvider>
//     <CardExampleWithAvatar />
//   </MuiThemeProvider>
// );


const ExperienceLabel = () => (
 <MuiThemeProvider>
  <div style={{textAlign: 'center', marginTop: 30}}>
   
      <CardTitle 
     
      title="An experience just for you" subtitle="Learn a language based on your unique needs." />
    
  </div>
  </MuiThemeProvider>
);


// const AppDiscover = () => (
//   <MuiThemeProvider>
//     <DiscoverPanel />
//   </MuiThemeProvider>
// );




// render(<SignUp />, document.getElementById('app'));
// render(<FrontVideoComponent />, document.getElementById('header'));
// render(<DiscoverPanel />, document.getElementById('discover'));
// render(<ExperienceLabel />, document.getElementById('experienceLabel'));
// render(<ExperiencePanel />, document.getElementById('experiencePanel'));
// render(<FooterPanel />, document.getElementById('footer'));

render((
   <Router history={browserHistory}>
    <Route path="/" component={App}>
     <IndexRoute component={Home}/>
      <Route path="signup" component={SignUp} />
      <Route path='*' component={NotFound} />
    </Route>

  </Router>), document.getElementById('app'));