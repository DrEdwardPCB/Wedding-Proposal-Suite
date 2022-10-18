import { combineReducers } from "redux";
import { userReducer } from './userReducer';
import { locationReducer } from './locationReducer'
export const rootReducer = combineReducers({ user: userReducer, location: locationReducer })
export type RootType = ReturnType<typeof rootReducer>