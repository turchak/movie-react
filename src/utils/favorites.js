class Favorites {
  constructor(props) {
    this.movies = this.getList() || [];
  }

  getList() {
    const list = JSON.parse(window.localStorage.getItem('Movies'));
    return list;
  }

  setList(movie) {
    const list = this.movies;
    if (list.includes(movie)) {
      return;
    } else {
      list.push(movie);
      const listString = JSON.stringify(list);
      window.localStorage.setItem('Movies', listString);
    }
  }

  checkList(movie) {
    const list = this.movies;
    if (list.includes(movie)) {
      return true;
    }
    return false;
  }
}

export const FAVORITES = new Favorites();
