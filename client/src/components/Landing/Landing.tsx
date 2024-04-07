import { useNavigate } from "react-router-dom";


const Landing = () => {

  const navigate = useNavigate();

  const submitHandler = ()=>{
    navigate('/servicio');
  }

  return (
    <>
        <div>
          <h1>Desafío Tecnico</h1>
          <h2>Programador: Guillermo David Dias</h2>
          <button
            onClick={submitHandler}
          >Ingresar App</button>
        </div>
    </>
  )
};

export default Landing;
