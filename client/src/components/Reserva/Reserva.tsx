import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {addEtapaDisplay,addAvance} from '../../redux/formSlice';

const Reserva = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formSG = useSelector((state)=>state.form);
  const[reservaCompleta, setReservaCompleta]=useState(false);

  const handleAnterior = ()=>{
    navigate('/horario');
  }

  const handleSubmit = ()=>{
    //Presiona boton Confirmar
  };

  const verificaReserva = ()=>{
    if(formSG.servicio!="" && formSG.fecha!="" && formSG.horario!=""){
      setReservaCompleta(true);
    }else{
      setReservaCompleta(false);
    }
  }

  //Se verifica que todos los datos de la reserva esten completos
  useEffect(()=>{
    verificaReserva();
  },[formSG])

  useEffect(()=>{
    //Ingresamos a Reserva
    dispatch(addEtapaDisplay('Confirmar turno'))
    dispatch(addAvance(90));
  },[])

  return (
    <div>
      <div className="h-[70vh]">
        <div className="m-4 p-2 border-2 border-slate-400 ">
          <label 
            className="text-base font-medium"
          >Servicio: {formSG.servicio.name}</label><br/>
          <label 
            className="text-base font-medium"
          >Fecha: {`${formSG.fecha} ${formSG.horario}`}</label>
        </div>
      </div>
      <div className="border-t-2 border-slate-400 p-4 flex justify-between">
        <button
          className="bg-slate-400 px-2 py-1 text-base font-bold text-white "
          onClick={handleAnterior}
        >Anterior</button>
        <button
          className="bg-slate-400 px-2 py-1 text-base font-bold text-white "
          disabled={!reservaCompleta}
          onClick={handleSubmit}
        >Confirmar</button>
      </div>
    </div>
  )
}

export default Reserva;