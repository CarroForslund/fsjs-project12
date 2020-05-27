import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {

  //Trying to connect to the api
  axios.get('http://localhost:5000/api/users')
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
          Display data from API here.
      </header>
    </div>
  );
}

export default App;
