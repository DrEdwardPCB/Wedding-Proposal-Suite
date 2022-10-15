//@ts-nocheck
import { EUserAction } from "../reducers/types";
import { takeLatest, put, call } from 'redux-saga/effects'
import { ILoginUserAction, IRenewUserAction, LoginSuccess, RenewFail, LoginFail } from '../actions/userActions';
import { login } from "../../apis/auth";

function* loginSaga(action: ILoginUserAction) {
    try {
        const response = yield call(login, action.payload)
        yield put(LoginSuccess(response.data.data.user, response.data.data.token))
    } catch (err) {
        yield put(LoginFail(err))
    }
}
function* renewSaga(action: IRenewUserAction) {
    try {
        yield put
    } catch (err) {
        yield put
    }
}
export default function* userWatcher() {
    yield takeLatest(EUserAction.USER_LOGIN, loginSaga)
    yield takeLatest(EUserAction.USER_LOGIN, renewSaga)

}