import React, { Suspense, FC } from 'react';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { Root } from './root';
import theme from './theme';

import 'common/models/init';
import 'common/i18n';

export const App: FC = () => (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* suspense for translations */}
        <Suspense fallback={null}>
          <Root />
        </Suspense>
      </ThemeProvider>
    </React.StrictMode>
);
