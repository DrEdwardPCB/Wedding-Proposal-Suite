import { DataSource, DeleteResult, Repository } from "typeorm";
import { AppDataSource } from "../../config/ormconfig";
import { reconnectDb } from '../../utils/dbHelper';
import { Photo } from '../../database/entities/Photo';
import { ICreatePhotoDto } from './photoDtos/createPhotoDto';
import { baseService } from '../../utils/serviceHelper';

export default class PhotoService extends baseService {
    protected ds: DataSource
    private PhotoRepo: Repository<Photo>
    public initialized: boolean = false
    protected name: string = "PhotoService"


    initialize = async () => {
        await reconnectDb()
        this.ds = AppDataSource
        this.initialized = true
        this.PhotoRepo = this.ds.getTreeRepository(Photo)
    }

    findValid = async (): Promise<Photo[]> => {
        if (!this.initialized) {
            throw new Error("photoService not init")
        }
        const photos = await this.PhotoRepo.find()
        return photos
    }
    findAll = async (): Promise<Photo[]> => {
        if (!this.initialized) {
            throw new Error("photoService not init")
        }
        const photos = await this.PhotoRepo.find({ withDeleted: true })
        return photos
    }
    findOne = async (id: string): Promise<Partial<Photo | null>> => {
        if (!this.initialized) {
            throw new Error("photoService not init")
        }
        const photo = await this.PhotoRepo.findOne({ where: { id }, withDeleted: true })
        return photo
    }

    create = async (createPasscodePartialDto: ICreatePhotoDto): Promise<Photo> => {
        if (!this.initialized) {
            throw new Error("photoService not init")
        }
        let photo = new Photo()
        photo.photo = createPasscodePartialDto.photo
        const savedPhoto = await this.PhotoRepo.save(photo)
        return savedPhoto

    }


    delete = async (id: string): Promise<DeleteResult> => {
        if (!this.initialized) {
            throw new Error("photoService not init")
        }
        const result = await this.PhotoRepo.softDelete(id)
        return result
    }

}