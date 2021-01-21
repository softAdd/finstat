import { FC } from 'react';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import { Box, Button } from '@material-ui/core';
import { RecordsTable } from './RecordsTable';
import { RecordsForm } from './RecordsForm';
import { useTranslation } from 'react-i18next';

const Records: FC = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const { path } = useRouteMatch();
  const createRoute = '/records/create';

  return (
    <Box p={3}>
      <Switch>
        <Route path={path} exact>
          <Button variant="contained" color="primary" onClick={() => history.push(createRoute)}>
            {t('Add')}
          </Button>
          <RecordsTable />
        </Route>
        <Route path={createRoute}>
          <RecordsForm rootPath={path} />
        </Route>
      </Switch>
    </Box>
  );
};

export default Records;
