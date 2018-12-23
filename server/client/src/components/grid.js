import React from "react";
import { SongCard, AlbumCard, PlaylistCard, LanguageCard } from "./card";
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


function MusicGrid(props) {
  const { classes, data, activatePlayer } = props;
  console.log("Grid render");
  return (
    <div>
      {data.map(listData => {
        switch (listData.type) {
          case "songs":
            return (
              <div key={listData.id} >
                <Typography variant="h6" gutterBottom>
                  {listData.name}
                </Typography>
                {/* <div> */}
                <Grid container >
                  {listData.list.map(songData => (
                    <Grid className={classes.GridItem} item key={songData.id} xs={6} sm={4} md={2}>
                      <SongCard className={classes.card} songData={songData} activatePlayer={activatePlayer} />
                    </Grid>
                  ))}
                </Grid>
                {/* </div> */}
                <Divider className={classes.divider} />
              </div>
            );
            break;
          case "albums":
            return (
              <div key={listData.id}>
                <Typography variant="h6" gutterBottom>
                  {listData.name}
                </Typography>
                {/* <div> */}
                <Grid container >
                  {listData.list.map(albumData => (
                    <Grid className={classes.GridItem} item key={albumData.id} xs={6} sm={4} md={2}>
                      <AlbumCard className={classes.card} albumData={albumData} activatePlayer={activatePlayer} />
                    </Grid>
                  ))}
                </Grid>
                {/* </div> */}
                <Divider className={classes.divider} />
              </div>
            );
            break;

          case "playlists":
            return (
              <div key={listData.id} >
                <Typography variant="h6" gutterBottom>
                  {listData.name}
                </Typography>
                {/* <div> */}
                <Grid container >
                  {listData.list.map(playlistData => (
                    <Grid className={classes.GridItem} item key={playlistData.id} xs={6} sm={4} md={2}>
                      <PlaylistCard className={classes.card} playlistData={playlistData} activatePlayer={activatePlayer} />
                    </Grid>
                  ))}
                </Grid>
                {/* </div> */}
                <Divider className={classes.divider} />
              </div>
            );
            break;

          case "language":
            return (
              <div key={listData.id} >
                <Typography variant="h6" gutterBottom>
                  {listData.name}
                </Typography>
                {/* <div> */}
                <Grid container >
                  {listData.list.map(languageData => (
                    <Grid className={classes.GridItem} item key={languageData.id} xs={6} sm={4} md={2}>
                      <LanguageCard className={classes.card} languageData={languageData} activatePlayer={activatePlayer} />
                    </Grid>
                  ))}
                </Grid>
                {/* </div> */}
                <Divider className={classes.divider} />
              </div>
            );
            break;
          default:
            return "";
        }
      })}
    </div>
  );
}

export default withStyles(styles)(MusicGrid);
