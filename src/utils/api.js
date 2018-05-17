class Api {
  constructor() {
    this.BASE_URL = 'https://api.themoviedb.org/3';
    this.API_KEY = '704767bd30ebb8d9a90c04312afebbb8';
    this.LANG = 'en-US';
  }
  get(link, param) {
    const options = {
      method: 'GET',
    };
    const url = `${this.BASE_URL}${link}?api_key=${this.API_KEY}`;
    return fetch(url, options);
  }
}

export const API = new Api();
