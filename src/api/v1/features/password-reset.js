import { Issue, ResponseFailure, ResponseSuccess, Validation } from "../utils/index.js"
import User from '../services/user.service.js';
import Token from "../services/token.service.js";
import Mail from "../services/mail.service.js";

export default class PasswordReset {

    static sendVerification = async function (req, res) {
        try {
            const { email } = await Validation.obj(req.body, {
                email: User.schema.email
            })

            const user = await User.getOneByEmail(email);

            const resetToken = await Token.generateResetToken(user.id, email);

            await Mail.sendResetToken(user, resetToken);

            return res.status(200).json(new ResponseSuccess("Reset token sent!", { resetToken }))

        } catch (error) {
            const { json, status } = new ResponseFailure(error);
            return res.status(status).json(json);
        }
    }

    static confirmVerification = async function (req, res) {
        try {
            const { resetToken } = await Validation.obj(req.params, {
                resetToken: Token.schema.token
            })

            const { data, sub } = await Token.decodeResetToken(resetToken);

            const user = await User.getOneByID(data.id);

            const conditions = [
                data.id == user.id,
                data.email == user.email,
                sub == Token.subject.reset
            ]

            if (conditions.includes(false)) {
                throw new Issue.TokenInvalid(sub);
            }

            return res.status(200).json(new ResponseSuccess("Reset approved!"))

        } catch (error) {
            const { json, status } = new ResponseFailure(error);
            return res.status(status).json(json);
        }

    }

}