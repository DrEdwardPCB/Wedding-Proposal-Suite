import { DataSource, DataSourceOptions } from "typeorm"
import { DestinationPartial } from "../database/entities/DestinationPartial"
import { Location } from "../database/entities/Location"
import { Passcode } from "../database/entities/Passcode"
import { PasswordPartial } from "../database/entities/PasswordPartial"
import { Photo } from "../database/entities/Photo"
import { User } from "../database/entities/User"
import { env } from './env';
import "reflect-metadata"

const baseOrmConfig: DataSourceOptions = {
    host: env.DB_HOST,
    port: env.DB_PORT,
    type: env.DB_TYPE as "postgres" | "mariadb" | "mysql",
    schema: env.DB_SCHEMA,
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_DB,
    synchronize: true,
    logging: true,
    entities: [
        User, Location, Passcode, PasswordPartial, Photo, DestinationPartial
    ]
}
export const AppDataSource = new DataSource(baseOrmConfig)