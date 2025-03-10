import { useEffect, useState } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import Loading from '../components/status/Loading';
import ErrorAlert from '../components/status/ErrorAlert';
import { MovieDetails as MovieDetailsType } from '../types';
import { API_KEY } from '../api/api';

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetailsType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

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
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <ErrorAlert message={error} />;
  if (!movie) return null;

  return (
    <Container sx={{ mt: 2, mb: 4, position: 'relative' }}>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          borderRadius: 2,
          overflow: 'hidden',
          mb: 2,
          backgroundImage: `url(https://image.tmdb.org/t/p/w780${movie.backdrop_path})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          }}
        />
        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            alignItems: 'flex-start',
            p: 2,
            color: 'white',
          }}
        >
          <Box
            component='img'
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            sx={{
              width: 200,
              borderRadius: 2,
              boxShadow: 3,
              mr: 2,
              '@media (max-width:640px)': {
                display: 'none',
              },
            }}
          />
          <Box>
            <Typography sx={{ m: 0, pb: 1 }} variant='h5' gutterBottom>
              {movie.title}
            </Typography>
            <Typography sx={{ m: 0, pb: 0 }} variant='subtitle1' gutterBottom>
              <b>Data premiery:</b> {movie.release_date} | <b>Czas trwania:</b>{' '}
              {movie.runtime} min
            </Typography>
            <Typography sx={{ m: 0, pb: 0 }} variant='body1' gutterBottom>
              <b>Gatunki:</b> {movie.genres.map(g => g.name).join(', ')}
            </Typography>
            <Typography sx={{ m: 0, pb: 1 }} variant='body1' gutterBottom>
              <b>Ocena:</b> {movie.vote_average}
            </Typography>
            <Typography sx={{ m: 0, pb: 1 }} variant='body2'>
              {movie.overview}
            </Typography>
            <Typography sx={{ m: 0, pb: 0 }} gutterBottom>
              <b> Produkcja:</b>
            </Typography>
            <Typography variant='body2' gutterBottom>
              {movie.production_companies
                .map(company => company.name)
                .join(', ')}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: 5,
          right: 30,
          zIndex: 2,
        }}
      >
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
