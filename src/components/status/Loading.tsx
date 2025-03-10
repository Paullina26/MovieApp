import { Box, CircularProgress } from '@mui/material';

const Loading: React.FC = () => {
  return (
    <Box className='flex justify-center items-center min-h-full'>
      <CircularProgress color='primary' />
    </Box>
  );
};

export default Loading;
