import { FC, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Box, Typography, Grid } from '@material-ui/core';
import { postRaiffeisenReport } from 'common/api/raiffeisen';
import { useMutation } from 'react-query';
import { queryClient } from 'common/api/client';
import { GET_HISTORY_URL } from 'common/api/history';

export const CreateRecord: FC<{ rootPath: string }> = ({ rootPath }) => {
  const history = useHistory();
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { mutate: postReport } = useMutation((formData: FormData) => postRaiffeisenReport(formData), {
    onSuccess: () => {
      queryClient.invalidateQueries(GET_HISTORY_URL);
      history.push(rootPath);
    },
  })

  const uploadFile = () => {
    // @ts-ignore
    const file = fileInputRef.current.files[0];
    
    if (file) {
      const formData = new FormData();
      formData.append('report', file);
      postReport(formData);
    }
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="flex-start">  
      <Typography variant="body2" gutterBottom>{t('Import csv file from raiffeisen')}</Typography>   
      <Grid container spacing={1}>
        <Grid item>
          <Button variant="contained" color="default" onClick={() => history.push(rootPath)}>
            {t('Back')}
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            component="label"
          >
            {t('raiffeisen csv')}
            <input
              type="file"
              accept=".csv"
              hidden
              ref={fileInputRef}
              onChange={uploadFile}
            />
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}