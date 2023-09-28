import Courses from './components/Courses';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './components/global.css'

const schedule = {
  title:"CS Course Schedule for 2018-2019",
  courses:{
    CS349: {
      term: "Fall '23",
      title: "CS 349",
      description: "Machine Learning",
      time: "MW 11:00-12:20"
    },
    CS392: {
      term: "Fall '23",
      title: "CS 392",
      description: "Rapid Software Prototyping",
      time: "MWF 3:00-3:50"
    },
    CS449: {
      term: "Winter '24",
      title: "CS 449",
      description: "Deep Learning",
      time: "TTh 12:00-1:20"
    },
    CS301: {
      term: "Winter '24",
      title: "CS 301",
      description: "Introduction to Robotics",
      time: "W 12:00-2:50"
    }
  }
};

const App = () => {
  return (
    <div>
      <Header header={schedule.title}></Header>
      <Courses courseList={schedule.courses}></Courses>
    </div>
  );
};

export default App;