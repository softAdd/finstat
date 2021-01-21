import React, { FC, useCallback } from 'react';
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme
} from '@material-ui/core';
import BackspaceTwoToneIcon from '@material-ui/icons/BackspaceTwoTone';
import { useTranslation } from 'react-i18next';
import { WarningPlate } from 'common/components/WarningPlate';
import { useMutation, useQuery } from 'react-query';
import { GET_HISTORY_URL, getHistory, deleteHistoryRecord } from 'common/api/history';
import { HistoryRecord } from 'common/api/types/history';

export const RecordsTable: FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  const { data, isLoading, refetch } = useQuery(GET_HISTORY_URL, getHistory);
  const { mutate: deleteRecord } = useMutation((id: HistoryRecord['_id']) => deleteHistoryRecord(id), {
    onSuccess: () => {
      refetch();
    },
  });

  const getSumColor = useCallback((amount: number) => {
    if (amount === 0) {
      return theme.palette.success.main;
    }

    if (amount < 0) {
      return theme.palette.error.main;
    }

    return theme.palette.success.main;
  }, [theme]);

  if (isLoading || !data) {
    return null;
  }

  if (data.data?.records?.length === 0) {
    return (
      <Box mt={2}>
        <WarningPlate>{t('Add records to table')}</WarningPlate>
      </Box>
    );
  }

  const tableData = data.data.records.slice().reverse();

  return (
    <Box mt={2} display="flex">
      <Box width="100%">
        <TableContainer component={Paper} elevation={2}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>
                  {t('Date')}
                </TableCell>
                <TableCell>
                  {t('Category')}
                </TableCell>
                <TableCell>
                  {t('Value')}
                </TableCell>
                <TableCell>
                  {t('Actions')}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((record) => (
                <TableRow key={record._id}>
                  <TableCell style={{ width: '33%' }}>
                    <Typography variant="body2">{record.date}</Typography>
                  </TableCell>
                  <TableCell style={{ width: '33%' }}>
                    <Typography variant="body2">{record.category}</Typography>
                  </TableCell>
                  <TableCell style={{ width: '33%' }}>
                    <Typography variant="body2" style={{ color: getSumColor(record.sum) }}>{record.sum}</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => deleteRecord(record._id)}>
                      <BackspaceTwoToneIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};