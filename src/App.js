import './App.css';
import UserManagement from './Components/UserManagement';
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';

function App() {
  return (
    <div className="App">
      {/* <Navbar/>
      <Sidebar/> */}

      {/* <Navbar/> */}
      <Sidebar/>
     <UserManagement/>
     {/* <Navbar/> */}
     {/* <Sidebar/> */}
    </div>
  );
}

export default App;
