import './Movie.css';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { itemFetchData } from '../../actions/items';

class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: false,
    };
  }

  componentDidMount() {
    this.props.fetchData(`/movie/${this.props.id}`);
  }

  render() {
    return (
      <Fragment>
        <Header />
        <div className="movie">
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
            </div>
            {/* <Recommended /> */}
            {/* <Similar /> */}
          </div>
        </div>
        {/* <Footer /> */}
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(state, ownProps);
  return {
    id: ownProps.match.params.itemId,
    movie: state.item,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: url => dispatch(itemFetchData(url)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Movie);
