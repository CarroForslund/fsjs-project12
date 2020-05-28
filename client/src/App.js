import React from 'react';
import { BrowserRouter, Router, Route, Redirect } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

// App components
import Header from './components/Header';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import CourseDetail from './components/CourseDetail';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';

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

    // Your app should include the following routes (listed in the format path -
    //   component):
    //   / - Courses
    //   /courses/create - CreateCourse
    //   /courses/:id/update - UpdateCourse
    //   /courses/:id - CourseDetail
    //   /signin - UserSignIn
    //   /signup - UserSignUp
    //   /signout - UserSignOut
    <BrowserRouter>
      <div>
        <Header />
        <Redirect from='/' to='/courses' />
        <Route exact path='/courses' component={ Courses } />
        <Route exact path='/courses/create' component={ CreateCourse } />
        <Route exact path='/courses/:id' component={ CourseDetail } />
        <Route path='/courses/:id/update' component={ UpdateCourse } />
        <Route path='/signin' component={ UserSignIn } />
        <Route path='/signup' component={ UserSignUp } />
        <Route path='/signout' component={ UserSignOut } /> 
      </div>
    </BrowserRouter>
    
  );
}

export default App;
