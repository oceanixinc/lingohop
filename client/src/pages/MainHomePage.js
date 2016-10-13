import React from 'react'
import ExperiencePanel from '../components/ExperiencePanel';
import BottomCardsPanelComponent from '../components/BottomCardsPanelComponent';
import DiscoverPanel from '../components/DiscoverPanel';

export default class MainHomePage extends React.Component {
    render() {
        return (
            <div className="main-home-page">
                <DiscoverPanel/>
                <div className="text-center col-md-12">
                    <h4>An experience just for you</h4>
                    <p>Learn a language based on your unique needs</p>
                </div>
                <ExperiencePanel/>
                <div className="text-center col-md-12">
                    <h4>Immerse yourself in the country</h4>
                    <p>Experience lessons built around daily life abroad</p>
                </div>
                <BottomCardsPanelComponent/>
                <div className="footer">
                    <div className="col-md-8 col-md-offset-2">
                        <div className="col-md-2">
                            <h4>Company</h4>
                            <ul className="list-unstyled">
                                <li>About</li>
                                <li>Press</li>
                                <li>Terms & Conditions</li>
                            </ul>
                        </div>
                        <div className="col-md-2">
                            <h4>Product</h4>
                            <ul className="list-unstyled">
                                <li>FAQs</li>
                                <li>Reviews</li>
                                <li>Contact Us</li>
                            </ul>
                        </div>
                        <div className="col-md-2 col-md-offset-6">
                            <img className="col-md-8" src="assets/img/logo/logo.svg"/>
                        </div>
                        <hr className="col-md-12"/>
                        <div className="text-center col-md-12">
                            Join us on
                        </div>
                        <div className="text-center col-md-12 social-icons lightblue">
                            <i className="fa fa-facebook fa-3x"></i>
                            <i className="fa fa-twitter fa-3x"></i>
                            <i className="fa fa-youtube fa-3x"></i>
                            <i className="fa fa-linkedin fa-3x"></i>

                        </div>
                        <div className="text-center col-md-12">
                            Oceanix Inc 2016
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
