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
const category_items = [];
const journey_items = [];
const track_items = [];
const languages = [];
const countries = [];
const regions = [];
const categories = [];
const journeys = [];
const tracks = [];

export default class ContentPortalBuildPage extends React.Component {

    constructor() {
        super();

        this.state = {
            language_country: '',
            region: '',
            category: '',
            journey: '',
            track: '',
            lesson: '',
            newJourney: '',
            newTrack: '',
            newCategory: '',
            showModal: false,
            showSecondModal: false,
            showThirdModal: false,
            categoryImgUrl: ''
        };

        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleLessonChange = this.handleLessonChange.bind(this);
        this.handleNewJourneyChange = this.handleNewJourneyChange.bind(this);
        this.handleNewTrackChange = this.handleNewTrackChange.bind(this);
        this.handleNewCategoryChange = this.handleNewCategoryChange.bind(this);

        this._handleImageUpload = this._handleImageUpload.bind(this);
        this._clickImageUpload = this._clickImageUpload.bind(this);

        this._fetchLanguageCountry = this._fetchLanguageCountry.bind(this);
        this._newTrack = this._newTrack.bind(this);
        this._newJourney = this._newJourney.bind(this);
        this._newCategory = this._newCategory.bind(this);

        this._openModal = this._openModal.bind(this);
        this._closeModal = this._closeModal.bind(this);
        this._openSecondModal = this._openSecondModal.bind(this);
        this._closeSecondModal = this._closeSecondModal.bind(this);
        this._openThirdModal = this._openThirdModal.bind(this);
        this._closeThirdModal = this._closeThirdModal.bind(this);
        this._nextPage = this._nextPage.bind(this);

    }

    componentWillMount() {
        this._fetchLanguageCountry();
        this._fetchJourney();
        this._fetchTrack();
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
                        What is the user journey?
                        <SelectField value={this.state.journey} onChange={this.handleValueChange.bind(this, 'journey')} hintText="User Journey" style={{
                            width: '100%'
                        }}>
                            {journey_items}
                        </SelectField>
                        <FlatButton label="+ Add New Journey" onClick={this._openSecondModal}/>
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
                        <SelectField value={this.state.track} onChange={this.handleValueChange.bind(this, 'track')} hintText="Track" style={{
                            width: '100%'
                        }}>
                            {track_items}
                        </SelectField>
                        <FlatButton label="+ Add New Track" onClick={this._openThirdModal}/>
                    </div>
                    <div className="big-text text-left col-md-8 col-md-offset-2">
                        Please select a category
                        <SelectField value={this.state.category} onChange={this.handleValueChange.bind(this, 'category')} hintText="Category" style={{
                            width: '100%'
                        }}>
                            {category_items}
                        </SelectField>
                        <FlatButton label="+ Add New Category" onClick={this._openModal}/>
                    </div>
                    <div className="big-text text-left col-md-8 col-md-offset-2">
                        What would you like to name the lesson?
                        <TextField value={this.state.lesson} onChange={this.handleLessonChange} hintText="Lesson Name" style={{
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
                        <h4>Add a new <b>category</b></h4>
                    </Modal.Header>
                    <Modal.Body className="col-md-12">
                        <div className="col-md-6 text-center">
                            <input id="category-photo" className="fileInput" type="file" onChange={this._handleImageUpload}/>
                            <div id="add-photo" className={this.state.categoryImgUrl != '' && 'inactive'} onClick={this._clickImageUpload}>
                                + Add Category Photo
                            </div>
                            <img id="category-preview" className={this.state.categoryImgUrl === '' && 'inactive'} src={this.state.categoryImgUrl} onClick={this._clickImageUpload}/>
                            <i>Max size of 2 mb</i>
                        </div>
                        <div className="col-md-6">
                            <SelectField hintText="Position" style={{
                                width: '100%'
                            }}></SelectField>
                            <TextField hintText="Name" value={this.state.newCategory} onChange={this.handleNewCategoryChange} style={{
                                width: '100%'
                            }}></TextField>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <RaisedButton label="BUILD" primary={true} className={!(this.state.categoryImgUrl === '' || this.state.newCategory === '') && 'active-btn'} disabled={this.state.categoryImgUrl === '' || this.state.newCategory === ''} onClick={this._newCategory}/>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.state.showSecondModal} onHide={this._closeSecondModal}>
                    <Modal.Header closeButton>
                        <h4>Add a new <b>journey</b></h4>
                    </Modal.Header>
                    <Modal.Body className="col-md-12">
                        <div className="col-md-12 text-center">
                            <TextField value={this.state.newJourney} onChange={this.handleNewJourneyChange} hintText="New Journey" style={{
                                width: '100%'
                            }}></TextField>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <RaisedButton label="BUILD" primary={true} className={this.state.newJourney != '' && 'active-btn'} disabled={this.state.newJourney === ''} onClick={this._newJourney}/>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.state.showThirdModal} onHide={this._closeThirdModal}>
                    <Modal.Header closeButton>
                        <h4>Add a new <b>track</b></h4>
                    </Modal.Header>
                    <Modal.Body className="col-md-12">
                        <div className="col-md-12 text-center">
                            <TextField value={this.state.newTrack} onChange={this.handleNewTrackChange} hintText="New Track" style={{
                                width: '100%'
                            }}></TextField>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <RaisedButton label="BUILD" primary={true} className={this.state.newTrack != '' && 'active-btn'} disabled={this.state.newTrack === ''} onClick={this._newTrack}/>
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
        regions.length = 0
        jQuery.ajax({
            method: 'GET',
            dataType: "json",
            url: `http://testing.lingohop.com/api/assets/region/${language}-${country}/`,
            success: (res) => {
                region_items.length = 0
                let i = 1
                for (let region of res.regions) {
                    let value = region
                    let item = (<MenuItem value={i} key={i} primaryText={value}/>);
                    region_items.push(item);
                    i++;
                    regions.push(region)
                }
                this.forceUpdate()

            }

        })

    }

