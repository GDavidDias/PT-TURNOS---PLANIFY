import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {addServicio,addEtapaDisplay,addAvance} from '../../redux/formSlice';
import { useNavigate } from "react-router-dom";
import {useAppSelector} from '../../redux/hooks';
import { Service } from "../../redux/servicesSlice";


const Servicio = () => {

  const serviceSG = useAppSelector((state)=>state.services);
  const formSG = useAppSelector((state)=>state.form);

  const[categorias, setCategorias] = useState<string[]>([]);
  const[servicios, setServicios] = useState<Service[]>([]);
  const[catExpandida, setCatExpandida] = useState<string>('');
  const[serSelect, setSerSelect]=useState<boolean>(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //CREA ARREGLO DE CATEGORIAS UNICAS
  const defineCategorias = ()=>{
    let categoriasArr:string[]=[];
    //console.log('QUE TIENE SERVICES: ', serviceSG);
    serviceSG.services?.forEach((serv:Service)=>{
      //console.log(serv.category)
      if(!categoriasArr.includes(serv.category)){
        categoriasArr.push(serv.category);
      }
    })
    setCategorias(categoriasArr);
  };

  //CREA UN ARREGLO CON LOS SERVICIOS DE UNA CATEGORIA SELECCIONADA
  const expandirCategoria = (cat:string) =>{
    //console.log('ingresa a expandirCategoria')
    if(catExpandida === cat){
      setCatExpandida('');
    }else{
      setCatExpandida(cat);
    }
    let serviciosCategoria:Service[]=[];
    serviciosCategoria = serviceSG.services.filter((serv:Service)=>serv.category===cat);
    //console.log('serviciosCategoria: ', serviciosCategoria);
    setServicios(serviciosCategoria);
  };

  //AL SELECCIONAR UN SERVICIO, SE CARGA EN ESTADO GLOBAL DE FORM
  const seleccionaServicio = (servicio:Service) =>{
    console.log('que tiene servicio: ', servicio)
    dispatch(addServicio(servicio))
  };

  const submitSiguiente = ()=>{
    navigate('/horario');
  }


  //AL INICIAR SE ARMA LISTADO DE CATEGORIAS UNICAS
  useEffect(()=>{
    //console.log('que tiene serviceSG: ', serviceSG);
    defineCategorias();
    //console.log('que tiene estado categorias: ', categorias);
    //console.log('que contiene servicios: ', servicios);
    //console.log('que tiene form: ', formSG)
  },[serviceSG])
  
  //SI EL SERVICIO SE SELECCIONA Y SE CARGA EN ESTADO GLOBAL CAMBIA ESTADO LOCAL
  //DE "serSelect", QUE CONTROLA SI SE HABILITA EL BOTON SIGUIENTE O NO
  useEffect(()=>{
    if(formSG.servicio){
      setSerSelect(true)
    }else{
      setSerSelect(false)
    }
    console.log('que tiene serSelect: ', serSelect);

  },[formSG])

  //AL RENDERIZAR CARGA EN ESTADO GLOBAL VALORES PARA BARRA PROGRESO
  useEffect(()=>{
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