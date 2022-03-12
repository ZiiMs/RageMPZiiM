import React, { useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { MantineProvider, NormalizeCSS, GlobalStyles, Global } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import Manager from './manager';

ReactDOM.render(
  <React.StrictMode>
    <MantineProvider
      theme={{
        /** Put your mantine theme override here */
        colorScheme: 'dark',
      }}
    >
      <NormalizeCSS />
      <GlobalStyles />
      <Global
        styles={(theme) => ({
          body: {
            backgroundColor: 'transparent',
          },
        })}
      />
      <NotificationsProvider>
        <Manager />
      </NotificationsProvider>
    </MantineProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
