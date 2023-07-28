import { Alert, AlertTitle, CircularProgress } from '@mui/material';
import { StyledBox } from '../styles/newsStyles';

type ErrorType = { state: 'pending' | 'rejected' };

const StateError = ({ state }: ErrorType) => {
  return state === 'pending' ? (
    <StyledBox>
      <CircularProgress />
    </StyledBox>
  ) : (
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      Rejected
    </Alert>
  );
};

export default StateError;
