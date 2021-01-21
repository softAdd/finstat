import { FC, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from 'react-query';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Grid,
  MenuItem,
  Typography,
} from '@material-ui/core';
import { queryClient } from 'common/api/client';
import { GET_HISTORY_URL, postHistoryRecord } from 'common/api/history';
import { TextField } from 'common/components/TextField';
import { Select } from 'common/components/Select';
import { useStore } from 'effector-react';
import { $categories, getCategoriesFx } from 'common/models/categories/store';
import { dateToCommonFormat, useCurrentInputDate } from 'common/utils/date';

export const RaiffeisenImport: FC<{ rootPath: string }> = ({ rootPath }) => {
  const history = useHistory();
  const { t } = useTranslation();
  const currentDate = useCurrentInputDate();

  const categories = useStore($categories);

  useEffect(() => {
    getCategoriesFx();
  }, []);

  const [date, setDate] = useState(currentDate);
  const [category, setCategory] = useState('none')
  const [value, setValue] = useState(0);

  const { mutate: createHistoryRecord, isError } = useMutation(() => postHistoryRecord({
    date: dateToCommonFormat(date),
    category: category,
    sum: value
  }), {
    onSuccess: () => {
      queryClient.invalidateQueries(GET_HISTORY_URL);
      history.push(rootPath)
    }
  });

  if (!categories) {
    return null;
  }

  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        <TextField
          label={t('Date')}
          type="date"
          value={date}
          onChange={({ target }) => setDate(target.value as string)}
        />
      </Grid>
      <Grid item>
        <Select
          label={t('Category')}
          value={category}
          onChange={({ target }) => setCategory(target.value as string)}
        >
          <MenuItem value={'none'}>{t('empty')}</MenuItem>
          {categories.records.map((record) => (
            <MenuItem key={record._id} value={record.name}>
              {record.name}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item>
        <TextField
          label={t('Value')}
          type="number"
          value={value}
          onChange={({ target }) => setValue(Number(target.value))}
        />
      </Grid>
      {isError && (
        <Grid item>
          <Typography variant="body2" color="error">{t('An error has occured')}</Typography>
        </Grid>
      )}
      <Grid item>
        <Grid container spacing={1}>
          <Grid item>
            <Button variant="contained" color="default" onClick={() => history.push(rootPath)}>
              {t('Back')}
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={() => createHistoryRecord()}>
              {t('Submit')}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
