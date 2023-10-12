import { Link, useParams, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { useDbUpdate } from "../utilities/firebase"

const CourseForm = () => {
    const { courseId } = useParams();
    const [key, term, number, title, meets] = courseId.split('|');
    const navigate = useNavigate();
    const dbCourse = term[0].concat(String(number));
    const [update, res] = useDbUpdate(`/courses/${dbCourse}`)



    const [state, setState] = useState({
        values: {
            title: title,
            meets: meets
        },
        errors: {}
    });

    const validateUserData = (key, val) => {
        switch (key) {
          case 'title':
            return /(^\w\w)/.test(val) ? '' : 'Must be at least two characters, i.e. "AI"';
          case 'meets':
            return /^((M|Tu|W|Th|F)+[\s][0-9]{1,2}:[0-9]{2}-[0-9]{1,2}:[0-9]{2})$|^$/.test(val) ? '' : 'Must contain days and a start/end time, i.e. "MWF 14:00-14:50"';
          default: return '';
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const error = validateUserData(name, value);
    
        setState(prevState => ({
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
            <input 
                className={`form-control ${state.errors?.[name] ? 'is-invalid' : ''}`} 
                id={name} 
                name={name}
                defaultValue = {state.values?.[name]}  
                onChange={change}
            />
            <div className="invalid-feedback">{state.errors?.[name]}</div>
        </div>
    );
    
    

    const ButtonBar = ({msg}) => {
        return (
          <div className="d-flex">
            <Link to='/'>
                <button type="button" className="btn btn-outline-danger">Cancel</button>
            </Link>
            <button type="submit" className="btn btn-primary mx-4">Submit</button>
            <span className="p-2">{msg}</span>
          </div>
        );
    };

    const submit = (evt) => {
        evt.preventDefault();
    
        const hasErrors = Object.values(state.errors).some(error => error !== '');
    
        if (!hasErrors) {
            try {
                update(state.values);
                navigate('/');
            } catch (error) {
                console.error("Error updating the database:", error);
            }
        } else {
            console.log("Validation errors:", state.errors);
        }
    };
    
    

    return (
        <form onSubmit={submit} className="p-4 bg-white" style={{borderRadius: '5px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
            <h1>Change Course Details</h1>
            <InputField name="title" text="Course Title" state={state} change={handleInputChange} />
            <InputField name="meets" text="Meeting Time(s)" state={state} change={handleInputChange} />
            <ButtonBar msg= {res?.message} />
        </form>
    );
};

export default CourseForm;
