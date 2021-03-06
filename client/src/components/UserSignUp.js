import React from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

// This component provides the "Sign Up" screen by
// rendering a form that allows a user to sign up by creating a new
// account. The component also renders a "Sign Up" button that when
// clicked sends a POST request to the REST API's /api/users route
// and signs in the user. This component also renders a "Cancel"
// button that returns the user to the default route (i.e. the list of
// courses).
export default class UserSignUp extends React.Component {
    state = {
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        confirmPassword: '',
        errors: [],
    };

    render(){
        const {
            firstName,
            lastName,
            emailAddress,
            password,
            confirmPassword,
            errors,
        } = this.state;

        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign Up</h1>
                    <Form 
                      cancel={this.cancel}
                      errors={errors}
                      submit={this.submit}
                      submitButtonText="Sign Up"
                      elements={() => (
                      <React.Fragment>
                        <input 
                        id="firstName" 
                        name="firstName" 
                        type="text"
                        value={firstName} 
                        onChange={this.change} 
                        placeholder="First Name"
                        // required 

                        />
                        <input 
                        id="lastName" 
                        name="lastName" 
                        type="text"
                        value={lastName} 
                        onChange={this.change} 
                        placeholder="Last Name"
                        // required 

                        />
                        <input 
                        id="emailAddress" 
                        name="emailAddress" 
                        type="text"
                        value={emailAddress} 
                        onChange={this.change} 
                        placeholder="Email Address"
                        // required

                        />
                        <input 
                        id="password" 
                        name="password"
                        type="password"
                        value={password} 
                        onChange={this.change} 
                        placeholder="Password"
                        // required

                        />
                        <input 
                        id="confirmPassword" 
                        name="confirmPassword"
                        type="password"
                        value={confirmPassword} 
                        onChange={this.change} 
                        placeholder="Confirm Password"
                        // required
                      />
                      </React.Fragment>
                    )} />
                    <p>&nbsp;</p>
                    <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
                </div>
            </div>
        );
    };

    change = (event) => {
      const name = event.target.name;
      const value = event.target.value;
  
      this.setState(() => {
        return {
          [name]: value
        };
      });
    }
    
    submit = () => {
      const { context } = this.props;
  
      const {
          firstName,
          lastName,
          emailAddress,
          password,
          confirmPassword,
          errors
      } = this.state;
      
      if(password === confirmPassword){
        // New user payload
        const user = {
          firstName,
          lastName,
          emailAddress,   
          password,
          errors
        };

        context.data.createUser(user)
          .then( errors => {
            if (errors) {
              this.setState({ errors });
            } else {
              console.log(`${firstName} is successfully signed up and authenticated!`);
              context.actions.signIn(emailAddress, password)
                .then(() => {
                  this.props.history.push('/courses');    
                });
            }
          })
          .catch( err => { // handle rejected promises
            console.log(err);
            this.props.history.push('/error'); // push to history stack
          });

      } else {
        console.log("Passwords don't match!");
      }
  
    } 
    
    cancel = () => {
      this.props.history.push('/courses');
    }
}