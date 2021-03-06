import axios from 'axios';
import { forceLongPolling } from 'firebase/database';
axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
const API_KEY = '5a76e3dab3643dd50fee1a5fab49be2c';
axios.defaults.params = { api_key: API_KEY };

export const MovieService = {
  library: false,
  _query: '',
  _page: 1,
  total_pages: '',
  id: null,
  keyVideo: null,

  async getMovieTrend() {
    const response = await axios.get(
      `/trending/movie/week?language=en-US-RU-UA&page=${this._page}`
    );
    const { genres } = await this.getGenres(); //массив обьектов жанров
    let { results, total_pages } = response.data;

    results = results.map(result => ({
      ...result,
      genre_ids: result.genre_ids.map(
        id => genres.find(genre => genre.id === id).name
      ),
    }));

    return { results, total_pages };
  },

  async getGenres() {
    const { data: genres } = await axios.get(`genre/movie/list`);
    return genres;
  },

  get page() {
    return this._page;
  },

  changePage(newPage) {
    this._page = newPage;
  },

  async getSearchMovieResult() {
    const response = await axios.get(
      `search/movie?language=en-US-RU-UA&query=${this._query}&page=${this._page}`
    );

    const { genres } = await this.getGenres(); //массив обьектов жанров
    let { results, total_pages } = response.data;

    results = results.map(result => ({
      ...result,
      genre_ids: result.genre_ids.map(
        id => genres.find(genre => genre.id === id).name
      ),
    }));

    return { results, total_pages };
  },

  async getSearchMovieById(id) {
    const response = await axios.get(`movie/${id}`);
    return response.data;
  },

  async getVideo(id) {
    try {
      const response = await axios.get(
        `movie/${id}/videos?language=en-US-UA-RU`
      );
      this.keyVideo = await response.data.results[1].key;
      return this.keyVideo;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  },

  async getRecommendMovies(id) {
    const response = await axios.get(
      `movie/${id}/recommendations?language=en-US-UA-RU`
    );

    const { genres } = await this.getGenres(); //массив обьектов жанров
    let { results } = response.data;
    results = results.map(result => ({
      ...result,
      genre_ids: result.genre_ids
        .map(id => genres.find(genre => genre.id === id).name)
    }));

    return results;
  },
};
