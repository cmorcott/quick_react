import React from 'react'
import './Courses.css'

const Courses = ({courseList}) => {
    const courses = courseList
    return (
        <div className="courseListContainer">
            <div className="courseList">
            {Object.entries(courses).map(([key, value]) => (
                    <tr>
                        <td>{value.title}</td>
                        <td>{value.description}</td>
                        <td>{value.term}</td>
                        <td>{value.time}</td>
                    </tr>
                ))}
        </div>
        </div>
    )
}

export default Courses;