import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import { Provider } from "react-redux";
import store from "../src/components/App/store";
import App from './App';
import { PassNav } from './components/Passnav';
import Map from './maps/Map';
import { ChakraProvider, theme } from '@chakra-ui/react'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Provider store={store}>
    <React.StrictMode>
    <App />
    {/* <Map/> */}
    {/* <NewMap/> */}
    {/* <PassNav/> */}
    </React.StrictMode>
  </Provider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
