import './Movie.css';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import { itemFetchData } from '../../actions/items';
import { withStyles } from '@material-ui/core/styles';
import Loader from '../Loader/Loader';
import Typography from '@material-ui/core/Typography';

const styles = {
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
    alignItems: 'center',
    width: '50%',
  },
  img: {
    width: '50%',
  },
};

class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: false,
    };
  }

  getImage(url) {
    const IMG_URL = 'https://image.tmdb.org/t/p/w500';
    return `${IMG_URL}${url}`;
  }

  componentDidMount() {
    this.props.fetchData(`/movie/${this.props.id}`);
  }

  render() {
    const { movie, classes } = this.props;
    console.log(this.props);

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
        <Header />
        <div className={classes.container}>
          <div className={classes.info}>
            <div className={classes.img}>
              <img src={this.getImage(movie.backdrop_path)} alt={movie.title} />
            </div>
            <div className={classes.content}>
              <Typography variant="headline" gutterBottom>
                {movie.title}
              </Typography>
              <Typography gutterBottom>
                Release Date: {movie.release_date}
              </Typography>
              <Typography gutterBottom>
                Budget: {movie.budget + ' $'}
              </Typography>
              <Typography gutterBottom>
                Production:{' '}
                {movie.production_companies.reduce((acc, val, index, arr) => {
                  if (index === arr.length - 1) {
                    return (acc = acc + val.name);
                  } else {
                    return (acc = acc + val.name) + ', ';
                  }
                }, '')}
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
            </div>
          </div>
        </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(Movie)
);
