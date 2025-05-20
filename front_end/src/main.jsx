import React from "react";

//import ReactDOM from "react-dom";
import ReactDOM from 'react-dom/client';  // react-dom/client에서 import

import {HashRouter} from 'react-router-dom';
//import { HashRouter, Route, Routes } from 'react-router-dom';

import { BrowserRouter , Route, Routes, NavLink } from 'react-router-dom';
//import 'bootstrap/dist/css/bootstrap.min.css';

import 'react-bootstrap/dist/bootstrap.min.css';

import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <BrowserRouter>
    
            <React.Fragment>
              <Header />
              <Body />
              <Footer />
            </React.Fragment>
       
    </BrowserRouter>



);
