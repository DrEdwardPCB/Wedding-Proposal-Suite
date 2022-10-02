import { isNil, omit } from 'lodash';
import { Repository } from 'typeorm';
import { User } from '../../database/entities/User';
import { baseService } from '../../utils/serviceHelper';
import { ILoginDto, ILoginReturnDto } from './dtos/loginDto';
import { ValidationError } from '../../utils/ErrorHandler';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { env } from '../../config/env';
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
            const token = await jwt.sign(omit(user, ['password', 'location']), Buffer.from(env.JWT_SECRET))
            const returnObj: ILoginReturnDto = {
                user: omit(user, ['password', 'location']),
                token: token
            }
            return returnObj
        } else {
            this.throwNotInitError()
        }
    }
}