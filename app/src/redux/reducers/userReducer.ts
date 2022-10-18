import { User } from '../../utils/entityInterface';
import { EUserAction } from './types';


export interface IUserReducerState {
    isLoggedin: boolean
    user?: Omit<Omit<User, 'password'>, 'location'>
    token?: string
}
export const userReducerInitialState: IUserReducerState = { isLoggedin: false }
export interface IBaseUserAction {
    type: EUserAction,
    payload?: any
}
export const userReducer = (state: IUserReducerState = userReducerInitialState, action: IBaseUserAction): IUserReducerState => {
    switch (action.type) {
        case EUserAction.USER_LOGIN: {
            return {
                isLoggedin: true,
                token: action.payload.token,
                user: action.payload.user,
            }
        }

        case EUserAction.USER_LOGOUT: {
            return userReducerInitialState
        }
        default: {
            return state
        }
    }

}