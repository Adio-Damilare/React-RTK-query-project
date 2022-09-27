import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import { store } from './App/Store';
import { Provider } from 'react-redux';
import { fetchUsers } from './Feature/Users/UserSlice';
import {fetchPost} from "./Feature/Post/postSlice"
import { BrowserRouter, Routes, Route } from "react-router-dom"
store.dispatch(fetchUsers());
store.dispatch(fetchPost());
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          
          <Route path='/*' element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
