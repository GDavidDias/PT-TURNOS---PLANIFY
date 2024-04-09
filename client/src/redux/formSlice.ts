import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import { Service } from './servicesSlice';

interface FormState {
    servicio:Service,
    horario:string,
    fecha:string,
    etapaDisplay:string,
    avance:number
}

const initialService:Service={
    category:'',
    description:'',
    id:0,
    name:''
}

const initialState:FormState = {
    servicio:initialService,
    horario:'',
    fecha:'',
    etapaDisplay:'',
    avance:0
};

export const formSlice = createSlice({
    name:'form',
    initialState,
    reducers:{
        addServicio:(state,action:PayloadAction<Service>)=>{
            console.log('que tiene servicio en slice: ', action.payload);
            state.servicio=action.payload;
        },
        addHorario:(state,action:PayloadAction<string>)=>{
            console.log('que tiene horario en slice: ', action.payload);
            state.horario=action.payload;
        },
        addFecha:(state,action:PayloadAction<string>)=>{
            console.log('que tiene fecha en Slice: ', action.payload);
            state.fecha=action.payload;
        },
        addEtapaDisplay:(state,action:PayloadAction<string>)=>{
            console.log('que tiene etapaDisplay en slice: ', action.payload);
            state.etapaDisplay=action.payload;
        },
        addAvance:(state,action:PayloadAction<number>)=>{
            console.log('que tiene avance en slice: ', action.payload);
            state.avance=action.payload;

        },
        clearForm:(state)=>{
            state.servicio=initialService;
            state.horario='';
            state.fecha='';
            state.etapaDisplay='';
            state.avance=0;
        }
    }
});

export const {addServicio, addHorario, addFecha, addEtapaDisplay, addAvance, clearForm} = formSlice.actions;
export default formSlice.reducer;