import env from '../../env.json'
export interface Ienv {

    "NODE_ENV": "development" | 'production',
    "BASE_API_URL": string,
    "USER": string,
    "JWT_SECRET": string

}
export const getEnv = (): Ienv => {
    return env as Ienv
}