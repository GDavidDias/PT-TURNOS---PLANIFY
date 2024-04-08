import React from 'react'
import {configureStore} from '@reduxjs/toolkit';
import serviceReducer from './servicesSlice';
import formReducer from './formSlice';

const store = configureStore({
    reducer:{
        services: serviceReducer,
        form:formReducer,
    },
});

export default store;