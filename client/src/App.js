import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';

// App Components
import Header from './components/Header';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import CourseDetail from './components/CourseDetail';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import Forbidden from './components/Forbidden';
import NotFound from './components/NotFound';
import UnhandledError from './components/UnhandledError';

// Context (to be able to get app data without passing props)
import withContext from './Context';

// Enable Private Route Option
import PrivateRoute from './PrivateRoute';

// App Components with Context
const HeaderWithContext = withContext(Header);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const CreateCourseWithContext = withContext(CreateCourse);
const CourseDetailWithContext = withContext(CourseDetail);
const UpdateCourseWithContext = withContext(UpdateCourse);
const CoursesWithContext = withContext(Courses);

function App () {
  
  return (
    <Router>
      <div>
        <HeaderWithContext />
        <Switch>
          <Redirect exact from='/' to='/courses' />
          <Route exact path='/courses' component={ CoursesWithContext } />
          <PrivateRoute path='/courses/create' component={ CreateCourseWithContext } />
          <Route exact path='/courses/:id' component={ CourseDetailWithContext } />
          <PrivateRoute path='/courses/:id/update' component={ UpdateCourseWithContext } />
          <Route path='/signin' component={ UserSignInWithContext } />
          <Route path='/signup' component={ UserSignUpWithContext } />
          <Route path='/signout' component={ UserSignOutWithContext } /> 
          <Route path='/forbidden' component={ Forbidden } />
          <Route path="/notfound" component={ NotFound } />
          <Route path="/error" component={ UnhandledError } />
          <Redirect to='/notfound' />
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;
