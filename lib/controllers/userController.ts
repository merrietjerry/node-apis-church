import * as mongoose from "mongoose";
import { UserSchema } from "../models/userModel";
import { Request, Response, response } from "express";

import { encrypt, validate } from "../middleware/crypto";

const User = mongoose.model("users", UserSchema);

export class UserController {
  addNewUser(req: Request, res: Response) {
    User.find({ phone: req.body.data.phone }, (err, login) => {
      if (err) {
        res.send(err);
        console.log("A")
      } else {
        console.log("B")
        if (login.length) { console.log("C")
          res.send({
            status: "error",
            message: "Username already exists!"
          });
        } else { console.log("D")
          req.body.data.key = encrypt(req.body.data.key);
          let newUser = new User(req.body.data);
          newUser.save((err, user) => {
            if (err) {
              res.send(err);
            }
            res.json({status:"success", message: "User Created", user});
          });
        }
      }
    });
  }

  getUser(req: Request, res: Response) {
    User.find({}, (err, user) => {
      if (err) {
        res.send(err);
      }
      res.json(user);
    });
  }

  getUserByID(req: Request, res: Response) {
    User.find({phone: req.params.uid}, (err, user) => {
      if (err) {
        res.send(err);
      }
      if(user.length){
        res.send(user[0]);
      }else{
        res.send({ status: "error", message: "Invalid User" });
      }
    });
  }

  updateUser(req: Request, res: Response) {
    User.findOneAndUpdate(
      { _id: req.params.uid },
      req.body,
      { new: true },
      (err, user) => {
        if (err) {
          res.send(err);
        }
        res.json(user);
      }
    );
  }

  deleteUser(req: Request, res: Response) {
    User.remove({ _id: req.params.uid }, (err, user) => {
      if (err) {
        res.send(err);
      }
      res.json({ message: "Successfully deleted User!" });
    });
  }

  validateUser(req: Request, res: Response) {
    let { name , key } = req.body;
    User.find({ phone: name }, (err, user) => {
      if (err) {
        res.send(err);
      }
      if (user.length) {
        if (validate(key, user[0].key)) {
          res.send(user[0]);
        } else {
          res.send({ status: "error", message: "Invalid Login" });
        }
      } else {
        res.send({ status: "error", message: "Invalid Login" });
      }
    });
  }
}
