import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {addServicio} from '../../redux/formSlice';
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

  const submitHandler = ()=>{
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

  return (
    <div>
        <h2>Seleccione un Servicio</h2>
        <form>
          <div>
            <ul>
              {
                categorias?.map((cat,index)=>(
                  <li key={index}>
                    {cat} 
                    <button
                      onClick={()=>expandirCategoria(cat)}
                    >+</button>
                    {catExpandida===cat && (
                      <ul>
                        {servicios?.map((ser)=>(
                          <li key={ser.id}>
                            <button
                              onClick={()=>seleccionaServicio(ser)}
                            >{ser.name}</button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))
              }
            </ul>
            
          </div>
        </form>
        <div>
          <button
            disabled={!serSelect}
            onClick={submitHandler}
          >Siguiente</button>
        </div>
    </div>
  )
}

export default Servicio;