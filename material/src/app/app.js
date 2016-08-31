import React from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import Main from './Main'; // Our custom react component
// import Main from './TestComponentTheme'; // Our custom react component
import Main from './Theme'; // Our custom react component
import AppBarExampleIconMenu from './header'; // Our custom react component
import ToolbarExamplesSimple from './toolbar'; // Our custom react component
import CardExampleWithAvatar from './Frontheader'; // Our custom react component
import DiscoverPanel from './DiscoverPanel'; // Our custom react component
import ExperiencePanel from './ExperiencePanel'; // Our custom react component
import FooterPanel from './FooterPanel'; // Our custom react component

import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';


// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Render the main app react component into the app div.
// For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render

const AppHeader = () => (
  <MuiThemeProvider>
    <CardExampleWithAvatar />
  </MuiThemeProvider>
);


const ExperienceLabel = () => (
 <MuiThemeProvider>
  <div style={{textAlign: 'center', marginTop: 30}}>
   
      <CardTitle 
     
      title="An experience just for you" subtitle="Learn a language based on your unique needs." />
    
  </div>
  </MuiThemeProvider>
);


const AppDiscover = () => (
  <MuiThemeProvider>
    <DiscoverPanel />
  </MuiThemeProvider>
);


const SelectTest = () => (
  <MuiThemeProvider>
    <TestSelect />
  </MuiThemeProvider>
);



render(<Main />, document.getElementById('app'));
render(<AppHeader />, document.getElementById('header'));
render(<AppDiscover />, document.getElementById('discover'));
render(<ExperienceLabel />, document.getElementById('experienceLabel'));
render(<ExperiencePanel />, document.getElementById('experiencePanel'));
render(<FooterPanel />, document.getElementById('footer'));
// render(<SelectTest />, document.getElementById('footer'));

// const App = () => (
//   <MuiThemeProvider>
//     <AppBarExampleIconMenu />
//   </MuiThemeProvider>
// );

// const App = () => (
//   <MuiThemeProvider>
//     < ToolbarExamplesSimple />
//   </MuiThemeProvider>
// );


// render(
//   <App />,
//   document.getElementById('header')
// );
