import React from 'react'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class ContentPortalLoginPage extends React.Component {
    render() {
        return (
            <div className="content-portal">
                <div className="text-center welcome col-md-6 col-md-offset-3">
                    <img src="assets/img/logo/logo.svg"/>
                    <p className="welcome-text">Welcome to the Lingohop <b>Content Portal</b></p>
                    <div className="col-md-8 col-md-offset-2">
                        <TextField hintText="Username" className="text-field" style={{
                            width: '100%',
                            marginTop: '40px'
                        }}/>
                    </div>
                    <div className="col-md-8 col-md-offset-2">
                        <TextField hintText="Password" className="text-field" style={{
                            width: '100%',
                            marginTop: '23px'
                        }}/>
                    </div>
                    <div className="col-md-12">
                        <RaisedButton label="SIGN IN" className="signin-btn" primary={true}/>
                    </div>
                </div>
                <div className="footer text-center col-xs-12">
                    <p>© Oceanix Inc</p>
                </div>
            </div>
        )
    }

    componentDidMount() {
        document.body.style.backgroundColor = "rgb(244,244,244)" // Set the style
    }
}
