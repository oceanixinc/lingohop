import React from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Main from './Theme';
import AppBarExampleIconMenu from './header';
import FrontVideoComponent from './Frontheader';
import DiscoverPanel from './DiscoverPanel';
import ExperiencePanel from './ExperiencePanel';
import FooterPanel from './FooterPanel';
import App from './Main';
import Home from './Home';
import SignUp from './SignUp';
import NotFound from './NotFound';

import Paper from 'material-ui/Paper';
import {
    Card,
    CardActions,
    CardHeader,
    CardMedia,
    CardTitle,
    CardText
} from 'material-ui/Card';

import {
    browserHistory,
    hashHistory,
    Router,
    Route,
    IndexRoute,
    IndexLink,
    Link,
    Redirect
} from 'react-router'

//Pages-----------------------------------------------------------------------------------------

//Content Portal
import ContentPortalLoginPage from './pages/ContentPortalLoginPage'

injectTapEventPlugin();

const ExperienceLabel = () => (
    <MuiThemeProvider>
        <div style={{
            textAlign: 'center',
            marginTop: 30
        }}>

            <CardTitle title="An experience just for you" subtitle="Learn a language based on your unique needs."/>

        </div>
    </MuiThemeProvider>
);

render((
    <MuiThemeProvider>
        <Router history={hashHistory}>
            <Redirect from="/" to="/main"/>
            <Route path="main" component={App}>
                <IndexRoute component={Home}/>
                <Route path="signup" component={SignUp}/>
                <Route path='*' component={NotFound}/>
            </Route>
            <Route path="contentportal" component={ContentPortalLoginPage}/>
        </Router>
    </MuiThemeProvider>

), document.getElementById('app'));
