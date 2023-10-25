import React, { useState } from 'react';
import ShoppingCart from './ShoppingCart';
import './Courses.css';
import { allTimeConflicts } from './Conflict';
import { Link } from 'react-router-dom';
import { useAuthState } from '../utilities/firebase';
import { useProfile } from '../utilities/profile';


const Courses = ({ courseList }) => {
    const [selected, setSelected] = useState([]);
    const [cartOpen, setOpen] = useState(false);
    const [conflictingCourses, setConflictingCourses] = useState([]);
    const [user] = useAuthState();
    const [profile, profileLoading, profileError] = useProfile();

    const toggleSelected = (key) => {
        if (conflictingCourses.includes(key)) return;

        if (selected.includes(key)) {
            setSelected(selected.filter(x => x !== key));
            const newConflicts = conflictingCourses.filter(conflictKey => !allTimeConflicts(courseList[key], [courseList[conflictKey]]));
            setConflictingCourses(newConflicts);
        } else {
            setSelected([...selected, key]);
            updateConflictingCourses(key);
        }
    }

    const closeModal = () => {
        setOpen(cartOpen => {
            return !cartOpen;
        });
    }

    const updateConflictingCourses = (selectedCourse) => {
        const conflicts = Object.keys(courseList).filter(courseKey => 
            courseKey !== selectedCourse && 
            allTimeConflicts(courseList[selectedCourse], [courseList[courseKey]])
        );
        const mergedConflicts = [...new Set([...conflictingCourses, ...conflicts])];
        setConflictingCourses(mergedConflicts);
    }

    return (
        <div>
            <div className="courseList">
                <button onClick={() => {setOpen(!cartOpen); }} className="cartButton"> Open Shopping Cart</button>
                <ShoppingCart open={cartOpen} close={closeModal}>
                    {selected.length === 0 ? 
                        <div>No courses selected, click a course card to add it to the cart</div> :
                        selected.filter(courseKey => courseList[courseKey]).map(courseKey => {
                            const course = courseList[courseKey];
                            return (
                                <div key={courseKey} className="cartCourses">
                                    CS {course.number}: {course.title}, meets: {course.meets}
                                </div>
                            );
                        })
                    }
                </ShoppingCart>
            </div>
            <div className="courseListContainer">
                <div className="courseList">
                    {Object.entries(courseList).map(([key, value]) => (
                        <div 
                            className={`card m-1 p-2 ${selected.includes(key) ? 'selectedCourse' : ''} ${conflictingCourses.includes(key) ? 'conflictCourse' : ''}`} 
                            key={key} 
                            onClick={() => toggleSelected(key)}
                            style={selected.includes(key) ? {border: '2px solid red'} : {}}
                            data-cy="course"
                        >
                        <div className='card-body'>
                            <h5 className='card-title'>{value.term} CS {value.number}</h5>
                            <p className='card-text'>Term: {value.title}</p>
                        </div>
                        <div className='card-footer bg-white'>
                            <p className='card-text'>Meets: {value.meets}</p>
                            <Link to={`/courseform/${key}|${value.term}|${value.number}|${value.title}|${value.meets}`}>
                                {profile.isAdmin && user &&<button className="btn btn-sm btn-outline-secondary">Edit</button>}
                            </Link>
                        </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Courses;
