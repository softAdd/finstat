import { ChangeEvent, FC, useState, useCallback } from 'react';
import { useQuery } from 'react-query';
import { Box, Grid, MenuItem, Switch, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { filterLessThanDate, filterMoreThanDate } from './charts/utils';
import { useCurrentInputDate } from 'common/utils/date';
import { GET_HISTORY_URL, getHistory } from 'common/api/history';
import { GET_CATEGORIES_URL, getCategories } from 'common/api/categories';
import { Category } from 'common/api/types/categories';
import { Select } from 'common/components/Select';
import { TextField } from 'common/components/TextField';
import { WarningPlate } from 'common/components/WarningPlate';
import { ExpandableStats } from './ExpandableStats';
import { AreaIncomeLoss } from './charts/AreaIncomeLoss';
import { PieIncomeLoss } from './charts/PieIncomeLoss';
import { BarCategory } from './charts/BarCategory';

const Reports: FC = () => {
  const { t } = useTranslation();

  const { data: historyResponse } = useQuery(GET_HISTORY_URL, getHistory);
  const { data: categoriesResponse } = useQuery(GET_CATEGORIES_URL, getCategories);
  
  const currentDate = useCurrentInputDate();
  const [dateFilterEnabled, setDateFilterEnabled] = useState(false);
  const [startDate, setStartDate] = useState(currentDate);
  const [endDate, setEndDate] = useState(currentDate);

  const changeStartDate = useCallback(
    ({ target }: React.ChangeEvent<{ value: unknown }>) => setStartDate(target.value as string),
    []
  );

  const changeEndDate = useCallback(
    ({ target }: React.ChangeEvent<{ value: unknown }>) => setEndDate(target.value as string),
    []
  );

  const [categoryFilterEnabled, setCategoryFilterEnabled] = useState(false);
  const [category, setCategory] = useState<null | Category>(null);
  const [categoryName, setCategoryName] = useState('All');

  const toggleDateFilter = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => setDateFilterEnabled(target.checked),
    []
  );

  const toggleCategoryFilter = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => setCategoryFilterEnabled(target.checked),
    []
  );

  const changeCategoryName = useCallback(
    ({ target }: React.ChangeEvent<{ value: unknown }>) => setCategoryName(target.value as string),
    []
  );

  if (!historyResponse || !categoriesResponse) {
    return null;
  }

  const categories = categoriesResponse.data.records;
  const records = historyResponse.data.records;
  const recordsWithFilters = dateFilterEnabled ?  filterMoreThanDate(startDate, filterLessThanDate(endDate, records)) : records;

  if (records.length < 2) {
    return (
      <Box p={3}>
        <WarningPlate>{t('Not enough data')}</WarningPlate>
      </Box>
    )
  }

  return (
    <Box p={3}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <ExpandableStats records={records} />
        </Grid>
        <Grid item>
          <Typography variant="subtitle2">{t('Filters')}</Typography>
        </Grid>
        <Grid item>
          <Box display="flex" flexDirection="column">
            <Box display="flex" alignItems="center">
              <Switch
                checked={dateFilterEnabled}
                onChange={toggleDateFilter}
              />
              <Typography variant="body2">{t('Date filter')}</Typography>
            </Box>
            <Grid container spacing={1}>
              <Grid item>
                <TextField
                  label={t('Start date')}
                  type="date"
                  disabled={!dateFilterEnabled}
                  value={startDate}
                  onChange={changeStartDate}
                />
              </Grid>
              <Grid item>
                <TextField
                  label={t('End date')}
                  type="date"
                  disabled={!dateFilterEnabled}
                  value={endDate}
                  onChange={changeEndDate}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item>
          <Box display="flex" flexDirection="column">
            <Box display="flex" alignItems="center">
              <Switch
                checked={categoryFilterEnabled}
                onChange={toggleCategoryFilter}
              />
              <Typography variant="body2">{t('Category filter')}</Typography>
            </Box>
            <Select
              value={categoryName}
              onChange={changeCategoryName}
              disabled={!categoryFilterEnabled}
            >
              <MenuItem value="All" onClick={() => setCategory(null)}>{t('All')}</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category._id} value={category.name} onClick={() => setCategory(category)}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Grid>
        <Grid item>
          <Typography variant="subtitle2">{t('Charts')}</Typography>
        </Grid>
        {(!categoryFilterEnabled || category === null) && (
          <Grid item>
            <AreaIncomeLoss records={recordsWithFilters}/>
          </Grid>
        )}
        {(!categoryFilterEnabled || category === null) && (
          <Grid item>
            <PieIncomeLoss records={recordsWithFilters} />
          </Grid>
        )}
        {(categoryFilterEnabled && category !== null) && (
          <Grid item>
            <BarCategory records={recordsWithFilters} category={category} />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Reports;
