import React from 'react';
import { Link, Route } from 'react-router-dom';

const Header = () => (
    // Displays the top menu bar for the application and includes
    // buttons for signing in and signing up (if there's not an authenticated
    // user) or the user's first and last name and a button for signing out (if
    // there's an authenticated user).
    <div className="header">
      <div className="bounds">
        <h1 className="header--logo">Courses</h1>
        <nav>
          {/* if no authenticated user */}
          <Link className="signup" to="/signup">Sign Up</Link><Link className="signin" to="/signin">Sign In</Link>
          {/* else display user name and sign out button */}
          {/* <span>Jane Doe</span><Link className="signout" to="/signin">Sign Out</Link> */}
        </nav>
      </div>

    </div>

    
);

export default Header;