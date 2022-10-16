import { config } from "dotenv";
import { cleanEnv, host, port, str } from "envalid";

config()
export const env = cleanEnv(process.env, {
    NODE_ENV: str({ choices: ['development', 'test', 'production', 'staging'] }),
    PORT: port(),
    JWT_SECRET: str(),
    DB_TYPE: str({ choices: ['postgres', 'mysql', 'mariadb'] }),
    DB_PORT: port(),
    DB_SCHEMA: str(),
    DB_HOST: host(),
    DB_DB: str(),
    DB_USER: str(),
    DB_PASSWORD: str(),
    ADMIN_PASSWORD: str(),
    SERVER_FULL_ADDRESS: str()
})