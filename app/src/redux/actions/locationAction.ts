import { Location } from "../../utils/entityInterface";
import { ELocationAction } from "../reducers/types";

export const reloadLocation = (locations: Location[]) => {
    return { type: ELocationAction.LOCATION_RELOAD, payload: { locations } }
}
export const addLocation = (id: string) => {
    return { type: ELocationAction.LOCATION_ADD, payload: id }
}
export const resetLocation = () => {
    return { type: ELocationAction.RESET }
}