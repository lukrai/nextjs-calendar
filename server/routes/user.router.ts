import { Router } from "express";
import { UserController } from "../controllers/user.controller";

class UserRouter {
    public router: Router;
    private userController: UserController = new UserController();

    constructor() {
        this.router = Router();
        this.init();
    }

    public init() {
        this.router.get("/", this.userController.getUsers)
        this.router.get("/:id", this.userController.getUser)
    }
}

const userRouter = new UserRouter();
export default userRouter.router;