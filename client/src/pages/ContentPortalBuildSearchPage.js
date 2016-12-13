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
const qchips = [];
const achips = [];

export default class ContentPortalBuildSearchPage extends React.Component {

    constructor() {
        super();

        this.state = {
            showModal: false,
            search: '',
            answersearch: '',
            activesearch: 'question',
            question: '',
            answer: '',
            imgOneFile: '',
            imgTwoFile: '',
            imgThreeFile: '',
            imgOneUrl: '',
            imgTwoUrl: '',
            imgThreeUrl: '',
            audioOneFile: '',
            audioTwoFile: '',
            audioThreeFile: '',
            audioFourFile: '',
            audioFiveFile: '',
            audioSixFile: '',
            audioOneUrl: '',
            audioTwoUrl: '',
            audioThreeUrl: '',
            audioFourUrl: '',
            audioFiveUrl: '',
            audioSixUrl: '',
            audioOnePlaying: false,
            audioTwoPlaying: false,
            audioThreePlaying: false,
            audioFourPlaying: false,
            audioFivePlaying: false,
            audioSixPlaying: false,
            regionOne: '',
            regionTwo: '',
            regionThree: '',
            gender: 'male',
            legoText: '',
            height: '700px',
            variables: []
        };

        this.handleSearch = this.handleSearch.bind(this);
        this.handleAnswerSearch = this.handleAnswerSearch.bind(this);
        this.handleAnswer = this.handleAnswer.bind(this);
        this.handleQuestion = this.handleQuestion.bind(this);
        this.handleChipDelete = this.handleChipDelete.bind(this);
        this.createChip = this.createChip.bind(this);
        this.setChipVariable = this.setChipVariable.bind(this);

        this.updateDimensions = this.updateDimensions.bind(this)

        this._buildLesson = this._buildLesson.bind(this);

        this._openModal = this._openModal.bind(this);
        this._closeModal = this._closeModal.bind(this);

        this._handleImageUpload = this._handleImageUpload.bind(this);
        this._handleImageDelete = this._handleImageDelete.bind(this);
        this._clickAudio = this._clickAudio.bind(this);
        this.handleGenderChange = this.handleGenderChange.bind(this);
        this.handleLegoTextChange = this.handleLegoTextChange.bind(this);
        this._uploadContent = this._uploadContent.bind(this);

    }

