import React from 'react';
import Form from './Form';

// This component provides the "Create Course"
// screen by rendering a form that allows a user to create a new
// course. The component also renders a "Create Course" button that
// when clicked sends a POST request to the REST API's
// /api/courses route. This component also renders a "Cancel"
// button that returns the user to the default route (i.e. the list of
// courses).
export default class CreateCourse extends React.Component {

    state = {
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        userId: '',
        errors: [],
        firstName: '',
        lastName: '',
    }

    componentDidMount(){
        const { context } = this.props;
        this.setState(() => {
            return {
                userId: context.authenticatedUser.id,
                firstName: context.authenticatedUser.firstName,
                lastName: context.authenticatedUser.lastName,
            };
        });
    };
    
    render(){
        const {
            errors,
        } = this.state;
        return(
            <div className="bounds course--detail">
                <h1>Create Course</h1>
                <div>
                    {/* <div>
                        <h2 className="validation--errors--label">Validation errors</h2>
                        <div className="validation-errors">
                            <ul>
                                <li>Please provide a value for "Title"</li>
                                <li>Please provide a value for "Description"</li>
                            </ul>
                        </div>
                    </div> */}
                    <Form 
                        cancel={this.cancel}
                        errors={errors}
                        submit={this.submit}
                        submitButtonText="Create Course"
                        elements={() => (
                        <React.Fragment>
                            <div className="grid-66">
                                <div className="course--header">
                                    <h4 className="course--label">Course</h4>
                                    <div>
                                        <input 
                                            id="title" 
                                            name="title" 
                                            type="text"
                                            onChange={this.change}
                                            placeholder="Course title..." 
                                            className="input-title course--title--input"
                                            required
                                        />
                                        <p>
                                            By {this.state.firstName + ' ' + this.state.lastName}
                                        </p>
                                    </div>
                                    <div className="course--description">
                                        <div>
                                            <textarea 
                                                id="description" 
                                                name="description" 
                                                type="text"
                                                onChange={this.change} 
                                                placeholder="Course description..."
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid-25 grid-right">
                                <div className="course--stats">
                                    <ul className="course--stats--list">
                                        <li className="course--stats--list--item">
                                            <h4>Estimated Time</h4>
                                            <div>
                                                <input 
                                                    id="estimatedTime" 
                                                    name="estimatedTime" 
                                                    type="text"
                                                    onChange={this.change} 
                                                    placeholder="Hours"
                                                    className="course--time--input"
                                                />
                                            </div>
                                        </li>
                                        <li className="course--stats--list--item">
                                            <h4>Materials Needed</h4>
                                            <div>
                                                <textarea 
                                                    id="materialsNeeded" 
                                                    name="materialsNeeded"
                                                    type="text"
                                                    onChange={this.change} 
                                                    placeholder="List materials..." 
                                                />
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </React.Fragment>
                    )} />
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
            title,
            description,
            estimatedTime,
            materialsNeeded,
        } = this.state; 
        
        // New course payload
        const course = {
            title,
            description,
            estimatedTime,
            materialsNeeded,
        };

        //Get Credentials
        const emailAddress = context.authenticatedUser.emailAddress;
        const password = context.authenticatedUser.password;
        
        console.log(emailAddress);
        console.log(password);
        context.data.createCourse(emailAddress, password, course)
            .then( errors => {
                if (errors.length) {
                    this.setState({ errors });
                } else {
                    console.log('Course created');
                    this.props.history.push('/courses');    
                };
            })
            .catch( err => { // handle rejected promises
                console.log(err);
                this.props.history.push('/error'); // push to history stack
            });
    } 
      
    cancel = () => {
        const { from } = this.props.location.state || { from: { pathname: '/courses' } };
        this.props.history.push(from);
    }

}