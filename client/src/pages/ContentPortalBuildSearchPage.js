import React from 'react'
import {Link, hashHistory} from 'react-router'
import jQuery from 'jquery';

import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';

import {Modal} from 'react-bootstrap'

const styles = {
    chip: {
        margin: 4
    },
    radioButton: {
        marginBottom: 16
    }
};

const searchResults = [];
const chips = [];
const answerchips = [];

export default class ContentPortalBuildSearchPage extends React.Component {

    constructor() {
        super();

        this.state = {
            showModal: false,
            search: '',
            answersearch: '',
            activesearch: 'question'
        };

        this.handleSearch = this.handleSearch.bind(this);
        this.handleAnswerSearch = this.handleAnswerSearch.bind(this);
        this.handleChipDelete = this.handleChipDelete.bind(this);
        this.createChip = this.createChip.bind(this);

        this._openModal = this._openModal.bind(this);
        this._closeModal = this._closeModal.bind(this);

    }

    render() {
        return (
            <div className="build-search-page">
                <div className="text-center build-search col-md-6 col-md-offset-1 build-search-left">
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
                        <TextField hintText="Search..." value={this.state.search} onChange={this.handleSearch} style={{
                            width: '100%'
                        }}></TextField>
                    </div>
                    <div className="col-md-8 col-md-offset-2">
                        {chips}
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
                        <TextField hintText="Search..." value={this.state.answersearch} onChange={this.handleAnswerSearch} style={{
                            width: '100%'
                        }}></TextField>
                    </div>
                    <div className="col-md-8 col-md-offset-2">
                        {answerchips}
                    </div>
                    <div className="col-md-12">
                        <RaisedButton label="BUILD" className="upload-btn active-btn" onClick={this._openModal}/>
                    </div>
                </div>
                <div className="text-left build-search col-md-3 col-md-offset-1 build-search-right">
                    <i className={(this.state.search != '' || this.state.answersearch != '') && 'inactive'}>Search for legos to view options</i>
                    <p className={(this.state.activesearch === 'answer' || this.state.search === '') && 'inactive'}>Existing legos for {this.state.search}</p>
                    <p className={(this.state.activesearch === 'question' || this.state.answersearch === '') && 'inactive'}>Existing legos for {this.state.answersearch}</p>
                    {searchResults}
                </div>
                <Modal show={this.state.showModal} onHide={this._closeModal}>
                    <Modal.Header closeButton>
                        <h4>New Lego</h4>
                    </Modal.Header>
                    <Modal.Body className="col-md-12">
                        <div className="big-text text-left col-md-12">
                            What is the lego text?
                            <TextField style={{
                                width: '100%'
                            }}></TextField>
                        </div>
                        <div className="big-text text-left col-md-2">
                            <RadioButtonGroup name="gender" defaultSelected="male">
                                <RadioButton value="male" label="Male" style={styles.radioButton}/>
                                <RadioButton value="female" label="Female" style={styles.radioButton}/>
                                <RadioButton value="neutral" label="Neutral" style={styles.radioButton}/>
                            </RadioButtonGroup>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <RaisedButton label="BUILD" primary={true}/>
                    </Modal.Footer>

                </Modal>
            </div>
        )
    }

    componentWillMount() {
        searchResults.length = 0
        chips.length = 0
        answerchips.length = 0
    }

    componentDidMount() {
        document.body.style.backgroundColor = "rgb(244,244,244)" // Set the style
    }

    _openModal() {
        this.setState({showModal: true});
    };

    _closeModal() {
        this.setState({showModal: false});
    }

    handleSearch(event) {

        let searchString = event.target.value

        let lastTerm = searchString.split(" ").slice(-1).pop()
        this._fetchSearch(lastTerm)

        this.setState({search: event.target.value, activesearch: 'question'});
    }

    handleAnswerSearch(event) {

        let searchString = event.target.value

        let lastTerm = searchString.split(" ").slice(-1).pop()
        this._fetchSearch(lastTerm)

        this.setState({answersearch: event.target.value, activesearch: 'answer'});
    }

    handleChipDelete(deleteId) {

        for (let iterableArray of[chips,
            answerchips]) {
            for (let [index,
                i]of iterableArray.entries()) {
                if (i.props.deleteId === deleteId) {
                    iterableArray = iterableArray.splice(index, 1)
                }
            }
        }

        this.forceUpdate()

    }

    createChip(url, text, extraClass) {

        let deleteId = Math.random()
        console.log(deleteId)

        let chip = (
            <Chip style={styles.chip} deleteId={`${deleteId}`} className={`pull-left ${extraClass}`} onRequestDelete={() => this.handleChipDelete(`${deleteId}`)}>
                <Avatar src={url}/> {text}
            </Chip>
        )
        if (this.state.activesearch === 'question')
            chips.push(chip)
        else if (this.state.activesearch === 'answer')
            answerchips.push(chip)

        this.forceUpdate()
    }

    //API Calls
    _fetchSearch(searchTerm) {

        jQuery.ajax({
            method: 'GET',
            dataType: "json",
            url: `http://testing.lingohop.com/api/assets/word/?country=${this.props.country}&language=${this.props.language}&q=${searchTerm}`,
            success: (res) => {

                searchResults.length = 0
                for (let item of res) {

                    let male = (item.audio.files[0].files[0].file != '')
                    let female = (item.audio.files[1].files[0].file != '')
                    let extraClass = ''

                    if (male && female)
                        extraClass = 'neutral'
                    else if (male && !female)
                        extraClass = 'male'
                    else if (!male && female)
                        extraClass = 'female'

                    let word = (
                        <p>{item.word}</p>
                    )

                    let imgArray = []

                    for (let img of item.images) {
                        let imgFile = (<img className={`${extraClass}`} src={`http://testing.lingohop.com${img.file}`} onClick={() => this.createChip(`http://testing.lingohop.com${img.file}`, item.word, extraClass)}/>)
                        imgArray.push(imgFile)
                    }

                    let holder = (
                        <div className="search-holder">
                            {word}
                            <div className="search-img-holder pull-left">
                                {imgArray}
                            </div>
                        </div>
                    )

                    searchResults.push(holder)
                }

                this.forceUpdate()
            }
        })

    }

}

ContentPortalBuildSearchPage.propTypes = {
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
