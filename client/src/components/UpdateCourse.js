import React from 'react';
import Form from './Form';

// This component provides the "Update Course"
// screen by rendering a form that allows a user to update one of their
// existing courses. The component also renders an "Update Course"
// button that when clicked sends a PUT request to the REST API's
// /api/courses/:id route. This component also renders a "Cancel"
// button that returns the user to the "Course Detail" screen
export default class UpdateCourse extends React.Component {
    _isMounted = false;

    state = {
        courseUser: '',
        courseId: '',
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        userId: '',
        errors: [],
    }

    componentDidMount() {
        this._isMounted = true;
        const { context } = this.props;

        context.data.getCourse(this.props.match.params.id)
          .then( course => {
            if (course && this._isMounted) {
                this.setState({ 
                    courseId: course.id,
                    courseUser: course.user,
                    title: course.title,
                    description: course.description,
                    estimatedTime: course.estimatedTime,
                    materialsNeeded: course.materialsNeeded,
                    userId: course.userId,
                });
            }
          })
          .catch( err => { // handle rejected promises
            console.log(err);
            this.props.history.push('/error'); // push to history stack
          });
    }

    componentWillUnmount(){
        this._isMounted = false;
    };

    render(){
        const {
            courseUser,
            title,
            description,
            estimatedTime,
            materialsNeeded,
            errors,
        } = this.state;

        return(
            <div className="bounds course--detail">
                <h1>Update Course</h1>
                <div>
                    <Form 
                        cancel={this.cancel}
                        errors={errors}
                        submit={this.submit}
                        submitButtonText="Update Course"
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
                                            value={title}
                                            onChange={this.change}
                                            placeholder="Course title..." 
                                            className="input-title course--title--input"
                                        />
                                        <p>
                                            By {courseUser.firstName + ' ' + courseUser.lastName}
                                        </p>
                                    </div>
                                    <div className="course--description">
                                        <div>
                                            <textarea 
                                                id="description" 
                                                name="description" 
                                                type="text"
                                                value={description} 
                                                onChange={this.change} 
                                                placeholder="Course description..."
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
                                                    value={estimatedTime} 
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
                                                    value={materialsNeeded} 
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
            courseId,
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId,
            errors,
        } = this.state; 
        
        // New course payload
        const course = {
            courseId,
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId,
            errors,
        };

        //Get Credentials
        const emailAddress = context.authenticatedUser.emailAddress;
        const password = context.authenticatedUser.password;
  
        context.data.updateCourse(emailAddress, password, courseId, course)
            .then( errors => {
                console.log(errors);
                if (errors) {
                    this.setState(() => {
                        return { errors: [ errors.message ] };
                    });
                } else {
                    console.log('Course updated');
                    this.props.history.push('/courses/' + courseId);    
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