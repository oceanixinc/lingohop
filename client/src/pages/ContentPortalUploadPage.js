import React from 'react'
import {Link, hashHistory} from 'react-router'
import jQuery from 'jquery';

import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

import {Modal} from 'react-bootstrap'

const styles = {
    chip: {
        margin: 4
    },
    radioButton: {
        marginBottom: 16
    }
};

const language_items = [];
const languages = [];
const countries = [];

export default class ContentPortalUploadPage extends React.Component {

    constructor() {
        super();

        this.state = {
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
            language_country: '',
            legoText: '',
            gender: 'male',
            regionOne: '',
            regionTwo: '',
            regionThree: '',
            showModal: false,
            showValidateModal: false,
            isUploading: false
        };

        this._handleImageUpload = this._handleImageUpload.bind(this);
        this._handleImageDelete = this._handleImageDelete.bind(this);
        this._clickAudio = this._clickAudio.bind(this);
        this._uploadContent = this._uploadContent.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleLegoTextChange = this.handleLegoTextChange.bind(this);
        this.handleGenderChange = this.handleGenderChange.bind(this);
        this._openModal = this._openModal.bind(this);
        this._closeModal = this._closeModal.bind(this);
        this._openValidateModal = this._openValidateModal.bind(this);
        this._closeValidateModal = this._closeValidateModal.bind(this);

    }

    componentWillMount() {
        this._fetchLanguageCountry();
    }

