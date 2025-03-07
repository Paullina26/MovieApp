import { useState, useCallback } from 'react';
import { Movie } from '../types';
import { API_KEY } from '../api/api';

interface UseMoviesReturn {
  movies: Movie[];
  loading: boolean;
  error: string;
  fetchMovies: () => void;
}

const useMovies = (): UseMoviesReturn => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const fetchMovies = useCallback(() => {
    setLoading(true);
    setError('');
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=pl-PL`
    )
      .then(response => {
        if (!response.ok) {
          throw new Error(`Błąd HTTP: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Pobrane filmy:', data.results);
        setMovies(data.results);
        setLoading(false);
      })
      .catch(err => {
        console.error('Błąd pobierania:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { movies, loading, error, fetchMovies };
};

export default useMovies;
