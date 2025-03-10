import { useEffect, useState } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { MovieDetails as MovieDetailsType } from '../types';
import { API_KEY } from '../api/api';
import { useStatus } from '../context/StatusContext';

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetailsType | null>(null);
  const { setLoading, setError } = useStatus();

  const getErrorMessage = (error: unknown): string =>
    error instanceof Error ? error.message : 'Nieznany błąd';

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=pl-PL`
        );
        if (!response.ok) {
          throw new Error(`Błąd HTTP: ${response.status}`);
        }
        const data = await response.json();
        setMovie(data);
      } catch (err: unknown) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id, setLoading, setError]);

  return (
    <Container className='mt-2 mb-4 relative'>
      <Box
        className='relative w-full overflow-hidden mb-2 bg-cover bg-center'
        sx={{
          borderRadius: 3,
          backgroundImage: `url(https://image.tmdb.org/t/p/w780${movie?.backdrop_path})`,
        }}
      >
        <Box
          className='absolute top-0 left-0 w-full h-full '
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          }}
        />
        <Box className='relative z-10 flex items-start p-2 text-white'>
          <Box
            className='w-[200px] rounded shadow-md mr-2 hidden sm:block'
            component='img'
            src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
            alt={movie?.title ?? 'img'}
          />
          <Box>
            <Typography className='m-0 pb-1' variant='h5' gutterBottom>
              {movie?.title ?? ''}
            </Typography>
            <Typography className='m-0 pb-0' variant='subtitle1' gutterBottom>
              <b>Data premiery:</b> {movie?.release_date ?? ''} |{' '}
              <b>Czas trwania:</b> {movie?.runtime ?? ''} min
            </Typography>
            <Typography className='m-0 pb-0' variant='body1' gutterBottom>
              <b>Gatunki:</b> {movie?.genres.map(g => g.name).join(', ') ?? ''}
            </Typography>
            <Typography className='m-0 pb-1' variant='body1' gutterBottom>
              <b>Ocena:</b> {movie?.vote_average ?? ''}
            </Typography>
            <Typography className='m-0 pb-1' variant='body2'>
              {movie?.overview ?? ' '}
            </Typography>
            <Typography className='m-0 pb-0' gutterBottom>
              <b> Produkcja:</b>
            </Typography>
            <Typography variant='body2' gutterBottom>
              {movie?.production_companies
                .map(company => company.name)
                .join(', ') ?? ''}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box className='absolute top-[5px] right-[30px] z-20'>
        <Button
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            color: 'rgb(255, 255, 255)',
            borderColor: 'rgb(255, 255, 255)',
            '&:hover': { backgroundColor: 'rgba(0, 255, 229, 0.2)' },
          }}
          variant='outlined'
          onClick={() => navigate(-1)}
        >
          Powrót
        </Button>
      </Box>
    </Container>
  );
};

export default MovieDetails;
