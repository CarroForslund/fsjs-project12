import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header'
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
   <Header />
  );
}

export default App;
