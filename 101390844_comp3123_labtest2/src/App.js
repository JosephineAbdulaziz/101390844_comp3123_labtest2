import Weather from './components/Weather';

function App() {
  return (
    <div style={{backgroundColor: "#C1CFEA" , justifyContent: 'center', alignItems: 'center', height: '930px'}}>
    <div   style={{display: "flex" , justifyContent: 'center', alignItems: 'center', height: '100%'}}>
      <Weather/>
    </div>
     
    </div>
  );
}

export default App;
