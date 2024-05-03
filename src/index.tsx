import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HistoryRouter } from 'redux-first-history/rr6';
import { history, store } from './redux';
import { routes } from './routes/routes';
import { LoaderComponent } from './components/ui/loader/loader-component';

import 'normalize.css';
import './index.css';
import { ModalWindowComponent } from './components';
import { ConfigProvider } from 'antd';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        components: {
          Tabs: {
            inkBarColor: '#2F54EB',
            itemColor: '#262626',
            itemSelectedColor: '#2F54EB',
          },
          Table: {
            cellPaddingBlockSM: 0,
            headerBg: '#F0F0F0',
            headerBorderRadius: 2,
          },
          Tag: {
            colorPrimary: '#f0f5ff',
          },
        },
      }}>
      <Provider store={store}>
        <HistoryRouter history={history}>{routes}</HistoryRouter>
        <LoaderComponent />
        <ModalWindowComponent />
      </Provider>
    </ConfigProvider>
  </React.StrictMode>
);
