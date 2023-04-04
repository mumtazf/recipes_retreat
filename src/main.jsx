import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import App from './App'
import './index.css'

import Layout from '../routes/Layout';
import DetailView from '../routes/DetailView';
import NotFound from '../routes/NotFound';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
        <Route path = "/" element = {<Layout />}>
          <Route index = {true} path = '/' element = {<App />}/>
          <Route index = {false} path = "/RecipeDetails/:id" element = {<DetailView/>} />
        </Route>
        <Route path="*" element={ <NotFound /> }/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
