import React from 'react'
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';
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

export default class ContentPortalUploadPage extends React.Component {
    render() {
        return (
            <div className="upload-page">
                <div className="text-center upload col-md-6 col-md-offset-3">
                    <i className="material-icons pull-left">arrow_back</i>
                    <div className="col-md-12">
                        <p id="main-text">Hello,
                            <b>John</b>
                        </p>
                        <p id="desc-text">Please tell us about the content upload.</p>
                    </div>
                    <div className="big-text text-left col-md-8 col-md-offset-2">
                        What Language-Country pair does the lego belong to?
                        <SelectField hintText="Language-Country"style={{
                            width: '100%'
                        }}></SelectField>
                    </div>
                    <div id="lego-text" className="big-text text-left col-md-8 col-md-offset-2">
                        What is the lego text?
                        <TextField hintText="Lego text" style={{
                            width: '100%'
                        }}></TextField>
                    </div>
                    <div className="big-text text-left col-md-2 col-md-offset-2">
                        <RadioButtonGroup defaultSelected="male">
                            <RadioButton value="male" label="Male" style={styles.radioButton}/>
                            <RadioButton value="female" label="Female" style={styles.radioButton}/>
                            <RadioButton value="neutral" label="Neutral" style={styles.radioButton}/>
                        </RadioButtonGroup>
                    </div>
                    <div className="big-text text-left col-md-4">
                        <div id="add-picture" className="text-center">+ Add Picture</div>
                    </div>
                    <div id="audio" className="big-text text-left col-md-8 col-md-offset-2">
                        Audio Files
                    </div>
                    <div id="chips" className="big-text text-left col-md-8 col-md-offset-2">
                      <p className="pull-left">
                        +
                      </p>
                        <Chip className="pull-left" style={styles.chip}>
                            Madrid
                        </Chip>
                        <Chip className="pull-left" style={styles.chip}>
                            Basque Country
                        </Chip>
                        <Chip className="pull-left" style={styles.chip}>
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
}
