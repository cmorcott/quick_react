import React from 'react';
import './Courses.css';

const Courses = ({ courseList }) => {
    return (
        <div className="courseListContainer">
            <div className="courseList">
                {Object.entries(courseList).map(([key, value]) => (
                    <div className='card m-1 p-2' key={key}>
                        <div className='card-body'>
                            <h5 className='card-title'>{value.title} : {value.description}</h5>
                            <p className='card-text'>Term: {value.term}</p>
                        </div>
                        <div className='card-footer bg-white'>
                            <p className='card-text'>Meets: {value.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Courses;
