import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';


const styles = {
    title: {
        cursor: 'pointer',
    },
};

// const TextFieldExampleSimple = () => (
//   <div>
//     <TextField
//       hintText="UserName"
//     /><br />
//     <br />
//     <TextField
//       hintText="Password"
//     />

//   </div>
// );

const AppBarExampleIconMenu = () => ( < AppBar title = { < span style = { styles.title } > Test1 < /span>}
               
                iconElementRight = { < IconMenu
                    iconButtonElement = { < IconButton > < MoreVertIcon / > < /IconButton>
                    }
                    targetOrigin = {
                        { horizontal: 'right', vertical: 'top' } }
                    anchorOrigin = {
                        { horizontal: 'right', vertical: 'top' } } >
                    < MenuItem primaryText = "Refresh" / >
                    < MenuItem primaryText = "Help" / >
                    < MenuItem primaryText = "Sign out" / >
                    < /IconMenu>
                }


                />
            );

            export default AppBarExampleIconMenu;
