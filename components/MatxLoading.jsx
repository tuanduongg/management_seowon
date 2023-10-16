import { CircularProgress } from '@mui/material';
import { Box, styled } from '@mui/system';
import LOGO from '../assets/images/logo.png';

const StyledLoading = styled('div')(() => ({
  backgroundColor: '#00000014',
  width: '100%',
  height: '80vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& img': {
    width: 'auto',
    height: '25px',
  },
  '& .circleProgress': {
    position: 'absolute',
    left: -9,
    right: 0,
    top: 'calc(50% - 40px)',
    width: '70px !important', height: '70px !important'
  },
}));

const Loading = () => {
  return (
    <StyledLoading>
      <Box position="relative">
        <img src={LOGO} alt="logo" />
        <CircularProgress sx={{}} className="circleProgress" />
      </Box>
    </StyledLoading>
  );
};

export default Loading;
