import React from 'react';
import {render} from 'react-dom';

//Material UI
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Main from './Theme';

//Pages
import App from './Main';
import Home from './Home';
import SignUp from './SignUp';
import NotFound from './NotFound';

//React Router
import {
    browserHistory,
    hashHistory,
    Router,
    Route,
    IndexRoute,
    Redirect
} from 'react-router'

//Layouts---------------------------------------------------------------------------------------

//Content Portal
import ContentPortalLayout from './layout/ContentPortalLayout'

//Pages-----------------------------------------------------------------------------------------

//Content Portal
import ContentPortalUploadPage from './pages/ContentPortalUploadPage'
import ContentPortalLoginPage from './pages/ContentPortalLoginPage'
import ContentPortalLandingPage from './pages/ContentPortalLandingPage'

injectTapEventPlugin();

render((
    <MuiThemeProvider>
        <Router history={hashHistory}>
            <Redirect from="/" to="/main"/>
            <Route path="main" component={App}>
                <IndexRoute component={Home}/>
                <Route path="signup" component={SignUp}/>
                <Route path='*' component={NotFound}/>
            </Route>
            <Route path="login" component={ContentPortalLoginPage}/>
            <Route path="contentportal" component={ContentPortalLayout}>
                <IndexRoute component={ContentPortalLandingPage}/>
                <Route path="upload" component={ContentPortalUploadPage}/>
            </Route>
        </Router>
    </MuiThemeProvider>

), document.getElementById('app'));
