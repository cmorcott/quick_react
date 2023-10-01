import { useState } from "react";
import './TermButtons.css';

const terms = {
  Fall: 'Fall Courses',
  Winter: 'Winter Courses',
  Spring: 'Spring Courses'
};

const TermButton = ({term, selection, setSelection}) => (
  <div>
    <input type="radio" id={term} className="btn-check" checked={term === selection} autoComplete="off"
      onChange={() => setSelection(term)} />
    <label className="btn btn-success mb-1 p-2" htmlFor={term}>
    { term }
    </label>
  </div>
);

const TermSelector = ({selection, setSelection}) => (
  <div className="btn-group">
    { 
      Object.keys(terms).map(term => <TermButton key={term} term={term} selection={selection} setSelection={setSelection} />)
    }
  </div>
);

const TermButtons = () => {
  const [selection, setSelection] = useState(() => Object.keys(terms)[0]);
  return (
    <div className="termButtons">
      <TermSelector selection={selection} setSelection={setSelection} />
    </div>
  );
}

export default TermButtons;