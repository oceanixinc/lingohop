
import React from 'react';
import * as Colors from 'material-ui/styles/colors';
import SvgIcon from 'material-ui/SvgIcon';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';


const ArrowIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M9 3L7.94 4.06l4.19 4.19H3v1.5h9.13l-4.19 4.19L9 15l6-6z" />
  </SvgIcon>
);


const SubmitIcon = () => (
   <IconButton iconStyle={{iconHoverColor: '#55ff55'}}
     tooltip="Sing In" key='signin-button' 
     // onTouchTap={this.handleTouchTap}
     onClick={this.submitForm}
     >
    <ArrowIcon color={Colors.cyan500} style={{marginTop: 30}} />
    </IconButton>
);

export default SubmitIcon;