    render() {
      console.log(this.state)
        return (
            <div className="upload-page">
                <Modal show={this.state.showModal} onHide={this._closeModal} backdrop='static'>
                    <Modal.Header>
                        <h4 className={!this.state.isUploading && 'inactive'}>Uploading in progress</h4>
                        <h4 className={this.state.isUploading && 'inactive'}>Uploading failed!</h4>
                    </Modal.Header>
                    <Modal.Body className="col-md-12 text-center">
                        <CircularProgress size={2} thickness={5} className={!this.state.isUploading && 'inactive'}/>
                        <h4 className={this.state.isUploading && 'inactive'}>Please try again</h4>
                    </Modal.Body>
                    <Modal.Footer>
                        <RaisedButton label="CLOSE" primary={true} onClick={this._closeModal} className={this.state.isUploading && 'inactive'}/>
                    </Modal.Footer>

                </Modal>
                <Modal show={this.state.showValidateModal} onHide={this._closeValidateModal} backdrop='static'>
                    <Modal.Header>
                        <h4>Audio Validation Error</h4>
                    </Modal.Header>
                    <Modal.Body className="col-md-12 text-center">
                        <h4>The audio files for each particular region have to be in the "gender-region" format. For example if the gender is "male" and region is "Catalonia" the audio file has to be named "male-Catalonia". Please check the naming of your audio files</h4>
                    </Modal.Body>
                    <Modal.Footer>
                        <RaisedButton label="CLOSE" primary={true} onClick={this._closeValidateModal}/>
                    </Modal.Footer>

                </Modal>
                <div className="text-center upload col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                    <Link to="/contentportal">
                        <i className="material-icons pull-left">arrow_back</i>
                    </Link>
                    <div className="col-sm-12">
                        <p id="main-text">Hello,
                            <b>John</b>
                        </p>
                        <p id="desc-text">Please tell us about the content upload.</p>
                    </div>
                    <div className="big-text text-left col-sm-8 col-sm-offset-2">
                        What Language-Country pair does the lego belong to?
                        <SelectField value={this.state.language_country} onChange={this.handleValueChange.bind(this, 'language_country')} hintText="Language-Country" style={{
                            width: '100%'
                        }}>
                            {language_items}
                        </SelectField>
                    </div>
                    <div id="lego-text" className="big-text text-left col-sm-8 col-sm-offset-2">
                        What is the lego text?
                        <TextField value={this.state.legoText} hintText={this.state.legoText != ''
                            ? ''
                            : 'Lego Text'} onChange={this.handleLegoTextChange} style={{
                            width: '100%'
                        }}></TextField>
                    </div>
                    <div className="big-text text-left col-sm-3 col-sm-offset-2">
                        <RadioButtonGroup name="gender" defaultSelected="male" onChange={this.handleGenderChange}>
                            <RadioButton value="male" label="Male" style={styles.radioButton}/>
                            <RadioButton value="female" label="Female" style={styles.radioButton}/>
                            <RadioButton value="neutral" label="Neutral" style={styles.radioButton}/>
                        </RadioButtonGroup>
                    </div>
                    <div className="big-text text-left col-sm-7" style={{
                        overflow: 'auto'
                    }}>
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
                    <div id="audio" className="big-text text-left col-sm-10 col-sm-offset-2">
                        Audio Files
                    </div>
                    <div id="chips" className={(this.state.gender === 'female' || this.state.regionOne === '')
                        ? 'inactive'
                        : 'big-text text-left col-sm-8 col-sm-offset-2'}>
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
                        <div className={typeof this.state.regionOne === 'undefined'
                            ? 'inactive'
                            : ''}>
                            <Chip id="chip-one" className={this.state.audioOneUrl != ''
                                ? 'audiochip pull-left'
                                : 'pull-left'} style={styles.chip} onTouchTap={() => this._clickAudio("one")}>
                                <Avatar icon={< i id = "audio-one-icon" className = "material-icons pull-left" onTouchTap = {
                                    this._clickPlay.bind(this, "one")
                                } > add < /i>}/> {this.state.regionOne}
                                (M)
                            </Chip>
                        </div>
                        <div className={typeof this.state.regionTwo === 'undefined'
                            ? 'inactive'
                            : ''}>
                            <Chip id="chip-two" className={this.state.audioTwoUrl != ''
                                ? 'audiochip pull-left'
                                : 'pull-left'} style={styles.chip} onTouchTap={() => this._clickAudio("two")}>
                                <Avatar icon={< i id = "audio-two-icon" className = "material-icons pull-left" onTouchTap = {
                                    this._clickPlay.bind(this, "two")
                                } > add < /i>}/> {this.state.regionTwo}
                                (M)
                            </Chip>
                        </div>
                        <div className={typeof this.state.regionThree === 'undefined'
                            ? 'inactive'
                            : ''}>
                            <Chip id="chip-three" className={this.state.audioThreeUrl != ''
                                ? 'audiochip pull-left'
                                : 'pull-left'} style={styles.chip} onTouchTap={() => this._clickAudio("three")}>
                                <Avatar icon={< i id = "audio-three-icon" className = "material-icons pull-left" onTouchTap = {
                                    this._clickPlay.bind(this, "three")
                                } > add < /i>}/> {this.state.regionThree}
                                (M)
                            </Chip>
                        </div>
                    </div>
                    <div id="chips" className={(this.state.gender === 'male' || this.state.regionOne === '')
                        ? 'inactive'
                        : 'big-text text-left col-sm-8 col-sm-offset-2'}>
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
                        <div className={typeof this.state.regionOne === 'undefined'
                            ? 'inactive'
                            : ''}>
                            <Chip id="chip-four" className={this.state.audioFourUrl != ''
                                ? 'audiochip pull-left'
                                : 'pull-left'} style={styles.chip} onTouchTap={() => this._clickAudio("four")}>
                                <Avatar icon={< i id = "audio-four-icon" className = "material-icons pull-left" onTouchTap = {
                                    this._clickPlay.bind(this, "four")
                                } > add < /i>}/> {this.state.regionOne}
                                (F)
                            </Chip>
                        </div>
                        <div className={typeof this.state.regionTwo === 'undefined'
                            ? 'inactive'
                            : ''}>
                            <Chip id="chip-five" className={this.state.audioFiveUrl != ''
                                ? 'audiochip pull-left'
                                : 'pull-left'} style={styles.chip} onTouchTap={() => this._clickAudio("five")}>
                                <Avatar icon={< i id = "audio-five-icon" className = "material-icons pull-left" onTouchTap = {
                                    this._clickPlay.bind(this, "five")
                                } > add < /i>}/> {this.state.regionTwo}
                                (F)
                            </Chip>
                        </div>
                        <div className={typeof this.state.regionThree === 'undefined'
                            ? 'inactive'
                            : ''}>
                            <Chip id="chip-six" className={this.state.audioSixUrl != ''
                                ? 'audiochip pull-left'
                                : 'pull-left'} style={styles.chip} onTouchTap={() => this._clickAudio("six")}>
                                <Avatar icon={< i id = "audio-six-icon" className = "material-icons pull-left" onTouchTap = {
                                    this._clickPlay.bind(this, "six")
                                } > add < /i>}/> {this.state.regionThree}
                                (F)
                            </Chip>
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <RaisedButton label="UPLOAD" className={(this.state.gender === 'male' && ((this.state.imgOneUrl === '' && this.state.imgTwoUrl === '' && this.state.imgThreeUrl === '') || this.state.audioOneUrl === '' || this.state.audioTwoUrl === '' || this.state.audioThreeUrl === '' || this.state.language_country === '' || this.state.legoText === '')) || (this.state.gender === 'female' && ((this.state.imgOneUrl === '' && this.state.imgTwoUrl === '' && this.state.imgThreeUrl === '') || this.state.audioFourUrl === '' || this.state.audioFiveUrl === '' || this.state.audioSixUrl === '' || this.state.language_country === '' || this.state.legoText === '')) || (this.state.gender === 'neutral' && ((this.state.imgOneUrl === '' && this.state.imgTwoUrl === '' && this.state.imgThreeUrl === '') || this.state.audioOneUrl === '' || this.state.audioTwoUrl === '' || this.state.audioThreeUrl === '' || this.state.audioFourUrl === '' || this.state.audioFiveUrl === '' || this.state.audioSixUrl === '' || this.state.language_country === '' || this.state.legoText === ''))
                            ? 'upload-btn'
                            : 'upload-btn active-btn'} disabled={(this.state.gender === 'male' && ((this.state.imgOneUrl === '' && this.state.imgTwoUrl === '' && this.state.imgThreeUrl === '') || this.state.audioOneUrl === '' || this.state.audioTwoUrl === '' || this.state.audioThreeUrl === '' || this.state.language_country === '' || this.state.legoText === '')) || (this.state.gender === 'female' && ((this.state.imgOneUrl === '' && this.state.imgTwoUrl === '' && this.state.imgThreeUrl === '') || this.state.audioFourUrl === '' || this.state.audioFiveUrl === '' || this.state.audioSixUrl === '' || this.state.language_country === '' || this.state.legoText === '')) || (this.state.gender === 'neutral' && ((this.state.imgOneUrl === '' && this.state.imgTwoUrl === '' && this.state.imgThreeUrl === '') || this.state.audioOneUrl === '' || this.state.audioTwoUrl === '' || this.state.audioThreeUrl === '' || this.state.audioFourUrl === '' || this.state.audioFiveUrl === '' || this.state.audioSixUrl === '' || this.state.language_country === '' || this.state.legoText === ''))} onClick={this._uploadContent}/>
                    </div>

                </div>
            </div>
        )
    }

