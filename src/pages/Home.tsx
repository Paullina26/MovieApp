import { useEffect, useState } from 'react';
import { Container, Grid2 } from '@mui/material';
import MovieCard from '../components/MovieCard';
import useMovies from '../hooks/useMovies';
import Loading from '../components/status/Loading';
import ErrorAlert from '../components/status/ErrorAlert';
import MovieFilter from '../components/MovieFilter';
import { FilterValues } from '../types';

const Home: React.FC = () => {
  const { movies, loading, error, fetchMovies } = useMovies();

  const [filters, setFilters] = useState<FilterValues | undefined>(undefined);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  useEffect(() => {
    if (filters) {
      fetchMovies(filters);
    }
  }, [filters, fetchMovies]);

  return (
    <Container className='mt-5 mb-5'>
      {error && <ErrorAlert message={error} />}
      {loading && <Loading />}
      <MovieFilter
        onFilterChange={(newFilters: FilterValues) => setFilters(newFilters)}
      />
      <Grid2 container spacing={3} sx={{ justifyContent: 'center' }}>
        {movies.map(movie => (
          <Grid2 key={movie.id}>
            <MovieCard movie={movie} />
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
};

export default Home;
