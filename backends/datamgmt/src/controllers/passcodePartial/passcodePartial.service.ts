import { omit, isNil, isNull } from 'lodash';
import { Location } from "./../../database/entities/Location";
import { DataSource, DeleteResult, Repository } from "typeorm";
import { AppDataSource } from "../../config/ormconfig";
import { PasswordPartial } from '../../database/entities/PasswordPartial';
import { ICreatePasscodePartialDto } from './passcodePartialDtos/createPasscodePartialDto';
import { IUpdatePasscodePartialDto } from "./passcodePartialDtos/updatePasscodePartialDto";
import { reconnectDb } from '../../utils/dbHelper';
import { NotFoundError } from '../../utils/ErrorHandler';

export default class PasscodePartialService {
    private ds: DataSource
    private PasswordPartialRepo: Repository<PasswordPartial>
    private LocationRepo: Repository<Location>
    private initialized: boolean = false
    constructor() {

    }
    initialize = async () => {
        await reconnectDb()
        this.ds = AppDataSource
        this.initialized = true
        this.PasswordPartialRepo = this.ds.getRepository(PasswordPartial)
        this.LocationRepo = this.ds.getRepository(Location)
    }

    findAll = async (): Promise<Partial<PasswordPartial[]>> => {
        if (!this.initialized) {
            throw new Error("passcodePartialService not init")
        }
        const passwordPartials = await this.PasswordPartialRepo.find({
            relations: { location: true }
        })
        return passwordPartials
    }
    findOne = async (id: string): Promise<Partial<PasswordPartial | null>> => {
        if (!this.initialized) {
            throw new Error("passcodePartialService not init")
        }
        const passwordPartial = await this.PasswordPartialRepo.findOne({ where: { id }, relations: { location: true } })
        return passwordPartial
    }

    create = async (createPasscodePartialDto: ICreatePasscodePartialDto): Promise<PasswordPartial> => {
        if (!this.initialized) {
            throw new Error("passcodePartialService not init")
        }
        let passwordPartial = new PasswordPartial()
        passwordPartial.message = createPasscodePartialDto.message
        const savedPasswordPartial = await this.PasswordPartialRepo.save(passwordPartial)
        return savedPasswordPartial

    }

    update = async (id: string, updatePasscodePartialDto: IUpdatePasscodePartialDto): Promise<PasswordPartial> => {
        if (!this.initialized) {
            throw new Error("passcodePartialService not init")
        }
        let oriPasswordPartial = await this.findOne(id)
        if (isNull(oriPasswordPartial)) {
            throw new NotFoundError(`requested passcodePartial with ${id} not found`)
        }
        oriPasswordPartial.message = updatePasscodePartialDto.message
        const savedPasswordPartial = await this.PasswordPartialRepo.save(oriPasswordPartial)
        return savedPasswordPartial


    }

    delete = async (id: string): Promise<DeleteResult> => {
        if (!this.initialized) {
            throw new Error("passcodePartialService not init")
        }
        const result = await this.PasswordPartialRepo.delete(id)
        return result
    }
    assoLoc = async (id: string, locid: string): Promise<PasswordPartial> => {
        if (!this.initialized) {
            throw new Error("passcodePartialService not init")
        }
        let oriPasswordPartial = await this.findOne(id)
        let assoLoc = await this.LocationRepo.findOne({ where: { id: locid } })
        if (isNull(oriPasswordPartial) || isNull(assoLoc)) {
            throw new NotFoundError("one or more id is not found in an association cross")
        }
        oriPasswordPartial.location = assoLoc
        let result = await this.PasswordPartialRepo.save(oriPasswordPartial)
        return result
    }
    dissoLoc = async (id: string): Promise<PasswordPartial> => {
        if (!this.initialized) {
            throw new Error("passcodePartialService not init")
        }
        let oriPasswordPartial = await this.findOne(id)
        if (isNull(oriPasswordPartial)) {
            throw new NotFoundError("one or more id is not found in an association cross")
        }
        oriPasswordPartial.location = undefined
        let result = await this.PasswordPartialRepo.save(oriPasswordPartial)
        return result
    }
}