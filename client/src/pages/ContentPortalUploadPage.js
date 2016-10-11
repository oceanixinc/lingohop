import React from 'react'
import {Link} from 'react-router'
import jQuery from 'jquery';

import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
    chip: {
        margin: 4
    },
    radioButton: {
        marginBottom: 16
    }
};

const language_items = [];

export default class ContentPortalUploadPage extends React.Component {

    constructor() {
        super();

        this.state = {
            imgFiles: [],
            audioOneFile: '',
            audioTwoFile: '',
            audioThreeFile: '',
            audioOneUrl: '',
            audioTwoUrl: '',
            audioThreeUrl: '',
            audioOnePlaying: false,
            audioTwoPlaying: false,
            audioThreePlaying: false,
            language_country: ''
        };

        this._handleImageUpload = this._handleImageUpload.bind(this);
        this._handleAudioOneUpload = this._handleAudioOneUpload.bind(this);
        this._handleAudioTwoUpload = this._handleAudioTwoUpload.bind(this);
        this._handleAudioThreeUpload = this._handleAudioThreeUpload.bind(this);
        this._clickAudioOne = this._clickAudioOne.bind(this);
        this._clickAudioTwo = this._clickAudioTwo.bind(this);
        this._clickAudioThree = this._clickAudioThree.bind(this);
        this.handleLanguageChange = this.handleLanguageChange.bind(this);
        this._uploadContent = this._uploadContent.bind(this);
        this._uploadTest = this._uploadTest.bind(this);
        this._fetchLanguageCountry = this._fetchLanguageCountry.bind(this);
    }

    componentWillMount() {
        this._fetchLanguageCountry();
    }

    render() {
        return (
            <div className="upload-page">
                <div className="text-center upload col-md-6 col-md-offset-3">
                    <Link to="/contentportal">
                        <i className="material-icons pull-left">arrow_back</i>
                    </Link>
                    <div className="col-md-12">
                        <p id="main-text">Hello,
                            <b>John</b>
                        </p>
                        <p id="desc-text">Please tell us about the content upload.</p>
                    </div>
                    <div className="big-text text-left col-md-8 col-md-offset-2">
                        What Language-Country pair does the lego belong to?
                        <SelectField value={this.state.language_country} onChange={this.handleLanguageChange.bind(this, 'language_country')} hintText="Language-Country" style={{
                            width: '100%'
                        }}>
                            {language_items}
                        </SelectField>
                    </div>
                    <div id="lego-text" className="big-text text-left col-md-8 col-md-offset-2">
                        What is the lego text?
                        <TextField hintText="Lego text" style={{
                            width: '100%'
                        }}></TextField>
                    </div>
                    <div className="big-text text-left col-md-2 col-md-offset-2">
                        <RadioButtonGroup name="gender" defaultSelected="male">
                            <RadioButton value="male" label="Male" style={styles.radioButton}/>
                            <RadioButton value="female" label="Female" style={styles.radioButton}/>
                            <RadioButton value="neutral" label="Neutral" style={styles.radioButton}/>
                        </RadioButtonGroup>
                    </div>
                    <div className="big-text text-left col-md-8">
                        <div id="add-picture" className="pull-left text-center">+ Add Picture
                            <input className="fileInput" type="file" multiple onChange={this._handleImageUpload}/>
                        </div>
                        <div id="img-gallery" className="pull-left">

                        </div>
                    </div>
                    <div id="audio" className="big-text text-left col-md-8 col-md-offset-2">
                        Audio Files
                    </div>
                    <div id="chips" className="big-text text-left col-md-8 col-md-offset-2">
                        <input className="fileInput" id="audio-upload-one" type="file" onChange={this._handleAudioOneUpload}/>
                        <input className="fileInput" id="audio-upload-two" type="file" onChange={this._handleAudioTwoUpload}/>
                        <input className="fileInput" id="audio-upload-three" type="file" onChange={this._handleAudioThreeUpload}/>
                        <audio controls id="audio-one">
                            <source src={this.state.audioOneUrl} type="audio/mp3"/>
                        </audio>
                        <audio controls id="audio-two">
                            <source src={this.state.audioTwoUrl} type="audio/mp3"/>
                        </audio>
                        <audio controls id="audio-three">
                            <source src={this.state.audioThreeUrl} type="audio/mp3"/>
                        </audio>

                        <Chip id="chip-one" className="pull-left" style={styles.chip} onTouchTap={this._clickAudioOne}>
                            <Avatar icon={< i id = "audio-one-icon" className = "material-icons pull-left" > add < /i>}/>
                            Madrid
                        </Chip>
                        <Chip id="chip-two" className="pull-left" style={styles.chip} onTouchTap={this._clickAudioTwo}>
                            <Avatar icon={< i id = "audio-two-icon" className = "material-icons pull-left" > add < /i>}/>
                            Basque Country
                        </Chip>
                        <Chip id="chip-three" className="pull-left" style={styles.chip} onTouchTap={this._clickAudioThree}>
                            <Avatar icon={< i id = "audio-three-icon" className = "material-icons pull-left" > add < /i>}/>
                            Catalonia
                        </Chip>
                    </div>
                    <div className="col-md-12">
                        <RaisedButton label="UPLOAD" className="upload-btn" primary={true} onClick={this._uploadContent}/>
                    </div>

                </div>
            </div>
        )
    }

    componentDidMount() {
        document.body.style.backgroundColor = "rgb(244,244,244)" // Set the style
    }

