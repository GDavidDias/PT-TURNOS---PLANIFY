import {Routes, Route} from 'react-router-dom';
import Landing from './components/Landing/Landing.tsx';
import Servicio from './components/Servicio/Servicio.tsx';
import {useDispatch} from 'react-redux';
import servicesJson from './data/services.json';
import slotsJson from './data/slots.json';
import { useEffect } from 'react';
import {addServices, addSlots} from './redux/servicesSlice';
import Horario from './components/Horario/Horario.tsx';
import Reserva from './components/Reserva/Reserva.tsx';
import Progress from './components/Progress/Progress.tsx';


const App = () => {

  const dispatch =useDispatch();

  const getAllServices = async() => {
    const response = servicesJson;
    dispatch(addServices(response))
  };

  const getAllSlots = async() =>{
    const response = slotsJson;
    dispatch(addSlots(response));
  };

  useEffect(()=>{
    //SE CARGAN LOS ARCHIVOS JSON A ESTADO GLOBAL EN REDUX
    getAllServices();
    getAllSlots();
  },[])

  return (
    <div>
      <div>
        <Progress/>
      </div>
      <div>
        <Routes>
          <Route path='/' element={<Landing/>} />        
          <Route path='/servicio' element={<Servicio/>} />
          <Route path='/horario' element={<Horario/>} />
          <Route path='/reserva' element={<Reserva/>} />
        </Routes>
      </div>
    </div>
  )
}

export default App;


