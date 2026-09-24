import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { CssBaseline, ThemeProvider } from '@mui/material';

import App from './App.tsx';
import { store } from './redux/store';
import { theme } from './theme/theme';
import { isStrictModeDisabled } from '@utils/constants.ts';

import './index.css';

createRoot(document.getElementById('root')!).render(
    isStrictModeDisabled ? (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <App />
            </ThemeProvider>
        </Provider>
    ) : (
        <StrictMode>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <App />
                </ThemeProvider>
            </Provider>
        </StrictMode>
    ),
);
