import {Routes, Route, useLocation} from 'react-router-dom';
import Landing from './components/Landing/Landing.tsx';
import Servicio from './components/Servicio/Servicio.tsx';
import {useDispatch} from 'react-redux';
import servicesJson from './data/services.json';
import slotsJson from './data/slots.json';
import { useEffect } from 'react';
import { addServices, addSlots, Service } from './redux/servicesSlice';
import Horario from './components/Horario/Horario.tsx';
import Reserva from './components/Reserva/Reserva.tsx';
import Progress from './components/Progress/Progress.tsx';
import { BiSolidCoffee } from "react-icons/bi";


const App = () => {

  const dispatch =useDispatch();
  const location = useLocation();

  //CARGO EL ARCHIVO SERVICESJSON A ESTADO GLOBAL
  const getAllServices = async() => {
    const response = servicesJson.services;
    await dispatch(addServices(response));
  };

  //CARGO ARCHIVO SLOTSJSON A ESTADO GLOBAL
  const getAllSlots = async() =>{
    const response = slotsJson;
    await dispatch(addSlots(response));
  };

  //AL RENDERIZAR SE CARGAN LOS ARCHIVOS JSON A ESTADO GLOBAL EN REDUX
  useEffect(()=>{
    getAllServices();
    getAllSlots();
  },[])

  return (
    <div className='w-full h-full'>
      {location.pathname!=='/'&&
        <div className='h-[7vh]'>
          <Progress/>
        </div>
      }
      <div className='min-h-[40vh]'>
        <Routes>
          <Route path='/' element={<Landing/>} />        
          <Route path='/servicio' element={<Servicio/>} />
          <Route path='/horario' element={<Horario/>} />
          <Route path='/reserva' element={<Reserva/>} />
        </Routes>
      </div>
      {location.pathname!=='/' &&
        <div className='h-[10vh] border-2 flex flex-row justify-center '>
          <div className=' text-blue-600 flex flex-col items-center mx-4'>
            <BiSolidCoffee className='text-4xl'/>
            <label>Reservar</label>
          </div>
          <div className=' text-black flex flex-col items-center mx-4'>
            <BiSolidCoffee className='text-4xl'/>
            <label>Mis Turnos</label>
          </div>
        </div>
      }
    </div>
  )
}

export default App;


