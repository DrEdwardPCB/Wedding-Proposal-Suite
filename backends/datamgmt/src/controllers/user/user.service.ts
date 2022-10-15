import { omit, isNil, isNull } from 'lodash';
import { DataSource, DeleteResult, Repository } from "typeorm";
import { AppDataSource } from "../../config/ormconfig";
import { User } from "../../database/entities/User";
import { reconnectDb } from "../../utils/dbHelper";
import { ICreateUserDto } from './userDtos/createUserDto';
import bcrypt from 'bcrypt';
import { IUpdateUserDto } from "./userDtos/updateUserDto";
import { baseService } from '../../utils/serviceHelper';

export default class UserService extends baseService {
    protected ds: DataSource
    private UserRepo: Repository<User>
    public initialized: boolean = false
    protected name: string = "UserService"

    initialize = async () => {
        await reconnectDb()
        this.ds = AppDataSource
        this.initialized = true
        this.UserRepo = this.ds.getRepository(User)
    }

    findAll = async (): Promise<Partial<User[]>> => {
        if (!this.initialized) {
            throw new Error("user service not init")
        }
        const users = await this.UserRepo.find()
        const nerfedUsers = users.map(e => omit(e, 'password'))
        return users
    }
    findOne = async (id: string, omitPassword: boolean = true): Promise<Partial<User | null>> => {
        if (!this.initialized) {
            throw new Error("user service not init")
        }
        const user = await this.UserRepo.findOne({ where: { id }, relations: { location: { destinationPartial: true, passwordPartial: true } } })
        const nerfedUser = user ? omit(user, 'password') : null
        return omitPassword ? nerfedUser : user
    }

    create = async (createUserDto: ICreateUserDto): Promise<Partial<User>> => {
        if (!this.initialized) {
            throw new Error("user service not init")
        }
        let user = new User()
        user.loginName = createUserDto.loginName
        user.isAdmin = createUserDto.isAdmin
        user.isCameraMan = createUserDto.isCameraMan
        user.isApp = createUserDto.isApp
        user.password = await bcrypt.hash(createUserDto.password, 10)
        const savedUser = await this.UserRepo.save(user)
        return savedUser

    }

    update = async (id: string, updateUserDto: IUpdateUserDto): Promise<Partial<User>> => {
        if (!this.initialized) {
            throw new Error("user service not init")
        }
        const user = await this.findOne(id) as User
        if (isNil(user)) {
            throw new Error("user not found")
        }
        let updateUser: User = {
            ...user,
        }
        if (!isNull(updateUserDto.loginName)) {
            updateUser.loginName = updateUserDto.loginName
        }
        if (!isNull(updateUserDto.password)) {
            updateUser.password = await bcrypt.hash(updateUserDto.password, 10)
        }
        updateUser.isAdmin = updateUserDto.isAdmin
        updateUser.isCameraMan = updateUserDto.isCameraMan
        updateUser.isApp = updateUserDto.isApp
        const updatedUser = await this.UserRepo.save(updateUser)
        const nerfedUser = omit(updatedUser, 'password')
        return nerfedUser
    }

    delete = async (id: string): Promise<DeleteResult> => {
        if (!this.initialized) {
            throw new Error("user service not init")
        }
        const result = await this.UserRepo.delete(id)
        return result
    }
}