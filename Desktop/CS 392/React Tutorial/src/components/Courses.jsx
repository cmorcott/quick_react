import React, { useState } from 'react';
import ShoppingCart from './ShoppingCart';
import './Courses.css';

const Courses = ({ courseList }) => {
    const [selected, setSelected] = useState([]);
    const [cartOpen, setOpen] = useState(false);

    const toggleSelected = (key) => {
        setSelected(
            selected.includes(key)
            ? selected.filter(x => x !== key)
            : [...selected, key]
        );
    }

    const closeModal = () => {
        setOpen(cartOpen => {
            return !cartOpen;
        });
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
        </div>
    );
}

export default Courses;
