import React from 'react';

class DeepDownTheTree extends React.Component {
  render () {
    return (
      <span style={{color: this.context.muiTheme.palette.textColor}}>
        Hello World!
      </span>
    );
  }
}

DeepDownTheTree.contextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

export default DeepDownTheTree;