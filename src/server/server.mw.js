import express from "express";
import morgan from "morgan";

export default class ServerMiddleware {

    static json = express.json();
    static logs = morgan("dev");

}