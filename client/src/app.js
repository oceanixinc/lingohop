import React from 'react';
import ReactDOM from 'react-dom';
import jQuery from 'jquery';
import {Provider} from 'react-redux'
import {createStore} from 'redux';

//Redux
import contentportalreducer from './redux/reducers/contentportal'
let store = createStore(contentportalreducer);

//Material UI
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Main from './Theme';

injectTapEventPlugin();

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

//Main
import MainPageLayout from './layout/MainPageLayout'

//Pages-----------------------------------------------------------------------------------------

//Content Portal
import ContentPortalUploadPage from './pages/ContentPortalUploadPage'
import ContentPortalUploadFinishPage from './pages/ContentPortalUploadFinishPage'
import ContentPortalLoginPage from './pages/ContentPortalLoginPage'
import ContentPortalLandingPage from './pages/ContentPortalLandingPage'
import ContentPortalBuildPage from './pages/ContentPortalBuildPage'
import ContentPortalBuildSearchPage from './pages/ContentPortalBuildSearchPage'

//Main
import MainHomePage from './pages/MainHomePage'

const app = (
  <Provider store={store}>
    <MuiThemeProvider>
        <Router history={hashHistory}>
            <Redirect from="/" to="/login"/>
            <Route path="main" component={App}>
                <IndexRoute component={Home}/>
                <Route path="signup" component={SignUp}/>
                <Route path='*' component={NotFound}/>
            </Route>
            <Route path="login" component={ContentPortalLoginPage}/>
            <Route path="contentportal" component={ContentPortalLayout}>
                <IndexRoute component={ContentPortalLandingPage}/>
                <Route path="upload" component={ContentPortalUploadPage}/>
                <Route path="uploadfinish" component={ContentPortalUploadFinishPage}/>
                  <Route path="build" component={ContentPortalBuildPage}/>
                    <Route path="buildsearch" component={ContentPortalBuildSearchPage}/>


            </Route>
            <Route path="mainpage" component={MainPageLayout}>
              <IndexRoute component={MainHomePage}/>
            </Route>
        </Router>
    </MuiThemeProvider>
  </Provider>
)

jQuery(function() {
    ReactDOM.render(app, document.getElementById('app'), function() {
        console.timeEnd('react-app');
    });
})
