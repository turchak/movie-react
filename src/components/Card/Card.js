import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Card.css';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import green from '@material-ui/core/colors/green';

const styles = {
  card: {
    maxWidth: 345,
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
    color: green[200],
  },
};

class MovieCard extends Component {
  getImage(url) {
    const IMG_URL = 'https://image.tmdb.org/t/p/w500';
    return `${IMG_URL}${url}`;
  }

  render() {
    const { item, classes, ownKey } = this.props;
    // console.log(this.props);
    return (
      <div className="card" key={ownKey}>
        <Card className={classes.card}>
          <CardMedia
            classes={{
              root: classes.media,
            }}
            image={this.getImage(item.poster_path)}
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
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              <Link to={`/movie/${item.id}`} className={classes.link}>
                More
              </Link>
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(MovieCard);
