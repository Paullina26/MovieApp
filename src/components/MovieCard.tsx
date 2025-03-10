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
    <Card className='w-[240px] h-[480px] m-auto relative'>
      <CardMedia
        component='img'
        className='h-[360px]'
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : '/placeholder.jpg'
        }
        alt={movie.title}
      />
      <CardContent className='mt-0 mb-0 pb-0 pt-1'>
        <Typography className='mb-0 pb-0' component='div' gutterBottom>
          {movie.title}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Data premiery: {movie.release_date}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Ocena: {movie.vote_average}
        </Typography>
      </CardContent>
      <CardActions className='absolute bottom-[8px] right-[8px] p-0'>
        <Button
          sx={{
            '&:hover': { color: 'rgb(0,255,229)' },
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
