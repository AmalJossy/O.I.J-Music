import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import { fade } from '@material-ui/core/styles/colorManipulator';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputBase from '@material-ui/core/InputBase';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
  typography: {
    padding: theme.spacing.unit * 2,
  },
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
});

class SearchDrop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      open: false,
      results: [],
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSearchClear = this.handleSearchClear.bind(this);
    console.log(this.handleClick);
  }

  handleSearch(event) {
    const { currentTarget } = event;
    this.setState({
      anchorEl: currentTarget,
      open: true,
      results: ['a', 'b', 'c'],
    });
  };
  handleSearchClear(event) {
    this.setState({
      results: [],
    })
    console.log(event.target)
  }

  render() {
    const { classes } = this.props;
    const { anchorEl, open } = this.state;
    const id = open ? 'simple-popper' : null;
    return (
      <div>
        <div className={classes.search}>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
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
        <Popper id={id} open={open} anchorEl={anchorEl} transition>
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper>
                {this.state.results.map((result, index) => (
                  <Typography key={index} className={classes.typography}>one result={result}.</Typography>
                ))}
              </Paper>
            </Fade>
          )}
        </Popper>
      </div>
    );
  }
}


export default withStyles(styles)(SearchDrop);