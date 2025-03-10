import { useEffect, useState } from 'react';
import { Container, Grid2, Box, Typography } from '@mui/material';
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
    <>
      <Box
        sx={{
          textTransform: 'none',
          m: 0,
          p: 0,
          position: 'fixed',
          zIndex: 1,
          backgroundColor: '#060606',
          width: '100vw',
          height: '70px',
          boxShadow: '0px 10px 30px 20px rgba(0,0,0,0.75)',
          textAlign: 'center',
        }}
      >
        <Typography variant='h4' sx={{ mt: 2 }}>
          Filmy
        </Typography>
        <MovieFilter
          onFilterChange={(newFilters: FilterValues) => setFilters(newFilters)}
        />
      </Box>
      {error && <ErrorAlert message={error} />}
      {loading && <Loading />}
      <Container className='mt-25 mb-5'>
        <Grid2 container spacing={3} sx={{ justifyContent: 'center' }}>
          {movies.map(movie => (
            <Grid2 key={movie.id}>
              <MovieCard movie={movie} />
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </>
  );
};

export default Home;
