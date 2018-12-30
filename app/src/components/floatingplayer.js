import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import Close from '@material-ui/icons/CloseTwoTone';

import Hls from 'hls.js'
const styles = theme => ({
    card: {
        display: 'flex',
        position: 'fixed',
        bottom: '5px',
        right: '5px',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
        position: 'relative',
    },
    cover: {
        width: 151,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
    },
    playIcon: {
        height: 38,
        width: 38,
    },
    closeIcon: {
        position: 'absolute',
        top: 5,
        right: 5,
    },
    video: {
        display: 'none',
    },
});

class MediaControlCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPlaying: false
        }
        // this.isPlaying=false;
        this.hls = null;
        this.videoRef = React.createRef();
        this.stopAndClose=this.stopAndClose.bind(this);
    }
    componentDidUpdate(prevProps) {
        if (this.props != prevProps) {
            this._initPlayer();
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        let shouldUpdate = false;
        if (this.state.isPlaying !== nextState.isPlaying) {
            shouldUpdate = true;
        }
        if (this.props.url !== nextProps.url) {
            shouldUpdate = true;
        }
        return shouldUpdate;
    }
    componentDidMount() {
        this._initPlayer();
    }

    componentWillUnmount() {
        let { hls } = this;

        if (hls) {
            hls.destroy();
        }
    }

    _initPlayer() {
        if (this.hls) {
            this.hls.destroy();
        }
        let url = this.props.url;
        let video = this.videoRef.current;
        this.video = video;
        let hls = new Hls();

        hls.loadSource(url);
        hls.attachMedia(video);
        this.setState({ isPlaying: true });
        video.play();

        this.hls = hls;
    }
    togglePlayback() {
        let video = this.video;
        if (this.state.isPlaying) {
            this.setState({ isPlaying: false });
            video.pause();
        }
        if (!this.state.isPlaying) {
            this.setState({ isPlaying: true });
            video.play();
        }
    }
    stopAndClose(){
        this.togglePlayback();
        this.props.closePlayer();
    }
    render() {
        const classes = this.props.classes;
        const { title, image, artist } = this.props.playerParams;
        const imageURL = "/api/images/" + image;
        return (
            <Card className={classes.card}>
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <Typography component="h5" variant="h5">
                            {title}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            {artist}
                        </Typography>
                        <video ref={this.videoRef} className={classes.video}></video>
                    </CardContent>
                    <div className={classes.controls}>
                        <IconButton aria-label="Play/pause" onClick={() => this.togglePlayback()} onEnded={() => this.togglePlayback()}>
                            {this.state.isPlaying
                                ? <PauseIcon className={classes.playIcon} />
                                : <PlayArrowIcon className={classes.playIcon} />}
                        </IconButton>
                    </div>
                </div>
                <CardMedia
                    className={classes.cover}
                    image={imageURL}
                    title={title}
                />
                <IconButton className={classes.closeIcon} onClick={this.stopAndClose}><Close /></IconButton>
            </Card>
        );
    }
}


export default withStyles(styles)(MediaControlCard);