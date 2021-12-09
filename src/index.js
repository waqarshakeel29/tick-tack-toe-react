import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import App from './App';
import Game from './components/Game';
import './index.css';

ReactDOM.render(
  
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<App />}/>
    <Route path="/game" element={<Game />}/>
    </Routes>
    </BrowserRouter>,
  document.getElementById('root')
);
