import React from 'react';
import * as Colors from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';
import SvgIcon from 'material-ui/SvgIcon';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';

import {
    Card,
    CardActions,
    CardHeader,
    CardMedia,
    CardTitle,
    CardText
} from 'material-ui/Card';

import FrontVideoComponent from './Frontheader'; // Our custom react component
import DiscoverPanel from './DiscoverPanel'; // Our custom react component
import ExperiencePanel from './ExperiencePanel'; // Our custom react component
import BottomCardsPanelComponent from './components/BottomCardsPanelComponent';
import CustomTheme from './CustomTheme';


class ExperienceLabel extends React.Component {
    render() {

        return (
            <div style={{
                textAlign: 'center',
                marginTop: 30
            }}>

                <CardTitle title="An experience just for you" subtitle="Learn a language based on your unique needs."/>

            </div>
        );
    }
}

const ArrowIcon = (props) => (
    <SvgIcon {...props}>
        <path d="M9 3L7.94 4.06l4.19 4.19H3v1.5h9.13l-4.19 4.19L9 15l6-6z"/>
    </SvgIcon>
);

const muiTheme = getMuiTheme({
    fontFamily: 'Roboto, sans-serif',
    palette: {
        textColor: Colors.darkBlack,
        primary1Color: Colors.white,
        primary2Color: Colors.indigo700,
        accent1Color: Colors.redA200,
        pickerHeaderColor: Colors.darkBlack
    },
    appBar: {
        height: 60
    }
});

const titleStyles = {
    title: {
        cursor: 'pointer'

    },
    color: {
        color: Colors.darkBlack
    },
    align: {

        verticalAlign: 'middle'
    }
};

const textfieldStyles = {
    margin: {
        marginRight: 20

    }
};

class Home extends React.Component {
    render() {

        return (
            <MuiThemeProvider muiTheme={CustomTheme}>
                <div>
                    <FrontVideoComponent/>
                    <DiscoverPanel/>
                    <ExperienceLabel/>
                    <ExperiencePanel/>
                    <BottomCardsPanelComponent/>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default Home;
