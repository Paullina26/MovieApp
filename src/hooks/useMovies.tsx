import { useState, useCallback, useEffect, useRef } from 'react';
import { Movie } from '../types';
import { ENDPOINTS } from '../api/api';
import { FilterValues } from '../types';
import { useStatus } from '../context/StatusContext';

interface UseMoviesReturn {
  movies: Movie[];
  loading: boolean;
  error: string;
  fetchMovies: (filters?: FilterValues & { page?: number }) => void;
  resetMovies: () => void;
  page: number;
}

const useMovies = (): UseMoviesReturn => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);
  const pageRef = useRef(page);
  const {
    loading: statusLoading,
    error: statusError,
    setLoading,
    setError,
  } = useStatus();

  useEffect(() => {
    pageRef.current = page;
  }, [page]);

  const fetchMovies = useCallback(
    async (filters?: FilterValues & { page?: number }) => {
      setLoading(true);
      setError('');
      const currentPage = filters?.page || 1;
      let url = '';

      if (filters) {
        const { query, genre, minVoteAverage, sortBy } = filters;
        if (query && query.trim() !== '') {
          url = ENDPOINTS.search(query) + `&page=${currentPage}`;
        } else {
          url =
            ENDPOINTS.discover(sortBy, genre, minVoteAverage) +
            `&page=${currentPage}`;
        }
      } else {
        url = ENDPOINTS.popular + `&page=${currentPage}`;
      }

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Błąd HTTP: ${response.status}`);
        }
        const data = await response.json();
        if (currentPage === 1) {
          setMovies(data.results);
        } else {
          setMovies(prev => [...prev, ...data.results]);
        }
        setPage(currentPage);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Nieznany błąd');
        }
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError]
  );

  const resetMovies = useCallback(() => {
    setMovies([]);
    setPage(1);
  }, []);

  return {
    movies,
    loading: statusLoading,
    error: statusError,
    fetchMovies,
    resetMovies,
    page,
  };
};

export default useMovies;
