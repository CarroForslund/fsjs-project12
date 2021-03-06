import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => {

  // Displays the top menu bar for the application and includes
  // buttons for signing in and signing up (if there's not an authenticated
  // user) or the user's first and last name and a button for signing out (if
  // there's an authenticated user).
  const { context } = props;
  const authUser = context.authenticatedUser;

  return(
    <div className="header">
    <div className="bounds">
      <h1 className="header--logo">Courses</h1>
      <nav>
        {authUser ?
            <React.Fragment>
              <span>Welcome, {authUser.firstName}!</span>
              <Link to="/signout">Sign Out</Link>
            </React.Fragment>
            :
            <React.Fragment>
              <Link className="signup" to="/signup">Sign Up</Link>
              <Link className="signin" to="/signin">Sign In</Link>
            </React.Fragment>
          }
      </nav>
    </div>

  </div>

  );

};