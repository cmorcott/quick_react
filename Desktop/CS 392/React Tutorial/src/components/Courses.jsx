// import React from 'react';
// import { useState } from "react";
// import './Courses.css';

// const Courses = ({ courseList }) => {
//     return (
//         <div className="courseListContainer">
//             <div className="courseList">
//                 {Object.entries(courseList).map(([key, value]) => (
//                     <div className='card m-1 p-2' key={key}>
//                         <div className='card-body'>
//                             <h5 className='card-title'>{value.term} CS {value.number}</h5>
//                             <p className='card-text'>Term: {value.title}</p>
//                         </div>
//                         <div className='card-footer bg-white'>
//                             <p className='card-text'>Meets: {value.meets}</p>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default Courses;


import React, { useState } from 'react';
import './Courses.css';

const Courses = ({ courseList }) => {
    const [selected, setSelected] = useState([]);

    const toggleSelected = (key) => {
        console.log("Toggling selection for:", key)
        setSelected(
            selected.includes(key)
            ? selected.filter(x => x !== key)
            : [...selected, key]
        );
    }

    return (
        <div className="courseListContainer">
            <div className="courseList">
                {Object.entries(courseList).map(([key, value]) => (
                    <div 
                        className={`card m-1 p-2 ${selected.includes(key) ? 'selectedCourse' : ''}`} 
                        key={key} 
                        onClick={() => toggleSelected(key)}
                        style={selected.includes(key) ? {border: '2px solid red'} : {}}
                    >
                        <div className='card-body'>
                            <h5 className='card-title'>{value.term} CS {value.number}</h5>
                            <p className='card-text'>Term: {value.title}</p>
                        </div>
                        <div className='card-footer bg-white'>
                            <p className='card-text'>Meets: {value.meets}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Courses;

