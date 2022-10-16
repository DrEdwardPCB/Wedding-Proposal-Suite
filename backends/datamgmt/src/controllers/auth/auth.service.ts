import { isNil, omit } from 'lodash';
import { reconnectDb } from "./../../utils/dbHelper";
import { Repository } from 'typeorm';
import { User } from '../../database/entities/User';
import { baseService } from '../../utils/serviceHelper';
import { ILoginDto, ILoginReturnDto } from './dtos/loginDto';
import { ValidationError } from '../../utils/ErrorHandler';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { env } from '../../config/env';
import { IRenewReturnDto } from './dtos/renewDto';
import { Request } from 'express';
export default class AuthService extends baseService {
    private userRepo: Repository<User>
    protected name = "AuthService"
    protected async initialize(): Promise<void> {
        this.userRepo = this.ds.getRepository(User)
    }

    public login = async (data: ILoginDto): Promise<ILoginReturnDto | void> => {
        if (this.initialized) {
            const user = await this.userRepo.findOne({
                where: {
                    loginName: data.loginName
                }
            })
            if (isNil(user)) {
                throw new ValidationError("user not found")
            }
            let samepassword = await bcrypt.compare(data.password, user.password)
            if (!samepassword) {
                throw new ValidationError("password incorrect")
            }

            const token = await jwt.sign({
                ...omit(user, ['password', 'location']), exp: Math.floor(Date.now() / 1000) + (60 * 60 * 72)
            }, Buffer.from(env.JWT_SECRET))
            const returnObj: ILoginReturnDto = {
                user: omit(user, ['password', 'location']),
                token: token
            }
            return returnObj
        } else {
            this.throwNotInitError()
        }
    }
    public renew = async (req: Request): Promise<IRenewReturnDto | void> => {
        if (this.initialized) {
            const jwtuser = req.jwt
            const user = await this.userRepo.findOne({
                where: {
                    loginName: jwtuser?.loginName
                }
            })
            if (isNil(user)) {
                throw new ValidationError("user not found")
            }
            const token = await jwt.sign({
                ...omit(user, ['password', 'location']), exp: Math.floor(Date.now() / 1000) + (60 * 60 * 72)
            }, Buffer.from(env.JWT_SECRET))
            const returnObj: IRenewReturnDto = {
                token: token
            }
            return returnObj
        } else {
            this.throwNotInitError()
        }

    }
}