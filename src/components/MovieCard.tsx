import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const navigate = useNavigate();

  const handleMore = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <Card
      sx={{ width: 240, height: 480, margin: 'auto', position: 'relative' }}
    >
      <CardMedia
        component='img'
        sx={{ height: 360, objectFit: 'cover' }}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : '/placeholder.jpg'
        }
        alt={movie.title}
      />
      <CardContent sx={{ mt: 0, mb: 0, pb: 0, pt: 1 }}>
        <Typography sx={{ mb: 0, pb: 0 }} gutterBottom component='div'>
          {movie.title}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Data premiery: {movie.release_date}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Ocena: {movie.vote_average}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          position: 'absolute',
          bottom: 8,
          right: 8,
          p: 0,
        }}
      >
        <Button
          sx={{
            color: 'rgb(255, 255, 255)',
            borderColor: 'rgb(255, 255, 255)',
            '&:hover': { color: 'rgb(0, 255, 229)' },
          }}
          size='small'
          onClick={handleMore}
        >
          Więcej
        </Button>
      </CardActions>
    </Card>
  );
};

export default MovieCard;
