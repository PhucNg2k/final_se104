import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Homescreen from './screens/Homescreen';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'; 
import Bookingscreen from './screens/Bookingscreen';
import Registerscreen from './screens/Registerscreen';
import Loginscreen from './screens/Loginscreen';
import Profilescreen from './screens/Profilescreen';
import Adminscreen from './screens/Adminscreen';
import Landingscreen from './screens/Landingscreen';
import EditRoom from './screens/EditRoom';
import RoomDetails from './screens/RoomDetail';

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
      
        <Route path='/admin' exact Component={Adminscreen}/>
        <Route path='/' exact Component={Landingscreen}/>
        <Route path='/rooms/:id' exact Component={RoomDetails}/>
        <Route path="/rooms/:id/edit" exact Component={EditRoom} />
      </Routes>
      
      
      </BrowserRouter>
      
    </div>
  );
}

export default App;