    _fetchCategory() {
        let language = languages[this.state.language_country - 1]
        let country = countries[this.state.language_country - 1]
        categories.length = 0
        jQuery.ajax({
            method: 'GET',
            dataType: "json",
            url: `http://testing.lingohop.com/api/contents/category/?country=${country}&language=${language}`,
            success: (res) => {
                category_items.length = 0
                let i = 1
                for (let category of res) {
                    let value = category.name
                    let item = (<MenuItem value={i} key={i} primaryText={value}/>);
                    category_items.push(item);
                    i++;
                    categories.push(category.name)
                }
                this.forceUpdate()

            }

        })
    }

    _fetchJourney() {
        journeys.length = 0;
        jQuery.ajax({
            method: 'GET',
            dataType: "json",
            url: `http://testing.lingohop.com/api/contents/journey/`,
            success: (res) => {
                journey_items.length = 0;
                let i = 1
                for (let journey of res) {
                    let value = journey.name
                    let item = (<MenuItem value={i} key={i} primaryText={value}/>);
                    journey_items.push(item);
                    i++;
                    journeys.push(journey.name)
                }
                this.forceUpdate()
            }

        })
    }

    _fetchTrack() {
        tracks.length = 0;
        jQuery.ajax({
            method: 'GET',
            dataType: "json",
            url: `http://testing.lingohop.com/api/contents/track/`,
            success: (res) => {
                track_items.length = 0
                let i = 1
                for (let track of res) {
                    let value = track.name
                    let item = (<MenuItem value={i} key={i} primaryText={value}/>);
                    track_items.push(item);
                    i++;
                    tracks.push(track.name)
                }
                this.forceUpdate()
            }

        })
    }

    _newTrack() {
        jQuery.ajax({
            method: 'POST',
            dataType: "json",
            data: JSON.stringify({"ID": 1, "name": this.state.newTrack}),
            contentType: "application/json",
            url: `http://testing.lingohop.com/api/contents/track/`,
            success: (res) => {
                this.setState({
                    newTrack: ''
                }, () => {
                    this._fetchTrack()
                })
            }
        })
    }

