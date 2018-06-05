import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Card.css';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider,
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import green from '@material-ui/core/colors/green';
import img from '../../media/404.png';
// import SubjectIcon from '@material-ui/icons/Subject';

// const theme2 = theme => ({
//   ...theme,
//   primary: {
//     color: green[600],
//   },
// });
const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

const styles = theme => ({
  card: {
    maxWidth: 345,
    position: 'relative',
  },
  media: {
    height: 0,
    paddingTop: '100%',
    backgroundPosition: 'top',
  },
  info: {
    position: 'relative',
    height: 160,
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '15%',
      backgroundImage: 'linear-gradient(to top,  #fff, rgba(255,255,255,0.62))',
    },
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.getContrastText(green[600]),
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  list: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 0,
  },
  item: {
    margin: 2,
    padding: '0 0 0 2px',
    borderRadius: 2,
    background: 'rgba(165,214,167, .5)',
  },
  name: {
    '&>h3': {
      color: '#fff',
    },
  },
});

class MovieCard extends Component {
  getImage(url) {
    const IMG_URL = 'https://image.tmdb.org/t/p/w500';
    return `${IMG_URL}${url}`;
  }

  handleClick = () => {
    console.log('hello');
  };

  render() {
    const { item, classes, ownKey, genres } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <div className="card" key={ownKey}>
          <Card className={classes.card}>
            <CardMedia
              classes={{
                root: classes.media,
              }}
              image={item.poster_path ? this.getImage(item.poster_path) : img}
              title={item.title}
              //TODO: change name
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="headline"
                noWrap={true}
                component="h2"
              >
                {item.title}
              </Typography>
              <Typography component="p" className={classes.info}>
                {item.overview}
              </Typography>
              {genres ? (
                <List className={classes.list}>
                  {item.genre_ids.map(item => {
                    return (
                      <ListItem key={item} className={classes.item}>
                        <ListItemText
                          primary={genres[item].name}
                          className={classes.name}
                        />
                      </ListItem>
                    );
                  })}
                </List>
              ) : (
                ''
              )}
            </CardContent>
            <CardActions className={classes.actions}>
              <Link to={`/movie/${item.id}`} className={classes.link}>
                <Button
                  variant="raised"
                  size="small"
                  color="primary"
                  className={classes.link}
                >
                  More
                </Button>
              </Link>
            </CardActions>
          </Card>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(MovieCard);
