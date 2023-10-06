import { Link, useParams } from "react-router-dom";
import { useState } from 'react';

const CourseForm = () => {
    const { courseId } = useParams();
    const [term, number, title, meets] = courseId.split('|');

    const [state, setState] = useState({
        values: {
            courseTitle: title,
            courseNumber: number,
            courseTerm: term,
            meetingTimes: meets
        },
        errors: {}
    });

    const validateUserData = (key, val) => {
        switch (key) {
          case 'firstName': case 'lastName':
            return /(^\w\w)/.test(val) ? '' : 'must be least two characters';
          case 'email':
            return /^\w+@\w+[.]\w+/.test(val) ? '' : 'must contain name@domain.top-level-domain';
          default: return '';
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const error = validateUserData(name, value);

        setState(prevState => ({
            ...prevState,
            values: {
                ...prevState.values,
                [name]: value
            },
            errors: {
                ...prevState.errors,
                [name]: error
            }
        }));
    };

    const InputField = ({name, text, state, change}) => (
        <div className="mb-3">
            <label htmlFor={name} className="form-label">{text}</label>
            <input className="form-control" id={name} name={name} value={state.values?.[name] || ''} onChange={change} />
            <div className="invalid-feedback">{state.errors?.[name]}</div>
        </div>
    );

    const ButtonBar = () => {
        return (
          <div className="d-flex">
            <Link to='/'>
                <button type="button" className="btn btn-outline-danger">Cancel</button>
            </Link>
            <button type="submit" className="btn btn-primary mx-4" disabled>Submit</button>
          </div>
        );
    };

    const submit = (evt) => {
        evt.preventDefault();
        if (!state.errors) {
          // update(state.values); // Uncomment this when you have the update function ready
        }
    };

    return (
        <form onSubmit={submit} className="p-4 bg-white" style={{borderRadius: '5px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
            <h1>Change Course Details</h1>
            <InputField name="courseTitle" text="Course Title" state={state} change={handleInputChange} />
            <InputField name="courseNumber" text="Course Number" state={state} change={handleInputChange} />
            <InputField name="courseTerm" text="Course Term" state={state} change={handleInputChange} />
            <InputField name="meetingTimes" text="Meeting Time(s)" state={state} change={handleInputChange} />
            <ButtonBar />
        </form>
    );
};

export default CourseForm;
