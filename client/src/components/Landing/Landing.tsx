import { useNavigate } from "react-router-dom";


const Landing = () => {

  const navigate = useNavigate();

  const submitHandler = ()=>{
    navigate('/servicio');
  }

  return (
    <div>
        <div className="h-[70vh] flex flex-col m-4 p-2 justify-center items-center">
          <label
            className="my-4 text-xl font-bold"
          >Desafío Tecnico</label>
          <label
            className="my-4 text-lg font-medium"
          >Programador: Guillermo David Dias</label>
          <button
            className="bg-blue-400 my-2 px-2 py-1 text-base font-bold text-white"
            onClick={submitHandler}
          >Ingresar App</button>
        </div>
    </div>
  )
};

export default Landing;
