import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    services:[],
    slots:{}
};

export const servicesSlice = createSlice({
    name: "services",
    initialState,
    reducers:{
        addServices:(state,action)=>{
            //console.log('que tiene services en Slice: ', action.payload);
            state.services = action.payload;
        },
        addSlots:(state,action)=>{
            //console.log('que tiene slots en Slice: ', action.payload);
            state.slots = action.payload;
        }

    },
});

export const {addServices,addSlots} = servicesSlice.actions;
export default servicesSlice.reducer;