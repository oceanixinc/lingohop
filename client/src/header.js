import React from 'react';
import AppBar from 'material-ui/AppBar';


const AppBarExampleIconMenu = () => ( < AppBar title = { < span style = { styles.title } > Test < /span>}
            iconElementLeft = { < IconButton > < NavigationClose / > < /IconButton>}

                />
            );

// class AppBarExampleIconMenu extends React.Component {
//     render() {
//         return( 
//             <AppBar
//                 title = {<span style={styles.title }> Test < /span>}
//                 iconElementLeft = { <IconButton> <NavigationClose /></IconButton>}
//                 iconElementRight = { < div >
//                     <TextField
//                     hintText = "UserName" />

//                     <TextField
//                     hintText = "PassWord" />

//                     </div>
//                 }

//             />
//         );
//     }
// }

export default AppBarExampleIconMenu;