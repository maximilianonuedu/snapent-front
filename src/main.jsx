import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        orange:{
            main:'#ee7411',
        },
        blue: {
          main: '#2c70b7',
        },
        lightblue:{
            main:'#30bad2'
        },
        black:{
            main:'#000',
        },
        white:{
            main:'#fff',
        },
      },
  });

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <ThemeProvider theme={theme}>
            <App/>
        </ThemeProvider>
    </BrowserRouter>
)
