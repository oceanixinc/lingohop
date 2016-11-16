import React from 'react'
import {
    Navbar,
    Nav
} from 'react-bootstrap'

export default class ContentPortalHeader extends React.Component {
    render() {
        return (
            <Navbar inverse fluid id="landing-navbar">
                <Navbar.Header>
                    <Navbar.Brand>
                        <img className="pull-left" src="assets/img/logo/1024x1024.png"/>
                        <p className="pull-left">Lingohop</p>
                    </Navbar.Brand>
                    <Navbar.Toggle/>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav id="right-nav" pullRight>
                       <i className="material-icons pull-left">home</i>
                        <img className="pull-left" src="assets/img/person1.png"/>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
