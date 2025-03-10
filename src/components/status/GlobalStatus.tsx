import React from 'react';
import { Box } from '@mui/material';
import Loading from './Loading';
import ErrorAlert from './ErrorAlert';
import WarningAlert from './WarningAlert';
import { useStatus } from '../../context/StatusContext';

const GlobalStatus: React.FC = () => {
  const { loading, error, warning } = useStatus();

  return (
    <Box>
      {loading && <Loading />}
      {error && <ErrorAlert message={error} />}
      {warning && <WarningAlert message={warning} />}
    </Box>
  );
};

export default GlobalStatus;
