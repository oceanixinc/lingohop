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
            imgs: [],
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

        //Images
        this.handleImageUpload = this.handleImageUpload.bind(this);
        this.handleImageDelete = this.handleImageDelete.bind(this);
        this.handleImageGenderChange = this.handleImageGenderChange.bind(this);


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
        const imgs = this.getImagePreviews()
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
                        <h4>The audio files for each particular region have to include the gender and region name.</h4>
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
                    <div className="big-text text-left col-sm-8 col-sm-offset-2">
                        What is the lego gender?
                        <RadioButtonGroup name="gender" defaultSelected="male" onChange={this.handleGenderChange} style={{
                            marginTop: '10px'
                        }}>
                            <RadioButton value="male" label="Male" style={styles.radioButton}/>
                            <RadioButton value="female" label="Female" style={styles.radioButton}/>
                            <RadioButton value="neutral" label="Neutral" style={styles.radioButton}/>
                        </RadioButtonGroup>
                    </div>
                    <div className="big-text text-left col-sm-8 col-sm-offset-2">
                        <RaisedButton label="+ ADD PHOTOS" primary={true} disabled={((this.state.gender === 'male' || this.state.gender === 'female') && this.state.imgs.length >= 1) || (this.state.imgs.length >= 2)} onClick={() => {
                            document.getElementById('img-input').click();
                        }}/>
                      <input id="img-input" className="fileInput inactive" type="file" multiple onChange={this.handleImageUpload}/>
                    </div>
                    <div className="big-text text-left col-sm-8 col-sm-offset-2 img-preview-holder">
                        {imgs}

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
                        <RaisedButton label="UPLOAD" className={(this.state.gender === 'male' && ((this.state.imgs.length === 0) || (this.state.audioOneUrl === '' && typeof this.state.regionOne != 'undefined') || (this.state.audioTwoUrl === '' && typeof this.state.regionTwo != 'undefined') || (this.state.audioThreeUrl === '' && typeof this.state.regionThree != 'undefined') || this.state.language_country === '' || this.state.legoText === '')) || (this.state.gender === 'female' && ((this.state.imgs.length === 0) || (this.state.audioFourUrl === '' && typeof this.state.regionOne != 'undefined') || (this.state.audioFiveUrl === '' && typeof this.state.regionTwo != 'undefined') || (this.state.audioSixUrl === '' && typeof this.state.regionThree != 'undefined') || this.state.language_country === '' || this.state.legoText === '')) || (this.state.gender === 'neutral' && ((this.state.imgs.length === 0) || (this.state.audioOneUrl === '' && typeof this.state.regionOne != 'undefined') || (this.state.audioTwoUrl === '' && typeof this.state.regionTwo != 'undefined') || (this.state.audioThreeUrl === '' && typeof this.state.regionThree != 'undefined') || (this.state.audioFourUrl === '' && typeof this.state.regionOne != 'undefined') || (this.state.audioFiveUrl === '' && typeof this.state.regionTwo != 'undefined') || (this.state.audioSixUrl === '' && typeof this.state.regionThree != 'undefined') || this.state.language_country === '' || this.state.legoText === ''))
                            ? 'upload-btn'
                            : 'upload-btn active-btn'} disabled={(this.state.gender === 'male' && ((this.state.imgs.length === 0) || (this.state.audioOneUrl === '' && typeof this.state.regionOne != 'undefined') || (this.state.audioTwoUrl === '' && typeof this.state.regionTwo != 'undefined') || (this.state.audioThreeUrl === '' && typeof this.state.regionThree != 'undefined') || this.state.language_country === '' || this.state.legoText === '')) || (this.state.gender === 'female' && ((this.state.imgs.length === 0) || (this.state.audioFourUrl === '' && typeof this.state.regionOne != 'undefined') || (this.state.audioFiveUrl === '' && typeof this.state.regionTwo != 'undefined') || (this.state.audioSixUrl === '' && typeof this.state.regionThree != 'undefined') || this.state.language_country === '' || this.state.legoText === '')) || (this.state.gender === 'neutral' && ((this.state.imgs.length === 0) || (this.state.audioOneUrl === '' && typeof this.state.regionOne != 'undefined') || (this.state.audioTwoUrl === '' && typeof this.state.regionTwo != 'undefined') || (this.state.audioThreeUrl === '' && typeof this.state.regionThree != 'undefined') || (this.state.audioFourUrl === '' && typeof this.state.regionOne != 'undefined') || (this.state.audioFiveUrl === '' && typeof this.state.regionTwo != 'undefined') || (this.state.audioSixUrl === '' && typeof this.state.regionThree != 'undefined') || this.state.language_country === '' || this.state.legoText === ''))} onClick={this._uploadContent}/>
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

    //Images------------------------------------------------------------------
    handleImageUpload(e) {
        e.preventDefault();

        let files = Array.prototype.slice.call(e.target.files);

        if (this.state.gender === 'neutral')
            files = files.slice(0, Math.max(0, 2 - this.state.imgs.length))
        else if (this.state.gender === 'male' || this.state.gender === 'female')
            files = files.slice(0, Math.max(0, 1 - this.state.imgs.length))

        for (let file of files) {

            const reader = new FileReader()
            reader.readAsDataURL(file)

            let gender = 'male'

            if (this.state.gender === 'female')
                gender = 'female'

            reader.onload = () => {
                this.setState((prevState) => ({
                    imgs: prevState.imgs.concat([
                        {
                            'file': file,
                            'url': reader.result,
                            'gender': gender
                        }
                    ])
                }))
            }

            reader.onerror = function(error) {
                console.log('Error: ', error);
            }

        }

    }

    handleImageDelete(index) {
        this.setState((prevState) => ({
            imgs: [
                ...prevState.imgs.slice(0, index),
                ...prevState.imgs.slice(index + 1)
            ]
        }))
    }

    handleImageGenderChange(index, event) {
        event.persist()

        this.setState((prevState) => ({
            imgs: [
                ...prevState.imgs.slice(0, index),
                Object.assign({}, prevState.imgs[index], {'gender': event.target.value}),
                ...prevState.imgs.slice(index + 1)
            ]
        }))
    }

    getImagePreviews() {
        return this.state.imgs.map((img, index) => {
            return (
                <div className="img-preview" key={index}>
                    <i className="fa fa-close" onClick={() => this.handleImageDelete(index)}/>
                    <img src={img.url}/>
                    <RadioButtonGroup name="img-gender" valueSelected={img.gender} onChange={this.handleImageGenderChange.bind(this, index)} style={{
                        marginTop: '10px'
                    }} className={this.state.gender != 'neutral'
                        ? 'inactive'
                        : ''}>
                        <RadioButton value="male" label="Male" style={styles.radioButton}/>
                        <RadioButton value="female" label="Female" style={styles.radioButton}/>
                    </RadioButtonGroup>
                </div>
            )
        })
    }

    //-------------------------------------------------------------

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

            let imgs = []
            for (let img of this.state.imgs) {

                imgs.push({"file": img.url, "gender": img.gender})
            }

            let maleAudioFiles = []
            let femaleAudioFiles = []

            if (typeof this.state.regionOne != 'undefined')
                maleAudioFiles.push({"region": this.state.regionOne, "file": this.state.audioOneUrl})

            if (typeof this.state.regionTwo != 'undefined')
                maleAudioFiles.push({"region": this.state.regionTwo, "file": this.state.audioTwoUrl})

            if (typeof this.state.regionThree != 'undefined')
                maleAudioFiles.push({"region": this.state.regionThree, "file": this.state.audioThreeUrl})

            if (typeof this.state.regionOne != 'undefined')
                femaleAudioFiles.push({"region": this.state.regionOne, "file": this.state.audioFourUrl})

            if (typeof this.state.regionTwo != 'undefined')
                femaleAudioFiles.push({"region": this.state.regionTwo, "file": this.state.audioFiveUrl})

            if (typeof this.state.regionThree != 'undefined')
                femaleAudioFiles.push({"region": this.state.regionThree, "file": this.state.audioSixUrl})

            jQuery.ajax({
                method: "PUT",
                data: JSON.stringify({
                    "country": country,
                    "language": language,
                    "words": [
                        {
                            "word": this.state.legoText,
                            "images": imgs,
                            "audio": {
                                "files": [
                                    {
                                        "gender": "male",
                                        "files": maleAudioFiles

                                    }, {
                                        "gender": "female",
                                        "files": femaleAudioFiles
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
                error: () => {
                    this.setState({isUploading: false})
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

            let validOne = true;
            let validTwo = true;
            let validThree = true;

            if (typeof nameOne != 'undefined' && typeof this.state.regionOne != 'undefined') {
                nameOne = nameOne.substr(0, nameOne.lastIndexOf('.'))
                validOne = ((nameOne.includes(this.state.regionOne) || nameOne.includes(this.state.regionOne.toLowerCase())) && (nameOne.includes('male') || nameOne.includes('Male')))
            }

            if (typeof nameTwo != 'undefined' && typeof this.state.regionTwo != 'undefined') {
                nameTwo = nameTwo.substr(0, nameTwo.lastIndexOf('.'))
                validTwo = ((nameTwo.includes(this.state.regionTwo) || nameTwo.includes(this.state.regionTwo.toLowerCase())) && (nameTwo.includes('male') || nameTwo.includes('Male')))
            }

            if (typeof nameThree != 'undefined' && typeof this.state.regionThree != 'undefined') {
                nameThree = nameThree.substr(0, nameThree.lastIndexOf('.'))
                validThree = ((nameThree.includes(this.state.regionThree) || nameThree.includes(this.state.regionThree.toLowerCase())) && (nameThree.includes('male') || nameThree.includes('Male')))
            }

            maleValidation = validOne && validTwo && validThree
        }

        if (this.state.gender === 'female' || this.state.gender === 'neutral') {
            let nameFour = this.state.audioFourFile.name
            let nameFive = this.state.audioFiveFile.name
            let nameSix = this.state.audioSixFile.name

            let validFour = true;
            let validFive = true;
            let validSix = true;

            if (typeof nameFour != 'undefined' && typeof this.state.regionOne != 'undefined') {
                nameFour = nameFour.substr(0, nameFour.lastIndexOf('.'))
                validFour = ((nameFour.includes(this.state.regionOne) || nameFour.includes(this.state.regionOne.toLowerCase())) && (nameFour.includes('female') || nameFour.includes('Female')))
            }

            if (typeof nameFive != 'undefined' && typeof this.state.regionTwo != 'undefined') {
                nameFive = nameFive.substr(0, nameFive.lastIndexOf('.'))
                validFive = ((nameFive.includes(this.state.regionTwo) || nameFive.includes(this.state.regionTwo.toLowerCase())) && (nameFive.includes('female') || nameFive.includes('Female')))
            }

            if (typeof nameSix != 'undefined' && typeof this.state.regionThree != 'undefined') {
                nameSix = nameSix.substr(0, nameSix.lastIndexOf('.'))
                validSix = ((nameSix.includes(this.state.regionThree) || nameSix.includes(this.state.regionThree.toLowerCase())) && (nameSix.includes('female') || nameSix.includes('Female')))
            }

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
        event.persist()
        this.setState({gender: event.target.value});

        if ((event.target.value === 'male' || event.target.value === 'female') && this.state.imgs.length >= 1) {
            this.setState((prevState) => ({
                imgs: [Object.assign({}, prevState.imgs[0], {'gender': event.target.value})]
            }));

        }
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

}
