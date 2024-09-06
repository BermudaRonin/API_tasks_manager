import OperationFailure from "../../../../utils/espress/operation.js";
import Response from "../../../../utils/espress/response.js";
import Auth from "../../services/auth.service.js";
import { Mail } from "../../services/mail.service.js";
import { PIN } from "../../services/pass.service.js";


export default async function verifyEmail(req, res) {
    try {
        const user = req.user;

        if (user.emailVerified) {
            throw new OperationFailure("verifyEmail", ["Email already verified"], 500);
        }

        const pin = await PIN.generate();
        console.log({ pin })

        const verification = await Auth.createEmailValidation(user, pin);
        console.log({ verification })

        if (!verification) {
            throw new OperationFailure("verifyEmail", ["Verification not created"], 500);
        }

        return Response.OK(res, 200, "Verification email sent", { pin });

        // await Mail.emailVerification(user, pin);
        // return Response.OK(res, 200, "Verification email sent");
    } catch (operationError) {
        console.log({ operationError })

        const { name, code = 500, errors } = operationError;
        return Response.KO(res, code, "Verification aborted!", errors)
    }
}
