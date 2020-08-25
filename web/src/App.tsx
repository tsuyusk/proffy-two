import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import Routes from './routes';
import defaultTheme from './css/themes/defaultTheme';
import { GlobalCss } from './css/Global';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalCss />
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
