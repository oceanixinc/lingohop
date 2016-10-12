import React from 'react'
import {Link} from 'react-router'

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

export default class ContentPortalUploadFinishPage extends React.Component {
    render() {
        return (
            <div className="upload-finish-page">
                <div className="text-center upload-finish col-md-6 col-md-offset-3 ">
                    <div className="col-md-12">
                        <p id="main-text">Your lego has been uploaded! Would you like to <b>add another lego</b>?</p>
                    </div>
                    <div className="img-holder col-md-12">
                        <img src="assets/img/9.gif"/>
                    </div>
                    <div className="buttons col-md-12">
                        <Link to="/contentportal">
                            <FlatButton label="No Thanks"/>
                        </Link>
                        <Link to="/contentportal/upload">
                            <RaisedButton label="ADD ANOTHER" className="upload-btn" primary={true}/>
                        </Link>
                    </div>

                </div>
            </div>
        )
    }

    componentDidMount() {
        document.body.style.backgroundColor = "rgb(244,244,244)" // Set the style
    }

}
