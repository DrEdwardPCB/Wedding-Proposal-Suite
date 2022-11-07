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
        return await AppApi.appHttp.get('/locations')
    }
    public async resetLocations() {
        return await AppApi.appHttp.get('/reset')
    }
    public async scanQRCode(id: string) {
        return await AppApi.appHttp.post(`/scan/${id}`)
    }
    public async enterPasscode(passcode: string) {
        return await AppApi.appHttp.post('/passcode', { passcode })
    }
}
