import { EUserAction } from "../reducers/types";
import { takeLatest, put } from 'redux-saga/effects'
import { ILoginUserAction, IRenewUserAction, RenewFail } from '../actions/userActions';
function* loginSaga(action: ILoginUserAction) {
    try {
        yield put
    } catch (err) {
        yield put
    }
}
function* renewSaga(action: IRenewUserAction) {
    try {
        yield put
    } catch (err) {
        yield put
    }
}
export function* userWatcher() {
    yield takeLatest(EUserAction.USER_LOGIN, loginSaga)
    yield takeLatest(EUserAction.USER_LOGIN, renewSaga)

}