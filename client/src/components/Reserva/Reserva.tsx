import { useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import {addEtapaDisplay,addAvance,clearForm} from '../../redux/formSlice';
import { useAppSelector } from "../../redux/hooks";

const Reserva = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formSG = useAppSelector((state)=>state.form);
  
  const[reservaCompleta, setReservaCompleta]=useState<boolean>(false);
  const[confirmado, setConfirmado]=useState<boolean>(false);

  //AL PRESIONAR BOTON NAVEGA A HORARIO
  const handleAnterior = ()=>{
    navigate('/horario');
  }

  //AL PRESIONAR BOTON CONFIRMAR
  const handleSubmit = ()=>{
    setConfirmado(true);
  };

  //VERIFICA QUE ESTEN CARGADOS LOS DATOS DE LA RESERVA, SI ALGUNO ESTA VACIO
  //NO SE HABILITA EL BOTON CONFIRMAR
  const verificaReserva = ()=>{
    if(formSG.servicio && formSG.fecha!="" && formSG.horario!=""){
      setReservaCompleta(true);
    }else{
      setReservaCompleta(false);
    }
  }

  //PONER EN VACIO LOS VALORES DEL FORM
  const handleFinish=async()=>{
    await dispatch(clearForm());
    navigate('/')
  }

  //AL INICIAR VERIFICA QUE LOS DATOS DE LA RESERVA ESTEN COMPLETOS
  useEffect(()=>{
    verificaReserva();
  },[formSG])

  //AL RENDERIZAR SE CARGAN LOS DATOS DE LA BARRA DE PROGRESO
  useEffect(()=>{
    dispatch(addEtapaDisplay('Confirmar turno'))
    dispatch(addAvance(90));
  },[])

  return (
    <div>
      <div className="h-[69vh]">
        <div className="m-4 p-2 border-2 border-slate-400 ">
          <label 
            className="text-base font-medium"
          >Servicio: {formSG.servicio.name}</label><br/>
          <label 
            className="text-base font-medium"
          >Fecha: {`${formSG.fecha} ${formSG.horario}`}</label>
        </div>
        {(confirmado)&&
          <div className="h-20 m-8 p-2 border-2 border-slate-400 flex flex-col items-center">
            <label>Gracias por seleccionar un turno</label>
            <div>
              <button
                className="bg-blue-200 px-2 py-1 text-base font-bold"
                onClick={handleFinish}
              >Volver a Iniciar</button>
            </div>
          </div>
        }
      </div>
      <div className="border-t-2 border-slate-400 p-4 flex justify-between">
        <button
          className="bg-slate-400 px-2 py-1 text-base font-bold text-white "
          onClick={handleAnterior}
        >Anterior</button>
        <button
          className={`px-2 py-1 text-base font-bold
                    ${(reservaCompleta)
                    ?`bg-slate-400 text-white`
                    :`bg-slate-200 text-white` 
                    }
                `} 
          disabled={!reservaCompleta}
          onClick={handleSubmit}
        >Confirmar</button>
      </div>
    </div>
  )
}

export default Reserva;