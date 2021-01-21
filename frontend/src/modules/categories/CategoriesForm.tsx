import React, { useState, FC } from 'react';
import {
  Box,
  TextField,
  Button,
  makeStyles,
  createStyles,
  MenuItem
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { postCategoryFx } from 'common/models/categories/store';
import { FieldWrapper } from 'common/components/FieldWrapper';
import { Select } from 'common/components/Select';
import { Category } from 'common/api/types/categories';

const useStyles = makeStyles(() =>
  createStyles({
    input: {
      marginBottom: 0,
      marginTop: 0,
      width: 250,
    },
  })
);

export const CategoriesForm: FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [name, setName] = useState<string>('');
  const [type, setType] = useState<Category['type']>('income');

  const addCategory = () => {
    setName('');
    postCategoryFx({ name, type });
  };

  return (
    <Box display="flex" flexWrap="wrap">
      <FieldWrapper>
        <TextField
          className={classes.input}
          label={t('Category name')}
          variant="outlined"
          margin="dense"
          value={name}
          onChange={({ target }) => setName(target.value as string)}
        />
      </FieldWrapper>
      <Select
        label={t('Type')}
        value={type}
        onChange={({ target }) => setType(target.value as Category['type'])}
      >
        <MenuItem value="income">{t('income')}</MenuItem>
        <MenuItem value="loss">{t('loss')}</MenuItem>
      </Select>
      <FieldWrapper>
        <Button variant="contained" color="primary" onClick={addCategory}>
          {t('Add')}
        </Button>
      </FieldWrapper>
    </Box>
  );
};
