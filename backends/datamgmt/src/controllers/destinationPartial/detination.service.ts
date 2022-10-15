import { omit, isNil, isNull } from 'lodash';
import { Location } from "./../../database/entities/Location";
import { DataSource, DeleteResult, Repository } from "typeorm";
import { AppDataSource } from "../../config/ormconfig";
import { DestinationPartial } from '../../database/entities/DestinationPartial';
import { ICreateDestinationPartialDto } from './destinationPartialDtos/createDestinationPartialDto';
import { IUpdateDestinationPartialDto } from "./destinationPartialDtos/updaateDestinationPartialDto";
import { reconnectDb } from '../../utils/dbHelper';
import { NotFoundError } from '../../utils/ErrorHandler';
import { baseService } from '../../utils/serviceHelper';

export default class DestinationPartialService extends baseService {
    protected ds: DataSource
    private DestinationPartialRepo: Repository<DestinationPartial>
    private LocationRepo: Repository<Location>
    public initialized: boolean = false
    protected name: string = "DestinationPartialService"
    initialize = async () => {
        await reconnectDb()
        this.ds = AppDataSource
        this.initialized = true
        this.DestinationPartialRepo = this.ds.getRepository(DestinationPartial)
        this.LocationRepo = this.ds.getRepository(Location)
    }

    findAll = async (): Promise<Partial<DestinationPartial[]>> => {
        if (!this.initialized) {
            throw new Error("destinationPartialService not init")
        }
        const destinationPartials = await this.DestinationPartialRepo.find({
            relations: { location: true }
        })
        return destinationPartials
    }
    findOne = async (id: string): Promise<Partial<DestinationPartial | null>> => {
        if (!this.initialized) {
            throw new Error("destinationPartialService not init")
        }
        const destinationPartial = await this.DestinationPartialRepo.findOne({ where: { id }, relations: { location: true } })
        return destinationPartial
    }

    create = async (createPasscodePartialDto: ICreateDestinationPartialDto): Promise<DestinationPartial> => {
        if (!this.initialized) {
            throw new Error("destinationPartialService not init")
        }
        let destinationPartial = new DestinationPartial()
        destinationPartial.message = createPasscodePartialDto.message
        const savedDestinationPartial = await this.DestinationPartialRepo.save(destinationPartial)
        return savedDestinationPartial

    }

    update = async (id: string, updateDestinationPartialDto: IUpdateDestinationPartialDto): Promise<DestinationPartial> => {
        if (!this.initialized) {
            throw new Error("destinationPartialService not init")
        }
        let oriDestinationPartial = await this.findOne(id)
        if (isNull(oriDestinationPartial)) {
            throw new NotFoundError(`requested passcodePartial with ${id} not found`)
        }
        oriDestinationPartial.message = updateDestinationPartialDto.message
        const savedDestinationPartial = await this.DestinationPartialRepo.save(oriDestinationPartial)
        return savedDestinationPartial


    }

    delete = async (id: string): Promise<DeleteResult> => {
        if (!this.initialized) {
            throw new Error("destinationPartialService not init")
        }
        const result = await this.DestinationPartialRepo.delete(id)
        return result
    }
    assoLoc = async (id: string, locid: string): Promise<DestinationPartial> => {
        if (!this.initialized) {
            throw new Error("destinationPartialService not init")
        }
        let oriDestinationPartial = await this.findOne(id)
        let assoLoc = await this.LocationRepo.findOne({ where: { id: locid } })
        if (isNull(oriDestinationPartial) || isNull(assoLoc)) {
            throw new NotFoundError("one or more id is not found in an association cross")
        }
        oriDestinationPartial.location = assoLoc
        let result = await this.DestinationPartialRepo.save(oriDestinationPartial)
        return result
    }
    dissoLoc = async (id: string): Promise<DestinationPartial> => {
        if (!this.initialized) {
            throw new Error("destinationPartialService not init")
        }
        let oriDestinationPartial = await this.findOne(id)
        if (isNull(oriDestinationPartial)) {
            throw new NotFoundError("one or more id is not found in an association cross")
        }
        oriDestinationPartial.location = undefined
        let result = await this.DestinationPartialRepo.save(oriDestinationPartial)
        return result
    }
}