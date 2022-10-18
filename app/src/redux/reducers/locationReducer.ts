import { ELocationAction } from './types'
import { Location } from "../../utils/entityInterface"
const locationReducerInitialState: IlocationReducerInitialState = {
    locations: []
}

interface IlocationReducerInitialState {
    locations: Location[]
}
export interface IBaseLocationAction {
    type: ELocationAction,
    payload?: any
}
export const locationReducer = (state: IlocationReducerInitialState = locationReducerInitialState, action: IBaseLocationAction): IlocationReducerInitialState => {
    switch (action.type) {
        case ELocationAction.LOCATION_ADD: {
            return {
                locations: [...state.locations, action.payload.location]
            }
        }
        case ELocationAction.RESET: {
            return locationReducerInitialState
        }
        default:
            return state
    }
}