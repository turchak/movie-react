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

  deleteMovie(movie) {
    const list = this.getList();
    if (list.includes(movie)) {
      let i = list.indexOf(movie);
      if (i !== -1) {
        list.splice(i, 1);
      }
      const listString = JSON.stringify(list);
      this.movies = list;
      window.localStorage.setItem('Movies', listString);
    }
  }

  checkList(movie) {
    const list = this.movies;
    console.log(list);
    if (list.includes(movie)) {
      return true;
    }
    return false;
  }
}

export const FAVORITES = new Favorites();
