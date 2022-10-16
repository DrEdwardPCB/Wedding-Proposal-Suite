import { ILoginDto } from '../../components/common/loginPageForm';
import { EUserAction } from '../reducers/types';
import { IUser, IBaseUserAction } from '../reducers/userReducer';
export interface ILoginUserAction extends IBaseUserAction {
    payload: ILoginDto
}
export function LoginAction(payload: ILoginDto): ILoginUserAction {
    return { type: EUserAction.USER_LOGIN, payload }
}
export interface ISuccessUserAction extends IBaseUserAction {
    payload: {
        user: IUser,
        token: string
    }
}
export function LoginSuccess(user: IUser, token: string): ISuccessUserAction {
    return { type: EUserAction.USER_LOGIN_SUCCESS, payload: { user, token } }
}

export interface IFailUserAction extends IBaseUserAction {
    payload: {
        error: unknown
    }
}
export function LoginFail(error: unknown): IFailUserAction {
    return { type: EUserAction.USER_LOGIN_FAIL, payload: { error } }
}
export interface IRenewUserAction extends IBaseUserAction {
    payload: {
        token: string
    }
}
export function RenewAction(token: string): IRenewUserAction {
    return { type: EUserAction.USER_RENEW, payload: { token } }
}
export function RenewSuccess(user: IUser, token: string): ISuccessUserAction {
    return { type: EUserAction.USER_RENEW_SUCCESS, payload: { user, token } }
}
export function RenewFail(error: unknown): IFailUserAction {
    return { type: EUserAction.USER_RENEW_FAIL, payload: { error } }
}

export function LogoutAction(): IBaseUserAction {
    return { type: EUserAction.USER_LOGOUT }
}
export function ClearErrorAction(): IBaseUserAction {
    return { type: EUserAction.CLEAR_ERROR }
}