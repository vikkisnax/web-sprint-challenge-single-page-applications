import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {BrowserRouter as Router} from 'react-router-dom'
//styles-bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';


const rootElement = document.getElementById("root");
ReactDOM.render(
    <Router>
        <App />
    </Router>, rootElement);
