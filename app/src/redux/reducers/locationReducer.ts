import { ELocationAction } from './types'
import { Location } from "../../utils/entityInterface"
import { cloneDeep, isNil } from 'lodash'
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
            const locations = action.payload.locations as Location[]
            //arrange locations as next
            const sortedLocations: Location[] = [];
            const initial = locations.find((e) => !isNil(e.next) && isNil(e.prev));
            if (initial) {
                sortedLocations.push(initial);
                let currLoc = locations.find(
                    (e) => e.id == (initial.next as NonNullable<Location>).id
                );
                while (true) {
                    if (currLoc) {
                        sortedLocations.push(cloneDeep(currLoc));
                        if (currLoc.next) {
                            let nextLoc = locations.find(
                                (e) =>
                                    e.id ===
                                    (
                                        (currLoc as NonNullable<Location>)
                                            .next as NonNullable<Location>
                                    ).id
                            );

                            currLoc = nextLoc;
                        } else {
                            break;
                        }
                    } else {
                        break;
                    }
                }
            }
            console.log(sortedLocations);
            return { locations: sortedLocations.reverse(), show: showObj }
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