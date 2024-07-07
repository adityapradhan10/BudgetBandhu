import createApp from "@/app";
import * as dotenv from "dotenv";
import { Application } from "express";
import { Server } from "http";
import Logger from "./common/Logger";
dotenv.config();

const app: Application = createApp();
const PORT: string = process.env.PORT as string;

const server: Server = app.listen(PORT, () =>
  Logger.instance.log(`Server is running at ${PORT} 🚀🚀🚀`)
);
