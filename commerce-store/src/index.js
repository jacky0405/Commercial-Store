import React from 'react';
import ReactDOM from 'react-dom';
import Router from './component/Router';
import './css/app.scss';
import './css/style.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './common/auth';


ReactDOM.render(
    <div>
        <ToastContainer/>
        <Router/>
    </div>,
    document.getElementById('root'));