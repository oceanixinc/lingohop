import React from 'react'
import jQuery from 'jquery'

//Material UI
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

//Routing
import {hashHistory} from 'react-router'

export default class ContentPortalLoginPage extends React.Component {

    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        };
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.login = this.login.bind(this);

    }

    render() {
        return (
            <div className="content-portal">
                <div className="text-center welcome col-md-6 col-md-offset-3">
                    <img src="assets/img/logo/logo.svg"/>
                    <p className="welcome-text">Welcome to the Lingohop
                        <b>Content Portal</b>
                    </p>
                    <div className="col-md-8 col-md-offset-2">
                        <TextField hintText="Username" className="text-field" value={this.state.username} onChange={this.handleUsernameChange} style={{
                            width: '100%',
                            marginTop: '40px'
                        }}/>
                    </div>
                    <div className="col-md-8 col-md-offset-2">
                        <TextField hintText="Password" className="text-field" type="password" value={this.state.password} onChange={this.handlePasswordChange} style={{
                            width: '100%',
                            marginTop: '23px'
                        }}/>
                    </div>
                    <div className="col-md-12">
                        <RaisedButton label="SIGN IN" className="signin-btn" primary={true} onClick={this.login}/>
                    </div>
                </div>
                <div className="footer text-center col-xs-12">
                    <p>© Oceanix Inc</p>
                </div>
            </div>
        )
    }
    login() {
        this.setState({username: '', password: ''});
        hashHistory.push('/contentportal')
    }
    componentDidMount() {
        document.body.style.backgroundColor = "rgb(244,244,244)" // Set the style
    }

    handleUsernameChange(event) {
        this.setState({
            username: event.target.value.substr(0, 140)
        });
    }

    handlePasswordChange(event) {
        this.setState({
            password: event.target.value.substr(0, 140)
        });
    }
}
