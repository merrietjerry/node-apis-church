import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import * as cors from "cors";

import { Routes } from "./routes/userRoutes";
//import { DB_URL } from "./config/db";
import {DB_URL} from "./config/db";

class App {
  app: express.Application;
  routePrv: Routes = new Routes();

  constructor() {
    this.app = express();
    this.config();
    this.routePrv.routes(this.app);
    this.mongoSetup();
  }

  private config(): void {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  private mongoSetup(): void {

    mongoose.Promise = global.Promise;
    mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true}, (err, db) =>{
        if(err){
            return console.log(err)
        }
    });
  }
}

export default new App().app;
