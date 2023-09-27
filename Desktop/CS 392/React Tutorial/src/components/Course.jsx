import './Course.css'

const Course = ({course}) => {
    const course = course;
    return (
        <div className="card">
            <div className="card-body">
                <h3 className="card-title">{course.title} CS {course.description}</h3>
                <p className="card-text">{course.title}</p>
                <hr className="custom-divider"/> 
                <p className="card-text">{course.time}</p>
            </div>
        </div>
    )
};

export default Course;