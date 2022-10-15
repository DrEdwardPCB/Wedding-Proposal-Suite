import { Router } from "express";
import AdminDestinationPartialRouter from "./admin.destinationPartial.controller";
import AdminPasscodePartialRouter from "./admin.passcodePartial.controller";
import { jwtMiddlewareAdmin } from '../../middlewares/jwtMiddleware';
import AdminUserRouter from "./admin.user.controller";
import AdminPasscodeRouter from './admin.passcode.controller';
import AdminLocationRouter from "./admin.location.controller";
import AdminPhotoContoller from "./admin.photo.contoller";

const AdminRouter = Router()

AdminRouter.use(jwtMiddlewareAdmin)
AdminRouter.use("/user", AdminUserRouter)
AdminRouter.use("/location", AdminLocationRouter)
AdminRouter.use("/secret", AdminPasscodePartialRouter)
AdminRouter.use("/passcode", AdminPasscodeRouter)
AdminRouter.use("/destination", AdminDestinationPartialRouter)
AdminRouter.use("/photo", AdminPhotoContoller)
export default AdminRouter