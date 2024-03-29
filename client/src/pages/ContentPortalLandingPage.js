import React from 'react'
import {Link} from 'react-router'

export default class ContentPortalLandingPage extends React.Component {
    render() {
        return (
            <div className="landing-page">

                <div className="text-center landing col-sm-8 col-sm-offset-2">
                    <p className="welcome-text">Do you want to <b>upload</b>, <b>build</b> or <b>edit</b>?</p>
                    <div className="col-sm-12 mega-holder">
                      <Link to="/contentportal/upload">
                        <div className="col-sm-4">
                            <div className="img-holder">
                                <img src='assets/img/upload.png'/>
                                <div className="after">
                                        <p>UPLOAD</p>
                                </div>
                            </div>
                            <p className="desc-text">I want to upload lesson content.</p>
                        </div>
                      </Link>

                      <Link to="/contentportal/build">
                        <div className="col-sm-4">
                            <div className="img-holder">
                                <img src='assets/img/build.png'/>
                                <div className="after">
                                    <p>BUILD</p>
                                </div>
                            </div>
                            <p className="desc-text">I want to build a new lesson.</p>
                        </div>
                      </Link>

                        <div className="col-sm-4">
                            <div className="img-holder">
                                <img src='assets/img/edit.png'/>
                                <div className="after">
                                    <p>EDIT</p>
                                </div>
                            </div>
                            <p className="desc-text">I want to edit an existing lesson.</p>
                        </div>

                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        document.body.style.backgroundColor = "rgb(244,244,244)" // Set the style
    }

}
