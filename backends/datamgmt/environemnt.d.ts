declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: "development" | "production"
            PORT: string
            JWT_SECRET: string
            DB_TYPE: string
            DB_PORT: string
            DB_HOST: string
            DB_DB: string
            DB_SCHEMA: string
            DB_USER: string
            DB_PASSWORD: string
            ADMIN_PASSWPRD: string
        }
    }
}
export { }