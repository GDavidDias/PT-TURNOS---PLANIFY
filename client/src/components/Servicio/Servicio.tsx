import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Servicio = () => {

  const serviceSG = useSelector((state)=>state.services.services);

  const[categorias, setCategorias] = useState([]);
  const[servicios, setServicios] = useState([]);
  const[catExpandida, setCatExpandida] = useState(null);

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


  useEffect(()=>{
    console.log('que tiene serviceSG: ', serviceSG);
    defineCategorias();
    console.log('que tiene estado categorias: ', categorias);
    console.log('que contiene servicios: ', servicios);
  },[serviceSG])

  return (
    <div>
        <h2>Servicio</h2>
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
    </div>
  )
}

export default Servicio;