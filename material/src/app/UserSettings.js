 /**
  * DiscoverPanel.js
  * In the home page, we have a panel
  */

import React from 'react';
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as Colors from 'material-ui/styles/colors';
import { Link } from 'react-router'
import NavigationApps from 'material-ui/svg-icons/navigation/apps';
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';
import Avatar from 'material-ui/Avatar';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ContentFilter from 'material-ui/svg-icons/content/filter-list';
import SocialPerson from 'material-ui/svg-icons/social/person';
import SocialGroup from 'material-ui/svg-icons/social/group';
import ActionList from 'material-ui/svg-icons/action/list';
import FileFileDownload from 'material-ui/svg-icons/file/file-download';
import Menu from 'material-ui/Menu';
import Popover from 'material-ui/Popover';
import Divider from 'material-ui/Divider';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import {List, ListItem} from 'material-ui/List';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';


var auth = require('./auth')


const styles = {
  smallIcon: {
    width: 30,
    height: 30,
  },
  mediumIcon: {
    width: 48,
    height: 48,
  },
  largeIcon: {
    width: 60,
    height: 60,
  },
  small: {
    // width: 72,
    // height: 72,
    width: 27,
    height: 27,
    padding: 5,
  },
  medium: {
    width: 96,
    height: 96,
    // padding: 24,
  },
  large: {
    width: 120,
    height: 120,
    // padding: 30,
  },
};


const buttonStyle = {
  margin: 12,
  marginTop: 60,
  marginLeft : 140,
  // backgroundColor: Colors.cyan500,
  // background: Colors.cyan500,
};

const mediaTitleStyles = {

  title:{
    fontSize: 20,
    // fontWeight: 'bold',
    lineHeight: '20px',
  },
  subtitle:{
    fontSize: 12,
    marginTop: 20,
    // fontWeight: 'bold',
  },

};

const flagstyle = {
  height: 30,
  width: 30,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
  overflow:'hidden',
};
const flag = {
 borderRadius: 32,
 width: 32,
 height: 32,
 backgroundImage:'url("static/photos/flag_england.svg")',
 backgroundPosition: 'center',
 overflowX: 'visible',
 overflow: 'visible'
};

const flexContainer = {
  display: 'flex',
  flexDirection: 'row',
  padding: 0,
  width: 200,
  height: 120,
};

const flex1Container = {
  display: 'flex',
  flexDirection: 'row',
  
};

// const UserSettingPanel = () => (

class  UserSettingPanel  extends React.Component {

  constructor(props) {
    super(props);

    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.logoutHandler = this.logoutHandler.bind(this);
    this.state = {
      profile: false,
      language: false,
      setting: false,
    };
  };

  handleTouchTap(name, event, index, value) {
    // This prevents ghost click.
   
    event.preventDefault();
    var change = {};
    change[name] = true;
    change['anchorEl'] = event.currentTarget;
    console.log(change);
    console.log(event);
    console.log(index);
    console.log(value);
    this.setState(change)

    // this.setState({
      
    //   anchorEl: event.currentTarget,
    // });
    // console.log(this.state);
  };

   // handleChange(name, event, index, value) { 
   //   var change = {};
   //  change[name] = value;
   //  console.log(change);
   //    this.setState(change);

   //  };


  handleRequestClose(name, event, index, value) {
    var change = {};
    change[name] = false;
    this.setState(change)
    // this.setState({
    //   open: false,
    // });
  };

    logoutHandler() {
      console.log('called logout handler');
       delete localStorage.token
        // auth.logout()
        //  this.setState({
        //   userlogin: false
        // });
    };

    componentDidMount() {
    console.log('mount setting');
      
    };


    componentWillUnmount() {
      console.log('unmount setting');
};

 componentDidUnmount() {
    console.log('Did Unmount login');
   };


  render() {
    return (
      <div>
       
        <IconButton style={{width: '', height: '', padding: ''}} iconStyle={{width:18, height:18}}
        onTouchTap={this.handleTouchTap.bind(this, 'setting')} 
        >
        <NavigationApps />

        </IconButton>
        
        <Popover
          open={this.state.setting}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'bottom', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'bottom', vertical: 'top'}}
          onRequestClose={this.handleRequestClose.bind(this, 'setting')}
        >

                <List 


          style={flexContainer}>
    <ListItem  >
     <IconButton
      iconStyle={styles.smallIcon}
      style={styles.small}
    >
      <ActionList />
    </IconButton>
      </ListItem>

 <ListItem >
     <IconButton
      iconStyle={styles.smallIcon}
      style={styles.small}
    >
      <SocialPerson />
    </IconButton>
      </ListItem>
       <ListItem  >
     <IconButton
      iconStyle={styles.smallIcon}
      style={styles.small}
    >
      <SocialGroup />
    </IconButton>
      </ListItem>      
    
  </List>
      

  
        </Popover>

         <IconButton style={{paddingBottom: 5, width: '', height: '', padding: '', top: -2}}
        onTouchTap={this.handleTouchTap.bind(this, 'language')} 
        >
                      <Avatar size={15} src="static/photos/flag_england.svg" 

   /> 

        </IconButton>
        
        <Popover
          open={this.state.language}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'bottom', vertical: 'top'}}
          onRequestClose={this.handleRequestClose.bind(this, 'language')}
        >
          <Menu 



          style={{textAlign:'center'}} listStyle={{ 
color: 'rgba(32, 27, 27, 0.27)',}}>
           <span

           style={{
            align: 'center',
            fontWeight: 'bold',
color: 'rgba(32, 27, 27, 0.27)',

           }}

           >Your Languages</span>
             <MenuItem style={{textAlign:'right', fontSize: 13,color: 'rgba(32, 27, 27, 0.27)'}} primaryText="Spanish - Spain" leftIcon={<Avatar style={{width: 18, height: 18}}  src="static/photos/flag_england.svg" 

   /> } />
        <MenuItem style={{textAlign:'right', fontSize: 13,color: 'rgba(32, 27, 27, 0.27)'}} primaryText="Spanish - Mexico" leftIcon={<Avatar style={{width: 18, height: 18}}  src="static/photos/flag_england.svg" 

   /> } />
        <MenuItem style={{textAlign:'right', fontSize: 13,color: 'rgba(32, 27, 27, 0.27)'}} primaryText="Add Language" leftIcon={<ContentAddCircle/ >} />
          </Menu>
        </Popover>

         <IconButton 
        onTouchTap={this.handleTouchTap.bind(this, 'profile')} 
        >
        <Avatar src="static/photos/person1.png" 
        size={30}
     //    style={{ width: '30',
     //  float: 'left',
     // height: '30', backgroundColor: 'rgba(0, 0, 0, 0)', marginTop:8}}
      /> 

        </IconButton>
        
        <Popover style={{padding: 0}}
          open={this.state.profile}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose.bind(this, 'profile')}
        >
          <Menu

          style={{textAlign:'center', paddingBottom:0, width: 200}}

          >
            <MenuItem >

             <Avatar src="static/photos/person1.png" 
        size={30}

       
   
      /> 
      <div>
       <span

           style={{
            fontSize: 12,
            fontWeight: 'bold',
color: 'rgba(32, 27, 27, 0.27)',

           }}

           >Jessica Lee</span>
           </div>
      </MenuItem>
            <MenuItem  
            // onTouchTap={this.logoutHandler} 
            onTouchTap={this.props.handleLogout} 
            style={{lineHeight: '20px', fontSize: 12, padding:12}} primaryText="SIGN OUT" />
          </Menu>
        </Popover>
      </div>
    );
  }
}

export default UserSettingPanel;

