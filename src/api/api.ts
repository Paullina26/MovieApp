export const API_KEY = '8f7360a908b8f8e47f6c8c039906df03';
export const BASE_URL = 'https://api.themoviedb.org/3';
export const LANGUAGE = 'pl-PL';

export const ENDPOINTS = {
  popular: `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=${LANGUAGE}`,
  search: (query: string) =>
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=${LANGUAGE}&query=${encodeURIComponent(
      query
    )}`,
  discover: (sortBy: string, genre?: string, minVoteAverage?: number) => {
    let url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=${LANGUAGE}&sort_by=${sortBy}`;
    if (genre) {
      url += `&with_genres=${genre}`;
    }
    if (minVoteAverage) {
      url += `&vote_average.gte=${minVoteAverage}`;
    }
    return url;
  },
  genreList: `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=${LANGUAGE}`,
};
