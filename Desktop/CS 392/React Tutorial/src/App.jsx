const App = () => {
  const today = new Date();
  const day = today.toLocaleString([], {weekday: 'long'});
  const date = today.toLocaleDateString([], {dateStyle: 'long'})

  return (
    <div>
      <h1>Courses for Fall 2022-2023</h1>
      
      <p>Today is {day}, {date}.</p>

      <p><b>PSYCH 228 <br></br> LRN_SCI 301 <br></br> COMP_SCI 349 <br></br> COMP_SCI 392</b></p>
    </div>
  );
};

export default App;