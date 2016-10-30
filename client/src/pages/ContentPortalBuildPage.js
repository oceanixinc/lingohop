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
const region_items = [];
const languages = [];
const countries = [];

export default class ContentPortalBuildPage extends React.Component {

    constructor() {
        super();

        this.state = {
            language_country: '',
            region:'',
            showModal: false
        };

        this.handleValueChange = this.handleValueChange.bind(this);
        this._fetchLanguageCountry = this._fetchLanguageCountry.bind(this);
        this._openModal = this._openModal.bind(this);
        this._closeModal = this._closeModal.bind(this);
        this._nextPage = this._nextPage.bind(this);

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
                        What is the region?
                        <SelectField value={this.state.region} onChange={this.handleValueChange.bind(this, 'region')} hintText="Region" style={{
                            width: '100%'
                        }}>
                            {region_items}
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
                        <RaisedButton label="NEXT" className="upload-btn active-btn" onClick={this._nextPage}/>
                    </div>
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

    //API Calls
    _fetchLanguageCountry() {

        jQuery.ajax({
            method: 'GET',
            dataType: "json",
            url: 'http://testing.lingohop.com/api/language-country/',
            success: (res) => {
                let i = 1;
                for (let language of res) {
                    let value = `${language.language} (${language.country})`;
                    let key = language.id + '-' + language.language + '-' + language.country;
                    let item = (<MenuItem value={i} key={key} primaryText={value}/>);
                    language_items.push(item);
                    i++;
                    languages.push(language.language)
                    countries.push(language.country)

                }
            }
        })

    }

    _fetchRegion() {
        let language = languages[this.state.language_country - 1]
        let country = countries[this.state.language_country - 1]
        jQuery.ajax({
            method: 'GET',
            dataType: "json",
            url: `http://testing.lingohop.com/api/assets/region/${language}-${country}/`,
            success: (res) => {
                console.log(res)
                region_items.length = 0
                let i = 1
                for (let region of res.regions) {
                    let value = region
                    let item = (<MenuItem value={i} key={i} primaryText={value}/>);
                    region_items.push(item);
                    i++;
                }
                this.forceUpdate()

            }

        })

    }

    handleValueChange(name, event, index, value) {
        var change = {};
        change[name] = value;
        this.setState(change, () => {
            if (name === 'language_country') {
                this._fetchRegion()
            }
        });

    };

    _openModal() {
        this.setState({showModal: true});
    };

    _closeModal() {
        this.setState({showModal: false});
    };

    _nextPage() {
        hashHistory.push('/contentportal/buildsearch')
    };

}
