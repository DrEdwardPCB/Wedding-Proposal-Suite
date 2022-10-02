import { DataSource } from 'typeorm';
import { reconnectDb } from './dbHelper';
import { AppDataSource } from '../config/ormconfig';
export abstract class baseService {
    protected ds: DataSource;
    public initialized: boolean = false
    protected abstract name: string

    public async superInitialize(): Promise<void> {
        await reconnectDb()
        this.ds = AppDataSource
        await this.initialize()
        this.initialized = true
    }
    protected abstract initialize(): Promise<void>
    protected throwNotInitError() {
        throw new Error(`${this.name} is not initialized`)
    }
}