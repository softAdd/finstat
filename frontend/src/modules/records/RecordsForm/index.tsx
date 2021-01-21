import { FC, useState } from 'react';
import {
  Tabs,
  Tab,
  Box
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { CreateRecord } from './RaiffeisenImport';
import { RaiffeisenImport } from './CreateRecord';

export const RecordsForm: FC<{ rootPath: string }> = ({ rootPath }) => {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);

  return (
    <Box display="flex" flexDirection="column" alignItems="flex-start">
      <Tabs
        value={index}
        onChange={(_, val) => setIndex(val)}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label={t('Add')} />
        <Tab label={(t('Import'))} />
      </Tabs>
      <Box mt={2}>
        {index === 1 && <CreateRecord rootPath={rootPath} />}
        {index === 0 && <RaiffeisenImport rootPath={rootPath} />}
      </Box>
    </Box>
  );
}