    render() {
        return (
            <div className="build-search-page">
                <div className="col-md-7">
                    <div className="text-center build-search col-md-12 build-search-left" style={{
                        height: this.state.height,
                        minHeight: '769px'
                    }}>
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
                            <TextField hintText="Search..." value={this.state.question} onChange={this.handleQuestion} style={{
                                width: '100%'
                            }}></TextField>
                        </div>
                        <div className="col-md-8 col-md-offset-2 variable-chips">
                            {qchips}
                        </div>
                        <div className="big-text text-left col-md-8 col-md-offset-2">
                            What is the first answer?
                            <TextField hintText="Search..." value={this.state.answer} onChange={this.handleAnswer} style={{
                                width: '100%'
                            }}></TextField>
                        </div>
                        <div className="col-md-8 col-md-offset-2 variable-chips">
                            {achips}
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
                            <RaisedButton label="BUILD" className={(this.state.search === '' || this.state.answersearch === '' || this.state.question === '' || this.state.answer === '')
                                ? "upload-btn"
                                : "upload-btn active-btn"} disabled={(this.state.search === '' || this.state.answersearch === '' || this.state.question === '' || this.state.answer === '')} onClick={this._buildLesson}/>
                        </div>
                    </div>
                </div>
                <div className="col-md-5">
                    <div className="text-left build-search col-md-12 build-search-right" style={{
                        height: this.state.height,
                        minHeight: '769px'
                    }}>
                        <i className={(this.state.search != '' || this.state.answersearch != '' || this.state.question != '' || this.state.answer != '')
                            ? 'inactive'
                            : 'text-center'}>Search for legos to view options</i>
                        <p className={(this.state.activesearch != 'question' || this.state.search === '')
                            ? 'inactive'
                            : 'text-center'}>Existing legos for
                            <green>{this.state.search}</green>
                        </p>
                        <p className={(this.state.activesearch != 'answer' || this.state.answersearch === '')
                            ? 'inactive'
                            : 'text-center'}>Existing legos for
                            <green>{this.state.answersearch}</green>
                        </p>
                        <p className={(this.state.activesearch != 'q' || this.state.question === '')
                            ? 'inactive'
                            : 'text-center'}>Existing legos for
                            <green>{this.state.question}</green>
                        </p>
                        <p className={(this.state.activesearch != 'a' || this.state.answer === '')
                            ? 'inactive'
                            : 'text-center'}>Existing legos for
                            <green>{this.state.answer}</green>
                        </p>
                        {searchResults}
                        <div id="lego-footer">
                            <p>Dont see what you were looking for?</p>
                            <div id="add-lego" onClick={this._openModal}>
                                Add Lego +
                            </div>
                        </div>
                    </div>
                </div>
                <Modal show={this.state.showModal} onHide={this._closeModal}>
                    <Modal.Header closeButton>
                        <h4>New Lego</h4>
                    </Modal.Header>
                    <Modal.Body className="col-md-12">
                        <div className="big-text text-left col-md-12">
                            What is the lego text?
                            <TextField value={this.state.legoText} onChange={this.handleLegoTextChange} style={{
                                width: '100%'
                            }}></TextField>
                        </div>
                        <div className="big-text text-left col-md-2">
                            <RadioButtonGroup name="gender" defaultSelected="male" onChange={this.handleGenderChange}>
                                <RadioButton value="male" label="Male" style={styles.radioButton}/>
                                <RadioButton value="female" label="Female" style={styles.radioButton}/>
                                <RadioButton value="neutral" label="Neutral" style={styles.radioButton}/>
                            </RadioButtonGroup>
                        </div>
                        <div className="big-text text-left col-md-9 col-md-offset-1">
                            <div id="add-picture" className={this.state.imgOneUrl != '' && this.state.imgTwoUrl != '' && this.state.imgThreeUrl != '' && 'inactive'}>+ Add Picture
                                <input className="fileInput" type="file" multiple onChange={this._handleImageUpload}/>
                            </div>
                            <div id="img-gallery" className="pull-left">
                                <div className={this.state.imgOneUrl === '' && 'inactive'}>
                                    <div className="close-icon" onClick={() => this._handleImageDelete(1)}>x</div>
                                    <img src={this.state.imgOneUrl}/>
                                </div>
                                <div className={this.state.imgTwoUrl === '' && 'inactive'}>
                                    <div className="close-icon" onClick={() => this._handleImageDelete(2)}>x</div>
                                    <img src={this.state.imgTwoUrl}/>
                                </div>
                                <div className={this.state.imgThreeUrl === '' && 'inactive'}>
                                    <div className="close-icon" onClick={() => this._handleImageDelete(3)}>x</div>
                                    <img src={this.state.imgThreeUrl}/>
                                </div>
                            </div>

                        </div>
                        <div id="audio" className="big-text text-left col-md-12">
                            Audio Files
                        </div>
                        <div id="chips" className={(this.state.gender === 'female' || this.state.regionOne === '')
                            ? 'inactive'
                            : 'big-text text-left col-md-12'}>
                            <input className="fileInput" id="audio-upload-one" type="file" onChange={this._handleAudioUpload.bind(this, "one")}/>
                            <input className="fileInput" id="audio-upload-two" type="file" onChange={this._handleAudioUpload.bind(this, "two")}/>
                            <input className="fileInput" id="audio-upload-three" type="file" onChange={this._handleAudioUpload.bind(this, "three")}/>
                            <audio controls id="audio-one">
                                <source src={this.state.audioOneUrl} type="audio/mp3"/>
                            </audio>
                            <audio controls id="audio-two">
                                <source src={this.state.audioTwoUrl} type="audio/mp3"/>
                            </audio>
                            <audio controls id="audio-three">
                                <source src={this.state.audioThreeUrl} type="audio/mp3"/>
                            </audio>

                            <Chip id="chip-one" className={this.state.audioOneUrl != ''
                                ? 'audiochip pull-left'
                                : 'pull-left'} style={styles.chip} onTouchTap={() => this._clickAudio("one")}>
                                <Avatar icon={< i id = "audio-one-icon" className = "material-icons pull-left" onTouchTap = {
                                    this._clickPlay.bind(this, "one")
                                } > add < /i>}/> {this.state.regionOne}
                                (M)
                            </Chip>
                            <Chip id="chip-two" className={this.state.audioTwoUrl != ''
                                ? 'audiochip pull-left'
                                : 'pull-left'} style={styles.chip} onTouchTap={() => this._clickAudio("two")}>
                                <Avatar icon={< i id = "audio-two-icon" className = "material-icons pull-left" onTouchTap = {
                                    this._clickPlay.bind(this, "two")
                                } > add < /i>}/> {this.state.regionTwo}
                                (M)
                            </Chip>
                            <Chip id="chip-three" className={this.state.audioThreeUrl != ''
                                ? 'audiochip pull-left'
                                : 'pull-left'} style={styles.chip} onTouchTap={() => this._clickAudio("three")}>
                                <Avatar icon={< i id = "audio-three-icon" className = "material-icons pull-left" onTouchTap = {
                                    this._clickPlay.bind(this, "three")
                                } > add < /i>}/> {this.state.regionThree}
                                (M)
                            </Chip>
                        </div>

                        <div id="chips" className={(this.state.gender === 'male' || this.state.regionOne === '')
                            ? 'inactive'
                            : 'big-text text-left col-md-12'}>
                            <input className="fileInput" id="audio-upload-four" type="file" onChange={this._handleAudioUpload.bind(this, "four")}/>
                            <input className="fileInput" id="audio-upload-five" type="file" onChange={this._handleAudioUpload.bind(this, "five")}/>
                            <input className="fileInput" id="audio-upload-six" type="file" onChange={this._handleAudioUpload.bind(this, "six")}/>
                            <audio controls id="audio-four">
                                <source src={this.state.audioFourUrl} type="audio/mp3"/>
                            </audio>
                            <audio controls id="audio-five">
                                <source src={this.state.audioFiveUrl} type="audio/mp3"/>
                            </audio>
                            <audio controls id="audio-six">
                                <source src={this.state.audioSixUrl} type="audio/mp3"/>
                            </audio>
                            <Chip id="chip-four" className={this.state.audioFourUrl != ''
                                ? 'audiochip pull-left'
                                : 'pull-left'} style={styles.chip} onTouchTap={() => this._clickAudio("four")}>
                                <Avatar icon={< i id = "audio-four-icon" className = "material-icons pull-left" onTouchTap = {
                                    this._clickPlay.bind(this, "four")
                                } > add < /i>}/> {this.state.regionOne}
                                (F)
                            </Chip>
                            <Chip id="chip-five" className={this.state.audioFiveUrl != ''
                                ? 'audiochip pull-left'
                                : 'pull-left'} style={styles.chip} onTouchTap={() => this._clickAudio("five")}>
                                <Avatar icon={< i id = "audio-five-icon" className = "material-icons pull-left" onTouchTap = {
                                    this._clickPlay.bind(this, "five")
                                } > add < /i>}/> {this.state.regionTwo}
                                (F)
                            </Chip>
                            <Chip id="chip-six" className={this.state.audioSixUrl != ''
                                ? 'audiochip pull-left'
                                : 'pull-left'} style={styles.chip} onTouchTap={() => this._clickAudio("six")}>
                                <Avatar icon={< i id = "audio-six-icon" className = "material-icons pull-left" onTouchTap = {
                                    this._clickPlay.bind(this, "six")
                                } > add < /i>}/> {this.state.regionThree}
                                (F)
                            </Chip>
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <RaisedButton label="BUILD" primary={true} onClick={this._uploadContent}/>
                    </Modal.Footer>

                </Modal>
            </div>
        )
    }

