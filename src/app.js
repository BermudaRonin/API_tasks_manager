import Server from './server/services/server.service.js';
import Logger from './server/services/logger.service.js';
import Body from './server/services/body.service.js';
import apiRoutes from './api/api.routes.js';
import Database from './api/v1/services/database.service.js';

const app = Server.init();

await Database.connect();

app.use(Logger.dev);
app.use(Body.json);

app.get("/", (req, res) => res.send("Server ON !"));

app.use("/api", apiRoutes);

Server.connect(app);