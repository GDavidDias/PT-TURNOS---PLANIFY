import {Routes, Route} from 'react-router-dom';
import Landing from './components/Landing/Landing.tsx';
import Home from './components/Home/Home.tsx';
import {useDispatch} from 'react-redux';
import servicesJson from './data/services.json';
import slotsJson from './data/slots.json';
import { useEffect } from 'react';
import {addServices, addSlots} from './redux/servicesSlice';


const App = () => {

  const dispatch =useDispatch();

  const getAllServices = async() => {
    const response = servicesJson;
    //console.log(response)
    dispatch(addServices(response))
  };

  const getAllSlots = async() =>{
    const response = slotsJson;
    dispatch(addSlots(response));
  };

  useEffect(()=>{
    getAllServices();
    getAllSlots();
  },[])

  return (
    <div>
      <Routes>
        <Route path='/' element={<Landing/>} />        
        <Route path='/home' element={<Home/>} />
      </Routes>
    </div>
  )
}

export default App;


