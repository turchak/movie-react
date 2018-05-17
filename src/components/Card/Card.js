import React, { Component } from 'react';
import './Card';

class Card extends Component {
  getImage(url) {
    const IMG_URL = 'https://image.tmdb.org/t/p/w500';
    return `${IMG_URL}${url}`;
  }
  render() {
    return (
      <div className="card">
        <div className="card__image">
          <img src={this.getImage(this.props.data.poster_path)} alt="photo" />
        </div>
        <div className="card__content">{this.props.data.overview}</div>
      </div>
    );
  }
}

export default Card;
