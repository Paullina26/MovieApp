import { Alert } from '@mui/material';

interface ErrorAlertProps {
  message: string;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message }) => {
  return <Alert severity='error'>{message}</Alert>;
};

export default ErrorAlert;
