import { Router } from "express";
import v1_routes from "./v1/versions.routes.js";

const apiRoutes = Router();

apiRoutes.get("/", (req, res) => res.send("API ON !"));
apiRoutes.use("/v1", v1_routes);

export default apiRoutes;