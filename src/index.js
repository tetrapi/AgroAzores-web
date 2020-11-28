import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';
import {BrowserRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min'
import App from './App';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'mdbreact/dist/css/mdb.css';
import {createMuiTheme} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/core/styles"



const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#39af7e',
            main: '#089B5E',
            dark: '#056c41',
            contrastText: '#fff',
        },
        secondary: {
            light: '#fed766',
            main: '#FECE40',
            dark: '#b1902c',
            contrastText: '#000',
        },
    },
});

ReactDOM.render(
    <Provider store={store}>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <App />
                </ThemeProvider>
            </BrowserRouter>
    </Provider>
    , document.getElementById('root'));