import User from "../../services/user.service.js";

import Password from "../../services/pass.service.js";
import { AccessToken } from "../../services/token.service.js";

import Response from "../../../../utils/espress/response.js";

export default async function createUser(req, res) {
    try {
        // Get body data
        const credentials = await User.validate.register(req);

        // Hash password
        const hashedPassword = await Password.hash(credentials.password);

        // Create a user
        const user = await User.register({ ...credentials, hashedPassword }, true)

        // Generate an access token
        const accessToken = await AccessToken.generate(user);

        // Respond
        return Response.OK(res, 201, "User created", { accessToken, user });

    } catch (operationError) {
        const { name, code, errors } = operationError
        return Response.KO(res, code || 500, "Error creating user", errors)
    }
}
