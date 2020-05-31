import React from 'react';
import { Link } from 'react-router-dom';
const ReactMarkdown = require('react-markdown')

// This component provides the "Course Detail"
// screen by retrieving the detail for a course from the REST API's
// /api/courses/:id route and rendering the course. The component
// also renders a "Delete Course" button that when clicked should
// send a DELETE request to the REST API's /api/courses/:id
// route in order to delete a course. This component also renders an
// "Update Course" button for navigating to the "Update Course"
// screen.
export default class CourseDetail extends React.Component {
    _isMounted = false;

    state = {
        authUser: '',
        courseUser: '',
        course: '',
        errors: [],
    };
    
    delete = this.delete.bind(this);
    
    componentDidMount() {
        this._isMounted = true;
        const { context } = this.props;

        context.data.getCourse(this.props.match.params.id)
          .then( course => {
            if (course && this._isMounted) {
                this.setState({ 
                    course,
                    courseUser: course.user,
                    authUser: context.authenticatedUser
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
        const course = this.state.course;
        const courseUser = this.state.courseUser;
        
        return(
            <div>
                <div className="actions--bar">
                    <div className="bounds">
                    <div className="grid-100">
                        {this.editButtons()}
                        <Link className="button button-secondary" to="/courses">Return to List</Link>
                    </div>
                    </div>
                </div>
                <div className="bounds course--detail">
                    <div className="grid-66">
                    <div className="course--header">
                        <h4 className="course--label">Course</h4>
                        <h3 className="course--title">{course.title}</h3>
                        <p>By {courseUser.firstName + ' ' + courseUser.lastName}</p>
                    </div>
                    <div className="course--description">
                        {<ReactMarkdown source={course.description}/>}
                    </div>
                    </div>
                    <div className="grid-25 grid-right">
                    <div className="course--stats">
                        <ul className="course--stats--list">
                        <li className="course--stats--list--item">
                            <h4>Estimated Time</h4>
                            <h3>{course.estimatedTime}</h3>
                        </li>
                        <li className="course--stats--list--item">
                            <h4>Materials Needed</h4>
                            {<ReactMarkdown source={course.materialsNeeded}/>}
                        </li>
                        </ul>
                    </div>
                    </div>
                </div>
            </div>

        );
    };

    editButtons(){
        const { context } = this.props;
        if(context.authenticatedUser){
            if (this.state.authUser.id === this.state.courseUser.id && this.state.authUser.id !== '' && this.state.courseUser.id !== ''){
                return (<span>
                    <Link className="button" to={'/courses/' + this.state.course.id + '/update'}>Update Course</Link>
                    <button className="button" onClick={this.delete}>Delete Course</button>
                </span>);
            }
        }
        return null;    
    }

    delete(){   
        const { context } = this.props;
        const emailAddress = context.authenticatedUser.emailAddress;
        const password = context.authenticatedUser.password;

        context.data.deleteCourse(emailAddress, password, this.state.course.id)
          .then( () => {
            this.props.history.push('/courses');
          })
          .catch( err => { // handle rejected promises
            console.log(err);
            this.props.history.push('/error'); // push to history stack
          });
    };
}