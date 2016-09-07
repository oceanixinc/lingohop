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



const style = {
  height: 270,
  width: 423,
  // margin: 20,
  textAlign: 'left',
  display: 'inline-block',
  overflow:'hidden',
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
    <ListItem style={{width: 50, padding: 12}}
      leftIcon={<ActionList />}
      >
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
     

          
            <MenuItem  style={{lineHeight: '20px', fontSize: 12, padding:12}} primaryText="SIGN OUT" />
          </Menu>
        </Popover>
      </div>
    );
  }
}
  // class UserSettingPanel extends React.Component {
   // <MuiThemeProvider>




 //   <div>
 //    <IconMenu
 //        iconButtonElement={<NavigationApps style={{height:17,width: 17, float: 'left', paddingBottom: 5}}/>}
 //         anchorOrigin={{horizontal: 'bottom', vertical: 'bottom'}}
 //      targetOrigin={{horizontal: 'bottom', vertical: 'bottom'}}

      
 //        >
 //        <Menu style={{top:60, marginTop:60}}>
 //       <MenuItem value="1" primaryText="Refresh" />
 //          <MenuItem value="2" primaryText="Send feedback" />
 //          <MenuItem value="3" primaryText="Settings" />
 //          <MenuItem value="4" primaryText="Help" />
 //          <MenuItem value="5" primaryText="Sign out" />
 //        </Menu>
 //      </IconMenu>
 //      <IconMenu style = {{ paddingBottom: 5}}
 //        iconButtonElement={

 //               <Avatar src="static/photos/flag_england.svg" style=
    
 //      {{ 
 //       borderRadius: 32,
 // width: 17,
 // height: 17,
 // // backgroundImage:'url("static/photos/flag_england.svg")',
 // backgroundPosition: 'center',
 // overflowX: 'visible',
 // display: 'inline-block',
 // marginLeft: 10,
 // marginRight: 10,
 // float: 'left',

 // overflow: 'visible'

 //   }} /> 
 //        }
 //        >
 //        <MenuItem primaryText='Logout' />
 //      </IconMenu>

 //       <IconMenu
 //        iconButtonElement={

     //               <Avatar src="static/photos/person1.png" style={{ width: '30',
     //  float: 'left',
     // height: '30', backgroundColor: 'rgba(0, 0, 0, 0)', marginTop:8}} /> 
 //        }
 //        >
 //        <MenuItem primaryText='Logout' />
 //      </IconMenu>
 //    </div>
 
  
// );

export default UserSettingPanel;


//     <div style={{borderRadius: 32,
 // width: 17,
 // height: 17,
 // backgroundImage:'url("static/photos/flag_england.svg")',
 // backgroundPosition: 'center',
 // overflowX: 'visible',
 // display: 'inline-block',
 // marginLeft: 10,
 // marginRight: 10,
 // float: 'left',
 // overflow: 'visible'}}>
 // </div>


 //         <List 


  //         style={flexContainer}>
  //   <ListItem style={{width: 50, padding: 12}}
  //     leftIcon={<ActionList />}
  //     />
  //      <ListItem  style={{width: 50, padding: 12}}
  //     leftIcon={<SocialPerson />}
  //     />
  //      <ListItem  style={{width: 50, padding: 12}}
  //     leftIcon={<SocialGroup />}
  //     />
    
  // </List>
  // <div style={flex1Container}>

  // <span> new</span>
  // <span> new</span>
  // <span> new</span>
    
    
  // </div>