import axios from "axios";
import { getEnv } from "../../config/env";
import { Buffer } from '@craftzdog/react-native-buffer'
import { sign } from 'react-native-pure-jwt'

export const generateJWT = async () => {
    const token = await sign(
        {
            loginName: getEnv().USER,
            isApp: true,
            exp: Math.floor(Date.now() + (60 * 60 * 72 * 1000))
        },
        //@ts-ignore
        Buffer.from(getEnv().JWT_SECRET).toString('base64'),
        {
            alg: "HS256"
        }
    )
    return token
}