import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Chip from '@material-ui/core/Chip';
import LangIcon from '@material-ui/icons/Language';

const languages = ['English', 'Malayalam', 'Tamil', 'Hindi'];
const styles = {
    chip:{
        position: 'fixed',
        bottom: 5,
        left: 5,
    }
};

class LangPickerDialog extends Component {
    constructor(props) {
        super(props);
    }
    handleClose(){
        this.props.onClose(this.props.selectedValue);
    };

    handleListItemClick(value) {
        this.props.onClose(value);
    };

    render() {

        return (
            <Dialog onClose={this.handleClose} aria-labelledby="language-picker" open={this.props.open}>
                <div>
                    <List>
                        {languages.map(language => (
                            <ListItem button onClick={() => this.handleListItemClick(language)} key={language}>
                                <ListItemText primary={language} />
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Dialog>
        );
    }
}


class LangPicker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            selectedValue: languages[0],
        };
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClickOpen() {
        this.setState({
            open: true,
        });
    };

    handleClose(value){
        this.setState({ selectedValue: value, open: false });
        this.props.onPick(value)
    };

    render() {
        const {classes}=this.props;
        return (
            <div>
                <Chip
                    icon={<LangIcon />}
                    label={this.state.selectedValue}
                    onClick={this.handleClickOpen}
                    clickable
                    className={classes.chip}
                    color="primary"
                />
                <LangPickerDialog
                    selectedValue={this.state.selectedValue}
                    open={this.state.open}
                    onClose={this.handleClose}
                />
            </div>
        );
    }
}

export default withStyles(styles)(LangPicker);