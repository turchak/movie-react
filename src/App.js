import './App.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { genresFetchData } from './actions/items';

import Header from './components/Header/Header';
import List from './components/List/List';
import Loader from './components/Loader/Loader';

class App extends Component {
  componentDidMount() {
    this.props.fetchGenres('/genre/movie/list');
  }

  render() {
    if (!this.props.genres) {
      return <Loader />;
    }

    return (
      <div className="App">
        <Header />
        <List />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    hasErrored: state.itemsHasErrored,
    genres: state.genres.entities,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchGenres: url => dispatch(genresFetchData(url)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
