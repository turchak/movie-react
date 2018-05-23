import './Movie.css';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { itemFetchData } from '../../actions/items';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
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
              <img src={this.getImage(movie.backdrop_path)} alt="" />
            </div>
            <div className={classes.content}>
              <Typography variant="headline" gutterBottom>
                {movie.title}
              </Typography>
              <Typography gutterBottom>
                Release Date: {movie.release_date}
              </Typography>
              <Typography gutterBottom>
                Budget: {movie.budget + ' ' + '$'}
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

        {/* <div className="movie">
          <div className="container">
            <div className="movie__info">
              <img src="" alt="" className="movie__img" />
              <div className="movie__description">
                <h1 className="movie__title">{'title'}</h1>
                <ul className="movie__details">
                  <li className="movie__detail">
                    <span className="movie__detail-item">Year:</span>
                    <span className="movie__detail-item">
                    {this.props.movie.release_date}
                    </span>
                  </li>
                  <li className="movie__detail">
                    <span className="movie__detail-item">Votes:</span>
                    <span className="movie__detail-item">{'vote_count'}</span>
                  </li>
                  <li className="movie__detail">
                    <span className="movie__detail-item">Vote Avarage:</span>
                    <span className="movie__detail-item">{'vote_avarage'}</span>
                  </li>
                  <li className="movie__detail">
                    <span className="movie__detail-item">Genre:</span>
                    <span className="movie__detail-item">{'genre_ids[]'}</span>
                  </li>
                  <li className="movie__detail">
                    <span className="movie__detail-item">adult:</span>
                    <span className="movie__detail-item">{'adult'}</span>
                  </li>
                </ul>
                <p>{'overview'}</p>
              </div>
            </div> */}
        {/* <Recommended /> */}
        {/* <Similar /> */}
        {/* </div> */}
        {/* </div> */}
        {/* <Footer /> */}
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
