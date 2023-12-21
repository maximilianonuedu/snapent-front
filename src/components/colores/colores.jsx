import { createTheme } from '@mui/material/styles';

export default createTheme({
    palette: {
        primary: { // works
          main: '#165788',
          contrastText: '#fff',
        },
        secondary: { // works
          main: '#69BE28',
          contrastText: '#fff',
        },
        companyBlue: { // doesn’t work - defaults to a grey button
            main: '#65CFE9',
            contrastText: '#fff',
        },
        companyRed: { // doesn’t work - grey button
            main: '#E44D69',
            contrastText: '#000',
        },
        accent: { // doesnt work - grey button
            contrastText: '#000',
        },
    },
});