    _newJourney() {
        jQuery.ajax({
            method: 'POST',
            dataType: "json",
            data: JSON.stringify({"ID": 1, "name": this.state.newJourney}),
            contentType: "application/json",
            url: `http://testing.lingohop.com/api/contents/journey/`,
            success: (res) => {
                this.setState({
                    newJourney: ''
                }, () => {
                    this._fetchJourney()
                })
            }
        })
    }

    _newCategory() {
        let language = languages[this.state.language_country - 1]
        let country = countries[this.state.language_country - 1]
        jQuery.ajax({
            method: 'POST',
            dataType: "json",
            data: JSON.stringify({
                "ID": 1,
                "name": this.state.newCategory,
                "image": {
                    "ID": 1,
                    "file": this.state.categoryImgUrl
                }
            }),
            contentType: "application/json",
            url: `http://testing.lingohop.com/api/contents/category/?country=${country}&language=${language}`,
            success: (res) => {
                this.setState({
                    newCategory: '',
                    categoryImgUrl: ''
                }, () => {
                    this._fetchCategory()
                })
            }
        })
    }

    /************Other*******************************************/
    handleLessonChange(event) {
        this.setState({lesson: event.target.value});
        this.props.setLesson(event.target.value);
    }

    handleNewTrackChange(event) {
        this.setState({newTrack: event.target.value});
    }

    handleNewJourneyChange(event) {
        this.setState({newJourney: event.target.value});
    }

    handleNewCategoryChange(event) {
        this.setState({newCategory: event.target.value});
    }

    handleValueChange(name, event, index, value) {
        var change = {};
        change[name] = value;
        this.setState(change, () => {
            switch (name) {
                case 'language_country':
                    this._fetchRegion();
                    this._fetchCategory();
                    this.props.setLanguage(languages[this.state.language_country - 1]);
                    this.props.setCountry(countries[this.state.language_country - 1]);
                    break;
                case 'region':
                    this.props.setRegion(regions[this.state.region - 1]);
                    break;
                case 'category':
                    this.props.setCategory(categories[this.state.category - 1]);
                    break;
                case 'journey':
                    this.props.setJourney(journeys[this.state.journey - 1]);
                    break;
                case 'track':
                    this.props.setTrack(tracks[this.state.track - 1]);
                    break;
            }
        });

    };

    _handleImageUpload(e) {

        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({categoryImgUrl: reader.result});
        }
        reader.readAsDataURL(file)

    }

    _clickImageUpload() {
        document.getElementById('category-photo').click();
    }

    _openModal() {
        this.setState({showModal: true});
    };

    _closeModal() {
        this.setState({showModal: false});
    };

    _openSecondModal() {
        this.setState({showSecondModal: true});
    };

    _closeSecondModal() {
        this.setState({showSecondModal: false});
    };

    _openThirdModal() {
        this.setState({showThirdModal: true});
    };

    _closeThirdModal() {
        this.setState({showThirdModal: false});
    };

    _nextPage() {
        hashHistory.push('/contentportal/buildsearch')
    };

}

ContentPortalBuildPage.propTypes = {
    loggedInUser: React.PropTypes.string.isRequired,
    language: React.PropTypes.string.isRequired,
    country: React.PropTypes.string.isRequired,
    journey: React.PropTypes.string.isRequired,
    region: React.PropTypes.string.isRequired,
    track: React.PropTypes.string.isRequired,
    category: React.PropTypes.string.isRequired,
    lesson: React.PropTypes.string.isRequired,
    setUser: React.PropTypes.func.isRequired,
    setLanguage: React.PropTypes.func.isRequired,
    setUser: React.PropTypes.func.isRequired,
    setLanguage: React.PropTypes.func.isRequired,
    setUser: React.PropTypes.func.isRequired,
    setLanguage: React.PropTypes.func.isRequired,
    setUser: React.PropTypes.func.isRequired,
    setLanguage: React.PropTypes.func.isRequired
}
