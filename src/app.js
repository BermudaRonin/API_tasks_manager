import express from 'express';
import Server from './server/server.service.js';
import ServerMiddleware from './server/server.mw.js';
import Database from './database/database.service.js';
import apiRoutes from './api/api.routes.js';

const app = express();

await Database.connect();

app.use(ServerMiddleware.logs);
app.use(ServerMiddleware.json);

app.get("/", (req, res) => res.send("Server ON !"));

app.use("/api", apiRoutes);

Server.connect(app);
