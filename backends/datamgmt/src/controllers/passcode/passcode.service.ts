import { IUpdatePasscodeDto } from "./dtos/updatePasscodeDto";
import { DataSource, Repository } from "typeorm";
import { AppDataSource } from "../../config/ormconfig";

import { reconnectDb } from "../../utils/dbHelper";
import { Passcode } from '../../database/entities/Passcode';
import { ICreatePasscodeDto } from './dtos/createPasscodeDto';
import { baseService } from '../../utils/serviceHelper';

export default class PasscodeService extends baseService {
    protected ds: DataSource
    private PasscodeRepo: Repository<Passcode>
    public initialized: boolean = false
    protected name: string = "PasscodeService"

    initialize = async () => {
        await reconnectDb()
        this.ds = AppDataSource
        this.initialized = true
        this.PasscodeRepo = this.ds.getRepository(Passcode)
    }
    findOne = async (): Promise<Passcode | null> => {
        if (!this.initialized) {
            throw new Error("passcode service not init")
        }
        const passcodes = await this.PasscodeRepo.find()
        return passcodes.length > 0 ? passcodes[0] : null
    }

    create = async (createPasscodeDto: ICreatePasscodeDto): Promise<Passcode> => {
        if (!this.initialized) {
            throw new Error("passcode service not init")
        }
        let passcode = new Passcode()
        passcode.passcode = createPasscodeDto.passcode
        const savedPasscode = await this.PasscodeRepo.save(passcode)
        return savedPasscode

    }

    update = async (updatePasscode: IUpdatePasscodeDto): Promise<Passcode> => {
        if (!this.initialized) {
            throw new Error("passcode service not init")
        }
        await this.delete()
        const updatedPasscode = this.create(updatePasscode as ICreatePasscodeDto)
        return updatedPasscode

    }

    delete = async (): Promise<void> => {
        if (!this.initialized) {
            throw new Error("passcode service not init")
        }
        await this.PasscodeRepo.clear()
        return
    }
}