    //Uploads
    _handleImageUpload(e) {
        e.preventDefault();

        let files = e.target.files;
        let reader = new FileReader();

        let imgGallery = document.getElementById("img-gallery");
        imgGallery.innerHTML = "";

        this.setState({imgFiles: files});


        for (let file of files) {
          var img = document.createElement('img');
          img.innerHTML = "<img src='"+URL.createObjectURL(file)+"'/>";

          while (img.firstChild) {
              imgGallery.appendChild(img.firstChild);
          }
        }

    }

    _handleAudioOneUpload(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({audioOneFile: file, audioOneUrl: reader.result});
            document.getElementById("audio-one-icon").innerHTML = "play_arrow";
        }
        reader.readAsDataURL(file)
    }

    _handleAudioTwoUpload(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({audioTwoFile: file, audioTwoUrl: reader.result});
            document.getElementById("audio-two-icon").innerHTML = "play_arrow";

        }

        reader.readAsDataURL(file)
    }

    _handleAudioThreeUpload(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({audioThreeFile: file, audioThreeUrl: reader.result});
            document.getElementById("audio-three-icon").innerHTML = "play_arrow";

        }

        reader.readAsDataURL(file)
    }

    //Audio Previews
    _clickAudioOne() {
        if (this.state.audioOneUrl === '')
            document.getElementById("audio-upload-one").click();
        else {
            if (!this.state.audioOnePlaying) {
                document.getElementById("audio-one").load();
                document.getElementById("audio-one").play();
                this.setState({audioOnePlaying: true});
                document.getElementById("audio-one-icon").innerHTML = "stop";

            } else {
                document.getElementById("audio-one").pause();
                this.setState({audioOnePlaying: false});
                document.getElementById("audio-one-icon").innerHTML = "play_arrow";

            }
        }
    }

    _clickAudioTwo() {
        if (this.state.audioTwoUrl === '')
            document.getElementById("audio-upload-two").click();
        else {
            if (!this.state.audioTwoPlaying) {
                document.getElementById("audio-two").load();
                document.getElementById("audio-two").play();
                this.setState({audioTwoPlaying: true});
                document.getElementById("audio-two-icon").innerHTML = "stop";

            } else {
                document.getElementById("audio-two").pause();
                this.setState({audioTwoPlaying: false});
                document.getElementById("audio-two-icon").innerHTML = "play_arrow";

            }
        }
    }

    _clickAudioThree() {
        if (this.state.audioThreeUrl === '')
            document.getElementById("audio-upload-three").click();
        else {
            if (!this.state.audioThreePlaying) {
                document.getElementById("audio-three").load();
                document.getElementById("audio-three").play();
                this.setState({audioThreePlaying: true});
                document.getElementById("audio-three-icon").innerHTML = "stop";

            } else {
                document.getElementById("audio-three").pause();
                this.setState({audioThreePlaying: false});
                document.getElementById("audio-three-icon").innerHTML = "play_arrow";

            }
        }
    }

    //API Calls
    _fetchLanguageCountry() {

        jQuery.ajax({
            method: 'GET',
            dataType: "json",
            url: 'api/blogposts.json',
            success: (res) => {
                console.log('success')
                for (let language of res) {
                    let itemIndex = res.indexOf(language);
                    let value = language.language + '-' + language.country;
                    let key = language.id + '-' + language.language + '-' + language.country;
                    let item = (<MenuItem value={language.id} key={key} primaryText={value}/>);
                    language_items.push(item);
                }
            }
        })

    }

    _uploadTest() {

        let fd = new FormData();

        for (let file of this.state.imgFiles){
          fd.append('fileToUpload', file);
          jQuery.ajax({
              method: "POST",
              data: fd,
              processData: false,
              contentType: false,
              url: 'http://localhost/upload/upload.php',
              success: (res) => {
                  console.log('Uploaded successfully')
              }
          })
        }

        fd.append('fileToUpload', this.state.audioOneFile);
        jQuery.ajax({
            method: "POST",
            data: fd,
            processData: false,
            contentType: false,
            url: 'http://localhost/upload/upload.php',
            success: (res) => {
                console.log('Uploaded successfully')
            }
        })

        fd.append('fileToUpload', this.state.audioTwoFile);
        jQuery.ajax({
            method: "POST",
            data: fd,
            processData: false,
            contentType: false,
            url: 'http://localhost/upload/upload.php',
            success: (res) => {
                console.log('Uploaded successfully')
            }
        })

        fd.append('fileToUpload', this.state.audioThreeFile);
        jQuery.ajax({
            method: "POST",
            data: fd,
            processData: false,
            contentType: false,
            url: 'http://localhost/upload/upload.php',
            success: (res) => {
                console.log('Uploaded successfully')
            }
        })

    }

    _uploadContent() {

        jQuery.ajax({
            method: "POST",
            data: {
                "country": "Spain",
                "languages": {
                    "spanish": {
                        "word": {
                            "images": [
                                {
                                    "ID": "999e210c-a425-4360-8e25-791d9bd1539c",
                                    "file": this.state.imgFiles[0]
                                }
                            ],
                            "audio": {
                                "ID": "7f4557c3-8f69-4e64-a173-c2058910fff6",
                                "files": {
                                    "male": {
                                        "default": {
                                            "file": this.state.audioOneFile
                                        },
                                        "region1": {
                                            "file": this.state.audioTwoFile
                                        }
                                    },
                                    "female": {
                                        "default": {
                                            "file": this.state.audioOneFile
                                        },
                                        "region1": {
                                            "file": this.state.audioTwoFile
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

            },
            dataType: "json",
            processData: false,
            contentType: false,
            url: 'http://testing.lingohop.com/api/contents/',
            success: (res) => {
                console.log('Uploaded successfully')
            }
        })

    }

    //
    handleLanguageChange(name, event, index, value) {
        var change = {};
        change[name] = value;
        this.setState(change);

    };
}
