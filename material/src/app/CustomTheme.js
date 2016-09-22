import * as Colors from 'material-ui/styles/colors';
import * as ColorManipulator from 'material-ui/utils/colorManipulator';
import * as Spacing from 'material-ui/styles/spacing';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export const CustomTheme = getMuiTheme({
  fontFamily: 'Roboto, sans-serif',
  palette: {
    textColor: Colors.darkBlack,
    primary1Color: Colors.white,
    // primary2Color: Colors.indigo700,
    // accent1Color: Colors.redA200,
    pickerHeaderColor: Colors.darkBlack,
  },
  appBar: {
    height: 60,
  },
});