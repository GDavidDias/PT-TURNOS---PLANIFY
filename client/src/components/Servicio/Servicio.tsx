import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {addServicio,addEtapaDisplay,addAvance} from '../../redux/formSlice';
import { useNavigate } from "react-router-dom";

const Servicio = () => {

  const serviceSG = useSelector((state)=>state.services.services);
  const formSG = useSelector((state)=>state.form);

  const[categorias, setCategorias] = useState([]);
  const[servicios, setServicios] = useState([]);
  const[catExpandida, setCatExpandida] = useState(null);
  const[serSelect, setSerSelect]=useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const defineCategorias = ()=>{
    let categoriasArr:string[]=[];
    serviceSG.services?.forEach(serv=>{
      //console.log(serv.category)
      if(!categoriasArr.includes(serv.category)){
        categoriasArr.push(serv.category);
      }
    })
    setCategorias(categoriasArr);
  };

  const expandirCategoria = (cat:string) =>{
    console.log('ingresa a expandirCategoria')
    if(catExpandida === cat){
      setCatExpandida(null);
    }else{
      setCatExpandida(cat);
    }
    let serviciosCategoria=[];
    serviciosCategoria = serviceSG.services.filter(serv=>serv.category===cat);
    console.log('serviciosCategoria: ', serviciosCategoria);
    setServicios(serviciosCategoria);
  };

  const seleccionaServicio = (servicio) =>{
    dispatch(addServicio(servicio))
  };

  const submitSiguiente = ()=>{
    navigate('/horario');
  }


  useEffect(()=>{
    console.log('que tiene serviceSG: ', serviceSG);
    defineCategorias();
    console.log('que tiene estado categorias: ', categorias);
    console.log('que contiene servicios: ', servicios);
    console.log('que tiene form: ', formSG)
    
  },[serviceSG])
  
  useEffect(()=>{
    if(formSG.servicio!=""){
      setSerSelect(true)
    }else{
      setSerSelect(false)
    }
    console.log('que tiene serSelect: ', serSelect);

  },[formSG])

  useEffect(()=>{
    //Al ingresar a Servicio
    dispatch(addEtapaDisplay('Seleccionar servicio'))
    dispatch(addAvance(30))
  },[])

  return (
    <div>
      <div className="min-h-[70vh]">
        <div className="m-2 p-2 border-2 border-slate-400  overflow-auto h-[68vh]">
          <label className="text-base font-medium">Categorias</label>
          <ul>
            {
              categorias?.map((cat,index)=>(
                <li 
                  key={index}
                >
                  <div className="flex justify-between px-2 my-2 bg-slate-100">
                    {cat} 
                    <button
                      className="text-lg font-bold"
                      onClick={()=>expandirCategoria(cat)}
                    >+</button>
                  </div>
                  <div className="flex flex-col px-2">
                    {catExpandida===cat && (
                      <ul>
                        {servicios?.map((ser)=>(
                          <li 
                            className="border-2 border-slate-400 my-2 p-1"
                            key={ser.id}
                          >
                            <div>
                              <div>
                                <h4>{ser.name}</h4>
                                <p>{ser.description}</p>  
                              </div>
                              <div className="flex flex-row-reverse mt-2">
                                <button
                                  className="bg-slate-300 px-2 py-1 text-sm font-bold text-white focus:bg-slate-400"
                                  onClick={()=>seleccionaServicio(ser)}
                                >Seleccionar</button>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              ))
            }
          </ul>
          
        </div>
      </div>
      <div className="border-t-2 border-slate-400 p-4 flex flex-row-reverse">
        <button
          // className="bg-slate-400 px-2 py-1 text-base font-bold text-white "
          className={`px-2 py-1 text-base font-bold
            ${(serSelect)
              ?`bg-slate-400 text-white`
              :`bg-slate-200 text-white` 
            }
          `}
          disabled={!serSelect}
          onClick={submitSiguiente}
        >Siguiente</button>
      </div>
    </div>
  )
}

export default Servicio;