import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Homescreen from './screens/Homescreen';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'; 
import Bookingscreen from './screens/Bookingscreen';
import Registerscreen from './screens/Registerscreen';
import Loginscreen from './screens/Loginscreen';
import Profilescreen from './screens/Profilescreen';


function App() {
  return (
    <div className='App'>
      <Navbar/>

      
      <BrowserRouter>
      
      <Routes>
        <Route path='/home' element={<Homescreen />} />
        <Route path='/book/:roomid/:fromdate/:todate' exact Component={Bookingscreen} />
      
        <Route path='/register' exact Component={Registerscreen}/>
        <Route path='/login' exact Component={Loginscreen}/>
        <Route path='/profile' exact Component={Profilescreen}/>
      </Routes>
      
      
      </BrowserRouter>
      
    </div>
  );
}

export default App;
