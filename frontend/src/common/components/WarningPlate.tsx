import React, { FC } from 'react';
import { Box, Paper, Typography } from '@material-ui/core';

export const WarningPlate: FC = ({ children }) => (
  <Box display="flex">
    <Paper elevation={2}>
      <Box p={2}>
        <Typography variant="subtitle1">{children}</Typography>
      </Box>
    </Paper>
  </Box>
);
