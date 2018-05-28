import './List.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { itemsFetchData } from '../../actions/items';
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

  componentDidMount() {
    // this.props.fetchData('/movie/popular', `&page=${this.props.page}`);
    // this.loadData();
  }

  loadData(page) {
    console.log(page);
    this.props.fetchData('/movie/popular', `&page=${page}`);
  }

  render() {
    const { items, page } = this.props;
    console.log(this.props);

    // console.log(items, page);

    if (this.props.hasErrored) {
      return <p>Sorry! There was an error loading the items</p>;
    }

    // if (this.props.isLoading) {
    //   return <Loader />;
    // }

    // if (items.length === 0) {
    //   return <Loader />;
    // }

    return (
      // <main className="list">
      <InfiniteScroll
        initialLoad={true}
        className="container list__container"
        pageStart={page}
        loadMore={this.loadData.bind(this)}
        hasMore={this.state.hasMoreItems}
        loader={<Loader key={0} />}
      >
        {this.props.items.map(item => <MovieCard item={item} key={item.id} />)}
      </InfiniteScroll>
      // </main>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    items: state.popular.items,
    page: state.popular.page,
    hasErrored: state.itemsHasErrored,
    // isLoading: state.itemsIsLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: (url, param) => dispatch(itemsFetchData(url, param)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
