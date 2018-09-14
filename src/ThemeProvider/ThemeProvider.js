import React from 'react';
import {
  MuiThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles';

/* Command UI customised theme on top of Material-UI. */
class ThemeProvider extends React.PureComponent {
  render() {
    const {
      ...others
    } = this.props;

    const theme = createMuiTheme({
      typography: {
        body1: {
          margin: 0,
          fontSize: 18,
          lineHeight: 1.6,
          fontWeight: 500,
          fontFamily: 'PingFangSC-Medium, Microsoft YaHei',
        },
        caption1: {
          margin: 0,
          fontSize: 20,
          lineHeight: 1.6,
          fontWeight: 500,
          fontFamily: 'PingFangSC-Medium, Microsoft YaHei',
        },
        caption2: {
          margin: 0,
          fontSize: 22,
          lineHeight: 1.6,
          fontWeight: 500,
          fontFamily: 'PingFangSC-Medium, Microsoft YaHei',
        },
        subheading: {
          margin: 0,
          fontSize: 28,
          lineHeight: 1.6,
          fontWeight: 600,
          fontFamily: 'PingFangSC-Medium, Microsoft YaHei',
        },
        title: {
          margin: 0,
          fontSize: 32,
          lineHeight: 1.6,
          fontWeight: 500,
          fontFamily: 'PingFangSC-Medium, Microsoft YaHei',
        },
        headline: {
          margin: 0,
          fontSize: 34,
          lineHeight: 1.6,
          fontWeight: 600,
          fontFamily: 'PingFangSC-Medium, Microsoft YaHei',
        },
        display: {
          margin: 0,
          fontSize: 43,
          lineHeight: 1.6,
          fontWeight: 600,
          fontFamily: 'PingFangSC-Medium, Microsoft YaHei',
        },
      },
      palette: {
        background: {
          default: 'transparent',
          paper: 'transparent',
        },
        ordinary: {
          main: '#a4c7fc',
        },
        primary: {
          main: '#2a76d4',
        },
        secondary: {
          main: '#ffcd60',
        },
        text: {
          ordinary: '#a4c7fc',
          primary: '#2a76d4',
          secondary: '#ffcd60',
        },
      },
    });

    return (
      <MuiThemeProvider theme={theme} {...others} />
    );
  }
}

export default ThemeProvider;
