import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


//redux
import { Provider } from "react-redux";

// Geetting the store
import store from "./store/";

// Router
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		<BrowserRouter>
			<ToastContainer/>
			<App />
		</BrowserRouter>
	</Provider>
);

reportWebVitals();
