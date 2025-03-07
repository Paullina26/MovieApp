import React, { useEffect, useState } from 'react';
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
      } catch (err: any) {
        setError(err.message);
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
    <Container sx={{ mt: 2 }}>
      {/* Tło filmu */}
      {movie.backdrop_path && (
        <Box
          component='img'
          src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
          alt={movie.title}
          sx={{ width: '100%', borderRadius: 2, mb: 2 }}
        />
      )}

      {/* Plakat filmu – opcjonalnie nakłada się na tło */}
      {movie.poster_path && (
        <Box
          component='img'
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          sx={{
            width: 200,
            float: 'left',
            mr: 2,
            mb: 2,
            borderRadius: 2,
            boxShadow: 3,
          }}
        />
      )}

      <Typography variant='h4' gutterBottom>
        {movie.title}
      </Typography>
      <Typography variant='subtitle1' color='text.secondary' gutterBottom>
        Data premiery: {movie.release_date} | Czas trwania: {movie.runtime} min
      </Typography>
      <Typography variant='body1' gutterBottom>
        Gatunki: {movie.genres.map(g => g.name).join(', ')}
      </Typography>
      <Typography variant='body1' gutterBottom>
        Ocena: {movie.vote_average}
      </Typography>
      <Typography variant='body2' paragraph>
        {movie.overview}
      </Typography>
      <Typography variant='h6' gutterBottom>
        Produkcja:
      </Typography>
      <Typography variant='body2' gutterBottom>
        {movie.production_companies.map(company => company.name).join(', ')}
      </Typography>

      <Button variant='contained' onClick={() => navigate(-1)} sx={{ mt: 2 }}>
        Powrót
      </Button>
    </Container>
  );
};

export default MovieDetails;
