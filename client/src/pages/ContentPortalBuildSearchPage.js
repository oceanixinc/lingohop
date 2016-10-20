import React from 'react'
import {Link, hashHistory} from 'react-router'
import jQuery from 'jquery';

import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {Modal} from 'react-bootstrap'

export default class ContentPortalBuildSearchPage extends React.Component {

    constructor() {
        super();

        this.state = {
            showModal: false
        };

        this.handleValueChange = this.handleValueChange.bind(this);
        this._openModal = this._openModal.bind(this);
        this._closeModal = this._closeModal.bind(this);

    }

    render() {
        return (
            <div className="build-search-page">
                <div className="text-center build-search col-md-6 col-md-offset-1">
                    <Link to="/contentportal/build">
                        <i className="material-icons pull-left">arrow_back</i>
                    </Link>
                    <div className="col-md-12">
                        <p id="main-text">Hello,
                            <b>John</b>
                        </p>
                        <p id="desc-text">Add in some content to finish your lesson.</p>
                    </div>
                    <div className="big-text text-left col-md-8 col-md-offset-2">
                        Are there any legos to be taught before the question?
                        <TextField hintText="Search..." style={{
                            width: '100%'
                        }}></TextField>
                    </div>
                    <div className="big-text text-left col-md-8 col-md-offset-2">
                        What is the first question?
                        <TextField hintText="Search..." style={{
                            width: '100%'
                        }}></TextField>
                    </div>
                    <div className="big-text text-left col-md-8 col-md-offset-2">
                        What is the first answer?
                        <TextField hintText="Search..." style={{
                            width: '100%'
                        }}></TextField>
                    </div>
                    <div className="big-text text-left col-md-8 col-md-offset-2">
                        Are there any legos to be taught before the answer?
                        <TextField hintText="Search..." style={{
                            width: '100%'
                        }}></TextField>
                    </div>
                    <div className="col-md-12">
                        <RaisedButton label="BUILD" className="upload-btn active-btn" />
                    </div>
                </div>
                <div className="text-center build-search col-md-3 col-md-offset-1 build-search-right">
                    <i>Search for legos to view options</i>

                </div>
                <Modal show={this.state.showModal} onHide={this._closeModal}>
                    <Modal.Header closeButton>
                        <h4>Add a new
                            <b>category</b>
                        </h4>
                    </Modal.Header>
                    <Modal.Body className="col-md-12">
                        <div className="col-md-6 text-center">
                            <div id="add-photo">
                                + Add Category Photo
                            </div>
                            <i>Max size of 2 mb</i>
                        </div>
                        <div className="col-md-6">
                            <SelectField hintText="Position" style={{
                                width: '100%'
                            }}></SelectField>
                            <TextField hintText="Name" style={{
                                width: '100%'
                            }}></TextField>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <RaisedButton label="BUILD" primary={true}/>
                    </Modal.Footer>

                </Modal>
            </div>
        )
    }

    componentDidMount() {
        document.body.style.backgroundColor = "rgb(244,244,244)" // Set the style
    }

    handleValueChange(name, event, index, value) {
        var change = {};
        change[name] = value;
        this.setState(change);

    };

    _openModal() {
        this.setState({showModal: true});
    };

    _closeModal() {
        this.setState({showModal: false});
    };

}
