import React from 'react'
import {
    Navbar,
    Nav,
    NavItem,
    NavDropdown,
    MenuItem,
    FormGroup,
    InputGroup,
    FormControl
} from 'react-bootstrap'
import TextField from 'material-ui/TextField';

export default class MainPageHeader extends React.Component {
    render() {
        return (
            <Navbar inverse fluid id="main-navbar">
                <Navbar.Header>
                    <Navbar.Brand>
                        <img className="pull-left" src="assets/img/logo/logo.svg"/>
                        <p className="pull-left">Lingohop</p>
                    </Navbar.Brand>
                    <Navbar.Toggle/>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav id="right-nav" pullRight>
                        <TextField className="pull-left" hintText="Username"/>
                        <TextField className="pull-left" hintText="Password"/>
                        <i className="material-icons pull-left darkblue">arrow_forward</i>

                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
