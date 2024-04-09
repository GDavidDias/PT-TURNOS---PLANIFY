import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {addHorario,addFecha,addEtapaDisplay,addAvance} from '../../redux/formSlice';

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

    const handleSelectTime=(time:string, slot:string) =>{
        dispatch(addHorario(time));
        dispatch(addFecha(slot));
    };

    useEffect(()=>{
        if(formSG.horario!=""){
            setHorarioSelect(true);
        }else{
            setHorarioSelect(false)
        };
    },[formSG])

    useEffect(()=>{
        dispatch(addEtapaDisplay('Seleccionar horario'));
        dispatch(addAvance(60));
        console.log('que tiene slotSG: ', slotSG)
        console.log('que tiene formSG: ', formSG)
        verificaHorario();

    },[])

  return (
    <div>
        <div className="min-h-[70vh]">
            <div  className="m-2 p-2 border-2 border-slate-400 overflow-auto h-[68vh]">
            <label className="text-base font-medium">Proximos turnos disponibles</label>
                {habilitaHorarios
                    ?<div>
                        {
                            slotSG?.map((slot,index)=>(
                                <div key={index}>
                                    <label
                                        className="text-base font-medium"
                                    >{slot.date}</label>
                                    <div
                                        className="flex flex-wrap"
                                    >
                                        {slot.availableTimeslots?.map((time,index)=>(
                                            <div 
                                                className="m-2"
                                                key={index}
                                            >
                                                <button
                                                    className="bg-slate-200 py-2 px-6 focus:bg-slate-400 active:bg-slate-400"
                                                    onClick={()=>handleSelectTime(time,slot.date,index)}
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

        </div>
        <div className="border-t-2 border-slate-400 p-4 flex justify-between">
            <button
                className="bg-slate-400 px-2 py-1 text-base font-bold text-white "
                onClick={submitAnterior}
            >Anterior</button>
            <button
                //className="bg-slate-400 px-2 py-1 text-base font-bold text-white "
                className={`px-2 py-1 text-base font-bold
                    ${(horarioSelect)
                    ?`bg-slate-400 text-white`
                    :`bg-slate-200 text-white` 
                    }
                `}                
                disabled={!horarioSelect}
                onClick={submitSiguiente}
            >Siguiente</button>
        </div>
    </div>
  )
}

export default Horario;