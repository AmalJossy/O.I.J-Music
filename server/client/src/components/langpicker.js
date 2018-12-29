import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';

const languages = ['English', 'Malayalam','Tamil','Hindi'];
const styles = {
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
};

class LangPicker extends React.Component {
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  render() {
    const { classes, onClose, selectedValue, ...other } = this.props;

    return (
      <Dialog onClose={this.handleClose} aria-labelledby="language-picker" {...other}>
        <DialogTitle id="language-picker">Music by langauge</DialogTitle>
        <div>
          <List>
            {languages.map(language => (
              <ListItem button onClick={() => this.handleListItemClick(language)} key={language}>
                <ListItemAvatar>
                  <Avatar className={classes.avatar}>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={language} />
              </ListItem>
            ))}
          </List>
        </div>
      </Dialog>
    );
  }
}

LangPicker.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.string,
};

const LangPickerWrapped = withStyles(styles)(LangPicker);

class LangPickerDemo extends React.Component {
  state = {
    open: false,
    selectedValue: languages[1],
  };

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = value => {
    this.setState({ selectedValue: value, open: false });
  };

  render() {
    return (
      <div>
        <Typography variant="subtitle1">Selected: {this.state.selectedValue}</Typography>
        <br />
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Open Language Picker
        </Button>
        <LangPickerWrapped
          selectedValue={this.state.selectedValue}
          open={this.state.open}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}

export default LangPickerDemo;