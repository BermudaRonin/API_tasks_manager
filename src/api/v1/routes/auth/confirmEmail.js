import OperationFailure from "../../../../utils/espress/operation.js";
import Response from "../../../../utils/espress/response.js";
import Auth from "../../services/auth.service.js";


export default async function confirmEmail(req, res) {
    try {
        const user = req.user;

        if (user.emailVerified) {
            throw new OperationFailure("verifyEmail", ["Email already verified"], 500);
        }

        const { pin } = await Auth.validate.confirmEmail(req); 

        await Auth.validatEmailVerificatioon(user, pin);

        return Response.OK(res, 200, "Email verification confirmed");

    } catch (operationError) {

        const { name, code, errors } = operationError
        return Response.KO(res, code, "Not verified", errors)
    }
}
