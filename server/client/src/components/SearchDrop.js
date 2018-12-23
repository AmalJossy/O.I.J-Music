import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { fade } from '@material-ui/core/styles/colorManipulator';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputBase from '@material-ui/core/InputBase';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import _ from "lodash";

const styles = theme => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius * 15,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    // position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    // position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
  popper: {
    width: 360,
    backgroundColor: fade(theme.palette.common.white, 0.15),
  },
  resultItem: {
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    }
  }
});

class SearchDrop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      open: false,
      placement: null,
      query: "",
      results: [],
      networkError: false,
      isSearching: false,
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSearchClear = this.handleSearchClear.bind(this);
    this.getResults = this.getResults.bind(this);
    this.toggleSearching = this.toggleSearching.bind(this);
    this.debouncedGetResults = _.debounce(this.getResults, 500);
  }

  getResults() {
    if (!this.state.query) {
      this.debouncedGetResults.cancel();
      return;
    }
    this.setState({results: []})
    fetch(`/api/instant/${this.state.query}`)
      .then(response => response.json())
      .then(data => this.setState({ results: data }))
      .catch(this.setState({ networkError: true }));;
  }

  handleSearch(event) {
    const { currentTarget } = event;
    const input = event.target.value;
    this.setState({
      anchorEl: currentTarget,
      open: true,
      placement: 'bottom-end',
      query: input,
    });
    this.debouncedGetResults();
  };
  handleSearchClear(event) {
    this.setState({
      open: false,
      placement: null,
      results: [],
    })
  }
  toggleSearching(){
    this.setState(state=>{
      return {
        isSearching: !state.isSearching
      }
    })
  }
  handlePick(title){
    this.props.toggleResultsView(title)
  }
  render() {
    const { classes } = this.props;
    const { anchorEl, open, placement } = this.state;
    const id = open ? 'simple-popper' : null;
    console.log(this.state.results)
    return (
      <div>
        <div className={classes.search}>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            onFocus={this.toggleSearching}
            onBlur={this.toggleSearching}
            onInput={this.handleSearch}
            startAdornment={
              <InputAdornment className={classes.searchIcon} position="start">
                <SearchIcon />
              </InputAdornment>}
            endAdornment={
              <InputAdornment className={classes.closeIcon} position="end">
                <CloseIcon onClick={this.handleSearchClear} />
              </InputAdornment>}
          />
        </div>
        <Popper className={classes.popper} id={id} open={open} anchorEl={anchorEl} placement='bottom-start' transition>
          <List className={classes.resultList}>
            {this.state.results && this.state.results.map((result, index) => (
              <ListItem key={index} className={classes.resultItem} onClick={() => this.handlePick(result.title)}>
                <ListItemText >{result.title}</ListItemText>
              </ListItem>
            ))}
            {this.state.isSearching && this.state.results.length==0 && <ListItem><CircularProgress  /></ListItem>}
          </List>
        </Popper>
      </div>
    );
  }
}


export default withStyles(styles)(SearchDrop);