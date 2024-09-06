import OperationFailure from "../../../../utils/espress/operation.js";
import Response from "../../../../utils/espress/response.js";

import Auth from "../../services/auth.service.js";
import Password from "../../services/pass.service.js";
import { AccessToken } from "../../services/token.service.js";
import User from "../../services/user.service.js";

export default async function loginUser(req, res) {
    try {
        let credentials = {};
        let user = null;

        // Get user by username
        if ("username" in req.body) {

            credentials = await Auth.validate.loginUsername(req);
            user = await User.getByUsername(credentials.username);

            if (!user) {
                throw new OperationFailure("login", ["Wrong username"], 404);
            }
        }

        // Get user by email
        if ("email" in req.body && !user) {

            credentials = await Auth.validate.loginEmail(req);
            user = await User.getByEmail(credentials.email);

            if (!user) {
                throw new OperationFailure("login", ["Wrong email"], 404);
            }
        }

        // Compare password
        await Password.compare(credentials.password, user.hashedPassword);

        // Format output user
        user = User.format.user(user);

        // Generate access token
        const accessToken = await AccessToken.generate(user);

        return Response.OK(res, 200, "User valid", { accessToken, user });

    } catch (operationError) {
        const { name, code, errors } = operationError;
        return Response.KO(res, code, "Login failure!", errors)
    }
}
