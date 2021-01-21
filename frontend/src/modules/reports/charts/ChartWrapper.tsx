import { FC } from 'react';
import { Box, Paper, Typography } from '@material-ui/core';

export const ChartWrapper: FC<{ title?: string }> = ({ title, children }) => {
  return (
    <Box my={2} display="flex" justifyContent="flex-start">
      <Paper elevation={2}>
        <Box p={1}>
          <Typography variant="subtitle2" gutterBottom>{title}</Typography>
          <Box mt={1}>
            {children}
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}