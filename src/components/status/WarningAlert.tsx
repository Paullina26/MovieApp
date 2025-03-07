import { Alert } from '@mui/material';

interface WarningAlertProps {
  message: string;
}

const WarningAlert: React.FC<WarningAlertProps> = ({ message }) => {
  return <Alert severity='warning'>{message}</Alert>;
};

export default WarningAlert;
