import { useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import useMovies from '../hooks/useMovies';

import ErrorAlert from '../components/status/ErrorAlert';
import Loading from '../components/status/Loading';

const Home: React.FC = () => {
  const { movies, loading, error, fetchMovies } = useMovies();

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  useEffect(() => {
    console.log('Movies:', movies);
  }, [movies]);

  return (
    <Container className='mt-5'>
      <Typography variant='h4' gutterBottom>
        Lista filmów
      </Typography>
      {loading && <Loading />}
      {error && <ErrorAlert message={error} />}
    </Container>
  );
};

export default Home;
