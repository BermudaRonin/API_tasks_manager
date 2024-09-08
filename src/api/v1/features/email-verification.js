import { Issue, ResponseFailure, ResponseSuccess, Validate } from '../utils/index.js';

import Mail from "../services/mail.service.js";
import Token from "../services/token.service.js";
import User from '../services/user.service.js';

export default class EmailVerification {

    static sendVerification = async function (req, res) {
        try {
            const user = req.user;

            if (user.emailVerified) {
                return res.status(200).json(new ResponseSuccess("Email already verified"))
            }

            const emailToken = await Token.generateEmailToken(user.id, user.email);

            await Mail.sendEmailToken(user, emailToken);

            res.status(200).json(new ResponseSuccess("Verification mail sent to the user", { emailToken }))

        } catch (error) {
            const { json, status } = new ResponseFailure(error);
            res.status(status).json(json);
        }
    }

    static confirmVerification = async function (req, res) {
        try {
            const user = req.user;
            if (user.emailVerified) {
                return res.status(200).json(new ResponseSuccess("Email already verified"))
            }


            const params = await Validate(req.params, Token.schema.emailToken);

            console.log({ params });

            const { emailToken } = params
            const { data, sub } = await Token.decodeAccessToken(emailToken);

            console.log({ data, sub });


            // Compare token data 
            const conditions = [
                data.id == user.id,
                data.email == user.email,
            ]

            if (conditions.includes(false)) {
                throw new Issue.TokenInvalid(sub);
            }

            // update user
            await User._updateOne(user.id, { emailVerified: true });

            return res.status(200).json(new ResponseSuccess("Email verified!"))
        } catch (error) {
            const { json, status } = new ResponseFailure(error);
            res.status(status).json(json);
        }
    }

}