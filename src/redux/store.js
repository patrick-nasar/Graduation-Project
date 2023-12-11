import { configureStore } from '@reduxjs/toolkit'
import flowData from './flowData'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'
import { combineReducers } from "redux";

const reducers = combineReducers({
    flowdata: flowData
});


const persistConfig = {
    key: 'FLOW',
    storage
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
})


