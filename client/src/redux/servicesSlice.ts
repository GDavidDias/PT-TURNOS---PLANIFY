import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface Service{
    category:string,
    description:string,
    id:number,
    name:string
}

interface Slot{
    availableTimeslots:string[],
    date:string,
    serviceId:number
}

interface ServiceState{
    services:Service[],
    slots:Slot[]
}

const initialState:ServiceState = {
    services:[],
    slots:[]
};

export const servicesSlice = createSlice({
    name: "services",
    initialState,
    reducers:{
        addServices:(state,action:PayloadAction<Service[]>)=>{
            //console.log('que tiene services en Slice: ', action.payload);
            state.services = action.payload;
        },
        addSlots:(state,action:PayloadAction<Slot[]>)=>{
            //console.log('que tiene slots en Slice: ', action.payload);
            state.slots = action.payload;
        }

    },
});

export const {addServices,addSlots} = servicesSlice.actions;
export default servicesSlice.reducer;