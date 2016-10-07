import React from 'react';
import Paper from 'material-ui/Paper';
import {
    Card,
    CardActions,
    CardHeader,
    CardMedia,
    CardTitle,
    CardText
} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const style = {
    height: 270,
    width: 280,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
    overflow: 'hidden',
    padding: 0
};

const buttonStyle = {
    margin: 12,
    marginTop: 60,
    marginLeft: 140
};

const imageStyle = {
    width: '30%',
    height: 'auto',
    marginTop: 10
};
const nameStyle = {
    marginTop: 10,
    marginBottom: 15
};

const cardStyle = {
    padding: 0
};

const firstNameStyle = {
    color: 'rgba(23, 20, 20, 0.46)'
};
const mediaTitleStyles = {

    title: {
        fontSize: 20,
        lineHeight: '20px'
    },
    subtitle: {
        fontSize: 12
    }
};

const ExperiencePanel = () => (
    <div style={{
        textAlign: 'center',
        marginTop: 0
    }}>
        <Paper style={style} zDepth={1}>
            <img src='assets/img/person1.png' style={imageStyle}/>
            <div style={nameStyle}>
                <span style={firstNameStyle}>Alex
                </span>
                <span>
                    : Study Aboard</span>
            </div>
            <CardTitle style={cardStyle} titleStyle={mediaTitleStyles.title} subtitleStyle={mediaTitleStyles.subtitle} subtitle="1. Engaging in the classroom"/>
            <CardTitle style={cardStyle} titleStyle={mediaTitleStyles.title} subtitleStyle={mediaTitleStyles.subtitle} subtitle="2. Connecting with host family"/>

            <CardTitle style={cardStyle} titleStyle={mediaTitleStyles.title} subtitleStyle={mediaTitleStyles.subtitle} subtitle="3. Being prepared for foreign life"/>

        </Paper>
        <Paper style={style} zDepth={1}>
            <img src='assets/img/person2.png' style={imageStyle}/>
            <div style={nameStyle}>
                <span style={firstNameStyle}>Sarah
                </span>
                <span>
                    : Vacation</span>
            </div>
            <CardTitle style={cardStyle} titleStyle={mediaTitleStyles.title} subtitleStyle={mediaTitleStyles.subtitle} subtitle="1. Travelling to various cities"/>
            <CardTitle style={cardStyle} titleStyle={mediaTitleStyles.title} subtitleStyle={mediaTitleStyles.subtitle} subtitle="2. Being prepared for foreign life"/>

            <CardTitle style={cardStyle} titleStyle={mediaTitleStyles.title} subtitleStyle={mediaTitleStyles.subtitle} subtitle="3. Going out for food or drinks "/>
        </Paper>
        <Paper style={style} zDepth={1}>
            <img src='assets/img/person3.png' style={imageStyle}/>
            <div style={nameStyle}>
                <span style={firstNameStyle}>Marc
                </span>
                <span>
                    : business trip</span>
            </div>
            <CardTitle style={cardStyle} titleStyle={mediaTitleStyles.title} subtitleStyle={mediaTitleStyles.subtitle} subtitle="1. Conducting professional conversations"/>
            <CardTitle style={cardStyle} titleStyle={mediaTitleStyles.title} subtitleStyle={mediaTitleStyles.subtitle} subtitle="2. Understanding the cultural norms"/>

            <CardTitle style={cardStyle} titleStyle={mediaTitleStyles.title} subtitleStyle={mediaTitleStyles.subtitle} subtitle="3. Moving around the city with ease"/>
        </Paper>

    </div>
);

export default ExperiencePanel;
