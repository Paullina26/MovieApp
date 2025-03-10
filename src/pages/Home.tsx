import { useEffect, useState, useRef, useCallback } from 'react';
import { Container, Grid2 } from '@mui/material';
import MovieCard from '../components/MovieCard';
import useMovies from '../hooks/useMovies';
import { FilterValues } from '../types';
import Header from '../components/Header';
import Loading from '../components/status/Loading';

const defaultFilters: FilterValues = {
  query: '',
  genre: '',
  minVoteAverage: 0,
  sortBy: 'popularity.desc',
};

const Home: React.FC = () => {
  const { movies, loading, fetchMovies, resetMovies, page } = useMovies();
  const [filters, setFilters] = useState<FilterValues | undefined>(undefined);
  const observerRef = useRef<HTMLDivElement>(null);

  const pageRef = useRef(page);
  useEffect(() => {
    pageRef.current = page;
  }, [page]);

  useEffect(() => {
    fetchMovies(
      filters ? { ...filters, page: 1 } : { ...defaultFilters, page: 1 }
    );
  }, [fetchMovies, filters]);

  const handleFilterChange = (newFilters: FilterValues) => {
    setFilters(newFilters);
    resetMovies();
    fetchMovies({ ...newFilters, page: 1 });
  };

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && !loading) {
        const nextPage = pageRef.current + 1;
        fetchMovies(
          filters
            ? { ...filters, page: nextPage }
            : { ...defaultFilters, page: nextPage }
        );
      }
    },
    [fetchMovies, filters, loading]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    });
    const currentElement = observerRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }
    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [handleObserver]);

  return (
    <>
      <Header onFilterChange={handleFilterChange} />
      <Container className='mt-25 mb-5'>
        <Grid2 container spacing={3} className='justify-center'>
          {movies.map((movie, index) => (
            <Grid2 key={`${movie.id}-${index}`}>
              <MovieCard movie={movie} />
            </Grid2>
          ))}
        </Grid2>
        {loading && <Loading />}
        <div ref={observerRef} />
      </Container>
    </>
  );
};

export default Home;
