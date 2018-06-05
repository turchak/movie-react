import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import { itemFetchData } from '../../actions/items';
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider,
} from '@material-ui/core/styles';
import Loader from '../Loader/Loader';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import img from '../../media/404.png';
import { FAVORITES } from '../../utils/favorites.js';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

const styles = theme => ({
  container: {
    maxWidth: 1280,
    margin: '0 auto',
  },
  info: {
    display: 'flex',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    justifyContent: 'space-between',
    width: '70%',
    padding: '15px',
  },
  img: {
    width: '30%',
  },
  favorite: {
    color: theme.palette.getContrastText(green[600]),
    alignSelf: 'flex-end',
  },
  description: {
    display: 'flex',
    flexDirection: 'column',
  },
});

class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: false,
      isFavorite: FAVORITES.checkList(this.props.id),
    };
    this.handleClick = this.handleClick.bind(this);
  }

  getImage(url) {
    const IMG_URL = 'https://image.tmdb.org/t/p/w500';
    return `${IMG_URL}${url}`;
  }

  handleClick() {
    FAVORITES.setList(this.props.id);
    if (!this.state.isFavorite) {
      this.setState({
        isFavorite: true,
      });
    }
  }

  transformPrice(price) {
    const arr = price.toString().split('');
    for (let i = arr.length - 1; i > 0; i--) {
      if ((arr.length - i) % 3 === 0) {
        arr[i - 1] = arr[i - 1] + ' ';
      }
    }
    return arr.join('');
  }

  componentDidMount() {
    this.props.fetchData(`/movie/${this.props.id}`);
  }

  render() {
    const { movie, classes } = this.props;
    const { isFavorite } = this.state;
    console.log(isFavorite);
    if (this.props.isLoading) {
      return (
        <Fragment>
          <Header />
          <Loader />
        </Fragment>
      );
    }
    if (this.props.hasErrored) {
      return <p>Sorry! There was an error loading the items</p>;
    }
    if (this.props.movie.length <= 0) {
      return null;
    }
    return (
      <Fragment>
        <MuiThemeProvider theme={theme}>
          <Header />
          <div className={classes.container}>
            <div className={classes.info}>
              <div className={classes.img}>
                <img
                  src={
                    movie.poster_path ? this.getImage(movie.poster_path) : img
                  }
                  alt={movie.title}
                />
              </div>
              <div className={classes.content}>
                <div className={classes.description}>
                  <Typography variant="headline" gutterBottom>
                    {movie.title}
                  </Typography>
                  <Typography gutterBottom>
                    Release Date: {movie.release_date}
                  </Typography>
                  <Typography gutterBottom>
                    Budget: {this.transformPrice(movie.budget) + ' $'}
                  </Typography>
                  <Typography gutterBottom>
                    Production:{' '}
                    {movie.production_companies.reduce(
                      (acc, val, index, arr) => {
                        if (index === arr.length - 1) {
                          return (acc = acc + val.name);
                        } else {
                          return (acc = acc + val.name) + ', ';
                        }
                      },
                      ''
                    )}
                  </Typography>
                  <Typography gutterBottom>
                    Genres:{' '}
                    {movie.genres.reduce((acc, val, index, arr) => {
                      if (index === arr.length - 1) {
                        return (acc = acc + val.name);
                      } else {
                        return (acc = acc + val.name) + ', ';
                      }
                    }, '')}
                  </Typography>
                  <Typography gutterBottom>
                    Vote: {movie.vote_average} ({movie.vote_count})
                  </Typography>
                  <Typography gutterBottom variant="body2">
                    Overview:
                  </Typography>
                  <Typography gutterBottom>{movie.overview}</Typography>
                </div>
                <Button
                  className={classes.favorite}
                  onClick={this.handleClick}
                  variant="raised"
                  size="small"
                  color="primary"
                >
                  Add to favorites
                </Button>
              </div>
            </div>
          </div>
        </MuiThemeProvider>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    id: ownProps.match.params.itemId,
    movie: state.item,
    hasErrored: state.itemsHasErrored,
    isLoading: state.itemsIsLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: url => dispatch(itemFetchData(url)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Movie));
