import React from "react";
import { SongCard, AlbumCard, PlaylistCard } from "./card";
import Badge from '@material-ui/core/Badge';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    card: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
        whiteSpace: 'nowrap',
        marginBottom: theme.spacing.unit,
    },
    divider: {
        margin: `${theme.spacing.unit * 2}px 0`,
    },
    GridItem: {
        padding: theme.spacing.unit,
    }
});

export default withStyles(styles)((props) => {
    const classes = props.classes;
    const best = props.data["Best Match"];
    console.log(props.data)
    const songs = props.data["Songs"];
    const albums = props.data["Albums"];
    const playlists = props.data["Playlists"];
    const radio = props.data["Radio"];
    const activatePlayer=props.activatePlayer;
    return <div>
        <Badge color="primary" badgeContent={best.length} >
            <Typography variant="h6" gutterBottom>Best Match</Typography>
        </Badge>
        <Grid container >
            <Grid className={classes.GridItem} item xs={6} sm={4} md={2}>
                <SongCard className={classes.card} songData={best[0]} activatePlayer={activatePlayer}/>
            </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <Badge color="primary" badgeContent={songs.length} >
            <Typography variant="h6" gutterBottom>Songs</Typography>
        </Badge>
        <Grid container >
            {songs.map(songData => (
                <Grid className={classes.GridItem} item key={songData.id} xs={6} sm={4} md={2}>
                    <SongCard className={classes.card} songData={songData}  activatePlayer={activatePlayer}  />
                </Grid>
            ))}
        </Grid>
        <Divider className={classes.divider} />
        <Badge color="primary" badgeContent={albums.length} >
            <Typography variant="h6" gutterBottom>Albums</Typography>
        </Badge>
        <Grid container >
            {albums.map(albumData => (
                <Grid className={classes.GridItem} item key={albumData.id} xs={6} sm={4} md={2}>
                    <AlbumCard className={classes.card} albumData={albumData}  activatePlayer={activatePlayer}  />
                </Grid>
            ))}
        </Grid>
        <Divider className={classes.divider} />
        <Badge color="primary" badgeContent={playlists.length} >
            <Typography variant="h6" gutterBottom>Playlists</Typography>
        </Badge>
        <Grid container >
            {albums.map(playlistData => (
                <Grid className={classes.GridItem} item key={playlistData.id} xs={6} sm={4} md={2}>
                    <PlaylistCard className={classes.card} playlistData={playlistData}  activatePlayer={activatePlayer}  />
                </Grid>
            ))}
        </Grid>
        <Divider className={classes.divider} />
    </div>
})