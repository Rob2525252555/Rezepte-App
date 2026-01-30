import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';

import router from './App';
import { store } from './redux/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Stellt den Redux Store der gesamten App zur Verfügung*/}
    <Provider store={store}>
      {/*Initialisiert das Routing der Anwendung*/}
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
