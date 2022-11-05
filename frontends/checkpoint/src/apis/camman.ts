import axios, { AxiosResponse } from "axios";
import { env } from "../env";
import Joi from 'joi'
import { Photo } from "../components/common/entityInterface";
import { baseResponse } from "../components/common/commonInterface";
const cammanHttp = axios.create({ baseURL: `${env.REACT_APP_DATAMGMT_BASEURL}/camman` })
//photo
export const getCmPhotos = async (token: string): Promise<AxiosResponse<baseResponse<Photo[]>, any>> => {
    return cammanHttp.get(`/`, { headers: { "Authorization": `Bearer ${token}` } })
}
export const getCmPhoto = async (id: string, token: string): Promise<AxiosResponse<baseResponse<Photo>, any>> => {
    return cammanHttp.get(`/${id}`, { headers: { "Authorization": `Bearer ${token}` } })
}
export const createCmPhoto = async (payload: FormData, token: string): Promise<AxiosResponse<baseResponse<Photo>, any>> => {
    return cammanHttp.post(`/`, payload, { headers: { "Authorization": `Bearer ${token}`, 'Content-Type': `multipart/form-data` } })
}
