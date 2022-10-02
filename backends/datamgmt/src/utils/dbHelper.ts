import { AppDataSource } from '../config/ormconfig';
export const reconnectDb = async (): Promise<void> => {
    if (AppDataSource.isInitialized) {
        return
    } else {
        await AppDataSource.initialize()
        return
    }
}