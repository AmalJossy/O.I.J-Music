import React, { Component } from "react";
import ReactDOM from "react-dom";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from './components/drawer'
import Player from './components/floatingplayer'
// import Player from './experiment';
const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    type: 'dark',
    primary: {
      main: '#fd2954',
    },
    secondary: {
      main: '#101131', 
    },
  },
});
const AppRoot = document.getElementById("AppRoot");

class Root extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Drawer />
      </MuiThemeProvider>
      // <Player />
    );
  }
}
ReactDOM.render(<Root />, AppRoot);
