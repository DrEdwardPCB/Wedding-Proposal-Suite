import { EUserAction } from './types';

export interface IUser {
    id: string
    loginName: string
    isCameraMan: boolean
    isAdmin: boolean
    isApp: boolean

}
export interface IUserReducerState {
    isLoggedin: boolean
    user?: IUser
    token?: string
    isLoading: boolean
    isError: boolean
    isSuccess: boolean
    error?: unknown
}
export const userReducerInitialState: IUserReducerState = {
    isLoggedin: false,
    isLoading: false,
    isError: false,
    isSuccess: false,
}
export interface IBaseUserAction {
    type: EUserAction,
    payload?: any
}
export const userReducer = (state: IUserReducerState = userReducerInitialState, action: IBaseUserAction): IUserReducerState => {
    switch (action.type) {
        case EUserAction.USER_LOGIN: {
            return {
                ...state,
                isLoading: true,
                isSuccess: false,
                isError: false,
            }
        }
        case EUserAction.USER_LOGIN_SUCCESS: {
            return {
                ...state,
                isLoggedin: true,
                isLoading: false,
                isSuccess: true,
                isError: false,
                token: action.payload.token,
                user: action.payload.user,
            }
        }
        case EUserAction.USER_LOGIN_FAIL: {
            return {
                ...state,
                isLoggedin: false,
                isLoading: false,
                isSuccess: false,
                isError: true,
                error: action.payload,
                token: undefined,
                user: undefined
            }
        }
        case EUserAction.USER_RENEW: {
            return {
                ...state,
                isLoading: true,
                isSuccess: false,
                isError: false,
            }
        }
        case EUserAction.USER_RENEW_SUCCESS: {
            return {
                ...state,
                isLoggedin: true,
                isLoading: false,
                isSuccess: true,
                isError: false,
                token: action.payload.token,
            }
        }
        case EUserAction.USER_RENEW_FAIL: {
            return {
                ...state,
                isLoggedin: false,
                isLoading: false,
                isSuccess: false,
                isError: true,
                error: action.payload,
                token: undefined,
                user: undefined
            }
        }
        case EUserAction.USER_LOGOUT: {
            return userReducerInitialState
        }
        case EUserAction.CLEAR_ERROR: {
            return {
                ...state,
                isError: false
            }
        }
        default: {
            return state
        }
    }

}