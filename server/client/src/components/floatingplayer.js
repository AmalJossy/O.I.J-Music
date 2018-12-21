import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';

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
    }
    componentDidUpdate(prevProps) {
        if(this.props!=prevProps){
            this._initPlayer();
        }
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
        this.video=video;
        console.log(this.videoRef.current)
        let hls = new Hls();

        hls.loadSource(url);
        hls.attachMedia(video);
        this.setState({isPlaying: true});
        video.play();

        this.hls = hls;
    }
    togglePlayback() {
        let video=this.video;
        if (this.state.isPlaying) {
            this.setState({ isPlaying: false });
            video.pause();
        }
        if (!this.state.isPlaying) {
            this.setState({ isPlaying: true });
            console.log("was not playing")
            video.play();
        }
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
            </Card>
        );
    }
}


export default withStyles(styles)(MediaControlCard);