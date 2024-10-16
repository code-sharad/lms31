import {combineReducers, configureStore} from "@reduxjs/toolkit"
import userReducer from "./User/userSlice";
import storage from 'redux-persist/lib/storage';
import {persistReducer,persistStore} from "redux-persist"
const persistConfig = {
    key:'root',
    storage,
}

const rootReducer = combineReducers({
    user:userReducer
})
const persistedReducer = persistReducer(persistConfig,rootReducer)
const store = configureStore({
    reducer:persistedReducer
})

const persistor = persistStore(store);

export {store,persistor}