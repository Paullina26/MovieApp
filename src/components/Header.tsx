import { Box, Typography } from '@mui/material';
import MovieFilter from './MovieFilter';
import { FilterValues } from '../types';

interface HeaderProps {
  onFilterChange: (filters: FilterValues) => void;
}

const Header: React.FC<HeaderProps> = ({ onFilterChange }) => (
  <Box
    sx={{
      textTransform: 'none',
      m: 0,
      p: 0,
      position: 'fixed',
      zIndex: 1,
      backgroundColor: '#060606',
      width: '100vw',
      maxWidth: '1280px',
      height: '70px',
      boxShadow: '0px 10px 30px 20px rgba(0,0,0,0.75)',
      textAlign: 'center',
      left: '50%',
      transform: 'translateX(-50%)',
      top: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      px: 2,
    }}
  >
    <Typography variant='h4' sx={{ mt: 2 }}>
      Filmy
    </Typography>
    <MovieFilter onFilterChange={onFilterChange} />
  </Box>
);

export default Header;
