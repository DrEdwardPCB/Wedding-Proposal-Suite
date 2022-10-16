
import { env } from './config/env'
import { bootstrap } from './app'
import { AppDataSource } from './config/ormconfig'
import logger from './config/logger'
import UserService from './controllers/user/user.service'
import { find, isNil } from 'lodash';

async function startServer() {
    logger.info("Server starting")
    const app = bootstrap()
    const server = app.listen(env.PORT, async function () {
        logger.info(`server started at port ${env.PORT}`)
        try {
            logger.info(`initialize connection with database`)
            await AppDataSource.initialize()
            //check whether admin user already create if not created create with env password
            const us = new UserService
            await us.initialize()
            const users = await us.findAll()
            const admin = find(users, (user) => { return user?.isAdmin })
            console.log(admin)
            if (isNil(admin)) {
                console.log('trigger add admin')
                await us.create({ loginName: 'admin', password: env.ADMIN_PASSWORD, isAdmin: true, isCameraMan: true, isApp: true })
            }
            logger.info(`successfully initialize database`)
        } catch (err) {
            logger.error(`an error has occured at initilazing database ${err}`)
        }
    })
    const gracefulShutdown = async (callType: any) => {
        logger.info(`${callType} signal received.`);

        // Stops the server from accepting new connections and finishes existing connections.
        server.close(function (err: any) {
            if (err) {
                logger.error("server error", err);
                process.exit(1);
            } else {
                process.exit(0);
            }
        });
    };

    process.on("SIGINT", async () => gracefulShutdown("SIGINT"));
}
startServer()

