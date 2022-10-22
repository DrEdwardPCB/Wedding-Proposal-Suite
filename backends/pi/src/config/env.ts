import { config } from "dotenv";
import { cleanEnv, host, port, str } from "envalid";

config()
export const env = cleanEnv(process.env, {
    NODE_ENV: str({ choices: ['development', 'test', 'production', 'staging'] }),
    PORT: port(),
    SERVER_FULL_ADDRESS: str()
})