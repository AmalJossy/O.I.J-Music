import React from "react";
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import MusicGrid from './grid';
import AppBarWithSearch from './appbar';
import FloatingPlayer from './floatingplayer';
import ResultGrid from './resultgrid';
import LangPicker from "./langpicker";

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
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
      language: 'English',
      data: [],
      results: {},
      isLoading: true,
      showResults: false,
      networkError: false,
      playerOpen: false,
    };
    this.loadData=this.loadData.bind(this);
    this.toggleResultsView = this.toggleResultsView.bind(this);
    this.activatePlayer = this.activatePlayer.bind(this);
    this.closePlayer = this.closePlayer.bind(this);
    this.pickLanguage = this.pickLanguage.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }
  loadData(){
    fetch(`/api/languages/${this.state.language}`)
      .then(response => response.json())
      .then(data => this.setState({ isLoading: false, data: data }))
      .catch(this.setState({ networkError: true }));
  }
  toggleResultsView(title) {
    if (!title) {
      this.setState({ showResults: false, results: {} });
    }
    else {
      this.setState({ showResults: true })
      fetch(`/api/search/${title}/${this.state.language}`)
        .then(response => response.json())
        .then(data => { this.setState({ results: data }); console.log(this.state.results) })
        .catch(this.setState({ networkError: true }));;
    }
  }
  activatePlayer(id, title, image, artist) {
    const [song, album, _v] = id.split('_');
    this.setState({ playerOpen: true });
    this.songURL = `/api/stream/${song}/${album}/${id}_h.smil/chunklist_b128000_ao.m3u8`;
    this.playerParams = {
      title, image, artist
    }
  }
  closePlayer(){
    this.setState({ playerOpen: false });
  }
  pickLanguage(language){
    if(language===this.state.language){
      return null;
    }
    this.setState({language:language},this.loadData);
  }
  render() {
    const { classes } = this.props;
    const { data, showResults, results } = this.state;
    // console.log("render",this.state.language);
    return (
      <div className={classes.root}>
        <AppBarWithSearch toggleResultsView={this.toggleResultsView} />

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <div style={{ display: showResults ? 'none' : 'block' }}>
            <MusicGrid data={data} activatePlayer={this.activatePlayer} />
          </div>
          <div style={{ display: showResults ? 'block' : 'none' }}>
            {_.isEmpty(results) ? <div>No Results</div> : <ResultGrid data={results} activatePlayer={this.activatePlayer} />}
          </div>
        </main>
        {this.state.playerOpen && <FloatingPlayer playerParams={this.playerParams} url={this.songURL} closePlayer={this.closePlayer} />}
        <LangPicker onPick={this.pickLanguage}/>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);
