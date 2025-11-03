import { configureStore } from "@reduxjs/toolkit";
import user from './userslice'
import storage from "redux-persist/lib/storage"
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";

import {
     FLUSH,
     REHYDRATE,
     PAUSE,
     PERSIST,
     PURGE,
     REGISTER
   } from 'redux-persist'



const persistConfig={
     key:'root',
     version:1,
     storage
     // storage:storage  you can also use this
}

const reducer=combineReducers({
     users:user,
})

const persistedReducer=persistReducer(persistConfig,reducer)

const store = configureStore({
     reducer : persistedReducer,
     middleware: (getDefaultMiddleware) =>
     getDefaultMiddleware({
       serializableCheck: {
         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
       },
     }),
})



export default store;