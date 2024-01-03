import './App.css';
import data from './data/data'
import VehicleList from './components/VehicleList';
import Routing from './routes/Routing';

function App() {

  const response = data.data[0]
  // const response2 = data.data[51]

  // console.log('response', response)
  // console.log('response2', response2)
  return (
    <div className="App">
      {/* <VehicleList /> */}
      <Routing />
    </div>
  );
}

export default App;
