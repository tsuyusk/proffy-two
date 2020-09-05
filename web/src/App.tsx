import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { GlobalCss } from './css/Global';

import Routes from './routes';
import RootProvider from './hooks';

const App: React.FC = () => {
  return (
    <RootProvider>
      <GlobalCss />
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </RootProvider>
  );
};

export default App;
