import { useAppSelector } from "../../redux/hooks";

const Progress = () => {

  const formSG = useAppSelector((state)=>state.form);

  return (
    <div className="mx-4 mt-4">
      <label className="text-base font-bold">{formSG.etapaDisplay}</label>
      <div className="h-4 bg-gray-200 rounded overflow-hidden">
        <div 
          className="bg-blue-500 h-full" 
          style={{width: `${formSG.avance}%`, transition: 'width 0.5s ease' }}
        ></div>
      </div>
    </div>
  )
}

export default Progress;