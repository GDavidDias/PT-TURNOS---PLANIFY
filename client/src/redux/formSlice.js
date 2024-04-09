import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    servicio:'',
    horario:'',
    fecha:'',
    etapaDisplay:'',
    avance:0
};

export const formSlice = createSlice({
    name:'form',
    initialState,
    reducers:{
        addServicio:(state,action)=>{
            console.log('que tiene servicio en slice: ', action.payload);
            state.servicio=action.payload;
        },
        addHorario:(state,action)=>{
            console.log('que tiene horario en slice: ', action.payload);
            state.horario=action.payload;
        },
        addFecha:(state,action)=>{
            console.log('que tiene fecha en Slice: ', action.payload);
            state.fecha=action.payload;
        },
        addEtapaDisplay:(state,action)=>{
            console.log('que tiene etapaDisplay en slice: ', action.payload);
            state.etapaDisplay=action.payload;
        },
        addAvance:(state,action)=>{
            console.log('que tiene avance en slice: ', action.payload);
            state.avance=action.payload;

        },
        clearForm:(state)=>{
            state.servicio='';
            state.horario='';
            state.fecha='';
            state.etapaDisplay='';
            state.avance=0;
        }
    }
});

export const {addServicio, addHorario, addFecha, addEtapaDisplay, addAvance, clearForm} = formSlice.actions;
export default formSlice.reducer;