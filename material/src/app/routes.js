import { Router, Route, Link } from 'react-router'




var DefaultRouter = Router.DefaultRoute;
var Route = Router.Route;
var Link = Router.Link;


var routes = (
	<Route path="/" component={App}>
      <Route path="about" component={About}/>
      <Route path="users" component={Users}>
        <Route path="/user/:userId" component={User}/>
      </Route>
      <Route path="*" component={NoMatch}/>
    </Route>
    )