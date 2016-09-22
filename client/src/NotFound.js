import React from 'react';


class NotFound extends React.Component {
  render() {
    // MuiThemeProvider takes the theme as a property and passed it down the hierarchy
    // using React's context feature.
    return (
     <div style={{minHeight: 400, textAlign: 'center'}}>
       <h1>Not Found .... 404 </h1>
     </div>
    );
  }
}

export default NotFound;