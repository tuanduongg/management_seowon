import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Fab,
  Grid,
  Hidden,
  Icon,
  IconButton,
  styled,
  useTheme,
} from '@mui/material';
import { Span } from 'components/Typography';
import { format } from 'date-fns';
import { Fragment } from 'react';

const RowCards = () => {
  const { palette } = useTheme();
  const textMuted = palette.text.secondary;

  return [1, 2, 3, 4].map((id) => (
    <Fragment key={id}>

    </Fragment>
  ));
};

export default RowCards;
