import { omit, isNil, isNull } from 'lodash';
import { NotFoundError } from "./../../utils/ErrorHandler";
import { IUpdateLocationDto } from "./locationDtos/updateLocationDto";
import { ICreateLocationDto } from "./locationDtos/createLocationDto";
import { DataSource, DeleteResult, Repository } from "typeorm";
import { AppDataSource } from "../../config/ormconfig";
import { User } from "../../database/entities/User";
import { reconnectDb } from "../../utils/dbHelper";
import { Location } from '../../database/entities/Location';
import { Point } from 'geojson';
import dayjs from "dayjs";
import { baseService } from '../../utils/serviceHelper';


export default class LocationService extends baseService {
    protected ds: DataSource
    private LocationRepo: Repository<Location>
    private UserRepo: Repository<User>
    public initialized: boolean = false
    protected name: string = "LocationService"
    initialize = async () => {
        await reconnectDb()
        this.ds = AppDataSource
        this.initialized = true
        this.LocationRepo = this.ds.getRepository(Location)
        this.UserRepo = this.ds.getRepository(User)
    }

    findAll = async (): Promise<Partial<Location[]>> => {
        if (!this.initialized) {
            throw new Error("user service not init")
        }
        const locations = await this.LocationRepo.find({ relations: { user: true, next: true, prev: true, destinationPartial: true, passwordPartial: true } })
        return locations
    }
    findOne = async (id: string): Promise<Location | null> => {
        if (!this.initialized) {
            throw new Error("user service not init")
        }
        const location = await this.LocationRepo.findOne({ where: { id }, relations: { user: true, passwordPartial: true, destinationPartial: true, next: true, prev: true } })
        return location
    }

    create = async (createLocationDto: ICreateLocationDto): Promise<Partial<Location>> => {
        if (!this.initialized) {
            throw new Error("user service not init")
        }
        let location = new Location()
        if (!isNil(createLocationDto?.displayName)) {
            location.displayName = createLocationDto.displayName
        }
        if (!isNil(createLocationDto?.message)) {
            location.message = createLocationDto.message
        }
        if (!isNil(createLocationDto?.location)) {
            const ptObj: Point = { type: 'Point', coordinates: [createLocationDto.location.long, createLocationDto.location.lat] }
            location.location = ptObj
        }
        if (!isNil(createLocationDto?.locationDescription)) {
            location.locationDescription = createLocationDto.locationDescription
        }
        const savedLocation = await this.LocationRepo.save(location)
        return savedLocation

    }

    update = async (id: string, updateLocationDto: IUpdateLocationDto): Promise<Partial<Location>> => {
        if (!this.initialized) {
            throw new Error("user service not init")
        }
        let oriLocation = await this.findOne(id)
        if (isNull(oriLocation)) {
            throw new NotFoundError(`location with ${id} not found`)
        }
        if (!isNil(updateLocationDto?.displayName)) {
            oriLocation.displayName = updateLocationDto.displayName
        }
        if (!isNil(updateLocationDto?.message)) {
            oriLocation.message = updateLocationDto.message
        }
        if (!isNil(updateLocationDto?.location)) {
            const ptObj: Point = { type: 'Point', coordinates: [updateLocationDto.location.long, updateLocationDto.location.lat] }
            oriLocation.location = ptObj
        }
        if (!isNil(updateLocationDto?.photoone)) {
            oriLocation.photoone = updateLocationDto.photoone
        }
        if (!isNil(updateLocationDto?.phototwo)) {
            oriLocation.phototwo = updateLocationDto.phototwo
        }
        if (!isNil(updateLocationDto?.photothree)) {
            oriLocation.photothree = updateLocationDto.photothree
        }
        if (!isNil(updateLocationDto?.scanTime)) {
            oriLocation.scanTime = dayjs(updateLocationDto.scanTime).toDate()
        }
        if (!isNil(updateLocationDto?.locationDescription)) {
            oriLocation.locationDescription = updateLocationDto.locationDescription
        }
        const result = await this.LocationRepo.save(oriLocation)
        return result
    }

    delete = async (id: string): Promise<DeleteResult> => {
        if (!this.initialized) {
            throw new Error("user service not init")
        }
        const result = await this.LocationRepo.delete(id)
        return result
    }
    assoNextLoc = async (id: string, nextlocId: string): Promise<Location> => {
        if (!this.initialized) {
            throw new Error("user service not init")
        }
        let thisLoc = await this.findOne(id)
        let nextLoc = await this.findOne(nextlocId)
        if (isNull(thisLoc) || isNull(nextLoc)) {
            throw new NotFoundError(`one or more id in the relation are not found`)
        }
        thisLoc.next = nextLoc
        const result = await this.LocationRepo.save(thisLoc)
        return result
    }
    dissoNextLoc = async (id: string): Promise<Location> => {
        if (!this.initialized) {
            throw new Error("user service not init")
        }
        let thisLoc = await this.findOne(id)
        if (isNull(thisLoc)) {
            throw new NotFoundError(`one or more id in the relation are not found`)
        }
        thisLoc.next = null
        const result = await this.LocationRepo.save(thisLoc)
        return result
    }
    assoUser = async (id: string, userId: string): Promise<Location> => {
        if (!this.initialized) {
            throw new Error("user service not init")
        }
        let thisLoc = await this.findOne(id)
        let user = await this.UserRepo.findOne({ where: { id: userId } })
        if (isNull(thisLoc) || isNull(user)) {
            throw new NotFoundError(`one or more id in the relation are not found`)
        }
        thisLoc.user = user
        const result = await this.LocationRepo.save(thisLoc)
        return result

    }
    dissoUser = async (id: string): Promise<Location> => {
        if (!this.initialized) {
            throw new Error("user service not init")
        }
        let thisLoc = await this.findOne(id)
        if (isNull(thisLoc)) {
            throw new NotFoundError(`one or more id in the relation are not found`)
        }
        thisLoc.user = null
        const result = await this.LocationRepo.save(thisLoc)
        return result

    }
}