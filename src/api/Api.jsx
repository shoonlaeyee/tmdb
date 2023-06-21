const AuthToken =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNzkyZmE3NDlkNmE0ZTczZmFmNDAzNmI5NmMwOGEwZSIsInN1YiI6IjY0OGU4ZjI1YzNjODkxMDBhZTUxMmQ2OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6pUO8rl78Vad7vFbro0Sk1Vq40c8Ce1N0i0SZGxv2lo";

export const BaseUrl = "https://api.themoviedb.org/3";

export const ImgPosterBaseUrl = "https://image.tmdb.org/t/p/w500";

export const ImgBackdropBaseUrl =
  "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces";

const GETOption = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${AuthToken}`,
  },
};

export const fetchGenres = () => {
  const language = "en";
  return fetch(
    `${BaseUrl}/genre/movie/list?language=${language}`,
    GETOption
  ).then((response) => response.json());
};

export const fetchMovieList = ({ page=1, genre, keyword }) => {
  const language = "en-US";
  const includeAdult = false;
  const includeVideo = false;
  const sortBy = "popularity.desc";
  const withGenre = genre || ""
  const withKeyword = keyword || ""

  return fetch(
    `${BaseUrl}/discover/movie?include_adult=${includeAdult}&include_video=${includeVideo}&language=${language}&page=${page}&sort_by=${sortBy}&with_genres=${withGenre}&with_keywords=${withKeyword}`,
    GETOption
  ).then((response) => response.json());
};

export const fetchMovieDetail = ({ movieId }) => {
  const language = "en-US";

  return fetch(
    `${BaseUrl}/movie/${movieId}?language=${language}`,
    GETOption
  ).then((response) => response.json());
};

export const fetchMovieCredits = ({ movieId }) => {
  const language = "en-US";

  return fetch(
    `${BaseUrl}/movie/${movieId}/credits?language=${language}`,
    GETOption
  ).then((response) => response.json());
};

export const fetchMovieKeywords = ({ movieId }) => {
  const language = "en-US";

  return fetch(
    `${BaseUrl}/movie/${movieId}/keywords?language=${language}`,
    GETOption
  ).then((response) => response.json());
};

export const fetchSimilarMovies = ({ movieId }) => {
  const language = "en-US";

  return fetch(
    `${BaseUrl}/movie/${movieId}/similar?language=${language}`,
    GETOption
  ).then((response) => response.json());
};

export const searchKeywords = ({ query="" }) => {
  return fetch(
    `${BaseUrl}/search/keyword?query=${query}&page=1`,
    GETOption
  ).then((response) => response.json());
};

export const searchMovies = ({ query="" }) => {
  return fetch(
    `${BaseUrl}/search/movie?query=${query}&include_adult=false&language=en-US`,
    GETOption
  ).then((response) => response.json());
};