import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {addHorario} from '../../redux/formSlice';

const Horario = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const slotSG = useSelector((state)=>state.services.slots);
    const formSG = useSelector((state)=>state.form);
    const [horarioSelect, setHorarioSelect]=useState(false);

    const [habilitaHorarios, setHabilitaHorarios]=useState(false);

    const verificaHorario=()=>{
        if(slotSG[0].serviceId===formSG.servicio.id){
            setHabilitaHorarios(true);
        }else{
            setHabilitaHorarios(false);
        }
    };

    const submitAnterior = ()=>{
        navigate('/servicio');
    };
    const submitSiguiente =()=>{
        navigate('/reserva');
    };

    const handleSelectTime=(time:string) =>{
        dispatch(addHorario(time));
    };

    useEffect(()=>{
        if(formSG.horario!=""){
            setHorarioSelect(true);
        }else{
            setHorarioSelect(false)
        };
    },[formSG])

    useEffect(()=>{
        console.log('que tiene slotSG: ', slotSG)
        console.log('que tiene formSG: ', formSG)
        verificaHorario();
    },[])

  return (
    <div>
        <h2>Proximos turnos disponibles</h2>
        <div>
            {habilitaHorarios
                ?<div>
                    {
                        slotSG?.map((slot,index)=>(
                            <div key={index}>
                                <h4>{slot.date}</h4>
                                <div>
                                    {slot.availableTimeslots?.map((time,index)=>(
                                        <div key={index}>
                                            <button
                                                onClick={()=>handleSelectTime(time)}
                                            >{time}</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    }
                </div>
                :<div>
                    <p>Sin Horarios disponibles, disculpe las molestias</p>
                </div>
            }
        </div>
        <div>
            <button
                onClick={submitAnterior}
            >Anterior</button>
            <button
                disabled={!horarioSelect}
                onClick={submitSiguiente}
            >Siguiente</button>
        </div>
    </div>
  )
}

export default Horario;