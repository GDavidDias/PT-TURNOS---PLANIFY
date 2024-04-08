import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    servicio:'',
    horario:'',
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
        }
    }
});

export const {addServicio, addHorario} = formSlice.actions;
export default formSlice.reducer;