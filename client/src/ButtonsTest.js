var React = require('react');
  
var injectTapEventPlugin = require("react-tap-event-plugin");// This dependency is temporary and will go away once react v1.0 is released
var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var FlatButton = new mui.FlatButton();

ThemeManager.setTheme(ThemeManager.types.LIGHT);
injectTapEventPlugin();

var ButtonChanger = React.createClass({
   
    render: function () {
        return (
            <FlatButton label="Primary" primary={true} />
        );
    }
});

module.exports = ButtonChanger;