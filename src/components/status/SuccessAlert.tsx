import { Alert } from '@mui/material';

interface SuccessAlertProps {
  message: string;
}

const SuccessAlert: React.FC<SuccessAlertProps> = ({ message }) => {
  return <Alert severity='success'>{message}</Alert>;
};

export default SuccessAlert;
