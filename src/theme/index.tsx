import {createTheme} from '@mui/material/styles';

/**
 * Тема чатов
 */
export const chatTheme = createTheme({
    palette: {
        primary: {
            main: '#3975CF',
        },
        secondary: {
            main: '#D9D9D9',
        },
    },
    typography: {
        fontFamily: '"Jost", "Helvetica", "Arial", sans-serif',
    },
});
