import { cleanEnv, host, port, str } from "envalid";

export const env = cleanEnv(process.env, {
    REACT_APP_DATAMGMT_BASEURL: str()
})