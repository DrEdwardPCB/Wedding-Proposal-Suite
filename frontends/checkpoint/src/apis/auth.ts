import axios from "axios";
import { ILoginDto } from "../components/common/loginPageForm";
import { env } from "../env";
const authhttp = axios.create({ baseURL: `${env.REACT_APP_DATAMGMT_BASEURL}/auth` })
export const login = async (payload: ILoginDto) => {
    return authhttp.post("/login", payload)
}