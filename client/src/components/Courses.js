import React from 'react';
import { Link } from 'react-router-dom';

export default class Courses extends React.Component {
    // This component provides the "Courses" screen by
    // retrieving the list of courses from the REST API's /api/courses
    // route and rendering a list of courses. Each course needs to link to
    // its respective "Course Detail" screen. This component also renders
    // a link to the "Create Course" screen.
    state = {
        courses: [],
        errors: [],
    }

    componentDidMount() {

        const { context } = this.props;

        context.data.getCourses()
          .then( courses => {
            if (courses) {
                this.setState({ courses });
            }
          })
          .catch( err => { // handle rejected promises
            console.log(err);
            this.props.history.push('/error'); // push to history stack
          });
    }

    render(){
        const courses = this.state.courses.map(course =>
            <div className="grid-33" key={course.id}>
                <Link className="course--module course--link" to={'/courses/' + course.id}>
                    <h4 className="course--label">Course</h4>
                    <h3 className="course--title">{course.title}</h3>
                </Link>
            </div>
        );

        return(
            <div className="bounds">
                {courses}
                <div className="grid-33"><Link className="course--module course--add--module" to="/courses/create">
                    <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" className="add">
                        <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 " />
                        </svg>New Course</h3>
                    </Link>
                </div>
                
            </div>

        );
    };
    
}