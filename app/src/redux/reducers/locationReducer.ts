import { ELocationAction } from './types'
import { Location } from "../../utils/entityInterface"
import { isNil } from 'lodash'
const locationReducerInitialState: IlocationReducerInitialState = {
    locations: [],
    show: {}
}

interface IlocationReducerInitialState {
    locations: Location[]
    show: { [id: string]: boolean }
}
export interface IBaseLocationAction {
    type: ELocationAction,
    payload?: any
}
export const locationReducer = (state: IlocationReducerInitialState = locationReducerInitialState, action: IBaseLocationAction): IlocationReducerInitialState => {
    switch (action.type) {
        case ELocationAction.LOCATION_RELOAD: {
            let showObj: { [id: string]: boolean } = state.show ?? {};
            (action.payload.locations as Location[]).forEach(element => {
                if (isNil(showObj[element.id])) {

                    showObj[element.id] = false
                }
            });
            return { locations: action.payload.locations, show: showObj }
        }
        case ELocationAction.LOCATION_ADD: {
            const id = action.payload as string
            let showObj = state.show
            showObj[id] = true
            return {
                ...state, show: showObj
            }
        }
        case ELocationAction.RESET: {
            return locationReducerInitialState
        }
        default:
            return state
    }
}