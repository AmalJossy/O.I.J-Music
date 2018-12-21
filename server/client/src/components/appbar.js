import React from "react";
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
// import { fade } from '@material-ui/core/styles/colorManipulator';
// import InputAdornment from '@material-ui/core/InputAdornment';
// import InputBase from '@material-ui/core/InputBase';
// import CloseIcon from '@material-ui/icons/Close';
// import SearchIcon from '@material-ui/icons/Search';

import SearchDrop from "./SearchDrop";

const drawerWidth = 240;

const styles = (theme) => ({
    appBar: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        marginLeft: drawerWidth,
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
    },
    menuButton: {
        marginRight: 20,
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    grow: {
        flexGrow: 1,
    },
    // search: {
    //     position: 'relative',
    //     borderRadius: theme.shape.borderRadius*15,
    //     backgroundColor: fade(theme.palette.common.white, 0.15),
    //     '&:hover': {
    //         backgroundColor: fade(theme.palette.common.white, 0.25),
    //     },
    //     marginLeft: 0,
    //     width: '100%',
    //     [theme.breakpoints.up('sm')]: {
    //         marginLeft: theme.spacing.unit,
    //         width: 'auto',
    //     },
    // },
    // searchIcon: {
    //     width: theme.spacing.unit * 9,
    //     height: '100%',
    //     // position: 'absolute',
    //     pointerEvents: 'none',
    //     display: 'flex',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // },
    // closeIcon: {
    //     width: theme.spacing.unit * 9,
    //     height: '100%',
    //     // position: 'absolute',
    //     display: 'flex',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // },
    // inputRoot: {
    //     color: 'inherit',
    //     width: '100%',
    // },
    // inputInput: {
    //     paddingTop: theme.spacing.unit,
    //     paddingBottom: theme.spacing.unit,
    //     transition: theme.transitions.create('width'),
    //     width: '100%',
    //     [theme.breakpoints.up('sm')]: {
    //         width: 120,
    //         '&:focus': {
    //             width: 200,
    //         },
    //     },
    // },
})

const AppBarWithSearch = (props) => {
    let { classes, handleDrawerToggle, handleSearch, handleSearchClear } = props;
    return <AppBar className={classes.appBar}>
        <Toolbar>
            <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
            >
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
                OijMusic
                </Typography>
            <div className={classes.grow} />
            <SearchDrop className={classes.search} />
            {/* <div className={classes.search}>
                <InputBase
                    placeholder="Search…"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    onFocus={handleSearch}
                    startAdornment={
                        <InputAdornment className={classes.searchIcon} position="start">
                            <SearchIcon />
                        </InputAdornment>}
                    endAdornment={
                        <InputAdornment className={classes.closeIcon} position="end">
                            <CloseIcon onClick={handleSearchClear} />
                        </InputAdornment>}
                />
            </div> */}
        </Toolbar>
    </AppBar>
}

export default withStyles(styles, { withTheme: true })(AppBarWithSearch);