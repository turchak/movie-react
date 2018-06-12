import './List.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { itemsFetchData, genresFetchData } from '../../actions/items';
import MovieCard from '../Card/Card';
import Loader from '../Loader/Loader';
import InfiniteScroll from 'react-infinite-scroller';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      hasMoreItems: true,
    };
  }

  loadData(page) {
    this.props.fetchData('/movie/popular', `&page=${page}`);
  }

  render() {
    const { genres } = this.props;

    if (this.props.hasErrored) {
      return <p>Sorry! There was an error loading the items</p>;
    }

    return (
      <InfiniteScroll
        initialLoad={true}
        className="container list__container"
        pageStart={0}
        loadMore={this.loadData.bind(this)}
        hasMore={this.state.hasMoreItems}
        loader={<Loader key={0} />}
      >
        {this.props.items.map(item => (
          <MovieCard item={item} key={item.id} genres={genres} />
        ))}
      </InfiniteScroll>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    items: state.popular.items,
    hasErrored: state.itemsHasErrored,
    genres: state.genres.entities.genres,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: (url, param) => dispatch(itemsFetchData(url, param)),
    fetchGenres: url => dispatch(genresFetchData(url)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
