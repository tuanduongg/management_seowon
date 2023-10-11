import { CircularProgress } from '@mui/material';
import { Box, styled } from '@mui/system';
import LOGO from '../assets/images/logo.png';

const StyledLoading = styled('div')(() => ({
  backgroundColor: '#00000029',
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& img': {
    width: 'auto',
    height: '25px',
  },
  '& .circleProgress': {
    position: 'absolute',
    left: -7,
    right: 0,
    top: 'calc(50% - 25px)',
  },
}));

const Loading = () => {
  return (
    <StyledLoading>
      <Box position="relative">
        <img src={LOGO} alt="logo" />
        <CircularProgress className="circleProgress" />
      </Box>
    </StyledLoading>
  );
};

export default Loading;
