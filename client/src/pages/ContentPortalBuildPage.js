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

const language_items = [];

export default class ContentPortalBuildPage extends React.Component {

    constructor() {
        super();

        this.state = {
            language_country: '',
            showModal: false
        };

        this.handleValueChange = this.handleValueChange.bind(this);
        this._fetchLanguageCountry = this._fetchLanguageCountry.bind(this);
        this._openModal = this._openModal.bind(this);
        this._closeModal = this._closeModal.bind(this);

    }

    componentWillMount() {
        this._fetchLanguageCountry();
    }

    render() {
        return (
            <div className="build-page">
                <div className="text-center build col-md-6 col-md-offset-3">
                    <Link to="/contentportal">
                        <i className="material-icons pull-left">arrow_back</i>
                    </Link>
                    <div className="col-md-12">
                        <p id="main-text">Hello,
                            <b>John</b>
                        </p>
                        <p id="desc-text">Tell us a little more about the new lesson.</p>
                    </div>
                    <div className="big-text text-left col-md-8 col-md-offset-2">
                        What language is being taught?
                        <SelectField value={this.state.language_country} onChange={this.handleValueChange.bind(this, 'language_country')} hintText="Language" style={{
                            width: '100%'
                        }}>
                            {language_items}
                        </SelectField>
                    </div>
                    <div className="big-text text-left col-md-8 col-md-offset-2">
                        What track is it for?
                        <SelectField hintText="Track" style={{
                            width: '100%'
                        }}></SelectField>
                    </div>
                    <div className="big-text text-left col-md-8 col-md-offset-2">
                        Please select a category
                        <SelectField hintText="Category" style={{
                            width: '100%'
                        }}></SelectField>
                        <FlatButton label="+Add New Category" onClick={this._openModal}/>
                    </div>
                    <div className="big-text text-left col-md-8 col-md-offset-2">
                        What would you like to name the lesson?
                        <TextField hintText="Lesson Name" style={{
                            width: '100%'
                        }}></TextField>
                    </div>
                    <div className="big-text text-left col-md-8 col-md-offset-2">
                        Which part is this?
                        <RadioButtonGroup name="gender" defaultSelected="one">
                            <RadioButton value="one" label="Part 1"/>
                            <RadioButton value="two" label="Part 2"/>
                        </RadioButtonGroup>
                    </div>
                    <div className="col-md-12">
                        <RaisedButton label="NEXT" className="upload-btn active-btn"/>
                    </div>
                </div>
                <Modal show={this.state.showModal} onHide={this._closeModal}>
                    <Modal.Header closeButton>
                        <h4>Add a new <b>category</b></h4>
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

    //API Calls
    _fetchLanguageCountry() {

        jQuery.ajax({
            method: 'GET',
            dataType: "json",
            url: 'http://testing.lingohop.com/api/language-country/',
            success: (res) => {
                for (let language of res) {
                    let itemIndex = res.indexOf(language);
                    let value = language.language;
                    let key = language.id + '-' + language.language + '-' + language.country;
                    let item = (<MenuItem value={language.id} key={key} primaryText={value}/>);
                    language_items.push(item);
                }
            }
        })

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
