import { Box, Typography } from '@mui/material';

const Header: React.FC = () => (
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
  </Box>
);

export default Header;
