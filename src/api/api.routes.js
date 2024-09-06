import { Router } from "express";
import versionRoutes from "./v1/routes/version.routes.js";

const apiRoutes = Router();

apiRoutes.get("/", (req, res) => res.send("API ON !"));
apiRoutes.use("/v1", versionRoutes);

export default apiRoutes;