    componentDidMount() {
        document.body.style.backgroundColor = "rgb(244,244,244)" // Set the style
    }

    //Modal
    _openModal() {
        this.setState({showModal: true});
    };

    _closeModal() {
        this.setState({showModal: false});
    };

    _openValidateModal() {
        this.setState({showValidateModal: true});
    };

    _closeValidateModal() {
        this.setState({showValidateModal: false});
    };

    //Uploads
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

    //Audio Previews
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

    //API Calls
    _fetchLanguageCountry() {

        jQuery.ajax({
            method: 'GET',
            dataType: "json",
            url: 'https://testing.lingohop.com/api/language-country/',
            success: (res) => {
                let i = 1;
                for (let language of res) {
                    let itemIndex = res.indexOf(language);
                    let value = language.language + '-' + language.country;
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
            url: `https://testing.lingohop.com/api/assets/region/${language}-${country}/`,
            success: (res) => {
                this.setState({regionOne: res.regions[0], regionTwo: res.regions[1], regionThree: res.regions[2]})
            }

        })

    }

    _uploadContent() {

        if (this.validateAudioFiles()) {

            this.setState({
                isUploading: true
            }, () => {
                this._openModal()
            })

            let language = languages[this.state.language_country - 1]
            let country = countries[this.state.language_country - 1]

            let imgUrls = []
            for (let imgUrl of[this.state.imgOneUrl,
                this.state.imgTwoUrl,
                this.state.imgThreeUrl]) {

                if (imgUrl != '')
                    imgUrls.push({"file": imgUrl})
            }

            jQuery.ajax({
                method: "PUT",
                data: JSON.stringify({
                    "country": country,
                    "language": language,
                    "words": [
                        {
                            "word": this.state.legoText,
                            "images": imgUrls,
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
                url: `https://testing.lingohop.com/api/assets/${country}/${language}/`,
                success: (res) => {
                    console.log('Uploaded successfully')
                    hashHistory.push('/contentportal/uploadfinish')
                },
                error: (a, b, c) => {
                    this.setState({isUploading: false})
                    console.log(a)
                    console.log(b)
                    console.log(c)

                }
            })

        } else {
            this._openValidateModal()
        }
    }

    //---------------------

    validateAudioFiles() {

        let maleValidation = true
        let femaleValidation = true

        if (this.state.gender === 'male' || this.state.gender === 'neutral') {
            let nameOne = this.state.audioOneFile.name
            let nameTwo = this.state.audioTwoFile.name
            let nameThree = this.state.audioThreeFile.name

            nameOne = nameOne.substr(0, nameOne.lastIndexOf('.'))
            nameTwo = nameTwo.substr(0, nameTwo.lastIndexOf('.'))
            nameThree = nameThree.substr(0, nameThree.lastIndexOf('.'))

            console.log(nameOne)
            console.log(nameTwo)
            console.log(nameThree)

            let validOne = (nameOne === `male-${this.state.regionOne}`)
            let validTwo = (nameTwo === `male-${this.state.regionTwo}`)
            let validThree = (nameThree === `male-${this.state.regionThree}`)

            maleValidation = validOne && validTwo && validThree
        }

        if (this.state.gender === 'female' || this.state.gender === 'neutral') {
            let nameFour = this.state.audioFourFile.name
            let nameFive = this.state.audioFiveFile.name
            let nameSix = this.state.audioSixFile.name

            nameFour = nameFour.substr(0, nameFour.lastIndexOf('.'))
            nameFive = nameFive.substr(0, nameFive.lastIndexOf('.'))
            nameSix = nameSix.substr(0, nameSix.lastIndexOf('.'))

            let validFour = (nameFour === `female-${this.state.regionOne}`)
            let validFive = (nameFive === `female-${this.state.regionTwo}`)
            let validSix = (nameSix === `female-${this.state.regionThree}`)

            femaleValidation = validFour && validFive && validSix
        }

        return (maleValidation && femaleValidation)
    }

    handleValueChange(name, event, index, value) {

        var change = {};
        change[name] = value;
        this.setState(change, () => {
            this._fetchRegion()
        });
    }

    handleLegoTextChange(event) {
        this.setState({legoText: event.target.value});
    }

    handleGenderChange(event) {
        this.setState({gender: event.target.value});
    }

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
