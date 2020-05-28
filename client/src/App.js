import React from 'react';
import { BrowserRouter, Router, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

// App components
import Header from './components/Header';
import Courses from './components/Courses';

import axios from 'axios';

function App () {

  // componentDidMount() {
  //    //Trying to connect to the api
  //    axios.post()
  //    axios.get('http://localhost:5000/api/users')
  //    .then(response => {
  //      console.log(response);
  //    })
  //    .catch(error => {
  //      console.log('Error fetching and parsing data', error);
  //    })
  // }
  
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Route exact path='/' component={ Courses } />    
      </div>
    </BrowserRouter>
    
  );
}

export default App;