    /******For dynamic sizes***************************/
    updateDimensions() {
        const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

        if (width > 992) {
            const calculatedHeight = `${height - 200}px`;
            this.setState({height: calculatedHeight})
        } else {
            this.setState({height: 'auto'})
        }
    }

    componentWillMount() {
        searchResults.length = 0
        chips.length = 0
        answerchips.length = 0
        qchips.length = 0
        achips.length = 0
        this._fetchRegion()
        this.updateDimensions();
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
        document.body.style.backgroundColor = "rgb(244,244,244)" // Set the style
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    _openModal() {
        this.setState({showModal: true});
    };

    _closeModal() {
        this.setState({showModal: false});
    }

    handleQuestion(event) {
        let searchString = event.target.value

        let lastTerm = searchString.split(" ").slice(-1).pop()
        this._fetchSearch(lastTerm)

        this.setState({question: event.target.value, activesearch: 'q'});
    }

    handleAnswer(event) {
        let searchString = event.target.value

        let lastTerm = searchString.split(" ").slice(-1).pop()
        this._fetchSearch(lastTerm)

        this.setState({answer: event.target.value, activesearch: 'a'});
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

    setChipVariable(e) {
        let variableText = jQuery(e.target.parentNode).find("span").text()
        let chipClass = jQuery(e.target.parentNode).attr('class')

        let chipParentClass = jQuery(e.target.parentNode.parentNode).attr('class')

        if (chipParentClass.includes('variable-chips')) {
            if (chipClass.includes('variable')) {
                jQuery(e.target.parentNode).removeClass('variable')
            } else {
                jQuery(e.target.parentNode).addClass('variable')
                let variablesArray = this.state.variables
                variablesArray.push(variableText)
                this.setState({variables: variablesArray})
            }
        }
    }

    handleChipDelete(deleteId) {

        for (let [arrayIndex,
            iterableArray]of[chips,
            answerchips,
            qchips,
            achips].entries()) {
            for (let [index,
                i]of iterableArray.entries()) {
                if (i.props.deleteId === deleteId) {
                    let textToRemove = iterableArray[index].props.children[2]
                    switch (arrayIndex) {
                        case 0:
                            this.setState((prevState) => ({
                                search: prevState.search.replace(textToRemove, '')
                            }));
                            break;
                        case 1:
                            this.setState((prevState) => ({
                                answersearch: prevState.answersearch.replace(textToRemove, '')
                            }));
                            break;
                        case 2:
                            this.setState((prevState) => ({
                                question: prevState.question.replace(textToRemove, '')
                            }));
                            break;
                        case 3:
                            this.setState((prevState) => ({
                                answer: prevState.answer.replace(textToRemove, '')
                            }));
                            break;
                        default:
                            this.setState((prevState) => ({
                                search: prevState.search.replace(textToRemove, '')
                            }));
                            break;
                    }
                    iterableArray = iterableArray.splice(index, 1)
                    searchResults.length = 0

                }
            }
        }

        this.forceUpdate()

    }

    createChip(url, text, extraClass) {

        let deleteId = Math.random()

        let chip = (
            <Chip style={styles.chip} deleteId={`${deleteId}`} className={`pull-left ${extraClass}`} onTouchTap={this.setChipVariable} onRequestDelete={() => this.handleChipDelete(`${deleteId}`)}>
                <Avatar src={url}/> {text}
            </Chip>
        )
        if (this.state.activesearch === 'question') {
            chips.push(chip)
            let currentTextArray = this.state.search.split(" ")
            currentTextArray[currentTextArray.length - 1] = text
            this.setState({
                search: currentTextArray.toString().replace(/,/g, " ")
            })
        } else if (this.state.activesearch === 'answer') {
            answerchips.push(chip)
            let currentTextArray = this.state.answersearch.split(" ")
            currentTextArray[currentTextArray.length - 1] = text
            this.setState({
                answersearch: currentTextArray.toString().replace(/,/g, " ")
            })
        } else if (this.state.activesearch === 'q') {
            qchips.push(chip)
            let currentTextArray = this.state.question.split(" ")
            currentTextArray[currentTextArray.length - 1] = text
            this.setState({
                question: currentTextArray.toString().replace(/,/g, " ")
            })
        } else if (this.state.activesearch === 'a') {
            achips.push(chip)
            let currentTextArray = this.state.answer.split(" ")
            currentTextArray[currentTextArray.length - 1] = text
            this.setState({
                answer: currentTextArray.toString().replace(/,/g, " ")
            })
        }

        this.forceUpdate()
    }
    //New Lego
    handleGenderChange(event) {
        this.setState({gender: event.target.value});
    }

    handleLegoTextChange(event) {
        this.setState({legoText: event.target.value});
    }

    _handleImageUpload(e) {
        e.preventDefault();

        let files = Array.prototype.slice.call(e.target.files);

        if (this.state.imgOneUrl === "" && this.state.imgTwoUrl === "" && this.state.imgThreeUrl === "") {

            if (files.length >= 3) {
                let newImgFiles = files.slice(0, 3)
                this.getBase64(newImgFiles[0], 1)
                this.getBase64(newImgFiles[1], 2)
                this.getBase64(newImgFiles[2], 3)

                this.setState({imgOneFile: newImgFiles[0], imgTwoFile: newImgFiles[1], imgThreeFile: newImgFiles[2]})
            } else if (files.length === 2) {
                let newImgFiles = files.slice(0, 2)
                this.getBase64(newImgFiles[0], 1)
                this.getBase64(newImgFiles[1], 2)

                this.setState({imgOneFile: newImgFiles[0], imgTwoFile: newImgFiles[1]})
            } else if (files.length === 1) {
                let newImgFiles = files.slice(0, 1)
                this.getBase64(newImgFiles[0], 1)

                this.setState({imgOneFile: newImgFiles[0]})
            }

        } else if (this.state.imgOneUrl === "" && this.state.imgTwoUrl != "" && this.state.imgThreeUrl === "") {
            if (files.length >= 2) {
                let newImgFiles = files.slice(0, 2)
                this.getBase64(newImgFiles[0], 1)
                this.getBase64(newImgFiles[1], 3)

                this.setState({imgOneFile: newImgFiles[0], imgThreeFile: newImgFiles[1]})
            } else if (files.length == 1) {
                let newImgFiles = files.slice(0, 1)
                this.getBase64(newImgFiles[0], 1)

                this.setState({imgOneFile: newImgFiles[0]})
            }

        } else if (this.state.imgOneUrl === "" && this.state.imgTwoUrl === "" && this.state.imgThreeUrl != "") {
            if (files.length >= 2) {
                let newImgFiles = files.slice(0, 2)
                this.getBase64(newImgFiles[0], 1)
                this.getBase64(newImgFiles[1], 2)

                this.setState({imgOneFile: newImgFiles[0], imgTwoFile: newImgFiles[1]})
            } else if (files.length == 1) {
                let newImgFiles = files.slice(0, 1)
                this.getBase64(newImgFiles[0], 1)

                this.setState({imgOneFile: newImgFiles[0]})
            }

        } else if (this.state.imgOneUrl !== "" && this.state.imgTwoUrl === "" && this.state.imgThreeUrl === "") {
            if (files.length >= 2) {
                let newImgFiles = files.slice(0, 2)
                this.getBase64(newImgFiles[0], 2)
                this.getBase64(newImgFiles[1], 3)

                this.setState({imgTwoFile: newImgFiles[0], imgThreeFile: newImgFiles[1]})
            } else if (files.length == 1) {
                let newImgFiles = files.slice(0, 1)
                this.getBase64(newImgFiles[0], 2)

                this.setState({imgTwoFile: newImgFiles[0]})
            }

        } else if (this.state.imgOneUrl != "" && this.state.imgTwoUrl != "" && this.state.imgThreeUrl === "") {
            let newImgFiles = files.slice(0, 1)
            this.getBase64(newImgFiles[0], 3)

            this.setState({imgThreeFile: newImgFiles[0]})

        } else if (this.state.imgOneUrl === "" && this.state.imgTwoUrl != "" && this.state.imgThreeUrl != "") {
            let newImgFiles = files.slice(0, 1)
            this.getBase64(newImgFiles[0], 1)

            this.setState({imgOneFile: newImgFiles[0]})

        } else if (this.state.imgOneUrl != "" && this.state.imgTwoUrl === "" && this.state.imgThreeUrl != "") {
            let newImgFiles = files.slice(0, 1)
            this.getBase64(newImgFiles[0], 2)

            this.setState({imgTwoFile: newImgFiles[0]})

        }

    }

    _handleImageDelete(number) {
        switch (number) {
            case 1:
                this.setState({imgOneUrl: '', imgOneFile: ''});
                break;
            case 2:
                this.setState({imgTwoUrl: '', imgTwoFile: ''});
                break;
            case 3:
                this.setState({imgThreeUrl: '', imgThreeFile: ''});
                break;
            default:
                this.setState({imgOneUrl: '', imgOneFile: ''});
        }
    }

    _clickPlay(number, event) {
        event.stopPropagation()
        let capitalNumber = this.capitalizeFirstLetter(number)
        let audioUrl = eval(`this.state.audio${capitalNumber}Url`)
        let audioPlaying = eval(`this.state.audio${capitalNumber}Playing`)

        if (audioUrl === '')
            document.getElementById(`audio-upload-${number}`).click();
        else {
            if (!audioPlaying) {
                document.getElementById(`audio-${number}`).load();
                document.getElementById(`audio-${number}`).play();
                document.getElementById(`audio-${number}-icon`).innerHTML = "stop";
                switch (number) {
                    case "one":
                        this.setState({audioOnePlaying: true});
                        break;
                    case "two":
                        this.setState({audioTwoPlaying: true});
                        break;
                    case "three":
                        this.setState({audioThreePlaying: true});
                        break;
                    case "four":
                        this.setState({audioFourPlaying: true});
                        break;
                    case "five":
                        this.setState({audioFivePlaying: true});
                        break;
                    case "six":
                        this.setState({audioSixPlaying: true});
                        break;
                    default:
                        this.setState({audioOnePlaying: true});
                }

            } else {
                document.getElementById(`audio-${number}`).pause();
                document.getElementById(`audio-${number}-icon`).innerHTML = "play_arrow";
                switch (number) {
                    case "one":
                        this.setState({audioOnePlaying: false});
                        break;
                    case "two":
                        this.setState({audioTwoPlaying: false});
                        break;
                    case "three":
                        this.setState({audioThreePlaying: false});
                        break;
                    case "four":
                        this.setState({audioFourPlaying: false});
                        break;
                    case "five":
                        this.setState({audioFivePlaying: false});
                        break;
                    case "six":
                        this.setState({audioSixPlaying: false});
                        break;
                    default:
                        this.setState({audioOnePlaying: false});
                }

            }
        }
    }

    _clickAudio(number) {
        let capitalNumber = this.capitalizeFirstLetter(number)
        let audioUrl = eval(`this.state.audio${capitalNumber}Url`)
        let audioPlaying = eval(`this.state.audio${capitalNumber}Playing`)

        document.getElementById(`audio-upload-${number}`).click();
    }

    _handleAudioUpload(number, e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            switch (number) {
                case "one":
                    this.setState({audioOneFile: file, audioOneUrl: reader.result});
                    break;
                case "two":
                    this.setState({audioTwoFile: file, audioTwoUrl: reader.result});
                    break;
                case "three":
                    this.setState({audioThreeFile: file, audioThreeUrl: reader.result});
                    break;
                case "four":
                    this.setState({audioFourFile: file, audioFourUrl: reader.result});
                    break;
                case "five":
                    this.setState({audioFiveFile: file, audioFiveUrl: reader.result});
                    break;
                case "six":
                    this.setState({audioSixFile: file, audioSixUrl: reader.result});
                    break;
                default:
                    this.setState({audioOneFile: file, audioOneUrl: reader.result});
            }
            document.getElementById(`audio-${number}-icon`).innerHTML = "play_arrow";
        }
        reader.readAsDataURL(file)

    }

    //API Calls
    _fetchRegion() {
        jQuery.ajax({
            method: 'GET',
            dataType: "json",
            url: `https://testing.lingohop.com/api/assets/region/${this.props.language}-${this.props.country}/`,
            success: (res) => {
                console.log(res)
                this.setState({regionOne: res.regions[0], regionTwo: res.regions[1], regionThree: res.regions[2]})
            }

        })

    }

    _fetchSearch(searchTerm) {

        jQuery.ajax({
            method: 'GET',
            dataType: "json",
            url: `https://testing.lingohop.com/api/assets/word/?country=${this.props.country}&language=${this.props.language}&q=${searchTerm}`,
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
                        let imgFile = (<img className={`${extraClass}`} src={`https://testing.lingohop.com${img.file}`} onClick={() => this.createChip(`https://testing.lingohop.com${img.file}`, item.word, extraClass)}/>)
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

    _buildLesson() {
        let part1 = ""
        let part2 = ""
        console.log(this.props.part)
        console.log(this.state.variables)

        if (this.props.part === "one") {
            part1 = {
                "question_text": this.state.question.split(" "),
                "answer_text": this.state.answer.split(" "),
                "variables": this.state.variables,
                "images": {
                    "Default ": "default_beach",
                    "The": " ",
                    "beach": "imageOfBeach"
                },
                "audio": {},
                "rules": {
                    "legos_before_question": this.state.search.split(" "),
                    "legos_before_answer": this.state.answersearch.split(" ")
                },
                "problem_question": "",
                "problem_image": ""
            }
        } else {
            part2 = {
                "question_text": this.state.question.split(" "),
                "answer_text": this.state.answer.split(" "),
                "variables": this.state.variables,
                "images": {
                    "Default ": "default_beach",
                    "The": " ",
                    "beach": "imageOfBeach"
                },
                "audio": {},
                "rules": {
                    "legos_before_question": this.state.search.split(" "),
                    "legos_before_answer": this.state.answersearch.split(" ")
                },
                "problem_question": "",
                "problem_image": ""
            }
        }

        jQuery.ajax({
            method: "PUT",
            data: JSON.stringify({
                "country": `${this.props.country}`,
                "language": `${this.props.language}`,
                "journeys": {
                    "journey1": {
                        "region1": {
                            "track1": [
                                {
                                    "category_name": `${this.props.category}`,
                                    "Video": "URL of video",
                                    "lessons": [
                                        {
                                            "name": `${this.props.lesson}`,
                                            "parts": {
                                                "part1": part1,
                                                "part2": part2
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            }),
            dataType: "json",
            contentType: "application/json",
            url: `https://testing.lingohop.com/api/contents/${this.props.country}/${this.props.language}/`,
            success: (res) => {
                console.log('Uploaded successfully')
            },
            error: (a, b, c) => {
                console.log(a)
                console.log(b)
                console.log(c)

            }
        })

    }

    _uploadContent() {

        jQuery.ajax({
            method: "PUT",
            data: JSON.stringify({
                "country": this.props.country,
                "language": this.props.language,
                "words": [
                    {
                        "word": this.state.legoText,
                        "images": [
                            {
                                "file": this.state.imgOneUrl
                            }, {
                                "file": this.state.imgTwoUrl
                            }, {
                                "file": this.state.imgThreeUrl
                            }
                        ],
                        "audio": {
                            "files": [
                                {
                                    "gender": "male",
                                    "files": [
                                        {
                                            "region": this.state.regionOne,
                                            "file": this.state.audioOneUrl
                                        }, {
                                            "region": this.state.regionTwo,
                                            "file": this.state.audioTwoUrl
                                        }, {
                                            "region": this.state.regionThree,
                                            "file": this.state.audioThreeUrl
                                        }
                                    ]

                                }, {
                                    "gender": "female",
                                    "files": [
                                        {
                                            "region": this.state.regionOne,
                                            "file": this.state.audioFourUrl
                                        }, {
                                            "region": this.state.regionTwo,
                                            "file": this.state.audioFiveUrl
                                        }, {
                                            "region": this.state.regionThree,
                                            "file": this.state.audioSixUrl
                                        }
                                    ]

                                }
                            ]
                        }
                    }
                ]
            }),
            dataType: "json",
            contentType: "application/json",
            url: `https://testing.lingohop.com/api/assets/${this.props.country}/${this.props.language}/`,
            success: (res) => {
                console.log('Uploaded successfully')
                hashHistory.push('/contentportal/buildfinish')
            }
        })

    }

    //Helper Functions
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    getBase64(file, number) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            switch (number) {
                case 1:
                    this.setState({imgOneUrl: reader.result});
                    break;
                case 2:
                    this.setState({imgTwoUrl: reader.result});
                    break;
                case 3:
                    this.setState({imgThreeUrl: reader.result});
                    break;
            }
        };
        reader.onerror = function(error) {
            console.log('Error: ', error);
        };
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
    part: React.PropTypes.string.isRequired,
    setUser: React.PropTypes.func.isRequired,
    setLanguage: React.PropTypes.func.isRequired,
    setUser: React.PropTypes.func.isRequired,
    setLanguage: React.PropTypes.func.isRequired,
    setUser: React.PropTypes.func.isRequired,
    setLanguage: React.PropTypes.func.isRequired,
    setUser: React.PropTypes.func.isRequired,
    setLanguage: React.PropTypes.func.isRequired,
    setPart: React.PropTypes.func.isRequired
}
