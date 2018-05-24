import React, { Component, Fragment } from 'react';
import Header from '../Header/Header';
import { connect } from 'react-redux';
import { searchFetchData } from '../../actions/items';
import Loader from '../Loader/Loader';
import MovieCard from '../Card/Card';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = {
  container: {
    maxWidth: 1280,
    margin: '0 auto',
  },
  card: {
    width: 'calc(100% / 5)',
  },
  results: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: null,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.query !== prevState.query || !prevState.query) {
      nextProps.fetchData('/search/movie', `&query=${nextProps.query}`);
      return {
        query: nextProps.query,
      };
    }
    return null;
  }

  render() {
    const { classes } = this.props;
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

    if (this.props.results.length <= 0) {
      return null;
    }
    return (
      <Fragment>
        <Header />
        <div className={classes.container}>
          <Typography variant="headline" gutterBottom align="center">
            Search results...
          </Typography>
          <div className={classes.results}>
            {this.props.results.map(item => {
              return <MovieCard item={item} key={item.id} />;
            })}
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    results: state.search,
    query: ownProps.match.params.itemId,
    hasErrored: state.itemsHasErrored,
    isLoading: state.itemsIsLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: (url, param) => dispatch(searchFetchData(url, param)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(Search)
);
