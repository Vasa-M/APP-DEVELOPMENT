import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import {Routes,Route} from "react-router-dom"
import './home.css';
import Map from './maps/Map';
import Driverlogin from './components/Driverlogin';
import Driversignup from './components/Driversignup';
import ContactUs from './components/ContactUs';
import AboutUs from './components/AboutUs';
import DriverDash from './components/DriverDash';
// import {  useSelector } from 'react-redux/es/hooks/useSelector'
// import { selectUser } from './components/Features/features';
import NewMap from './components/NewMap';
import { PassNav } from './components/Passnav';

function App() {
  // const user = useSelector(selectUser);
  return (
  <>
    {/* {user && user.name +" "+ user.email  + " "  + user.password} */}
    <Header />
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/driverlog' element={<Driverlogin />} />
      <Route path='/driversig' element={<Driversignup />} />
      <Route path='/home' element={<Home />} />
      <Route path='/contact' element={<ContactUs />} />
      <Route path='/passnav' element={<PassNav />} />
      <Route path='/driverdash' element={<DriverDash />} />
      <Route path='/about' element={<AboutUs />} />
      <Route path='/newmap' element={<NewMap />} />
      <Route path='/map' element={<Map/>}/>
    </Routes>
  </>
  );
}

export default App;
