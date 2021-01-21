import { ChangeEvent, FC, useMemo, useCallback, useState } from 'react';
import { Box, Typography, Switch, Paper } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { HistoryRecord } from 'common/api/types/history';

const calcStats = (records: HistoryRecord[]) => {
  let incomeRecordsCount = 0;
  let lossRecordsCount = 0;

  let allIncome = 0;
  let allLoss = 0;

  let maxIncome = 0;
  let maxLoss = 0;

  let maxIncomeDate = 'unknown';
  let maxLossDate = 'unknown';
  
  records.forEach(({ sum, date }) => {
    if (sum >= 0) {
      incomeRecordsCount += 1;
      allIncome += sum;

      if (sum > maxIncome) {
        maxIncome = sum;
        maxIncomeDate = date;
      }
    } else {
      lossRecordsCount += 1;
      allLoss += sum;

      if (sum < maxLoss) {
        maxLoss = sum;
        maxLossDate = date;
      }
    }
  });

  const averageIncome = incomeRecordsCount > 0 ? allIncome / incomeRecordsCount : 0;
  const averageLoss = lossRecordsCount > 0 ? allLoss / lossRecordsCount : 0;

  return [
    allIncome,
    allLoss,
    maxIncome,
    maxLoss,
    maxIncomeDate,
    maxLossDate,
    averageIncome,
    averageLoss,
  ]
}

export const ExpandableStats: FC<{ records: HistoryRecord[] }> = ({ records }) => {
  const { t } = useTranslation();

  const [showStats, setShowStats] = useState(false);

  const toggleStats = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => setShowStats(target.checked),
    []
  );

  const [
    allIncome,
    allLoss,
    maxIncome,
    maxLoss,
    maxIncomeDate,
    maxLossDate,
    averageIncome,
    averageLoss,
  ] = useMemo(
    () => calcStats(records).map((stat) => typeof stat === 'number' ? stat.toFixed(2) : stat),
    [records]
  );

  if (records.length === 0) {
    return null;
  }

  return (
    <Box display="flex" flexDirection="column">
      <Typography variant="subtitle2">{t('Total stats')}</Typography>
      <Box display="flex" alignItems="center">
        <Switch
          checked={showStats}
          onChange={toggleStats}
        />
        <Typography variant="body2">{t('Show total stats')}</Typography>
      </Box>
      {showStats && (
        <Box mt={1} display="flex">
          <Paper elevation={2}>
            <Box p={2}>
              <Typography variant="body2">
                {`${t('Total income')}: ${allIncome}`}
              </Typography>
              <Typography variant="body2">
                {`${t('Total expense')}: ${allLoss}`}
              </Typography>
              <Typography variant="body2">
                {`${t('Maximum profit')}: ${maxIncome} (${maxIncomeDate})`}
              </Typography>
              <Typography variant="body2">
                {`${t('Maximum expense')}: ${maxLoss} (${maxLossDate})`}
              </Typography>
              <Typography variant="body2">
                {`${t('Average income')}: ${averageIncome}`}
              </Typography>
              <Typography variant="body2">
                {`${t('Average expense')}: ${averageLoss}`}
              </Typography>
            </Box>
          </Paper>
        </Box>
      )}
    </Box>
  )
}