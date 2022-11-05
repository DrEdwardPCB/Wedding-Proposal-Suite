import axios, { AxiosInstance } from "axios";
import { getEnv } from "../../config/env";
import { isNil } from 'lodash';
import { generateJWT } from "./generateJWT";
export class AppApi {
    private static instance: AppApi
    private static appHttp: AxiosInstance
    constructor(token: string) {
        AppApi.appHttp = axios.create({
            baseURL: `${getEnv().BASE_API_URL}/app`,
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
        })
        console.log(`${getEnv().BASE_API_URL}/app`)
        console.log(`Bearer ${token}`)
    }
    public static async getInstance() {

        if (isNil(AppApi.instance) || isNil(AppApi.appHttp)) {
            console.log('initializing')
            const token = await generateJWT()
            AppApi.instance = new AppApi(token)
        }
        return AppApi.instance
    }
    public async getLocations() {
        console.log("calling API")
        console.log(JSON.stringify(AppApi.appHttp))
        console.log("callAPI end")
        return await AppApi.appHttp.get('/locations')
    }
}
