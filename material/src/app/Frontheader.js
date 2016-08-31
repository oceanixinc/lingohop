import React from 'react';
import * as Colors from 'material-ui/styles/colors';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import ReactPlayer from 'react-player';
import TextField from 'material-ui/TextField';
import SelectLangaugeCountry from './LanguageTripSelection';
// class Video extends React.Component {
//   render () {
//     return <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' playing />
//   }
// }



const mediaStyles = {
 
  color:{
    color: Colors.pink50
  }
};
const mediaTitleStyles = {
 
  titleStyle:{
   
    position: 'relative',
    top: 20,
   
    textAlign: 'center',
    background: 'red',
  
  },
  container:{
    position: 'relative',
    background: 'blue',
   
  },
  content:{
   position: 'relative',
    background: 'rgba(0,0,0,0)',
    textAlign: 'center',
    top: 40,
    
  },
  title:{
    fontSize: 35,
    fontWeight: 'bold',
  },
  subtitle:{
    fontSize: 35,
    fontWeight: 'bold',
  },
  media:{
    // width: '100%',
    // height: '100%',
    // height: 0
  }
};


const headerLowerStyles = {
 
  title:{
    textAlign: 'center',
    fontSize: 17,
    color: 'rgba(0, 0, 0, 0.73)',
  }
};

const CardExampleWithAvatar = () => (
  <Card>
   
    <CardMedia style={{background: '#9E9E9E'}}
     overlay={<CardTitle title="LIVE THE LANGUAGE" subtitle="Learn a language based on the situations that are relevant to you." />}
     overlayContentStyle={mediaTitleStyles.content}
     titleStyle = {mediaTitleStyles.title} subtitleStyle={mediaTitleStyles.subtitle}
    >
    
    
    <ReactPlayer url="static/videos/video.mp4" width="460" height="360" ></ReactPlayer>
    </CardMedia>
    <CardTitle title="" subtitleStyle={headerLowerStyles.title} subtitle="Start having conversations in your new language today - try if free!" />
   
    <SelectLangaugeCountry/>
   
  </Card>
);

export default CardExampleWithAvatar;