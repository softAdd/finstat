import React, { FC, useLayoutEffect, useState } from 'react';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { useStore } from 'effector-react';
import { queryClient } from 'common/api/client';
import { requestWhoamiFx } from 'common/models/auth/store';
import { useTranslation } from 'react-i18next';
import { Routing } from './Routing';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const AppRouter: FC = ({ children }) => {
  // @ts-ignore
  const isCordovaApp = window.cordova;
  // eslint-disable-next-line
  return isCordovaApp ? <HashRouter>{children}</HashRouter> : <BrowserRouter>{children}</BrowserRouter>;
};

export const Root = () => {
  const { i18n } = useTranslation();
  const isFetchingUser = useStore(requestWhoamiFx.pending);
  const [whoamiRequested, setWhoamiRequested] = useState(false);

  useLayoutEffect(() => {
    const installedLang = localStorage.getItem('selectedLang');

    if (installedLang === 'ru') {
      i18n.changeLanguage('ru');
    }

    const refreshToken = localStorage.getItem('refreshToken');
    refreshToken && requestWhoamiFx(refreshToken);
    setWhoamiRequested(true);
  }, [i18n]);

  if (isFetchingUser || !whoamiRequested) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
      <AppRouter>
        <Routing />
      </AppRouter>
    </QueryClientProvider>
  );
};
