import './List.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { itemsFetchData } from '../../actions/items';
import MovieCard from '../Card/Card';
import Loader from '../Loader/Loader';

class List extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchData('/movie/top_rated');
  }

  handleClick() {}

  render() {
    if (this.props.hasErrored) {
      return <p>Sorry! There was an error loading the items</p>;
    }

    if (this.props.isLoading) {
      return <Loader />;
    }

    return (
      <main className="list">
        <div className="container list__container">
          {this.props.items.map(item => (
            <MovieCard item={item} key={item.id} />
          ))}
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    items: state.items,
    hasErrored: state.itemsHasErrored,
    isLoading: state.itemsIsLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: url => dispatch(itemsFetchData(url)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
