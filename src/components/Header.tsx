import { Box, Typography } from '@mui/material';
import MovieFilter from './MovieFilter';
import { FilterValues } from '../types';

interface HeaderProps {
  onFilterChange: (filters: FilterValues) => void;
}

const Header: React.FC<HeaderProps> = ({ onFilterChange }) => (
  <Box className='normal-case m-0 p-0 fixed z-[1] bg-[#060606] w-screen max-w-[1280px] h-[70px] shadow-[0_10px_30px_20px_rgba(0,0,0,0.75)] text-center left-1/2 -translate-x-1/2 top-0 flex items-center justify-between px-2'>
    {/* in that case tilewind className is overwritten by mui class */}
    <Typography variant='h4' sx={{ mt: 2 }}>
      Filmy
    </Typography>
    <MovieFilter onFilterChange={onFilterChange} />
  </Box>
);

export default Header;
