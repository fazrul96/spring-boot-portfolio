import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Auth0Provider} from '@auth0/auth0-react';
import {I18nextProvider} from "react-i18next";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import i18n from './i18n';

const theme = createTheme();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Auth0Provider
	        domain={process.env.REACT_APP_AUTH0_DOMAIN}
	        clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
	        authorizationParams={{
		        redirect_uri: window.location.origin,
		        audience: process.env.REACT_APP_AUTH0_AUDIENCE
		    }}
	        cacheLocation="localstorage"
		>
			<ThemeProvider theme={theme}>
				<I18nextProvider i18n={i18n}>
					<App />
				</I18nextProvider>
			</ThemeProvider>,
		</Auth0Provider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
