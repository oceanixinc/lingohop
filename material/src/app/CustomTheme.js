import * as Colors from 'material-ui/styles/colors';
import * as ColorManipulator from 'material-ui/utils/colorManipulator';
import * as Spacing from 'material-ui/styles/spacing';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

// export const CustomTheme = Object.freeze({
//   spacing: Spacing,
//   fontFamily: 'Roboto, sans-serif',
//   // palette: {
//   //   textColor: Colors.darkBlack,
//   //   primary1Color: Colors.white,
//   //   primary2Color: Colors.indigo700,
//   //   // accent1Color: Colors.redA200,
//   //   pickerHeaderColor: Colors.darkBlack,
//   //   // primary1Color: Colors.blueGrey500,
//   //   // primary2Color: Colors.cyan700,
//   //   primary3Color: Colors.lightBlack,
//   //   accent1Color: Colors.pinkA200,
//   //   accent2Color: Colors.grey100,
//   //   accent3Color: Colors.grey500,
//   //   // textColor: Colors.darkBlack,
//   //   alternateTextColor: Colors.white,
//   //   canvasColor: Colors.white,
//   //   borderColor: Colors.grey300,
//   //   disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3),
//   // },
//   palette: {
//     textColor: Colors.darkBlack,
//     primary1Color: Colors.white,
//     primary2Color: Colors.indigo700,
//     accent1Color: Colors.redA200,
//     pickerHeaderColor: Colors.darkBlack,
//   },
//   appBar: {
//     height: 60,
//   },
// });

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