import React from "react";
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import MusicGrid from './grid';
import AppBarWithSearch from './appbar';
import FloatingPlayer from './floatingplayer';
import ResultGrid from './resultgrid';
const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    background: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)',
    border: 'none',
  },
  content: {
    flexGrow: 1,
    [theme.breakpoints.up('sm')]: {
      marginLeft: '100px',
      marginRight: '100px',
    },
    padding: theme.spacing.unit * 3,
  },
});

class ResponsiveDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      language: 'Malayalam',
      data: [],
      results: {},
      isLoading: true,
      showResults: false,
      networkError: false,
      playerOpen: false,
    };
    this.toggleResultsView = this.toggleResultsView.bind(this);
    this.activatePlayer = this.activatePlayer.bind(this);
  }

  componentDidMount() {
    fetch(`/api/languages/${this.state.language}`)
      .then(response => response.json())
      .then(data => this.setState({ isLoading: false, data: data }))
      .catch(this.setState({ networkError: true }));;
    // console.log(this.state.results)
  }
  toggleResultsView(title) {
    if (!title) {
      this.setState({ showResults: false, results: {} });
      return;
    }
    this.setState({ showResults: true })
    fetch(`/api/search/${title}/${this.state.language}`)
      .then(response => response.json())
      .then(data => { this.setState({ results: data }); console.log(this.state.results) })
      .catch(this.setState({ networkError: true }));;
    // console.log(`/api/search/${title}/${this.state.language}`)
  }
  activatePlayer(id, title, image, artist) {
    const [song, album, _v] = id.split('_');
    this.setState({ playerOpen: true });
    this.songURL = `/api/stream/${song}/${album}/${id}_h.smil/chunklist_b128000_ao.m3u8`;
    this.playerParams = {
      title, image, artist
    }
  }
  render() {
    const { classes, theme } = this.props;
    const { data, showResults, results } = this.state;
    const drawer = (
      <div>
        <div className={classes.toolbar} />
        {/* <List>{mailFolderListItems}</List> */}
        <List>
          <ListItem button component="a" href="#simple-list">
            <ListItemText primary="Artists" />
          </ListItem>
          <ListItem button component="a" href="#simple-list">
            <ListItemText primary="Albums" />
          </ListItem>
          <ListItem button component="a" href="#simple-list">
            <ListItemText primary="Playlists" />
          </ListItem>
          <ListItem button component="a" href="#simple-list">
            <ListItemText primary="Languages" />
          </ListItem>
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <AppBarWithSearch toggleResultsView={this.toggleResultsView} />

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <div style={{ display: showResults ? 'none' : 'block' }}>
            <MusicGrid data={data} activatePlayer={this.activatePlayer} />
          </div>
          <div style={{ display: showResults ? 'block' : 'none' }}>
            {_.isEmpty(results) ? <div>No Results</div> : <ResultGrid data={results} />}
          </div>
        </main>
        {this.state.playerOpen && <FloatingPlayer playerParams={this.playerParams} url={this.songURL} />}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);
