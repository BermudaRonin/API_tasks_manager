import OperationFailure from "../../../../utils/espress/operation.js";
import Response from "../../../../utils/espress/response.js";
import Auth from "../../services/auth.service.js";
import { AccessToken } from "../../services/token.service.js";
import User from "../../services/user.service.js";


export default async function getUserMiddleware(req, res, next) {
    try {
        const header = await Auth.validate.headerAuthorization(req);

        const accessToken = header.authorization.split(" ")[1]
        const payload = await AccessToken.parse(accessToken);

        let user = await User.getByID(payload.id);
        if (!user) {
            throw new OperationFailure("getUser", ["User not found"]);
        }
        user = User.format.user(user)
        req.user = user;
        next();
    } catch (operationError) {
        const { name, code, errors } = operationError
        return Response.KO(res, 403, "Unauthorized", errors)
    }
}
