import './index.css';

import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import Loading from './components/status/Loading';
import { StatusProvider } from './context/StatusContext';
import GlobalStatus from './components/status/GlobalStatus';

const Home = lazy(() => import('./pages/Home'));
const MovieDetails = lazy(() => import('./pages/MovieDetails'));

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App: React.FC = () => {
  return (
    <StatusProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <GlobalStatus />
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/movie/:id' element={<MovieDetails />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ThemeProvider>
    </StatusProvider>
  );
};

export default App;
