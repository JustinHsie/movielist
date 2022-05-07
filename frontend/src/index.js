import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import '../node_modules/uikit/dist/css/uikit.min.css';
import "../node_modules/uikit/dist/js/uikit.min.js";

UIkit.use(Icons);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App/>
);
