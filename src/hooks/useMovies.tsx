import { useState, useCallback } from 'react';
import { Movie } from '../types';
import { ENDPOINTS } from '../api/api';
import { FilterValues } from '../types';

interface UseMoviesReturn {
  movies: Movie[];
  loading: boolean;
  error: string;
  fetchMovies: (filters?: FilterValues) => void;
}

const useMovies = (): UseMoviesReturn => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const fetchMovies = useCallback((filters?: FilterValues) => {
    setLoading(true);
    setError('');
    let url = '';

    if (filters) {
      const { query, genre, minVoteAverage, sortBy } = filters;
      if (query && query.trim() !== '') {
        url = ENDPOINTS.search(query);
      } else {
        url = ENDPOINTS.discover(sortBy, genre, minVoteAverage);
      }
    } else {
      url = ENDPOINTS.popular;
    }

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Błąd HTTP: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setMovies(data.results);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { movies, loading, error, fetchMovies };
};

export default useMovies;
