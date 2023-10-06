
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './components/global.css'
import './components/TermButtons';
import Courses from './components/Courses';
import Header from './components/Header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useJsonQuery } from './utilities/fetch';
import TermButtons from './components/TermButtons';
import CourseForm from './components/CourseForm';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";



const terms = {
  Fall: 'Fall Courses',
  Winter: 'Winter Courses',
  Spring: 'Spring Courses'
};

const Main = () => {
  const [data, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');
  const [selection, setSelection] = useState(() => Object.keys(terms)[0])

  if (error) return <h1>Error loading user data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading user data...</h1>;
  if (!data) return <h1>No user data found</h1>;

  const filteredCourses = Object.entries(data.courses).filter(([key, value]) => value.term == selection)

  return(
    <div>
      <Header header={data.title}></Header>
      <TermButtons selection={selection} setSelection={setSelection} />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Courses courseList={Object.fromEntries(filteredCourses)} /> } />
          <Route path='courseform/:courseId' element={<CourseForm/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <div>
      <Main />
    </div>
  </QueryClientProvider>
);

export default App;