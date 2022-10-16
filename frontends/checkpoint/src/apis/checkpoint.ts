import axios, { AxiosResponse } from "axios";
import { env } from "../env";
import { User, Location } from "../components/common/entityInterface";
import { baseResponse } from "../components/common/commonInterface";
import { IUpdateLocationDto } from "./admin";
const checkpointHttp = axios.create({ baseURL: `${env.REACT_APP_DATAMGMT_BASEURL}/checkpoint` })

export const getCheckpoint = async (token: string): Promise<AxiosResponse<baseResponse<Omit<User, 'password'>>, any>> => {
    return checkpointHttp.get("/", { headers: { "Authorization": `Bearer ${token}` } })
}


export const updateLocation = async (payload: IUpdateLocationDto, token: string): Promise<AxiosResponse<baseResponse<Location>, any>> => {
    return checkpointHttp.put("/location", payload, { headers: { "Authorization": `Bearer ${token}` } })
}

export const createLocationOne = async (payload: FormData, token: string): Promise<AxiosResponse<baseResponse<Location>, any>> => {
    return checkpointHttp.post("/location/upload1", payload, { headers: { "Authorization": `Bearer ${token}` } })
}
export const deleteLocationOne = async (token: string): Promise<AxiosResponse<baseResponse<Location>, any>> => {
    return checkpointHttp.delete("/location/upload1", { headers: { "Authorization": `Bearer ${token}` } })
}
export const createLocationTwo = async (payload: FormData, token: string): Promise<AxiosResponse<baseResponse<Location>, any>> => {
    return checkpointHttp.post("/location/upload2", payload, { headers: { "Authorization": `Bearer ${token}` } })
}
export const deleteLocationTwo = async (token: string): Promise<AxiosResponse<baseResponse<Location>, any>> => {
    return checkpointHttp.delete("/location/upload2", { headers: { "Authorization": `Bearer ${token}` } })
}
export const createLocationThree = async (payload: FormData, token: string): Promise<AxiosResponse<baseResponse<Location>, any>> => {
    return checkpointHttp.post("/location/upload3", payload, { headers: { "Authorization": `Bearer ${token}` } })
}
export const deleteLocationThree = async (token: string): Promise<AxiosResponse<baseResponse<Location>, any>> => {
    return checkpointHttp.delete("/location/upload3", { headers: { "Authorization": `Bearer ${token}` } })
}