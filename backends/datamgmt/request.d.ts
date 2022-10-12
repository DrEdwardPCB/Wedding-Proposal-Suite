import express from 'express';
import { Request } from 'express';
import { User } from './src/database/entities/User';
declare global {
    namespace Express {
        export interface Request {
            jwt?: Partial<User>
        }
    }
}
export { }