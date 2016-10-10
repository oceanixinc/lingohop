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
            imgFile: '',
            audioOneFile: '',
            audioTwoFile: '',
            audioThreeFile: '',
            imagePreviewUrl: '',
            audioOneUrl: '',
            audioTwoUrl: '',
            audioThreeUrl: '',
            audioOnePlaying: false,
            audioTwoPlaying: false,
            audioThreePlaying: false,
            language_country:null
        };

        this._handleImageUpload = this._handleImageUpload.bind(this);
        this._handleAudioOneUpload = this._handleAudioOneUpload.bind(this);
        this._handleAudioTwoUpload = this._handleAudioTwoUpload.bind(this);
        this._handleAudioThreeUpload = this._handleAudioThreeUpload.bind(this);
        this._clickAudioOne = this._clickAudioOne.bind(this);
        this._clickAudioTwo = this._clickAudioTwo.bind(this);
        this._clickAudioThree = this._clickAudioThree.bind(this);
        this.handleLanguageChange = this.handleLanguageChange.bind(this);

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
                        <SelectField
                          value={this.state.language_country}
                          onChange={this.handleLanguageChange.bind(this, 'language_country')}
                           hintText="Language-Country"
                           style={{
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
                    <div className="big-text text-left col-md-4">
                        <div id="add-picture" className="text-center">+ Add Picture
                            <img className={this.state.imagePreviewUrl === '' && 'inactive'} src={this.state.imagePreviewUrl}/>
                            <input className="fileInput" type="file" onChange={this._handleImageUpload}/>
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

                        <Chip className="pull-left" style={styles.chip} onTouchTap={this._clickAudioOne}>
                            <Avatar icon={< i id = "audio-one-icon" className = "material-icons pull-left" > add < /i>}/>
                            Madrid
                        </Chip>
                        <Chip className="pull-left" style={styles.chip} onTouchTap={this._clickAudioTwo}>
                            <Avatar icon={< i id = "audio-two-icon" className = "material-icons pull-left" > add < /i>}/>
                            Basque Country
                        </Chip>
                        <Chip className="pull-left" style={styles.chip} onTouchTap={this._clickAudioThree}>
                            <Avatar icon={< i id = "audio-three-icon" className = "material-icons pull-left" > add < /i>}/>
                            Catalonia
                        </Chip>
                    </div>
                    <div className="col-md-12">
                        <RaisedButton label="UPLOAD" className="upload-btn" primary={true}/>
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

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({imgFile: file, imagePreviewUrl: reader.result});
        }

        reader.readAsDataURL(file)
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

//
    handleLanguageChange(name, event, index, value) {
      var change = {};
     change[name] = value;
       this.setState(change);

     };
}
