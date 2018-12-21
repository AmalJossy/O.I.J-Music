import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PlayCircleIcon from '@material-ui/icons/PlayCircleFilled';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/SaveAltRounded';

const styles = (theme) => ({
  card: {
    maxWidth: 345,
    position: 'relative',
    // '&:hover &.actions': {
    //   //   opacity: '1',
    // },
  },
  media: {
    height: 140,
  },
  content: {
    padding: '10px',
  },
  actions: {
    position: 'absolute',
    opacity: '0',
    top: '50px',
    '&:hover': {
      opacity: '1',
    }
  },
  playIcon: {
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    }
  },
  saveIcon: {
    backgroundColor: theme.palette.primary.main,
  },
});

String.prototype.trunc =
  String.prototype.trunc ||
  function (n) {
    return this.length > n ? this.substr(0, n - 2) + "..." : this;
  };
const SongCard = withStyles(styles)(props => {
  const { classes, songData, activatePlayer } = props;
  const { id, title, artist, subtitle, image, type, albumid } = songData;
  const imageURL = "/api/images/";
  return (
    <Card className={classes.card} >
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={imageURL + image}
          title={title}
        />
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="subtitle1">
            {title.trunc(16)}
          </Typography>
          <Typography component="p">{subtitle.trunc(18)}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.actions}>
        <IconButton className={classes.playIcon} onClick={() => activatePlayer(id, title, image, artist)}>
          <PlayCircleIcon />
        </IconButton>
        <IconButton className={classes.queueIcon} >
          <SaveIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
})
const AlbumCard = withStyles(styles)(props => {
  const { classes, albumData } = props;
  const { id, title, subtitle, type, albumid, image, songCount } = albumData;
  const imageURL = "/api/images/";
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={imageURL + image}
          title={title}
        />
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="subtitle1">
            {title.trunc(16)}
          </Typography>
          <Typography component="p">{subtitle.trunc(18)}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.actions}>
        <Button size="small" color="secondary">
          Play All
        </Button>
        <Button size="small" color="secondary">
          View
        </Button>
      </CardActions>
    </Card>
  );
})

const PlaylistCard = withStyles(styles)(props => {
  const { classes, playlistData } = props;
  const {
    id,
    language,
    title,
    type,
    image,
    subtitle,
    songCount,
    playlistid
  } = playlistData;
  const imageURL = "/api/images/";
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={imageURL + image}
          title={title}
        />
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="subtitle1">
            {title.trunc(16)}
          </Typography>
          <Typography component="p">{subtitle.trunc(18)}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.actions}>
        <Button size="small" color="secondary">
          Play All
        </Button>
        <Button size="small" color="secondary">
          View
        </Button>
      </CardActions>
    </Card>
  );
})

const LanguageCard = withStyles(styles)(props => {
  const { classes, languageData } = props;
  const { id, title, image, hexcode, type } = languageData;
  const imageURL = "/api/images/";
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={imageURL + image}
          title={title}
        />
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="subtitle1">
            {title.trunc(16)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.actions}>
        <Button size="small" color="secondary">
          Go
        </Button>
      </CardActions>
    </Card>
  );
})

export { SongCard, AlbumCard, PlaylistCard, LanguageCard };
