import { Request, Response } from "express";
import { UserController } from "../controllers/userController";

export class Routes {
  userContoller: UserController = new UserController();

  routes(app): void {
    app.route("/").get((req: Request, res: Response) => {
      res.status(200).send({ message: "GET request successfulll!!!!" });
    });

    app
      .route("/user")
      .get(this.userContoller.getUser)
      .post(this.userContoller.addNewUser);

    app.route("/validate-user").post(this.userContoller.validateUser);

    app
      .route("/user/:uid")
      .get(this.userContoller.getUserByID)
      .put(this.userContoller.updateUser)
      .delete(this.userContoller.deleteUser);
  }
}
