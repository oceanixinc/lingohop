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
import * as Colors from 'material-ui/styles/colors';
import {Link} from 'react-router'

const style = {
    height: 270,
    width: 423,
    textAlign: 'left',
    display: 'inline-block',
    overflow: 'hidden'
};

const buttonStyle = {
    margin: 12,
    marginTop: 60,
    marginLeft: 140
};

const mediaTitleStyles = {

    title: {
        fontSize: 20,
        lineHeight: '20px'
    },
    subtitle: {
        fontSize: 12,
        marginTop: 20
    }
};

const DiscoverPanel = () => (
    <div style={{
        textAlign: 'center',
        marginTop: 30
    }}>
        <Paper style={style} zDepth={1}>
            <img src='assets/img/paris.png' style={{
                width: '100%',
                height: 'auto'
            }}/>
        </Paper>
        <Paper style={style} zDepth={2}>
            <CardTitle titleStyle={mediaTitleStyles.title} subtitleStyle={mediaTitleStyles.subtitle} title="Speaking a new language opens up a world of opportunity" subtitle="You're an adventurer, not a tourist. Your journey begins with Lingohop."/>
            <RaisedButton containerElement={< Link to = "/signup" />} label="See What You Can Learn" backgroundColor="#00BCD4" labelColor="#ffffff" style={buttonStyle}/>
        </Paper>
    </div>
);

export default DiscoverPanel;
